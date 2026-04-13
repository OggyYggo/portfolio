export type Skill = {
  label: string
  description: string
  icon: string
  category: 'AI' | 'Design'
}

export const skills: Skill[] = [
  // Frontend
  { label: 'Claude',  description: 'AI coding assistant',     icon: 'claude',    category: 'AI' },
  { label: 'Gemini',    description: 'AI coding assistant',     icon: 'gemini',         category: 'AI' },


  // Backend
  { label: 'Stitch',            description: 'UI/UX design tool',        icon: 'stitch',          category: 'AI' },
  { label: 'ChatGpt',    description: 'AI coding assistant',             icon: 'chatgpt',       category: 'AI' },

  // Design
  { label: 'Figma',              description: 'UI/UX design',          icon: 'figma',         category: 'Design' },
  { label: 'Adobe Illustrator',  description: 'Vector graphics',       icon: 'illustrator',   category: 'Design' },
  { label: 'Adobe Photoshop',    description: 'Photo editing',         icon: 'photoshop',     category: 'Design' },
  { label: 'SketchUp',           description: '3D modeling',            icon: 'sketchup',      category: 'Design' },

 
]

export const skillCategories = ['AI', 'Design'] as const
export type SkillCategory = typeof skillCategories[number]
