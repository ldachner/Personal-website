import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  getBioContent,
  getExperienceContent,
  getProjectsContent,
} from '../content'

export default function Home() {
  return (
    <>
      <section className="home-section">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {getBioContent()}
        </ReactMarkdown>
      </section>
      <section className="home-section">
        <h2>Experience</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {getExperienceContent()}
        </ReactMarkdown>
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
