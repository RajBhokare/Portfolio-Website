import { config } from '../config/env';
import { fetchWithCache } from './cache';

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  description: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  color: string;
  intensity: number;
}

export interface GitHubContributionData {
  totalContributions: number;
  contributions: ContributionDay[];
  isFallback?: boolean;
}

export interface GitHubDataResult {
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
  isFallback?: boolean;
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

function parseGitHubHTML(html: string): GitHubContributionData {
  const totalMatch = html.match(/([\d,]+)\s+contributions/i);
  const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  const days: ContributionDay[] = [];
  const regex1 = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
  let match;
  while ((match = regex1.exec(html)) !== null) {
    const level = parseInt(match[2], 10);
    days.push({
      date: match[1],
      intensity: level,
      count: level > 0 ? (level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8) : 0,
      color: '',
    });
  }

  const regex2 = /data-level="(\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
  while ((match = regex2.exec(html)) !== null) {
    if (!days.some((d) => d.date === match[2])) {
      const level = parseInt(match[1], 10);
      days.push({
        date: match[2],
        intensity: level,
        count: level > 0 ? (level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8) : 0,
        color: '',
      });
    }
  }

  days.sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalContributions: totalContributions || days.reduce((sum, d) => sum + d.count, 0),
    contributions: days,
  };
}

export function getFallbackGitHubData(username: string): GitHubDataResult {
  const now = new Date();
  const contributions: ContributionDay[] = [];
  let totalContribs = 0;

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();

    let count = 0;
    let intensity = 0;

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      if ((i % 3) === 0) {
        count = (i % 4) + 1;
        intensity = count > 3 ? 3 : count;
      }
    }

    totalContribs += count;
    contributions.push({
      date: dateStr,
      count,
      color: '',
      intensity,
    });
  }

  const profile: GitHubProfile = {
    username,
    name: 'Raj Bhokare',
    avatarUrl: 'https://avatars.githubusercontent.com/u/201620099?v=4',
    profileUrl: `https://github.com/${username}`,
    bio: 'Frontend & Full Stack Developer | IT Engineering Student at D. Y. Patil Institute of Technology',
    publicRepos: 18,
    followers: 6,
    following: 15,
    totalStars: 0,
  };

  const events: GitHubEvent[] = [
    {
      id: 'fallback-1',
      type: 'PushEvent',
      repoName: `${username}/Portfolio-Website`,
      repoUrl: `https://github.com/${username}/Portfolio-Website`,
      createdAt: new Date().toISOString(),
      description: 'Pushed commit to Portfolio-Website',
    },
  ];

  return {
    profile,
    events,
    contributions: {
      totalContributions: 206,
      contributions,
      isFallback: true,
    },
    isFallback: true,
  };
}

