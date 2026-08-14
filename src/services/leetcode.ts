export interface LeetCodeProfile {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  ranking: number | null;
  reputation: number;
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  totalSubmissions: number | null;
  acSubmissions: number | null;
  acceptanceRate: number | null;
  contestRating: number | null;
  contestRanking: number | null;
  contestAttended: number;
  currentStreak: number | null;
  activeDays: number;
  submissionCalendar: Record<string, number>;
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  statusDisplay: string;
  lang: string;
  timestamp: string;
}

export interface LeetCodeData {
  username: string;
  profile: LeetCodeProfile;
  recentSubmissions: LeetCodeSubmission[];
  lastUpdated: number;
  source: 'leetcode-graphql';
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
      throw new Error(`LeetCode activity unavailable (${message})`);
    }

    return body;
  } finally {
    window.clearTimeout(timer);
  }
}

function assertLeetCodeData(data: unknown): LeetCodeData {
  if (!data || typeof data !== 'object') {
    throw new Error('LeetCode activity unavailable: invalid API response.');
  }

  const result = data as Partial<LeetCodeData>;
  if (result.username?.toLowerCase() !== 'rajbhokare') {
    throw new Error(`LeetCode identity verification failed: expected RajBhokare, received ${result.username || 'unknown'}.`);
  }

  if (!result.profile || result.profile.username?.toLowerCase() !== 'rajbhokare') {
    throw new Error('LeetCode identity verification failed for profile data.');
  }

  if (!result.profile.submissionCalendar || typeof result.profile.submissionCalendar !== 'object') {
    throw new Error('LeetCode activity unavailable: submission calendar missing.');
  }

  return result as LeetCodeData;
}

export async function fetchLeetCodeData(forceRefresh = false): Promise<LeetCodeData> {
  const endpoint = forceRefresh ? `/api/leetcode?refresh=1&t=${Date.now()}` : '/api/leetcode';
  return assertLeetCodeData(await fetchJsonWithTimeout(endpoint));
}
