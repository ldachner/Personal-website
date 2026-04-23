import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseEssays } from '../content'

const essays = parseEssays()

export default function Essay() {
  const { slug } = useParams<{ slug: string }>()
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) {
    return (
      <div>
        <p>Essay not found.</p>
        <Link to="/writing">Back to writing</Link>
      </div>
    )
  }

  return (
    <article className="essay">
      <header className="essay-header">
        <h1>{essay.title}</h1>
        <time className="essay-date" dateTime={essay.date}>
          {new Date(essay.date).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
      </header>
      <div className="essay-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {essay.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
