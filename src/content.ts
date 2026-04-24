import fm from 'front-matter'
import bioRaw from './content/bio.md?raw'
import projectsRaw from './content/projects.md?raw'

interface EssayFrontmatter {
  title: string
  date: string
  description: string
}

const essayModules = import.meta.glob('./content/essays/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface Essay {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export function getBioContent(): string {
  return fm(bioRaw).body
}

export function getProjectsContent(): string {
  return fm(projectsRaw).body
}

export function parseEssays(): Essay[] {
  return Object.entries(essayModules)
    .map(([path, raw]) => {
      const { attributes, body } = fm<EssayFrontmatter>(raw)
      const slug = path.split('/').pop()!.replace('.md', '')
      return {
        slug,
        title: attributes.title,
        date: attributes.date,
        description: attributes.description,
        content: body,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
