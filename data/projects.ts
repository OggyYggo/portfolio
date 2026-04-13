export type Project = {
  title: string
  category: 'UI Design' | 'Development' | 'Branding' | 'Motion'
  image: string
  link: string
  description: string
  year: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'SaaS Dashboard Redesign',
    category: 'UI Design',
    image: '/images/projects/project-1.jpg',
    link: 'https://yourproject.com',
    description: 'End-to-end redesign of a B2B analytics dashboard.',
    year: '2024',
    featured: true,
  },
  {
    title: 'E-commerce Storefront',
    category: 'Development',
    image: '/images/projects/project-2.jpg',
    link: 'https://yourproject.com',
    description: 'Next.js storefront with headless Shopify integration.',
    year: '2024',
    featured: true,
  },
  {
    title: 'Brand Identity System',
    category: 'Branding',
    image: '/images/projects/project-3.jpg',
    link: 'https://yourproject.com',
    description: 'Full brand identity for a fintech startup.',
    year: '2023',
  },
  {
    title: 'Mobile App UI',
    category: 'UI Design',
    image: '/images/projects/project-4.jpg',
    link: 'https://yourproject.com',
    description: 'iOS and Android UI for a fitness tracking app.',
    year: '2023',
  },
  {
    title: 'Portfolio Website',
    category: 'Development',
    image: '/images/projects/project-5.jpg',
    link: 'https://yourproject.com',
    description: 'Personal portfolio built with Next.js and GSAP.',
    year: '2023',
  },
  {
    title: 'Motion Graphics Pack',
    category: 'Motion',
    image: '/images/projects/project-6.jpg',
    link: 'https://yourproject.com',
    description: 'Animated logo reveals and social media templates.',
    year: '2022',
  },
]

export const categories = ['All', 'UI Design', 'Development', 'Branding', 'Motion'] as const
export type Category = typeof categories[number]
