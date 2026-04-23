import { Link } from 'react-router-dom'
import { parseEssays } from '../content'

const essays = parseEssays()

export default function Writing() {
  return (
    <section className="writing-index">
      <h1>Writing</h1>
      <ul className="essay-list">
        {essays.map((essay) => (
          <li key={essay.slug} className="essay-list-item">
            <Link to={`/writing/${essay.slug}`} className="essay-link">
              {essay.title}
            </Link>
            <time className="essay-date" dateTime={essay.date}>
              {new Date(essay.date).getFullYear()}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
