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
  acceptanceRate: number; // percentage e.g. 51.1
  contestRating: number | null;
  contestRanking: number | null;
  contestAttended: number;
  currentStreak: number;
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

// Utility to calculate current consecutive streak from submission calendar
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

export function getFallbackLeetCodeData(username: string): LeetCodeData {
  const calendar: Record<string, number> = {
    "1770163200": 1, "1771545600": 8, "1771632000": 1, "1771718400": 2, "1771804800": 2,
    "1771891200": 4, "1771977600": 1, "1772236800": 1, "1772323200": 12, "1772409600": 1,
    "1772496000": 4, "1772582400": 1, "1772755200": 2, "1772841600": 3, "1773100800": 9,
    "1773360000": 1, "1773446400": 4, "1773619200": 2, "1773705600": 5, "1773792000": 2,
    "1773878400": 3, "1773964800": 1, "1774051200": 2, "1774137600": 3, "1774224000": 4,
    "1774310400": 5, "1774396800": 4, "1774483200": 2, "1774569600": 2, "1774656000": 3,
    "1774742400": 3, "1774828800": 2, "1774915200": 5, "1775606400": 2, "1775692800": 3,
    "1777507200": 5, "1777593600": 3, "1777680000": 3, "1777766400": 2, "1777852800": 4,
    "1777939200": 3, "1778112000": 5, "1778198400": 1, "1778284800": 1, "1778371200": 3,
    "1778457600": 3, "1778544000": 1, "1778716800": 2, "1778803200": 1, "1778889600": 1,
    "1779062400": 2, "1779148800": 2, "1779235200": 2, "1780272000": 1, "1780358400": 2,
    "1780617600": 1, "1780704000": 2, "1780790400": 1, "1780876800": 3, "1781049600": 2,
    "1781222400": 1, "1781308800": 2, "1781395200": 1, "1781481600": 1, "1781568000": 1,
    "1781654400": 1, "1781913600": 2, "1782086400": 1, "1782172800": 1, "1782259200": 2,
    "1782432000": 2, "1783123200": 1, "1783555200": 1, "1783641600": 5, "1783728000": 3,
    "1783814400": 2, "1783900800": 1, "1783987200": 1, "1784073600": 1, "1784160000": 2,
    "1784246400": 1, "1784332800": 3, "1784419200": 2, "1784505600": 1, "1784678400": 1,
    "1784764800": 3, "1785024000": 3, "1785110400": 2, "1785196800": 1, "1785283200": 2,
    "1785369600": 4, "1785456000": 3, "1785542400": 4, "1785628800": 2, "1785715200": 1,
    "1785801600": 1, "1785888000": 1
  };

  const currentStreak = calculateStreak(calendar) || 16;

  const profile: LeetCodeProfile = {
    username,
    name: 'Raj Bhokare',
    avatarUrl: 'https://assets.leetcode.com/users/LzHyfJPCW5/avatar_1770200848.png',
    profileUrl: `https://leetcode.com/u/${username}/`,
    ranking: 2155404,
    reputation: 0,
    totalSolved: 69,
    easySolved: 51,
    totalEasy: 958,
    mediumSolved: 18,
    totalMedium: 2095,
    hardSolved: 0,
    totalHard: 960,
    totalSubmissions: 233,
    acSubmissions: 119,
    acceptanceRate: 51.1,
    contestRating: null,
    contestRanking: null,
    contestAttended: 0,
    currentStreak,
    submissionCalendar: calendar,
  };

  const recentSubmissions: LeetCodeSubmission[] = [
    {
      title: 'Digit Frequency Score',
      titleSlug: 'digit-frequency-score',
      statusDisplay: 'Accepted',
      lang: 'cpp',
      timestamp: String(Math.floor(Date.now() / 1000) - 3600 * 2),
    },
    {
      title: 'Minimum Operations to Make Array Sum Divisible by K',
      titleSlug: 'minimum-operations-to-make-array-sum-divisible-by-k',
      statusDisplay: 'Accepted',
      lang: 'cpp',
      timestamp: String(Math.floor(Date.now() / 1000) - 3600 * 24),
    },
    {
      title: "Pascal's Triangle",
      titleSlug: 'pascals-triangle',
      statusDisplay: 'Accepted',
      lang: 'cpp',
      timestamp: String(Math.floor(Date.now() / 1000) - 3600 * 48),
    },
  ];

  return { profile, recentSubmissions, isFallback: true };
}

