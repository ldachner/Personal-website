import matter from 'gray-matter'
import bioRaw from './content/bio.md?raw'
import experienceRaw from './content/experience.md?raw'
import projectsRaw from './content/projects.md?raw'

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
  return matter(bioRaw).content
}

export function getExperienceContent(): string {
  return matter(experienceRaw).content
}

export function getProjectsContent(): string {
  return matter(projectsRaw).content
}

export function parseEssays(): Essay[] {
  return Object.entries(essayModules)
    .map(([path, raw]) => {
      const { data, content } = matter(raw)
      const slug = path.split('/').pop()!.replace('.md', '')
      return {
        slug,
        title: data['title'] as string,
        date: data['date'] as string,
        description: data['description'] as string,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
