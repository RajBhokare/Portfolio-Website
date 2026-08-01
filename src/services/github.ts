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
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
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

// Generate realistic mock dataset for RajBhokare if external network/API completely fails
export function getFallbackGitHubData(username: string): {
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
} {
  const now = new Date();
  const contributions: ContributionDay[] = [];
  let totalContribs = 0;

  for (let i = 363; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sun, 6 is Sat

    let seed = 0;
    for (let c = 0; c < dateStr.length; c++) {
      seed = (seed + dateStr.charCodeAt(c) * (c + 1)) % 100;
    }

    let count = 0;
    let intensity = 0;

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      if (seed > 30) {
        if (seed > 85) {
          count = 7 + (seed % 6);
          intensity = 4;
        } else if (seed > 65) {
          count = 4 + (seed % 3);
          intensity = 3;
        } else if (seed > 45) {
          count = 2 + (seed % 2);
          intensity = 2;
        } else {
          count = 1;
          intensity = 1;
        }
      }
    } else {
      if (seed > 75) {
        count = 3;
        intensity = 2;
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
    avatarUrl: `https://github.com/${username}.png`,
    profileUrl: `https://github.com/${username}`,
    bio: 'Full Stack Web Developer | Crafting scalable web applications & beautiful UI/UX',
    publicRepos: 18,
    followers: 24,
    following: 15,
    totalStars: 32,
  };

  const events: GitHubEvent[] = [
    {
      id: 'fallback-1',
      type: 'PushEvent',
      repoName: `${username}/Portfolio`,
      repoUrl: `https://github.com/${username}/Portfolio`,
      createdAt: new Date().toISOString(),
      description: 'Pushed commit: "Optimize performance and standard UI features"',
    },
    {
      id: 'fallback-2',
      type: 'CreateEvent',
      repoName: `${username}/fullstack-app`,
      repoUrl: `https://github.com/${username}/fullstack-app`,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      description: 'Created repository fullstack-app',
    },
    {
      id: 'fallback-3',
      type: 'PushEvent',
      repoName: `${username}/react-components`,
      repoUrl: `https://github.com/${username}/react-components`,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      description: 'Pushed 3 commits to main branch',
    },
  ];

  return {
    profile,
    events,
    contributions: {
      totalContributions: totalContribs || 342,
      contributions,
    },
  };
}

export async function fetchGitHubData(): Promise<{
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
}> {
  const username = config.githubUsername || 'RajBhokare';

  return fetchWithCache(`github_${username}_v4`, async () => {
    const fallbackObj = getFallbackGitHubData(username);

    try {
      // 1. Fetch User Profile & Repos in parallel with fast 2.5s timeout
      const [profileRes, reposRes, eventsRes, contribRes] = await Promise.all([
        fetchWithTimeout(`https://api.github.com/users/${username}`, {}, 2500).catch(() => null),
        fetchWithTimeout(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {}, 2500).catch(() => null),
        fetchWithTimeout(`https://api.github.com/users/${username}/events/public?per_page=10`, {}, 2500).catch(() => null),
        fetchWithTimeout(`/api/github-contributions?username=${username}`, {}, 2500).catch(() => null),
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

      if (contribRes && contribRes.ok) {
        const contentType = contribRes.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const contribJson = await contribRes.json();
          if (Array.isArray(contribJson.contributions) && contribJson.contributions.length > 0) {
            contributionData = {
              totalContributions: contribJson.totalContributions || 0,
              contributions: contribJson.contributions,
            };
          }
        } else {
          const text = await contribRes.text();
          contributionData = parseGitHubHTML(text);
        }
      }

      // Try CORS proxy for GitHub contributions if primary failed
      if (!contributionData.contributions || contributionData.contributions.length === 0) {
        try {
          const corsProxyRes = await fetchWithTimeout(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://github.com/users/${username}/contributions`)}`,
            {},
            2500
          );
          if (corsProxyRes.ok) {
            const html = await corsProxyRes.text();
            const parsed = parseGitHubHTML(html);
            if (parsed.contributions.length > 0) {
              contributionData = parsed;
            }
          }
        } catch (e) {
          // ignore CORS proxy fail
        }
      }

      // If still empty, use fallback contributions heatmap
      if (!contributionData.contributions || contributionData.contributions.length === 0) {
        contributionData = fallbackObj.contributions;
      }

      return { profile, events, contributions: contributionData };
    } catch (err) {
      console.warn('GitHub fetch error, returning fallback dataset:', err);
      return fallbackObj;
    }
  });
}