export async function fetchLeetCodeData(forceRefresh = false): Promise<LeetCodeData> {
  const username = config.leetcodeUsername || 'RajBhokare';

  if (forceRefresh) {
    try {
      localStorage.removeItem(`portfolio_cache_leetcode_${username}_v7`);
    } catch (e) {}
  }

  return fetchWithCache(
    `leetcode_${username}_v7`,
    async () => {
      const fallbackObj = getFallbackLeetCodeData(username);

      // 1. Primary: Try Vercel LeetCode API (Fastest, zero-cold-start CORS live endpoint)
      try {
        const vercelRes = await fetchWithTimeout(
          `https://leetcode-api-faisalshohag.vercel.app/${username}`,
          {},
          8000
        );

        if (vercelRes.ok) {
          const json = await vercelRes.json();
          if (json && (json.totalSolved !== undefined || json.ranking || json.totalEasy)) {
            return parseAlfaResponse(username, json, fallbackObj);
          }
        }
      } catch (err) {
        console.warn('Vercel LeetCode API failed/timed out, trying Render endpoint:', err);
      }

      // 2. Secondary: Try Alfa LeetCode API on Render
      try {
        const alfaRes = await fetchWithTimeout(
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
          {},
          8000
        );

        if (alfaRes.ok) {
          const alfaJson = await alfaRes.json();
          if (alfaJson && (alfaJson.totalSolved !== undefined || alfaJson.ranking || alfaJson.username)) {
            return parseAlfaResponse(username, alfaJson, fallbackObj);
          }
        }
      } catch (err) {
        console.warn('Alfa LeetCode API /userProfile timed out or failed:', err);
      }

      // 3. Tertiary: Try local proxy / Netlify GraphQL function
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
          recentSubmissionList(username: $username, limit: 8) {
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
        ).catch(() => null);

        if (proxyRes && proxyRes.ok) {
          const json = await proxyRes.json();
          if (json.data && json.data.matchedUser) {
            return parseGraphQLResponse(username, json.data);
          }
        }
      } catch (err) {
        console.warn('LeetCode GraphQL proxy failed:', err);
      }

      // Fallback Return
      return fallbackObj;
    },
    15 * 60 * 1000,
    (res) => !!res.isFallback
  );
}

function parseAlfaResponse(username: string, data: any, fallbackObj: LeetCodeData): LeetCodeData {
  const totalSolved = data.totalSolved ?? fallbackObj.profile.totalSolved;
  const easySolved = data.easySolved ?? fallbackObj.profile.easySolved;
  const mediumSolved = data.mediumSolved ?? fallbackObj.profile.mediumSolved;
  const hardSolved = data.hardSolved ?? fallbackObj.profile.hardSolved;

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
      console.warn('Failed to parse submissionCalendar in API response:', e);
    }
  }

  if (Object.keys(calendarObj).length === 0) {
    calendarObj = fallbackObj.profile.submissionCalendar;
  }

  const streak = calculateStreak(calendarObj) || fallbackObj.profile.currentStreak;

  // Extract AC submissions and Total submissions
  let totalSubmissions = fallbackObj.profile.totalSubmissions;
  let acSubmissions = fallbackObj.profile.acSubmissions;

  if (Array.isArray(data.matchedUserStats?.acSubmissionNum)) {
    const allAc = data.matchedUserStats.acSubmissionNum.find((s: any) => s.difficulty === 'All');
    if (allAc) acSubmissions = allAc.submissions || acSubmissions;
  } else if (Array.isArray(data.totalSubmissions)) {
    const allAc = data.totalSubmissions.find((s: any) => s.difficulty === 'All');
    if (allAc) acSubmissions = allAc.count || allAc.submissions || acSubmissions;
  }

  if (Array.isArray(data.totalSubmissions)) {
    const allStat = data.totalSubmissions.find((s: any) => s.difficulty === 'All');
    if (allStat) totalSubmissions = allStat.submissions || allStat.count || totalSubmissions;
  }

  const acceptanceRate = totalSubmissions > 0
    ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10
    : fallbackObj.profile.acceptanceRate;

  let recentSubmissions: LeetCodeSubmission[] = [];
  if (Array.isArray(data.recentSubmissions) && data.recentSubmissions.length > 0) {
    recentSubmissions = data.recentSubmissions.slice(0, 8).map((sub: any) => ({
      title: sub.title,
      titleSlug: sub.titleSlug,
      statusDisplay: sub.statusDisplay,
      lang: sub.lang,
      timestamp: sub.timestamp,
    }));
  }

  return {
    profile: {
      username,
      name: 'Raj Bhokare',
      avatarUrl: fallbackObj.profile.avatarUrl,
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking: data.ranking || fallbackObj.profile.ranking,
      reputation: data.reputation || fallbackObj.profile.reputation,
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
      contestRating: fallbackObj.profile.contestRating,
      contestRanking: fallbackObj.profile.contestRanking,
      contestAttended: fallbackObj.profile.contestAttended,
      currentStreak: streak,
      submissionCalendar: calendarObj,
    },
    recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : fallbackObj.recentSubmissions,
    isFallback: false,
  };
}

