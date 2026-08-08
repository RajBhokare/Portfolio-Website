export async function handler(event: any) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const username = event.queryStringParameters?.username || 'RajBhokare';

  if (username.toLowerCase() !== 'rajbhokare') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Identity verification failed: requested user must be RajBhokare' }),
    };
  }

  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const graphqlQuery = `
        query getContributions($username: String!) {
          user(login: $username) {
            login
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `;

      const ghRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'RajBhokare-Portfolio',
        },
        body: JSON.stringify({ query: graphqlQuery, variables: { username } }),
      });

      if (ghRes.ok) {
        const json = await ghRes.json();
        const user = json.data?.user;
        if (user && user.login.toLowerCase() === 'rajbhokare') {
          const calendar = user.contributionsCollection?.contributionCalendar;
          const days: Array<{ date: string; intensity: number; count: number; color: string }> = [];

          if (calendar?.weeks) {
            calendar.weeks.forEach((week: any) => {
              week.contributionDays?.forEach((d: any) => {
                const levelMap: Record<string, number> = {
                  NONE: 0,
                  FIRST_QUARTILE: 1,
                  SECOND_QUARTILE: 2,
                  THIRD_QUARTILE: 3,
                  FOURTH_QUARTILE: 4,
                };
                days.push({
                  date: d.date,
                  count: d.contributionCount || 0,
                  intensity: levelMap[d.contributionLevel] ?? (d.contributionCount > 0 ? 1 : 0),
                  color: '',
                });
              });
            });
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              username: user.login,
              totalContributions: calendar?.totalContributions || days.reduce((sum, d) => sum + d.count, 0),
              contributions: days,
            }),
          };
        }
      }
    } catch (err) {
      console.warn('GitHub GraphQL fetch failed in Netlify function:', err);
    }
  }

  try {
    const ghRes = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!ghRes.ok) {
      throw new Error(`GitHub HTML fetch failed with status: ${ghRes.status}`);
    }

    const html = await ghRes.text();
    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    const days: Array<{ date: string; intensity: number; count: number; color: string }> = [];
    const regex1 = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
    let match;
    while ((match = regex1.exec(html)) !== null) {
      const level = parseInt(match[2], 10);
      days.push({
        date: match[1],
        intensity: level,
        count: level > 0 ? (level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8) : 0,
        color: '',
      });
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        username: 'RajBhokare',
        totalContributions,
        contributions: days,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Failed to fetch GitHub contributions' }),
    };
  }
}
