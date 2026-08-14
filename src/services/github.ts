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
  level: string;
}

export interface GitHubContributionData {
  totalContributions: number;
  contributions: ContributionDay[];
}

export interface GitHubDataResult {
  username: string;
  profile: GitHubProfile;
  events: GitHubEvent[];
  contributions: GitHubContributionData;
  lastUpdated: number;
  source: 'github-graphql';
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 10000): Promise<unknown> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const message = body && typeof body === 'object' && 'error' in body ? String(body.error) : `status ${res.status}`;
      throw new Error(`GitHub activity unavailable (${message})`);
    }

    return body;
  } finally {
    window.clearTimeout(timer);
  }
}

function assertGitHubData(data: unknown): GitHubDataResult {
  if (!data || typeof data !== 'object') {
    throw new Error('GitHub activity unavailable: invalid API response.');
  }

  const result = data as Partial<GitHubDataResult>;
  if (result.username?.toLowerCase() !== 'rajbhokare') {
    throw new Error(`GitHub identity verification failed: expected RajBhokare, received ${result.username || 'unknown'}.`);
  }

  if (!result.profile || result.profile.username?.toLowerCase() !== 'rajbhokare') {
    throw new Error('GitHub identity verification failed for profile data.');
  }

  if (!result.contributions || !Array.isArray(result.contributions.contributions)) {
    throw new Error('GitHub activity unavailable: contribution calendar missing.');
  }

  return result as GitHubDataResult;
}

export async function fetchGitHubData(forceRefresh = false): Promise<GitHubDataResult> {
  const endpoint = forceRefresh
    ? `/api/github-contributions?refresh=1&t=${Date.now()}`
    : '/api/github-contributions';

  return assertGitHubData(await fetchJsonWithTimeout(endpoint));
}