function parseGraphQLResponse(username: string, data: any): LeetCodeData {
  const user = data.matchedUser;
  const profile = user.profile || {};
  const contest = data.userContestRanking || null;
  const acStats = user.submitStats?.acSubmissionNum || [];
  const totalStats = user.submitStats?.totalSubmissionNum || [];
  const allCounts = data.allQuestionsCount || [];

  const getAc = (diff: string) => acStats.find((s: any) => s.difficulty === diff)?.count || 0;
  const getTotalAcSubmissions = () => acStats.find((s: any) => s.difficulty === 'All')?.submissions || 0;
  const getTotalSubmissions = () => totalStats.find((s: any) => s.difficulty === 'All')?.submissions || 0;
  const getTotalCount = (diff: string) => allCounts.find((s: any) => s.difficulty === diff)?.count || 0;

  const totalSolved = getAc('All');
  const easySolved = getAc('Easy');
  const mediumSolved = getAc('Medium');
  const hardSolved = getAc('Hard');

  const totalEasy = getTotalCount('Easy') || 958;
  const totalMedium = getTotalCount('Medium') || 2095;
  const totalHard = getTotalCount('Hard') || 960;

  const acSubmissions = getTotalAcSubmissions();
  const totalSubmissions = getTotalSubmissions();
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

  const fallback = getFallbackLeetCodeData(username);

  if (Object.keys(calendarObj).length === 0) {
    calendarObj = fallback.profile.submissionCalendar;
  }

  const streak = calculateStreak(calendarObj) || fallback.profile.currentStreak;

  const recentSubmissions: LeetCodeSubmission[] = (data.recentSubmissionList || []).map((sub: any) => ({
    title: sub.title,
    titleSlug: sub.titleSlug,
    statusDisplay: sub.statusDisplay,
    lang: sub.lang,
    timestamp: sub.timestamp,
  }));

  return {
    profile: {
      username: user.username || username,
      name: profile.realName || 'Raj Bhokare',
      avatarUrl: profile.userAvatar || fallback.profile.avatarUrl,
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking: profile.ranking || fallback.profile.ranking,
      reputation: profile.reputation || fallback.profile.reputation,
      totalSolved: totalSolved || fallback.profile.totalSolved,
      easySolved: easySolved || fallback.profile.easySolved,
      totalEasy,
      mediumSolved: mediumSolved || fallback.profile.mediumSolved,
      totalMedium,
      hardSolved: hardSolved || fallback.profile.hardSolved,
      totalHard,
      totalSubmissions,
      acSubmissions,
      acceptanceRate: acceptanceRate || fallback.profile.acceptanceRate,
      contestRating: contest?.rating ? Math.round(contest.rating) : fallback.profile.contestRating,
      contestRanking: contest?.globalRanking || fallback.profile.contestRanking,
      contestAttended: contest?.attendedContestsCount || fallback.profile.contestAttended,
      currentStreak: streak,
      submissionCalendar: calendarObj,
    },
    recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : fallback.recentSubmissions,
    isFallback: false,
  };
}
