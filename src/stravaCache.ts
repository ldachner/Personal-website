export interface Activity {
  id: number
  name: string
  sport_type: string
  start_date: string
  distance: number
  moving_time: number
  total_elevation_gain: number
  map: { summary_polyline: string | null }
}

let cache: Activity[] | null = null
let inflight: Promise<Activity[]> | null = null

function fetchActivities(): Promise<Activity[]> {
  if (cache) return Promise.resolve(cache)
  if (!inflight) {
    inflight = fetch('/api/strava')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load activities')
        return r.json() as Promise<Activity[]>
      })
      .then((data) => { cache = data; inflight = null; return data })
      .catch((err) => { inflight = null; throw err })
  }
  return inflight
}

export function prefetch(): void { fetchActivities().catch(() => {}) }
export function load(): Promise<Activity[]> { return fetchActivities() }

// Google encoded-polyline decoder
export function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = []
  let index = 0, lat = 0, lng = 0
  while (index < encoded.length) {
    let shift = 0, result = 0, byte: number
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5 } while (byte >= 0x20)
    lat += result & 1 ? ~(result >> 1) : result >> 1
    shift = 0; result = 0
    do { byte = encoded.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5 } while (byte >= 0x20)
    lng += result & 1 ? ~(result >> 1) : result >> 1
    points.push([lat / 1e5, lng / 1e5])
  }
  return points
}

export function routeToSvgPath(
  points: [number, number][],
  w: number,
  h: number,
  pad = 12
): string {
  if (points.length < 2) return ''
  const lats = points.map((p) => p[0])
  const lngs = points.map((p) => p[1])
  const minLat = lats.reduce((a, b) => Math.min(a, b), Infinity)
  const maxLat = lats.reduce((a, b) => Math.max(a, b), -Infinity)
  const minLng = lngs.reduce((a, b) => Math.min(a, b), Infinity)
  const maxLng = lngs.reduce((a, b) => Math.max(a, b), -Infinity)
  const latR = maxLat - minLat || 0.001
  const lngR = maxLng - minLng || 0.001
  const scale = Math.min((w - pad * 2) / lngR, (h - pad * 2) / latR)
  const ox = pad + ((w - pad * 2) - lngR * scale) / 2
  const oy = pad + ((h - pad * 2) - latR * scale) / 2
  const toX = (lng: number) => ox + ((lng - minLng) / lngR) * lngR * scale
  const toY = (lat: number) => h - oy - ((lat - minLat) / latR) * latR * scale
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p[1]).toFixed(1)},${toY(p[0]).toFixed(1)}`).join(' ')
}
