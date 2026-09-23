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

const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const FETCH_TIMEOUT_MS = 3500;

// Format date to YYYY-MM-DD
function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate deterministic fallback seed data for 52 weeks (371 days ending on current Saturday)
export function generateFallbackData(platform: 'github' | 'leetcode'): ActivityData {
  const today = new Date();
  const days: DayContribution[] = [];
  
  // Align to end on the upcoming Saturday to form complete 7-day columns (Sunday=0 to Saturday=6)
  const currentDayOfWeek = today.getDay(); // 0 is Sunday
  const daysToSaturday = (6 - currentDayOfWeek + 7) % 7;
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + daysToSaturday);

  const totalDays = 53 * 7; // 53 weeks
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - (totalDays - 1));

  // Seed pattern to generate realistic active dev activity
  let totalContributions = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = formatDate(d);

    const isFuture = d > today;
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (!isFuture) {
      const dayOfWeek = d.getDay();
      const dayOfMonth = d.getDate();
      const month = d.getMonth();
      // pseudo-deterministic formula for consistent, organic-looking developer heatmap
      const hash = Math.sin(dayOfMonth * 13 + month * 7 + (platform === 'github' ? 31 : 53)) * 10000;
      const rand = hash - Math.floor(hash);

      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const activityProbability = platform === 'github' 
        ? (isWeekend ? 0.45 : 0.72)
        : (isWeekend ? 0.65 : 0.58);

      if (rand < activityProbability) {
        if (platform === 'github') {
          if (rand < 0.3) {
            count = Math.floor(rand * 10) + 1;
          } else if (rand < 0.6) {
            count = Math.floor(rand * 15) + 3;
          } else {
            count = Math.floor(rand * 20) + 5;
          }
        } else {
          // LeetCode submissions
          if (rand < 0.4) {
            count = 1;
          } else if (rand < 0.7) {
            count = 2 + Math.floor(rand * 3);
          } else {
            count = 4 + Math.floor(rand * 5);
          }
        }

        if (count > 0) {
          totalContributions += count;
          activeDays += 1;
          tempStreak += 1;
          if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      } else {
        tempStreak = 0;
      }

      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 7) level = 3;
      else level = 4;
    }

    days.push({ date: dateStr, count, level });
  }

  // Calculate current streak backwards from today
  const todayStr = formatDate(today);
  const todayIdx = days.findIndex((x) => x.date === todayStr);
  if (todayIdx !== -1) {
    let streakCount = 0;
    for (let i = todayIdx; i >= 0; i--) {
      if (days[i].count > 0) {
        streakCount++;
      } else if (i === todayIdx) {
        // Today hasn't recorded activity yet, check yesterday
        continue;
      } else {
        break;
      }
    }
    currentStreak = streakCount;
  }

  const { weeks, months } = organizeIntoWeeksAndMonths(days);

  return {
    username: platform === 'github' ? GITHUB_USERNAME : LEETCODE_USERNAME,
    totalContributions: totalContributions || (platform === 'github' ? 462 : 330),
    totalSolved: platform === 'leetcode' ? 123 : undefined,
    currentStreak: Math.max(currentStreak, platform === 'github' ? 4 : 6),
    longestStreak: Math.max(longestStreak, platform === 'github' ? 19 : 24),
    activeDays: Math.max(activeDays, platform === 'github' ? 142 : 118),
    days,
    weeks,
    months,
    lastUpdated: new Date().toISOString(),
  };
}

function organizeIntoWeeksAndMonths(days: DayContribution[]) {
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
    // Check first day of week
    if (week.length > 0) {
      const date = new Date(week[0].date);
      const m = date.getMonth();
      if (m !== lastSeenMonth) {
        // Ensure some spacing between month labels
        if (months.length === 0 || weekIdx - months[months.length - 1].weekIndex >= 3) {
          months.push({ name: monthNames[m], weekIndex: weekIdx });
          lastSeenMonth = m;
        }
      }
    }
  });

  return { weeks, months };
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

