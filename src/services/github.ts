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

export async function fetchGitHubData(): Promise<{
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
}> {
  const username = config.githubUsername;

  return fetchWithCache(`github_${username}_v2`, async () => {
    // 1. Fetch User Profile, Repos, Events, and Contributions in parallel
    const [profileRes, reposRes, eventsRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`),
      fetch(`/api/github-contributions?username=${username}`).catch(() => null),
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

    // Fallback if contributionData is empty: fetch from github-contributions.vercel.app with normalization
    if (!contributionData.contributions || contributionData.contributions.length === 0) {
      try {
        const fallbackRes = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`);
        if (fallbackRes.ok) {
          const fbJson = await fallbackRes.json();
          const rawDays: ContributionDay[] = fbJson.contributions || [];
          rawDays.sort((a, b) => a.date.localeCompare(b.date));

          const normalized = rawDays.map((d) => {
            const count = d.count || 0;
            let intensity = parseInt(String(d.intensity), 10) || 0;
            if (count > 0 && intensity === 0) {
              if (count >= 10) intensity = 4;
              else if (count >= 5) intensity = 3;
              else if (count >= 3) intensity = 2;
              else intensity = 1;
            }
            return {
              date: d.date,
              count,
              color: d.color || '',
              intensity,
            };
          });

          const total =
            (fbJson.years || []).reduce((acc: number, y: any) => acc + (y.total || 0), 0) ||
            normalized.reduce((acc: number, d: any) => acc + (d.count || 0), 0);

          contributionData = {
            totalContributions: total,
            contributions: normalized,
          };
        }
      } catch (fbErr) {
        console.warn('Fallback contribution API failed:', fbErr);
      }
    }

    return { profile, events, contributions: contributionData };
  });
}
