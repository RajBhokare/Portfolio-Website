import {
  REAL_GITHUB_SNAPSHOT,
  REAL_LEETCODE_SNAPSHOT,
  PlatformSnapshot,
} from '../data/activitySnapshot';

export interface DayContribution {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ActivityData {
  username: string;
  totalContributions: number;
  totalSolved?: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  days: DayContribution[];
  weeks: DayContribution[][];
  months: { name: string; weekIndex: number }[];
  lastUpdated: string;
}

const GITHUB_USERNAME = 'RajBhokare';
const LEETCODE_USERNAME = 'Rajbhokare';
const DATA_VERSION = 'v2_authentic';

const FETCH_TIMEOUT_MS = 5000;

// Format date to YYYY-MM-DD
export function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function organizeIntoWeeksAndMonths(days: DayContribution[]) {
  const weeks: DayContribution[][] = [];
  let currentWeek: DayContribution[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months: { name: string; weekIndex: number }[] = [];
  let lastSeenMonth = -1;

  weeks.forEach((week, weekIdx) => {
    if (week.length > 0) {
      const date = new Date(week[0].date);
      const m = date.getMonth();
      if (m !== lastSeenMonth) {
        if (months.length === 0 || weekIdx - months[months.length - 1].weekIndex >= 3) {
          months.push({ name: monthNames[m], weekIndex: weekIdx });
          lastSeenMonth = m;
        }
      }
    }
  });

  return { weeks, months };
}

// Convert genuine static snapshot into full ActivityData
export function getBaselineData(platform: 'github' | 'leetcode'): ActivityData {
  const snapshot: PlatformSnapshot =
    platform === 'github' ? REAL_GITHUB_SNAPSHOT : REAL_LEETCODE_SNAPSHOT;

  const { weeks, months } = organizeIntoWeeksAndMonths(snapshot.days);

  return {
    username: snapshot.username,
    totalContributions: snapshot.totalContributions,
    totalSolved: snapshot.totalSolved,
    currentStreak: snapshot.currentStreak,
    longestStreak: snapshot.longestStreak,
    activeDays: snapshot.activeDays,
    days: snapshot.days,
    weeks,
    months,
    lastUpdated: snapshot.lastUpdated,
  };
}

// Alias for backwards compatibility
export function generateFallbackData(platform: 'github' | 'leetcode'): ActivityData {
  return getBaselineData(platform);
}

// Fetch with strict timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Helper to get local cache immediately (with invalidation for old fake data)
export function getCachedData(platform: 'github' | 'leetcode'): ActivityData | null {
  const cacheKey = `${platform}_activity_${platform === 'github' ? GITHUB_USERNAME : LEETCODE_USERNAME}_${DATA_VERSION}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: ActivityData = JSON.parse(cached);
      // Ensure it's authentic and not corrupted or obsolete
      if (parsed.weeks && parsed.weeks.length > 0) {
        if (platform === 'leetcode' && parsed.totalSolved === 123) {
          localStorage.removeItem(cacheKey);
          return null;
        }
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────
   GITHUB ACTIVITY SERVICE (Authentic Real Data Only)
───────────────────────────────────────────────────────────── */
export async function getGitHubActivity(forceRefresh = true): Promise<ActivityData> {
  const cacheKey = `github_activity_${GITHUB_USERNAME}_${DATA_VERSION}`;

  if (!forceRefresh) {
    const cached = getCachedData('github');
    if (cached) return cached;
  }

  try {
    const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
    const res = await fetchWithTimeout(url, {}, 5000);

    if (res.ok) {
      const json = await res.json();
      if (json.contributions && Array.isArray(json.contributions)) {
        const rawDays: { date: string; count: number; level: number }[] = json.contributions;

        let totalCount = 0;
        let activeDays = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        const formattedDays: DayContribution[] = rawDays.map((d) => {
          const count = d.count || 0;
          totalCount += count;
          const level = Math.min(Math.max(d.level || 0, 0), 4) as 0 | 1 | 2 | 3 | 4;

          if (count > 0) {
            activeDays++;
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
          } else {
            tempStreak = 0;
          }

          return {
            date: d.date,
            count,
            level,
          };
        });

        // Calculate current streak
        let currentStreak = 0;
        for (let i = formattedDays.length - 1; i >= 0; i--) {
          if (formattedDays[i].count > 0) {
            currentStreak++;
          } else if (i === formattedDays.length - 1) {
            // Today has 0 commits yet, check yesterday
            continue;
          } else {
            break;
          }
        }

        const { weeks, months } = organizeIntoWeeksAndMonths(formattedDays);

        const result: ActivityData = {
          username: GITHUB_USERNAME,
          totalContributions: totalCount,
          currentStreak,
          longestStreak,
          activeDays,
          days: formattedDays,
          weeks,
          months,
          lastUpdated: new Date().toISOString(),
        };

        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch {
          // ignore
        }

        return result;
      }
    }
  } catch (err) {
    console.warn('Live GitHub API fetch failed or offline, using verified authentic snapshot.', err);
  }

  const cached = getCachedData('github');
  if (cached) return cached;

  return getBaselineData('github');
}

/* ─────────────────────────────────────────────────────────────
   LEETCODE ACTIVITY SERVICE (Authentic Real Data Only)
───────────────────────────────────────────────────────────── */
export async function getLeetCodeActivity(forceRefresh = true): Promise<ActivityData> {
  const cacheKey = `leetcode_activity_${LEETCODE_USERNAME}_${DATA_VERSION}`;

  if (!forceRefresh) {
    const cached = getCachedData('leetcode');
    if (cached) return cached;
  }

  // Primary and fallback real endpoints for LeetCode
  const endpoints = [
    `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`,
    `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetchWithTimeout(ep, {}, 6000);
      if (res.ok) {
        const json = await res.json();
        let submissionCalendar: Record<string, number> = {};

        if (json.submissionCalendar) {
          submissionCalendar =
            typeof json.submissionCalendar === 'string'
              ? JSON.parse(json.submissionCalendar)
              : json.submissionCalendar;
        } else if (json.calendar) {
          submissionCalendar =
            typeof json.calendar === 'string'
              ? JSON.parse(json.calendar)
              : json.calendar;
        }

        if (submissionCalendar && Object.keys(submissionCalendar).length > 0) {
          // Map timestamps to YYYY-MM-DD counts
          const countByDate: Record<string, number> = {};
          Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
            const d = new Date(parseInt(timestamp, 10) * 1000);
            const dateKey = formatDate(d);
            countByDate[dateKey] = (countByDate[dateKey] || 0) + Number(count);
          });

          // Use authentic dates aligned to 53 weeks
          const baseDays = REAL_GITHUB_SNAPSHOT.days;
          const days: DayContribution[] = [];
          let totalSubmissions = 0;
          let activeDays = 0;
          let longestStreak = 0;
          let tempStreak = 0;

          baseDays.forEach((bd) => {
            const dateStr = bd.date;
            const count = countByDate[dateStr] || 0;
            totalSubmissions += count;

            let level: 0 | 1 | 2 | 3 | 4 = 0;
            if (count === 0) level = 0;
            else if (count <= 2) level = 1;
            else if (count <= 4) level = 2;
            else if (count <= 7) level = 3;
            else level = 4;

            if (count > 0) {
              activeDays++;
              tempStreak++;
              if (tempStreak > longestStreak) longestStreak = tempStreak;
            } else {
              tempStreak = 0;
            }

            days.push({ date: dateStr, count, level });
          });

          // Calculate current streak
          let currentStreak = 0;
          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].count > 0) {
              currentStreak++;
            } else if (i === days.length - 1) {
              continue;
            } else {
              break;
            }
          }

          const { weeks, months } = organizeIntoWeeksAndMonths(days);

          const totalSolved =
            json.totalSolved ||
            (Array.isArray(json.submitStatsGlobal?.acSubmissionNum)
              ? json.submitStatsGlobal.acSubmissionNum.find(
                  (x: { difficulty: string; count: number }) => x.difficulty === 'All'
                )?.count
              : 136) ||
            136;

          const totalAllSubmissions =
            (Array.isArray(json.totalSubmissions)
              ? json.totalSubmissions.find(
                  (x: { difficulty: string; submissions: number }) => x.difficulty === 'All'
                )?.submissions
              : null) ||
            totalSubmissions ||
            354;

          const result: ActivityData = {
            username: LEETCODE_USERNAME,
            totalContributions: totalAllSubmissions,
            totalSolved,
            currentStreak,
            longestStreak,
            activeDays: activeDays || 159,
            days,
            weeks,
            months,
            lastUpdated: new Date().toISOString(),
          };

          try {
            localStorage.setItem(cacheKey, JSON.stringify(result));
          } catch {
            // ignore
          }

          return result;
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  const cached = getCachedData('leetcode');
  if (cached) return cached;

  return getBaselineData('leetcode');
}
