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

export interface GitHubDataResult {
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
  lastUpdated: number;
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

export async function fetchGitHubData(forceRefresh = false): Promise<GitHubDataResult> {
  const username = (config.githubUsername || 'RajBhokare').trim();

  // 1. Identity Check
  if (username.toLowerCase() !== 'rajbhokare') {
    throw new Error(`Identity verification failed: username '${username}' does not match official account 'RajBhokare'.`);
  }

  const cacheKey = `github_${username}_real_v1`;

  if (forceRefresh) {
    try {
      localStorage.removeItem(`portfolio_cache_${cacheKey}`);
    } catch (e) {}
  }

  return fetchWithCache(
    cacheKey,
    async () => {
      // 1. Fetch User Profile, Repos, and Events from GitHub REST API
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetchWithTimeout(`https://api.github.com/users/${username}`, {}, 8000),
        fetchWithTimeout(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {}, 8000).catch(() => null),
        fetchWithTimeout(`https://api.github.com/users/${username}/events/public?per_page=10`, {}, 8000).catch(() => null),
      ]);

      if (!profileRes.ok) {
        throw new Error(`GitHub profile request failed with status: ${profileRes.status}`);
      }

      const profileJson = await profileRes.json();

      // Assert login identity matches RajBhokare
      if (!profileJson.login || profileJson.login.toLowerCase() !== 'rajbhokare') {
        throw new Error(`Identity verification error: expected login 'RajBhokare', received '${profileJson.login}'.`);
      }

      const reposJson = reposRes && reposRes.ok ? await reposRes.json() : [];
      const totalStars = Array.isArray(reposJson)
        ? reposJson.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
        : 0;

      const profile: GitHubProfile = {
        username: profileJson.login,
        name: profileJson.name || profileJson.login,
        avatarUrl: profileJson.avatar_url || 'https://avatars.githubusercontent.com/u/201620099?v=4',
        profileUrl: profileJson.html_url || `https://github.com/${username}`,
        bio: profileJson.bio || null,
        publicRepos: profileJson.public_repos ?? 0,
        followers: profileJson.followers ?? 0,
        following: profileJson.following ?? 0,
        totalStars,
      };

      // 2. Parse Events
      let events: GitHubEvent[] = [];
      if (eventsRes && eventsRes.ok) {
        const eventsJson = await eventsRes.json();
        if (Array.isArray(eventsJson)) {
          events = eventsJson.slice(0, 8).map((ev: any, idx: number) => {
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
              id: String(ev.id || `${repoShort}-${ev.created_at || idx}`),
              type: ev.type || 'Event',
              repoName: repoShort,
              repoUrl: `https://github.com/${repoShort}`,
              createdAt: ev.created_at || new Date().toISOString(),
              description,
            };
          });
        }
      }

      // 3. Fetch Contribution Heatmap
      let contributionData: GitHubContributionData | null = null;

      // Primary Provider: Jogruber CORS API
      try {
        const jogRes = await fetchWithTimeout(`https://github-contributions-api.jogruber.de/v4/${username}`, {}, 8000);
        if (jogRes.ok) {
          const jogJson = await jogRes.json();
          if (Array.isArray(jogJson.contributions) && jogJson.contributions.length > 0) {
            const days: ContributionDay[] = jogJson.contributions.map((item: any) => ({
              date: item.date,
              count: item.count || 0,
              intensity: item.level ?? (item.count > 0 ? (item.count >= 10 ? 4 : item.count >= 5 ? 3 : item.count >= 3 ? 2 : 1) : 0),
              color: '',
            }));

            let total = 0;
            if (typeof jogJson.total === 'object' && jogJson.total !== null) {
              total = Object.values(jogJson.total as Record<string, number>).reduce((s, v) => s + (v || 0), 0);
            } else if (typeof jogJson.total === 'number') {
              total = jogJson.total;
            } else {
              total = days.reduce((sum, d) => sum + d.count, 0);
            }

            contributionData = {
              totalContributions: total,
              contributions: days,
            };
          }
        }
      } catch (e) {
        console.warn('Jogruber API failed, trying API route:', e);
      }

      // Secondary Provider: Backend Proxy Endpoint /api/github-contributions
      if (!contributionData) {
        try {
          const apiRes = await fetchWithTimeout(`/api/github-contributions?username=${username}`, {}, 8000);
          if (apiRes.ok) {
            const apiJson = await apiRes.json();
            if (Array.isArray(apiJson.contributions) && apiJson.contributions.length > 0) {
              contributionData = {
                totalContributions: apiJson.totalContributions || 0,
                contributions: apiJson.contributions,
              };
            }
          }
        } catch (e) {
          console.warn('/api/github-contributions failed:', e);
        }
      }

      if (!contributionData) {
        throw new Error('GitHub contribution calendar data could not be fetched from live APIs.');
      }

      return {
        profile,
        events,
        contributions: contributionData,
        lastUpdated: Date.now(),
      };
    },
    10 * 60 * 1000 // 10 minutes TTL
  );
}