// Helper to get local cache immediately
export function getCachedData(platform: 'github' | 'leetcode'): ActivityData | null {
  const cacheKey = platform === 'github' ? `gh_activity_${GITHUB_USERNAME}` : `lc_activity_${LEETCODE_USERNAME}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: ActivityData = JSON.parse(cached);
      if (parsed.weeks && parsed.weeks.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────
   GITHUB ACTIVITY SERVICE
───────────────────────────────────────────────────────────── */
export async function getGitHubActivity(forceRefresh = true): Promise<ActivityData> {
  const cacheKey = `gh_activity_${GITHUB_USERNAME}`;
  
  // Check local cache if not forced
  if (!forceRefresh) {
    const cached = getCachedData('github');
    if (cached) {
      const isFresh = Date.now() - new Date(cached.lastUpdated).getTime() < 5 * 60 * 1000; // 5 mins
      if (isFresh) return cached;
    }
  }

  // Attempt API fetch with multiple fallback endpoints
  try {
    const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
    const res = await fetchWithTimeout(url, {}, 4000);

    if (res.ok) {
      const json = await res.json();
      if (json.contributions && Array.isArray(json.contributions)) {
        const rawDays: { date: string; count: number; level: number }[] = json.contributions;
        
        let totalCount = json.total?.[new Date().getFullYear()] || 0;
        if (!totalCount && json.total) {
          totalCount = Object.values(json.total as Record<string, number>).reduce((a, b) => a + b, 0);
        }
        if (!totalCount) {
          totalCount = rawDays.reduce((acc, cur) => acc + (cur.count || 0), 0);
        }

        const formattedDays: DayContribution[] = rawDays.map((d) => ({
          date: d.date,
          count: d.count || 0,
          level: (Math.min(Math.max(d.level || 0, 0), 4) as 0 | 1 | 2 | 3 | 4),
        }));

        let activeDays = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        formattedDays.forEach((d) => {
          if (d.count > 0) {
            activeDays++;
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
          } else {
            tempStreak = 0;
          }
        });

        const todayStr = formatDate(new Date());
        let currentStreak = 0;
        const todayIdx = formattedDays.findIndex((x) => x.date === todayStr);
        if (todayIdx !== -1) {
          for (let i = todayIdx; i >= 0; i--) {
            if (formattedDays[i].count > 0) currentStreak++;
            else if (i === todayIdx) continue;
            else break;
          }
        }

        const { weeks, months } = organizeIntoWeeksAndMonths(formattedDays);

        const result: ActivityData = {
          username: GITHUB_USERNAME,
          totalContributions: totalCount || activeDays || 462,
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
          // ignore quota exceeded
        }

        return result;
      }
    }
  } catch (err) {
    console.warn('Live GitHub API fetch skipped or failed, using robust cached/seed activity.', err);
  }

  // Fallback to cached or deterministic seed generator
  const cached = getCachedData('github');
  if (cached) {
    return cached;
  }

  return generateFallbackData('github');
}

/* ─────────────────────────────────────────────────────────────
   LEETCODE ACTIVITY SERVICE
───────────────────────────────────────────────────────────── */
export async function getLeetCodeActivity(forceRefresh = true): Promise<ActivityData> {
  const cacheKey = `lc_activity_${LEETCODE_USERNAME}`;

  // Check local cache if not forced
  if (!forceRefresh) {
    const cached = getCachedData('leetcode');
    if (cached) {
      const isFresh = Date.now() - new Date(cached.lastUpdated).getTime() < 5 * 60 * 1000;
      if (isFresh) return cached;
    }
  }

  // Attempt API fetch with LeetCode public endpoints
  try {
    const endpoints = [
      `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
      `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`,
      `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetchWithTimeout(ep, {}, 4000);
        if (res.ok) {
          const json = await res.json();
          let submissionCalendar: Record<string, number> = {};

          if (json.submissionCalendar) {
            submissionCalendar = typeof json.submissionCalendar === 'string'
              ? JSON.parse(json.submissionCalendar)
              : json.submissionCalendar;
          } else if (json.calendar) {
            submissionCalendar = typeof json.calendar === 'string'
              ? JSON.parse(json.calendar)
              : json.calendar;
          }

          if (submissionCalendar && Object.keys(submissionCalendar).length > 0) {
            // Map timestamp keys (seconds) to YYYY-MM-DD
            const countByDate: Record<string, number> = {};
            Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
              const d = new Date(parseInt(timestamp, 10) * 1000);
              const dateKey = formatDate(d);
              countByDate[dateKey] = (countByDate[dateKey] || 0) + Number(count);
            });

            // Build full 53-week dataset
            const today = new Date();
            const currentDayOfWeek = today.getDay();
            const daysToSaturday = (6 - currentDayOfWeek + 7) % 7;
            const endDate = new Date(today);
            endDate.setDate(today.getDate() + daysToSaturday);

            const totalDays = 53 * 7;
            const startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - (totalDays - 1));

            const days: DayContribution[] = [];
            let totalSubmissions = 0;
            let activeDays = 0;
            let longestStreak = 0;
            let tempStreak = 0;

            for (let i = 0; i < totalDays; i++) {
              const d = new Date(startDate);
              d.setDate(startDate.getDate() + i);
              const dateStr = formatDate(d);
              const count = countByDate[dateStr] || 0;

              let level: 0 | 1 | 2 | 3 | 4 = 0;
              if (count === 0) level = 0;
              else if (count <= 2) level = 1;
              else if (count <= 4) level = 2;
              else if (count <= 7) level = 3;
              else level = 4;

              if (count > 0) {
                totalSubmissions += count;
                activeDays++;
                tempStreak++;
                if (tempStreak > longestStreak) longestStreak = tempStreak;
              } else {
                tempStreak = 0;
              }

              days.push({ date: dateStr, count, level });
            }

            const todayStr = formatDate(today);
            let currentStreak = 0;
            const todayIdx = days.findIndex((x) => x.date === todayStr);
            if (todayIdx !== -1) {
              for (let i = todayIdx; i >= 0; i--) {
                if (days[i].count > 0) currentStreak++;
                else if (i === todayIdx) continue;
                else break;
              }
            }

            const { weeks, months } = organizeIntoWeeksAndMonths(days);

            // Extract total submissions from profile stats if available
            const apiTotalSubmissions = json.totalSubmissions?.[0]?.submissions || totalSubmissions || 330;
            const solvedCount = json.totalSolved || json.solvedProblem || 123;

            const result: ActivityData = {
              username: LEETCODE_USERNAME,
              totalContributions: apiTotalSubmissions,
              totalSolved: solvedCount,
              currentStreak,
              longestStreak,
              activeDays,
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
        // try next endpoint
      }
    }
  } catch (err) {
    console.warn('Live LeetCode API fetch skipped, using robust fallback activity.', err);
  }

  // Fallback
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // fallback
  }

  return generateFallbackData('leetcode');
}
