import json
import os
from datetime import datetime

with open('scripts/raw_activity_snapshot.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# Process GitHub
gh_contribs = raw['github']['contributions']
gh_days = []
gh_active_days = 0
gh_longest_streak = 0
gh_temp_streak = 0
gh_total = 0

for c in gh_contribs:
    cnt = c['count']
    lvl = c['level']
    gh_total += cnt
    if cnt > 0:
        gh_active_days += 1
        gh_temp_streak += 1
        if gh_temp_streak > gh_longest_streak:
            gh_longest_streak = gh_temp_streak
    else:
        gh_temp_streak = 0
    gh_days.append({'date': c['date'], 'count': cnt, 'level': lvl})

gh_current_streak = 0
for i in range(len(gh_days) - 1, -1, -1):
    if gh_days[i]['count'] > 0:
        gh_current_streak += 1
    elif i == len(gh_days) - 1:
        continue
    else:
        break

# Process LeetCode
lc_cal = raw['leetcode']['submissionCalendar']
if isinstance(lc_cal, str):
    lc_cal = json.loads(lc_cal)

lc_date_counts = {}
for ts, count in lc_cal.items():
    dt = datetime.fromtimestamp(int(ts))
    lc_date_counts[dt.strftime('%Y-%m-%d')] = count

lc_days = []
lc_active_days = 0
lc_longest_streak = 0
lc_temp_streak = 0
lc_total_sub = 0

for c in gh_contribs:
    d_str = c['date']
    cnt = lc_date_counts.get(d_str, 0)
    lc_total_sub += cnt
    if cnt == 0:
        lvl = 0
    elif cnt <= 2:
        lvl = 1
    elif cnt <= 4:
        lvl = 2
    elif cnt <= 7:
        lvl = 3
    else:
        lvl = 4

    if cnt > 0:
        lc_active_days += 1
        lc_temp_streak += 1
        if lc_temp_streak > lc_longest_streak:
            lc_longest_streak = lc_temp_streak
    else:
        lc_temp_streak = 0

    lc_days.append({'date': d_str, 'count': cnt, 'level': lvl})

lc_current_streak = 0
for i in range(len(lc_days) - 1, -1, -1):
    if lc_days[i]['count'] > 0:
        lc_current_streak += 1
    elif i == len(lc_days) - 1:
        continue
    else:
        break

snapshot_gh = {
    'username': 'RajBhokare',
    'totalContributions': gh_total,
    'currentStreak': gh_current_streak,
    'longestStreak': gh_longest_streak,
    'activeDays': gh_active_days,
    'days': gh_days,
    'lastUpdated': datetime.utcnow().isoformat() + 'Z'
}

snapshot_lc = {
    'username': 'Rajbhokare',
    'totalContributions': lc_total_sub,
    'totalSolved': 136,
    'currentStreak': lc_current_streak,
    'longestStreak': lc_longest_streak,
    'activeDays': lc_active_days,
    'days': lc_days,
    'lastUpdated': datetime.utcnow().isoformat() + 'Z'
}

os.makedirs('src/data', exist_ok=True)
with open('src/data/activitySnapshot.ts', 'w', encoding='utf-8') as f:
    f.write('// Authentic snapshot of real GitHub & LeetCode activity (Never random)\n')
    f.write('export interface SnapshotDay {\n  date: string;\n  count: number;\n  level: 0 | 1 | 2 | 3 | 4;\n}\n\n')
    f.write('export interface PlatformSnapshot {\n  username: string;\n  totalContributions: number;\n  totalSolved?: number;\n  currentStreak: number;\n  longestStreak: number;\n  activeDays: number;\n  days: SnapshotDay[];\n  lastUpdated: string;\n}\n\n')
    f.write('export const REAL_GITHUB_SNAPSHOT: PlatformSnapshot = ' + json.dumps(snapshot_gh, indent=2) + ';\n\n')
    f.write('export const REAL_LEETCODE_SNAPSHOT: PlatformSnapshot = ' + json.dumps(snapshot_lc, indent=2) + ';\n')

print('Generated src/data/activitySnapshot.ts successfully!')
