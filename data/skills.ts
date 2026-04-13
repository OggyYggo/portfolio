export type Skill = {
  label: string
  percentage: number
  category: 'Design' | 'Development' | 'Tools'
}

export const skills: Skill[] = [
  // Design
  { label: 'UI Design',       percentage: 92, category: 'Design' },
  { label: 'UX Research',     percentage: 85, category: 'Design' },
  { label: 'Prototyping',     percentage: 88, category: 'Design' },
  { label: 'Branding',        percentage: 80, category: 'Design' },

  // Development
  { label: 'React / Next.js', percentage: 87, category: 'Development' },
  { label: 'TypeScript',      percentage: 82, category: 'Development' },
  { label: 'Tailwind CSS',    percentage: 90, category: 'Development' },
  { label: 'Node.js',         percentage: 72, category: 'Development' },

  // Tools
  { label: 'Figma',           percentage: 95, category: 'Tools' },
  { label: 'Framer',          percentage: 78, category: 'Tools' },
  { label: 'Git / GitHub',    percentage: 85, category: 'Tools' },
]
