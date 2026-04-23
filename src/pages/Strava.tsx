import { useEffect, useState } from 'react'

interface Activity {
  id: number
  name: string
  sport_type: string
  start_date: string
  distance: number
  moving_time: number
  total_elevation_gain: number
}

const SPORT_EMOJI: Record<string, string> = {
  Run: '🏃',
  Ride: '🚴',
  Swim: '🏊',
  Walk: '🚶',
  Hike: '🥾',
  WeightTraining: '🏋️',
  Workout: '💪',
  Yoga: '🧘',
  VirtualRide: '🚴',
  VirtualRun: '🏃',
}

function formatDistance(meters: number, sport: string): string {
  if (sport === 'Swim') return `${Math.round(meters)}m`
  return `${(meters / 1000).toFixed(1)} km`
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Strava() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/strava')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load activities')
        return r.json() as Promise<Activity[]>
      })
      .then(setActivities)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="strava-section">
      <h1>Activity</h1>
      <p className="strava-subtitle">Recent Strava activity</p>

      {loading && <p className="strava-status">Loading…</p>}
      {error && <p className="strava-status strava-error">{error}</p>}

      {!loading && !error && (
        <ul className="activity-list">
          {activities.map((a) => (
            <li key={a.id} className="activity-item">
              <span className="activity-icon">
                {SPORT_EMOJI[a.sport_type] ?? '🏅'}
              </span>
              <div className="activity-info">
                <span className="activity-name">{a.name}</span>
                <span className="activity-meta">
                  {formatDate(a.start_date)}
                  {a.distance > 0 && ` · ${formatDistance(a.distance, a.sport_type)}`}
                  {` · ${formatTime(a.moving_time)}`}
                  {a.total_elevation_gain > 0 && ` · ↑${Math.round(a.total_elevation_gain)}m`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
