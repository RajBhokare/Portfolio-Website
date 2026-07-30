export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const username = req.query?.username || 'RajBhokare';

  try {
    const ghRes = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const html = await ghRes.text();
    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    const days: Array<{ date: string; intensity: number; count: number; color: string }> = [];
    const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
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

    res.status(200).json({
      totalContributions,
      contributions: days,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch GitHub contributions' });
  }
}
