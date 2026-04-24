import { experience, type ExperienceEntry } from '../content/experience'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function duration(start: string, end: string): string {
  const parse = (s: string) => {
    if (s === 'Present') return new Date()
    const [mon, yr] = s.split(' ')
    return new Date(parseInt(yr), MONTHS[mon])
  }
  const diff = Math.round(
    (parse(end).getTime() - parse(start).getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  )
  if (diff < 12) return `${diff} mos`
  const yrs = Math.floor(diff / 12)
  const mos = diff % 12
  return mos > 0 ? `${yrs} yr ${mos} mos` : `${yrs} yr`
}

function ExpCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="exp-item">
      <div className="exp-logo-wrap">
        {entry.logo ? (
          <img src={`/logos/${entry.logo}`} alt={`${entry.company} logo`} className="exp-logo" />
        ) : (
          <div className="exp-logo exp-logo--placeholder" />
        )}
      </div>
      <div className="exp-body">
        <p className="exp-title">{entry.title}</p>
        <p className="exp-company">{entry.company} · {entry.type}</p>
        <p className="exp-meta">
          {entry.startDate} – {entry.endDate} · {duration(entry.startDate, entry.endDate)}
          {entry.location && <> · {entry.location}</>}
        </p>
        <p className="exp-description">{entry.description}</p>
      </div>
    </div>
  )
}

export default function ExperienceList() {
  return (
    <div className="experience-list">
      {experience.map((e) => (
        <ExpCard key={`${e.company}-${e.startDate}`} entry={e} />
      ))}
    </div>
  )
}
