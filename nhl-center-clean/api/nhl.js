
export default async function handler(req, res) {
  const type = String(req.query.type || '');
  const date = String(req.query.date || 'now');

  const seasonStart = new Date().getMonth() >= 9
    ? new Date().getFullYear()
    : new Date().getFullYear() - 1;

  const seasonId = `${seasonStart}${seasonStart + 1}`;
  let url;

  if (type === 'score') {
    if (!/^(now|\d{4}-\d{2}-\d{2})$/.test(date)) {
      return res.status(400).json({ error: 'Virheellinen päivämäärä' });
    }
    url = `https://api-web.nhle.com/v1/score/${date}`;

  } else if (type === 'points' || type === 'goals') {
    url = `https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=${type}&limit=10`;

  } else if (type === 'standings') {
    url = 'https://api-web.nhle.com/v1/standings/now';

  } else if (type === 'finns') {
    const params = new URLSearchParams({
      isAggregate: 'false',
      isGame: 'false',
      limit: '100',
      sort: 'points',
      cayenneExp: `gameTypeId=2 and seasonId=${seasonId} and nationalityCode='FIN'`
    });

    url = `https://api.nhle.com/stats/rest/en/sk skater/summary?${params.toString()}`
      .replace('/sk skater/', '/skater/');

  } else if (type === 'boxscore' || type === 'plays') {
    const gameId = String(req.query.gameId || '');

    if (!/^\d{10}$/.test(gameId)) {
      return res.status(400).json({ error: 'Virheellinen ottelutunnus' });
    }

    const endpoint = type === 'boxscore' ? 'boxscore' : 'play-by-play';
    url = `https://api-web.nhle.com/v1/gamecenter/${gameId}/${endpoint}`;

  } else {
    return res.status(400).json({ error: 'Tuntematon tietotyyppi' });
  }

  try {
    const upstream = await fetch(url, {
      headers: { Accept: 'application/json' }
    });

    const body = await upstream.text();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: 'NHL-palvelu palautti virheen',
        upstreamStatus: upstream.status,
        details: body.slice(0, 400)
      });
    }

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    return res.status(200).send(body);

  } catch (e) {
    return res.status(502).json({
      error: 'Yhteys NHL-palveluun epäonnistui',
      details: e.message
    });
  }
}