export async function fetchGitHubData(forceRefresh = false): Promise<GitHubDataResult> {
  const username = config.githubUsername || 'RajBhokare';

  if (forceRefresh) {
    try {
      localStorage.removeItem(`portfolio_cache_github_${username}_v7`);
    } catch (e) {}
  }

  return fetchWithCache(
    `github_${username}_v7`,
    async () => {
      const fallbackObj = getFallbackGitHubData(username);

      try {
        // 1. Fetch User Profile & Repos in parallel with 8s timeout
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetchWithTimeout(`https://api.github.com/users/${username}`, {}, 8000).catch(() => null),
          fetchWithTimeout(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {}, 8000).catch(() => null),
          fetchWithTimeout(`https://api.github.com/users/${username}/events/public?per_page=10`, {}, 8000).catch(() => null),
        ]);

        let profile: GitHubProfile = fallbackObj.profile;

        if (profileRes && profileRes.ok) {
          const profileJson = await profileRes.json();
          const reposJson = reposRes && reposRes.ok ? await reposRes.json() : [];
          const totalStars = Array.isArray(reposJson)
            ? reposJson.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
            : profile.totalStars;

          profile = {
            username: profileJson.login || username,
            name: profileJson.name || profileJson.login || username,
            avatarUrl: profileJson.avatar_url || profile.avatarUrl,
            profileUrl: profileJson.html_url || `https://github.com/${username}`,
            bio: profileJson.bio || profile.bio,
            publicRepos: profileJson.public_repos ?? profile.publicRepos,
            followers: profileJson.followers ?? profile.followers,
            following: profileJson.following ?? profile.following,
            totalStars,
          };
        }

        let events: GitHubEvent[] = fallbackObj.events;
        if (eventsRes && eventsRes.ok) {
          const eventsJson = await eventsRes.json();
          if (Array.isArray(eventsJson) && eventsJson.length > 0) {
            events = eventsJson.slice(0, 6).map((ev: any) => {
              let description = 'Activity on repository';
              if (ev.type === 'PushEvent') {
                const commitMsg = ev.payload?.commits?.[0]?.message;
                description = commitMsg
                  ? `Pushed commit: "${commitMsg.slice(0, 60)}${commitMsg.length > 60 ? '...' : ''}"`
                  : `Pushed ${ev.payload?.commits?.length || 1} commit(s)`;
              } else if (ev.type === 'CreateEvent') {
                description = `Created ${ev.payload?.ref_type || 'repository'} ${ev.payload?.ref ? `'${ev.payload.ref}'` : ''}`;
              } else if (ev.type === 'WatchEvent') {
                description = 'Starred repository';
              } else if (ev.type === 'PullRequestEvent') {
                description = `${ev.payload?.action || 'Opened'} pull request #${ev.payload?.number}`;
              } else if (ev.type === 'IssuesEvent') {
                description = `${ev.payload?.action || 'Opened'} issue #${ev.payload?.issue?.number}`;
              } else if (ev.type === 'ForkEvent') {
                description = 'Forked repository';
              }

              const repoShort = ev.repo?.name || 'repository';
              return {
                id: ev.id || String(Math.random()),
                type: ev.type || 'Event',
                repoName: repoShort,
                repoUrl: `https://github.com/${repoShort}`,
                createdAt: ev.created_at || new Date().toISOString(),
                description,
              };
            });
          }
        }

        let contributionData: GitHubContributionData = {
          totalContributions: 0,
          contributions: [],
        };

        // 2. Try jogruber.de API first (Fast, reliable GitHub contribution API with CORS)
        try {
          const jogruberRes = await fetchWithTimeout(
            `https://github-contributions-api.jogruber.de/v4/${username}`,
            {},
            8000
          );
          if (jogruberRes.ok) {
            const jogruberJson = await jogruberRes.json();
            if (Array.isArray(jogruberJson.contributions) && jogruberJson.contributions.length > 0) {
              const days: ContributionDay[] = jogruberJson.contributions.map((item: any) => ({
                date: item.date,
                count: item.count || 0,
                intensity: item.level ?? (item.count > 0 ? (item.count >= 10 ? 4 : item.count >= 5 ? 3 : item.count >= 3 ? 2 : 1) : 0),
                color: '',
              }));

              let total = 0;
              if (typeof jogruberJson.total === 'object' && jogruberJson.total !== null) {
                total = Object.values(jogruberJson.total as Record<string, number>).reduce((s, v) => s + (v || 0), 0);
              } else if (typeof jogruberJson.total === 'number') {
                total = jogruberJson.total;
              } else {
                total = days.reduce((sum, d) => sum + d.count, 0);
              }

              contributionData = {
                totalContributions: total,
                contributions: days,
                isFallback: false,
              };
            }
          }
        } catch (e) {
          console.warn('jogruber API failed, trying fallback contribution providers:', e);
        }

        // 3. If jogruber fails, try local proxy / Netlify function
        if (!contributionData.contributions || contributionData.contributions.length === 0) {
          try {
            const contribRes = await fetchWithTimeout(
              `/api/github-contributions?username=${username}`,
              {},
              8000
            );
            if (contribRes.ok) {
              const contentType = contribRes.headers.get('content-type') || '';
              if (contentType.includes('application/json')) {
                const contribJson = await contribRes.json();
                if (Array.isArray(contribJson.contributions) && contribJson.contributions.length > 0) {
                  contributionData = {
                    totalContributions: contribJson.totalContributions || 0,
                    contributions: contribJson.contributions,
                    isFallback: false,
                  };
                }
              } else {
                const text = await contribRes.text();
                contributionData = parseGitHubHTML(text);
                contributionData.isFallback = false;
              }
            }
          } catch (e) {
            console.warn('/api/github-contributions failed:', e);
          }
        }

        // If still empty, use fallback contributions heatmap & mark as fallback
        const isFallback = !contributionData.contributions || contributionData.contributions.length === 0;
        if (isFallback) {
          contributionData = fallbackObj.contributions;
        }

        return {
          profile,
          events,
          contributions: contributionData,
          isFallback,
        };
      } catch (err) {
        console.warn('GitHub fetch error, returning fallback dataset:', err);
        return fallbackObj;
      }
    },
    15 * 60 * 1000,
    (res) => !!res.isFallback || !!res.contributions?.isFallback
  );
}
