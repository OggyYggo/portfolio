export type Experience = {
  role: string
  company: string
  period: string
  type: 'Full-time' | 'Freelance' | 'Contract' | 'Internship' | 'Thesis Capstone'
  location: string
  description: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: 'UI/UX Designer',
    company: 'Pedi App',
    period: 'March 2026',
    type: 'Internship',
    location: 'On-site',
    description:
      'Designed intuitive and user-friendly interfaces for Pedi Jobs, a mobile app that helps local jobseekers find employment easily and efficiently',
    highlights: [
      'Conducted UI/UX competitive analysis to identify design trends and improve overall usability',
      'Created wireframes and high-fidelity UI designs using Figma',
      'Developed user flows using FigJam to visualize and optimize user interactions',
      'Applied user-centered design principles to enhance navigation, accessibility, and user experience',
      'Collaborated with product managers and developers to deliver precise design specifications and ensure alignment between design intent and technical implementation',
    ],
  },
  {
    role: 'Multimedia Artist',
    company: 'The Anchor Radio 106.9 FM',
    period: '2020 — 2022',
    type: 'Full-time',
    location: 'On-site',
    description:
      'Designed digital posters, ads, and social media graphics for radio programs and announcements.',
    highlights: [
      'Edited photos, videos and promotional materials used for online broadcasting.',
      'Assisted multimedia content for Facebook and radio campaignes to increas audience engagement.',
      'Created layout design, branding, and audio-visual content production.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'CeC GradConnect',
    period: '2025 — 2026',
    type: 'Thesis Capstone',
    location: 'Education',
    description:
      'Led the UI/UX design of CeC Grad Connect, a digital platform that replaced inefficient manual processes with a paperless and user-friendly system',
    highlights: [
      'Enhanced user experience by reducing complexity in request submissions and improving task completion flow',
      'Designed the end-to-end UI/UX of a web-based system that digitizes graduation services (photo claiming, alumni ID, and yearbook requests)',
      'Conducted UI/UX competitive analysis to identify best practices and improve overall usability',
      'Created wireframes, user flows, and high-fidelity prototypes using Figma',
      'Improved workflow efficiency by designing a centralized system for managing graduation-related requests',
    ],
  },
]
