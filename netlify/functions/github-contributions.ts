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

    const regex2 = /data-level="(\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
    while ((match = regex2.exec(html)) !== null) {
      if (!days.some((d) => d.date === match[2])) {
        const level = parseInt(match[1], 10);
        days.push({
          date: match[2],
          intensity: level,
          count: level > 0 ? (level === 1 ? 1 : level === 2 ? 3 : level === 3 ? 5 : 8) : 0,
          color: '',
        });
      }
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
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
