const USERNAME = 'RajBhokare';
const CACHE_TTL_MS = 10 * 60 * 1000;

let cache: { expiresAt: number; data: unknown } | null = null;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
};

function response(statusCode: number, body: unknown) {
  return { statusCode, headers, body: JSON.stringify(body) };
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

function calculateCurrentStreak(calendar: Record<string, number>): number {
  const activeDates = new Set<string>();
  for (const [timestamp, count] of Object.entries(calendar)) {
    if (count <= 0) continue;
    const date = new Date(Number(timestamp) * 1000);
    if (!Number.isNaN(date.getTime())) activeDates.add(date.toISOString().slice(0, 10));
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

async function fetchLeetCodeActivity() {
  const query = `
    query PortfolioLeetCodeActivity($username: String!, $limit: Int!) {
      allQuestionsCount { difficulty count }
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum { difficulty count submissions }
          totalSubmissionNum { difficulty count submissions }
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

  const graphRes = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'RajBhokare-Portfolio',
      Referer: `https://leetcode.com/u/${USERNAME}/`,
      Origin: 'https://leetcode.com',
    },
    body: JSON.stringify({ query, variables: { username: USERNAME, limit: 10 } }),
  });

  const body = await graphRes.json();
  if (!graphRes.ok || body.errors?.length) {
    throw new Error(body.errors?.[0]?.message || `LeetCode GraphQL failed with status ${graphRes.status}`);
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
      acceptanceRate: totalSubmissions > 0 ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10 : null,
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

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'GET') return response(405, { error: 'Method not allowed' });

  const username = event.queryStringParameters?.username;
  if (username && String(username).toLowerCase() !== USERNAME.toLowerCase()) {
    return response(400, { error: `Identity verification failed: requested user must be ${USERNAME}` });
  }

  const forceRefresh = event.queryStringParameters?.refresh === '1';
  if (!forceRefresh && cache && cache.expiresAt > Date.now()) {
    return response(200, cache.data);
  }

  try {
    const data = await fetchLeetCodeActivity();
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return response(200, data);
  } catch (err: any) {
    return response(503, { error: err.message || 'LeetCode activity unavailable' });
  }
}
