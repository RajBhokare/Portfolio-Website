import { config } from '../config/env';
import { fetchWithCache } from './cache';

export interface LeetCodeProfile {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  ranking: number;
  reputation: number;
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  totalSubmissions: number;
  acSubmissions: number;
  acceptanceRate: number; // e.g. 50.6
  contestRating: number | null;
  contestRanking: number | null;
  contestAttended: number;
  currentStreak: number;
  activeDays: number;
  submissionCalendar: Record<string, number>; // timestamp -> count
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  statusDisplay: string;
  lang: string;
  timestamp: string;
}

export interface LeetCodeData {
  profile: LeetCodeProfile;
  recentSubmissions: LeetCodeSubmission[];
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

// Calculate streak dynamically from submission calendar
export function calculateStreak(submissionCalendar: Record<string, number>): number {
  if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
    return 0;
  }

  const activeDates = new Set<string>();
  Object.keys(submissionCalendar).forEach((ts) => {
    const timestampMs = parseInt(ts, 10) * 1000;
    const date = new Date(timestampMs);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
    if (submissionCalendar[ts] > 0) {
      activeDates.add(dateStr);
    }
  });

  if (activeDates.size === 0) return 0;

  const now = new Date();
  let streak = 0;
  let checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const toDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  let checkStr = toDateStr(checkDate);

  if (!activeDates.has(checkStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
    checkStr = toDateStr(checkDate);
  }

  while (activeDates.has(checkStr)) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
    checkStr = toDateStr(checkDate);
  }

  return streak;
}

export async function fetchLeetCodeData(forceRefresh = false): Promise<LeetCodeData> {
  const username = (config.leetcodeUsername || 'RajBhokare').trim();

  // Strict Identity Check
  if (username.toLowerCase() !== 'rajbhokare') {
    throw new Error(`Identity verification failed: username '${username}' does not match official account 'RajBhokare'.`);
  }

  const cacheKey = `leetcode_${username}_real_v1`;

  if (forceRefresh) {
    try {
      localStorage.removeItem(`portfolio_cache_${cacheKey}`);
    } catch (e) {}
  }

  return fetchWithCache(
    cacheKey,
    async () => {
      // 1. Primary: Try FaisalShohag Vercel API
      try {
        const vercelRes = await fetchWithTimeout(
          `https://leetcode-api-faisalshohag.vercel.app/${username}`,
          {},
          8000
        );

        if (vercelRes.ok) {
          const json = await vercelRes.json();
          if (json && (json.totalSolved !== undefined || json.ranking)) {
            return parseLeetCodeAPIResponse(username, json);
          }
        }
      } catch (err) {
        console.warn('Primary Vercel LeetCode API timed out or failed:', err);
      }

      // 2. Secondary: Try backend GraphQL proxy /api/leetcode
      const graphqlQuery = `
        query getUserProfile($username: String!) {
          allQuestionsCount { difficulty count }
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
              ranking
              reputation
            }
            submissionCalendar
            submitStats {
              acSubmissionNum { difficulty count submissions }
              totalSubmissionNum { difficulty count submissions }
            }
          }
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
          recentSubmissionList(username: $username, limit: 10) {
            title
            titleSlug
            timestamp
            statusDisplay
            lang
          }
        }
      `;

      try {
        const proxyRes = await fetchWithTimeout(
          '/api/leetcode',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlQuery, variables: { username } }),
          },
          8000
        );

        if (proxyRes.ok) {
          const json = await proxyRes.json();
          if (json.data && json.data.matchedUser) {
            return parseGraphQLResponse(username, json.data);
          }
        }
      } catch (err) {
        console.warn('LeetCode GraphQL proxy failed:', err);
      }

      throw new Error('LeetCode profile & submission data could not be fetched from live APIs.');
    },
    10 * 60 * 1000 // 10 minutes TTL
  );
}

