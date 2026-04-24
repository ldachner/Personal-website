export interface ExperienceEntry {
  title: string
  company: string
  type: string
  startDate: string
  endDate: string
  location?: string
  description: string
  logo?: string  // filename inside /public/logos/, e.g. 'carta.png'
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Product Management Intern',
    company: 'Carta',
    type: 'Internship',
    startDate: 'Sep 2025',
    endDate: 'Present',
    description: 'Complex entities for PE and VC, retained part-time',
    logo: 'carta.png',
  },
  {
    title: 'Junior Analyst Intern — BDC Capital · Seed Venture Fund & IT Venture Fund',
    company: 'BDC',
    type: 'Internship',
    startDate: 'Jan 2025',
    endDate: 'Apr 2025',
    location: 'Vancouver, BC',
    description: "Financial and product analysis for Canada's largest and most active early-stage technology venture investor",
    logo: 'bdc.png',
  },
  {
    title: 'Software Projects Intern',
    company: 'Klue',
    type: 'Internship',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    location: 'Vancouver, BC · Hybrid',
    description: 'Chatbots, semantic search and Clay',
    logo: 'klue.png',
  },
]
