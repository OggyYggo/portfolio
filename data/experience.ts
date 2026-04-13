export type Experience = {
  role: string
  company: string
  period: string
  type: 'Full-time' | 'Freelance' | 'Contract' | 'Internship'
  location: string
  description: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: 'Senior UI/UX Designer',
    company: 'Company Name',
    period: '2022 — Present',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Led end-to-end design for multiple SaaS products, working closely with product and engineering teams to ship high-quality user interfaces.',
    highlights: [
      'Redesigned the core dashboard — reduced user drop-off by 30%',
      'Built and maintained a company-wide design system in Figma',
      'Mentored 2 junior designers and conducted weekly design reviews',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Another Company',
    period: '2020 — 2022',
    type: 'Full-time',
    location: 'On-site',
    description:
      'Developed responsive web applications using React and TypeScript, collaborating with designers to bring Figma mockups to pixel-perfect production code.',
    highlights: [
      'Built 10+ reusable component libraries used across 3 products',
      'Improved Lighthouse performance score from 62 to 94',
      'Introduced Storybook for component documentation',
    ],
  },
  {
    role: 'UI Designer',
    company: 'Freelance',
    period: '2018 — 2020',
    type: 'Freelance',
    location: 'Remote',
    description:
      'Delivered branding, UI design, and landing page development for small businesses and startups across various industries.',
    highlights: [
      'Completed 40+ projects for clients across 8 countries',
      'Average client satisfaction rating of 4.9 / 5',
    ],
  },
]