function parseLeetCodeAPIResponse(username: string, data: any): LeetCodeData {
  const totalSolved = typeof data.totalSolved === 'number' ? data.totalSolved : 0;
  const easySolved = typeof data.easySolved === 'number' ? data.easySolved : 0;
  const mediumSolved = typeof data.mediumSolved === 'number' ? data.mediumSolved : 0;
  const hardSolved = typeof data.hardSolved === 'number' ? data.hardSolved : 0;

  const totalEasy = data.totalEasy || 958;
  const totalMedium = data.totalMedium || 2095;
  const totalHard = data.totalHard || 960;

  // Parse submission calendar
  let calendarObj: Record<string, number> = {};
  if (data.submissionCalendar) {
    try {
      calendarObj = typeof data.submissionCalendar === 'string'
        ? JSON.parse(data.submissionCalendar)
        : data.submissionCalendar;
    } catch (e) {
      console.warn('Failed to parse submissionCalendar JSON:', e);
    }
  }

  const activeDays = Object.keys(calendarObj).length;
  const streak = calculateStreak(calendarObj);

  // Extract AC submissions (123) and Total submissions (243) from matchedUserStats if present
  let totalSubmissions = 0;
  let acSubmissions = 0;

  if (data.matchedUserStats?.acSubmissionNum && data.matchedUserStats?.totalSubmissionNum) {
    const allAc = data.matchedUserStats.acSubmissionNum.find((s: any) => s.difficulty === 'All');
    const allTotal = data.matchedUserStats.totalSubmissionNum.find((s: any) => s.difficulty === 'All');

    if (allAc && typeof allAc.submissions === 'number' && allAc.submissions > 0) {
      acSubmissions = allAc.submissions;
    } else if (allAc && typeof allAc.count === 'number') {
      acSubmissions = allAc.count;
    }

    if (allTotal && typeof allTotal.submissions === 'number' && allTotal.submissions > 0) {
      totalSubmissions = allTotal.submissions;
    }
  } else if (Array.isArray(data.totalSubmissions)) {
    const allStat = data.totalSubmissions.find((s: any) => s.difficulty === 'All');
    if (allStat) {
      totalSubmissions = allStat.submissions || 0;
      acSubmissions = allStat.count || 0;
    }
  }

  const acceptanceRate = totalSubmissions > 0
    ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10
    : 0;

  let recentSubmissions: LeetCodeSubmission[] = [];
  if (Array.isArray(data.recentSubmissions)) {
    recentSubmissions = data.recentSubmissions.slice(0, 10).map((sub: any) => ({
      title: sub.title || 'Problem',
      titleSlug: sub.titleSlug || '',
      statusDisplay: sub.statusDisplay || 'Accepted',
      lang: sub.lang || 'cpp',
      timestamp: String(sub.timestamp || Math.floor(Date.now() / 1000)),
    }));
  }

  return {
    profile: {
      username,
      name: 'Raj Bhokare',
      avatarUrl: 'https://assets.leetcode.com/users/LzHyfJPCW5/avatar_1770200848.png',
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking: typeof data.ranking === 'number' ? data.ranking : 0,
      reputation: typeof data.reputation === 'number' ? data.reputation : 0,
      totalSolved,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      totalSubmissions,
      acSubmissions,
      acceptanceRate,
      contestRating: null,
      contestRanking: null,
      contestAttended: 0,
      currentStreak: streak,
      activeDays,
      submissionCalendar: calendarObj,
    },
    recentSubmissions,
    lastUpdated: Date.now(),
  };
}

function parseGraphQLResponse(username: string, data: any): LeetCodeData {
  const user = data.matchedUser;

  // Identity Check
  if (user.username && user.username.toLowerCase() !== 'rajbhokare') {
    throw new Error(`Identity verification error: expected user 'RajBhokare', received '${user.username}'.`);
  }

  const profile = user.profile || {};
  const contest = data.userContestRanking || null;
  const acStats = user.submitStats?.acSubmissionNum || [];
  const totalStats = user.submitStats?.totalSubmissionNum || [];
  const allCounts = data.allQuestionsCount || [];

  const getAcCount = (diff: string) => acStats.find((s: any) => s.difficulty === diff)?.count || 0;
  const getAcSubmissions = (diff: string) => acStats.find((s: any) => s.difficulty === diff)?.submissions || 0;
  const getTotalSubmissions = (diff: string) => totalStats.find((s: any) => s.difficulty === diff)?.submissions || 0;
  const getTotalCount = (diff: string) => allCounts.find((s: any) => s.difficulty === diff)?.count || 0;

  const totalSolved = getAcCount('All');
  const easySolved = getAcCount('Easy');
  const mediumSolved = getAcCount('Medium');
  const hardSolved = getAcCount('Hard');

  const totalEasy = getTotalCount('Easy') || 958;
  const totalMedium = getTotalCount('Medium') || 2095;
  const totalHard = getTotalCount('Hard') || 960;

  const acSubmissions = getAcSubmissions('All');
  const totalSubmissions = getTotalSubmissions('All');
  const acceptanceRate = totalSubmissions > 0 ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10 : 0;

  let calendarObj: Record<string, number> = {};
  if (user.submissionCalendar) {
    try {
      calendarObj = typeof user.submissionCalendar === 'string'
        ? JSON.parse(user.submissionCalendar)
        : user.submissionCalendar;
    } catch (e) {
      console.warn('Failed to parse LeetCode submissionCalendar JSON:', e);
    }
  }

  const activeDays = Object.keys(calendarObj).length;
  const streak = calculateStreak(calendarObj);

  const recentSubmissions: LeetCodeSubmission[] = (data.recentSubmissionList || []).map((sub: any) => ({
    title: sub.title,
    titleSlug: sub.titleSlug,
    statusDisplay: sub.statusDisplay,
    lang: sub.lang,
    timestamp: String(sub.timestamp),
  }));

  return {
    profile: {
      username: user.username || username,
      name: profile.realName || 'Raj Bhokare',
      avatarUrl: profile.userAvatar || 'https://assets.leetcode.com/users/LzHyfJPCW5/avatar_1770200848.png',
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking: profile.ranking || 0,
      reputation: profile.reputation || 0,
      totalSolved,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      totalSubmissions,
      acSubmissions,
      acceptanceRate,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestRanking: contest?.globalRanking || null,
      contestAttended: contest?.attendedContestsCount || 0,
      currentStreak: streak,
      activeDays,
      submissionCalendar: calendarObj,
    },
    recentSubmissions,
    lastUpdated: Date.now(),
  };
}

