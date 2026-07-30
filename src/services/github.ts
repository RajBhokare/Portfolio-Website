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

export async function fetchGitHubData(): Promise<{
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
}> {
  const username = config.githubUsername;

  return fetchWithCache(`github_${username}`, async () => {
    // 1. Fetch User Profile & Repos in parallel
    const [profileRes, reposRes, eventsRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`),
      fetch(`https://github-contributions.vercel.app/api/v1/${username}`).catch(() => null),
    ]);

    if (!profileRes.ok) {
      throw new Error(`GitHub API error: ${profileRes.statusText} (${profileRes.status})`);
    }

    const profileJson = await profileRes.json();
    const reposJson = reposRes.ok ? await reposRes.json() : [];
    const eventsJson = eventsRes.ok ? await eventsRes.json() : [];

    // Calculate total stars
    const totalStars = Array.isArray(reposJson)
      ? reposJson.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
      : 0;

    const profile: GitHubProfile = {
      username: profileJson.login || username,
      name: profileJson.name || profileJson.login || username,
      avatarUrl: profileJson.avatar_url || '',
      profileUrl: profileJson.html_url || `https://github.com/${username}`,
      bio: profileJson.bio || null,
      publicRepos: profileJson.public_repos || 0,
      followers: profileJson.followers || 0,
      following: profileJson.following || 0,
      totalStars,
    };

    // Format recent events
    const events: GitHubEvent[] = Array.isArray(eventsJson)
      ? eventsJson.slice(0, 6).map((ev: any) => {
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
        })
      : [];

    // Parse Contribution Graph
    let contributionData: GitHubContributionData = {
      totalContributions: 0,
      contributions: [],
    };

    if (contribRes && contribRes.ok) {
      const contribJson = await contribRes.json();
      const rawDays: ContributionDay[] = contribJson.contributions || [];
      const total = (contribJson.years || []).reduce((acc: number, y: any) => acc + (y.total || 0), 0) ||
        rawDays.reduce((acc: number, d: any) => acc + (d.count || 0), 0);

      contributionData = {
        totalContributions: total,
        contributions: rawDays,
      };
    }

    return { profile, events, contributions: contributionData };
  });
}
