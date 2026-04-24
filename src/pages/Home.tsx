import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBioContent, getProjectsContent } from '../content'
import { prefetch } from '../stravaCache'
import ExperienceList from '../components/ExperienceList'

export default function Home() {
  useEffect(() => { prefetch() }, [])

  return (
    <>
      <section className="home-section">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {getBioContent()}
        </ReactMarkdown>
      </section>
      <section className="home-section">
        <h2>Experience</h2>
        <ExperienceList />
      </section>
      <section className="home-section">
        <h2>Featured Work</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {getProjectsContent()}
        </ReactMarkdown>
      </section>
    </>
  )
}
