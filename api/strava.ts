import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return res.status(500).json({ error: 'Strava credentials not configured' })
  }

  // Exchange refresh token for a fresh access token (Strava tokens expire after 6h)
  const tokenRes = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })

  if (!tokenRes.ok) {
    return res.status(502).json({ error: 'Failed to refresh Strava token' })
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string }

  // Fetch the 10 most recent activities
  const activitiesRes = await fetch(
    'https://www.strava.com/api/v3/athlete/activities?per_page=10',
    { headers: { Authorization: `Bearer ${access_token}` } }
  )

  if (!activitiesRes.ok) {
    return res.status(502).json({ error: 'Failed to fetch Strava activities' })
  }

  const activities = await activitiesRes.json()

  res.setHeader('Cache-Control', 's-maxage=300') // cache for 5 min on Vercel edge
  return res.status(200).json(activities)
}
