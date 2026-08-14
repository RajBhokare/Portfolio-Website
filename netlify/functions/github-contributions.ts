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

const levelMap: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function response(statusCode: number, body: unknown) {
  return { statusCode, headers, body: JSON.stringify(body) };
}

function describeEvent(ev: any): string {
  if (ev.type === 'PushEvent') {
    const firstCommit = ev.payload?.commits?.[0]?.message;
    return firstCommit ? `Pushed commit: "${String(firstCommit).slice(0, 60)}"` : `Pushed ${ev.payload?.commits?.length || 1} commit(s)`;
  }
  if (ev.type === 'CreateEvent') return `Created ${ev.payload?.ref_type || 'repository'}`;
  if (ev.type === 'WatchEvent') return 'Starred repository';
  if (ev.type === 'PullRequestEvent') return `${ev.payload?.action || 'Updated'} pull request #${ev.payload?.number || ''}`.trim();
  if (ev.type === 'IssuesEvent') return `${ev.payload?.action || 'Updated'} issue #${ev.payload?.issue?.number || ''}`.trim();
  if (ev.type === 'ForkEvent') return 'Forked repository';
  return 'Activity on repository';
}

async function fetchGitHubActivity() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is required for the GitHub contribution calendar.');
  }

  const query = `
    query PortfolioGitHubActivity($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        url
        bio
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
          nodes { stargazerCount }
        }
        followers { totalCount }
        following { totalCount }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  const graphRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'RajBhokare-Portfolio',
    },
    body: JSON.stringify({ query, variables: { username: USERNAME } }),
  });

  const graphJson = await graphRes.json();
  if (!graphRes.ok || graphJson.errors?.length) {
    throw new Error(graphJson.errors?.[0]?.message || `GitHub GraphQL failed with status ${graphRes.status}`);
  }

  const user = graphJson.data?.user;
  if (!user || String(user.login).toLowerCase() !== USERNAME.toLowerCase()) {
    throw new Error(`GitHub identity verification failed: expected ${USERNAME}, received ${user?.login || 'unknown'}.`);
  }

  const calendar = user.contributionsCollection?.contributionCalendar;
  if (!calendar || !Array.isArray(calendar.weeks)) {
    throw new Error('GitHub contribution calendar missing from GraphQL response.');
  }

  const contributions = calendar.weeks.flatMap((week: any) =>
    (Array.isArray(week.contributionDays) ? week.contributionDays : []).map((day: any) => ({
      date: String(day.date),
      count: Number(day.contributionCount || 0),
      color: String(day.color || ''),
      intensity: levelMap[String(day.contributionLevel)] ?? 0,
      level: String(day.contributionLevel || 'NONE'),
    }))
  );

  const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=8`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'RajBhokare-Portfolio',
      Accept: 'application/vnd.github+json',
    },
  }).catch(() => null);

  const eventsJson = eventsRes && eventsRes.ok ? await eventsRes.json() : [];
  const events = Array.isArray(eventsJson)
    ? eventsJson.map((ev: any, idx: number) => {
        const repoName = String(ev.repo?.name || 'repository');
        return {
          id: String(ev.id || `${repoName}-${idx}`),
          type: String(ev.type || 'Event'),
          repoName,
          repoUrl: `https://github.com/${repoName}`,
          createdAt: String(ev.created_at || new Date().toISOString()),
          description: describeEvent(ev),
        };
      })
    : [];

  const totalStars = Array.isArray(user.repositories?.nodes)
    ? user.repositories.nodes.reduce((sum: number, repo: any) => sum + Number(repo?.stargazerCount || 0), 0)
    : 0;

  return {
    username: user.login,
    profile: {
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl || '',
      profileUrl: user.url || `https://github.com/${USERNAME}`,
      bio: user.bio || null,
      publicRepos: Number(user.repositories?.totalCount || 0),
      followers: Number(user.followers?.totalCount || 0),
      following: Number(user.following?.totalCount || 0),
      totalStars,
    },
    events,
    contributions: {
      totalContributions: Number(calendar.totalContributions || 0),
      contributions,
    },
    lastUpdated: Date.now(),
    source: 'github-graphql',
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
    const data = await fetchGitHubActivity();
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return response(200, data);
  } catch (err: any) {
    return response(503, { error: err.message || 'GitHub activity unavailable' });
  }
}
