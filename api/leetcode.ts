const USERNAME = 'RajBhokare';
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  expiresAt: number;
  data: LeetCodeEndpointResponse;
}

interface LeetCodeEndpointResponse {
  username: string;
  profile: {
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
  };
  recentSubmissions: Array<{
    title: string;
    titleSlug: string;
    statusDisplay: string;
    lang: string;
    timestamp: string;
  }>;
  badges: Array<{
    id: string;
    displayName: string;
    icon: string;
  }>;
  languageStats: Array<{
    languageName: string;
    problemsSolved: number;
  }>;
  lastUpdated: number;
  source: 'leetcode-graphql';
}

let cache: CacheEntry | null = null;

function json(res: any, status: number, body: unknown) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
  res.status(status).json(body);
}

function parseCalendar(raw: unknown): Record<string, number> {
  if (!raw) return {};
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('LeetCode submission calendar has an unexpected shape.');
  }

  return Object.fromEntries(
    Object.entries(parsed as Record<string, unknown>).map(([timestamp, count]) => [timestamp, Number(count || 0)])
  );
}

function calculateCurrentStreak(calendar: Record<string, number>): number | null {
  const activeDates = new Set<string>();
  for (const [timestamp, count] of Object.entries(calendar)) {
    if (count <= 0) continue;
    const date = new Date(Number(timestamp) * 1000);
    if (Number.isNaN(date.getTime())) continue;
    activeDates.add(date.toISOString().slice(0, 10));
  }

  if (activeDates.size === 0) return 0;

  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);

  if (!activeDates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  let streak = 0;
  while (activeDates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

function statValue(stats: any[], difficulty: string, key: 'count' | 'submissions'): number {
  const item = stats.find((entry) => entry?.difficulty === difficulty);
  return Number(item?.[key] || 0);
}

async function fetchLeetCodeActivity(): Promise<LeetCodeEndpointResponse> {
  const query = `
    query PortfolioLeetCodeActivity($username: String!, $limit: Int!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        submissionCalendar
        badges {
          id
          displayName
          icon
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
      }
      recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `;

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'RajBhokare-Portfolio',
      Referer: `https://leetcode.com/u/${USERNAME}/`,
      Origin: 'https://leetcode.com',
    },
    body: JSON.stringify({ query, variables: { username: USERNAME, limit: 10 } }),
  });

  const body = await response.json();
  if (!response.ok || body.errors?.length) {
    throw new Error(body.errors?.[0]?.message || `LeetCode GraphQL failed with status ${response.status}`);
  }

  const user = body.data?.matchedUser;
  if (!user || String(user.username).toLowerCase() !== USERNAME.toLowerCase()) {
    throw new Error(`LeetCode identity verification failed: expected ${USERNAME}, received ${user?.username || 'unknown'}.`);
  }

  const acStats = Array.isArray(user.submitStats?.acSubmissionNum) ? user.submitStats.acSubmissionNum : [];
  const totalStats = Array.isArray(user.submitStats?.totalSubmissionNum) ? user.submitStats.totalSubmissionNum : [];
  const allQuestions = Array.isArray(body.data?.allQuestionsCount) ? body.data.allQuestionsCount : [];
  const calendar = parseCalendar(user.submissionCalendar);
  const totalSubmissions = statValue(totalStats, 'All', 'submissions');
  const acSubmissions = statValue(acStats, 'All', 'submissions');
  const acceptanceRate = totalSubmissions > 0 ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10 : null;
  const contest = body.data?.userContestRanking;

  return {
    username: user.username,
    profile: {
      username: user.username,
      name: user.profile?.realName || user.username,
      avatarUrl: user.profile?.userAvatar || '',
      profileUrl: `https://leetcode.com/u/${USERNAME}/`,
      ranking: user.profile?.ranking ? Number(user.profile.ranking) : null,
      reputation: Number(user.profile?.reputation || 0),
      totalSolved: statValue(acStats, 'All', 'count'),
      easySolved: statValue(acStats, 'Easy', 'count'),
      totalEasy: statValue(allQuestions, 'Easy', 'count'),
      mediumSolved: statValue(acStats, 'Medium', 'count'),
      totalMedium: statValue(allQuestions, 'Medium', 'count'),
      hardSolved: statValue(acStats, 'Hard', 'count'),
      totalHard: statValue(allQuestions, 'Hard', 'count'),
      totalSubmissions: totalSubmissions || null,
      acSubmissions: acSubmissions || null,
      acceptanceRate,
      contestRating: contest?.rating ? Math.round(Number(contest.rating)) : null,
      contestRanking: contest?.globalRanking ? Number(contest.globalRanking) : null,
      contestAttended: Number(contest?.attendedContestsCount || 0),
      currentStreak: calculateCurrentStreak(calendar),
      activeDays: Object.values(calendar).filter((count) => count > 0).length,
      submissionCalendar: calendar,
    },
    recentSubmissions: Array.isArray(body.data?.recentSubmissionList)
      ? body.data.recentSubmissionList.map((submission: any) => ({
          title: String(submission.title || ''),
          titleSlug: String(submission.titleSlug || ''),
          statusDisplay: String(submission.statusDisplay || ''),
          lang: String(submission.lang || ''),
          timestamp: String(submission.timestamp || ''),
        }))
      : [],
    badges: Array.isArray(user.badges)
      ? user.badges.map((badge: any) => ({
          id: String(badge.id || ''),
          displayName: String(badge.displayName || ''),
          icon: String(badge.icon || ''),
        }))
      : [],
    languageStats: Array.isArray(user.languageProblemCount)
      ? user.languageProblemCount.map((language: any) => ({
          languageName: String(language.languageName || ''),
          problemsSolved: Number(language.problemsSolved || 0),
        }))
      : [],
    lastUpdated: Date.now(),
    source: 'leetcode-graphql',
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    json(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (req.query?.username && String(req.query.username).toLowerCase() !== USERNAME.toLowerCase()) {
    json(res, 400, { error: `Identity verification failed: requested user must be ${USERNAME}` });
    return;
  }

  const forceRefresh = req.query?.refresh === '1';
  if (!forceRefresh && cache && cache.expiresAt > Date.now()) {
    json(res, 200, cache.data);
    return;
  }

  try {
    const data = await fetchLeetCodeActivity();
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    json(res, 200, data);
  } catch (err: any) {
    json(res, 503, { error: err.message || 'LeetCode activity unavailable' });
  }
}
