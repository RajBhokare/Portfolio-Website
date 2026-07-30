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
  acceptanceRate: number; // percentage e.g. 58.2
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
}

// Utility to calculate current consecutive streak from submission calendar
function calculateStreak(submissionCalendar: Record<string, number>): number {
  if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
    return 0;
  }

  // Convert timestamps to date strings (YYYY-MM-DD) in local time
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

  // Check today, yesterday, and go backward day by day
  let checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const toDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  let checkStr = toDateStr(checkDate);

  // If today has no submission, check if yesterday had one to continue streak
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

export async function fetchLeetCodeData(): Promise<LeetCodeData> {
  const username = config.leetcodeUsername;

  return fetchWithCache(`leetcode_${username}`, async () => {
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
      // Primary: Call serverless/dev proxy endpoint
      const proxyRes = await fetch('/api/leetcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphqlQuery, variables: { username } }),
      });

      if (proxyRes.ok) {
        const json = await proxyRes.json();
        if (json.data && json.data.matchedUser) {
          return parseGraphQLResponse(username, json.data);
        }
      }
    } catch (err) {
      console.warn('LeetCode proxy endpoint failed, attempting fallback microservice:', err);
    }

    // Fallback: Use Alfa LeetCode public API
    const fallbackRes = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
    if (!fallbackRes.ok) {
      throw new Error(`LeetCode API error: ${fallbackRes.statusText} (${fallbackRes.status})`);
    }

    const fallbackJson = await fallbackRes.json();
    return parseFallbackResponse(username, fallbackJson);
  });
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

  const totalEasy = getTotalCount('Easy') || 800;
  const totalMedium = getTotalCount('Medium') || 1700;
  const totalHard = getTotalCount('Hard') || 800;

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

  const streak = calculateStreak(calendarObj);

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
      name: profile.realName || username,
      avatarUrl: profile.userAvatar || '',
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
      submissionCalendar: calendarObj,
    },
    recentSubmissions,
  };
}

function parseFallbackResponse(username: string, data: any): LeetCodeData {
  const totalSolved = data.totalSolved || 0;
  const easySolved = data.easySolved || 0;
  const mediumSolved = data.mediumSolved || 0;
  const hardSolved = data.hardSolved || 0;

  const totalEasy = data.totalEasy || 950;
  const totalMedium = data.totalMedium || 2000;
  const totalHard = data.totalHard || 900;

  const calendarObj = data.submissionCalendar || {};
  const streak = calculateStreak(calendarObj);

  // Compute total & ac submissions if available
  let totalSubmissions = 0;
  let acSubmissions = 0;
  if (Array.isArray(data.totalSubmissions)) {
    const allStat = data.totalSubmissions.find((s: any) => s.difficulty === 'All');
    if (allStat) totalSubmissions = allStat.submissions || 0;
  }
  if (Array.isArray(data.matchedUserStats?.acSubmissionNum)) {
    const allAc = data.matchedUserStats.acSubmissionNum.find((s: any) => s.difficulty === 'All');
    if (allAc) acSubmissions = allAc.submissions || 0;
  }

  const acceptanceRate = totalSubmissions > 0 ? Math.round((acSubmissions / totalSubmissions) * 1000) / 10 : 0;

  return {
    profile: {
      username,
      name: username,
      avatarUrl: '',
      profileUrl: `https://leetcode.com/u/${username}/`,
      ranking: data.ranking || 0,
      reputation: data.reputation || 0,
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
      submissionCalendar: calendarObj,
    },
    recentSubmissions: [],
  };
}
