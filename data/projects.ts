export type Project = {
  slug: string
  title: string
  tagline: string
  category: 'UI/UX Design' | 'Development' | 'Branding' | 'Motion'
  client: string
  timeline: string
  image: string
  link: string
  description: string
  year: string
  featured?: boolean
  gallery?: {
    src: string
    caption: string
  }[]
  strategy?: {
    heading: string
    paragraphs: string[]
  }
  parallaxImage?: string
  summary?: string[]
}

export const projects: Project[] = [
  {
    slug: 'fiona-travel-tours',
    title: 'Fiona Travel & Tours Booking Website',
    tagline:
      'A seamless booking experience for travelers exploring the beauty of Bohol — designed with clarity, speed, and trust in mind.',
    category: 'UI/UX Design',
    client: 'Fiona Travel & Tours',
    timeline: '8 Weeks',
    image: '/images/FionaTravel.jpg',
    link: 'https://boholfionatours.com',
    description: 'Designed and developed a modern booking website for Fiona Travel & Tours.',
    year: '2026',
    gallery: [
      { src: '/images/HomePagee.jpg', caption: 'Homepage Design' },
      { src: '/images/Bookings.jpg', caption: 'Booking Flow' },
      { src: '/images/Tourss.jpg', caption: 'Tour Packages' },
      { src: '/images/Mobiles.jpg', caption: 'Mobile Responsive View' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'The strategy centered on making the booking process as intuitive as possible. We focused on clear visual hierarchy, trustworthy imagery, and a streamlined checkout flow that minimizes friction.',
        'Every design decision was driven by user research — understanding how travelers browse, compare, and book tours. The result is a layout that feels welcoming and efficient.',
        'We paired warm, tropical color tones with modern typography to reflect the Bohol travel experience while maintaining professional credibility.',
      ],
    },
    parallaxImage: '/images/FionaTravel.jpg',
    summary: [
      'This project transforms the way travelers discover and book Bohol tours — replacing outdated processes with a modern, mobile-first web experience.',
      'The design prioritizes speed and clarity, ensuring visitors can find the perfect tour and complete their booking in minutes.',
      'Built with Next.js for performance and SEO, the site delivers a fast, accessible experience across all devices.',
    ],
  },
  {
    slug: 'ecommerce-storefront',
    title: 'E-commerce Storefront',
    tagline:
      'A high-performance headless storefront that merges beautiful design with seamless shopping functionality.',
    category: 'Development',
    client: 'Internal Project',
    timeline: '10 Weeks',
    image: '/images/projects/project-2.jpg',
    link: 'https://yourproject.com',
    description: 'Next.js storefront with headless Shopify integration.',
    year: '2024',
    featured: true,
    gallery: [
      { src: '/images/projects/ecommerce-storefront/gallery-1.jpg', caption: 'Product Listing' },
      { src: '/images/projects/ecommerce-storefront/gallery-2.jpg', caption: 'Cart & Checkout' },
      { src: '/images/projects/ecommerce-storefront/gallery-3.jpg', caption: 'Product Detail Page' },
      { src: '/images/projects/ecommerce-storefront/gallery-4.jpg', caption: 'Mobile Experience' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'We built a headless commerce experience prioritizing speed and conversion. Every interaction — from product browsing to checkout — was optimized for minimal load times.',
        'The design system uses a neutral palette with bold product imagery, letting the merchandise take center stage while maintaining brand consistency.',
        'Integration with Shopify APIs ensures real-time inventory, seamless payments, and a backend that scales with the business.',
      ],
    },
    parallaxImage: '/images/projects/ecommerce-storefront/parallax.jpg',
    summary: [
      'A fully headless e-commerce experience powered by Next.js and Shopify, designed for speed and conversion.',
      'The storefront features dynamic product pages, real-time cart updates, and a frictionless checkout flow.',
      'Optimized for SEO and performance, delivering sub-second page loads across all devices.',
    ],
  },
  {
    slug: 'brand-identity-system',
    title: 'Brand Identity System',
    tagline:
      'A comprehensive visual identity that communicates trust, innovation, and forward-thinking design.',
    category: 'Branding',
    client: 'Fintech Startup',
    timeline: '6 Weeks',
    image: '/images/projects/project-3.jpg',
    link: 'https://yourproject.com',
    description: 'Full brand identity for a fintech startup.',
    year: '2023',
    gallery: [
      { src: '/images/projects/brand-identity-system/gallery-1.jpg', caption: 'Logo Exploration' },
      { src: '/images/projects/brand-identity-system/gallery-2.jpg', caption: 'Color System' },
      { src: '/images/projects/brand-identity-system/gallery-3.jpg', caption: 'Typography Guide' },
      { src: '/images/projects/brand-identity-system/gallery-4.jpg', caption: 'Brand Applications' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'The brand identity was built to convey trust and innovation — essential qualities for a fintech company entering a competitive market.',
        'We developed a flexible design system with a strong logo mark, a carefully curated color palette, and typography that balances authority with approachability.',
        'Every brand touchpoint — from business cards to app interfaces — was designed to feel cohesive and premium.',
      ],
    },
    parallaxImage: '/images/projects/brand-identity-system/parallax.jpg',
    summary: [
      'A complete brand identity system for a fintech startup, covering logo, color, typography, and application guidelines.',
      'The identity reflects the company\'s mission of making finance accessible, modern, and trustworthy.',
      'Deliverables include a comprehensive brand book, digital asset library, and implementation guidelines.',
    ],
  },
  {
    slug: 'mobile-app-ui',
    title: 'Mobile App UI',
    tagline:
      'A clean, motivating fitness app interface designed to keep users engaged and on track with their goals.',
    category: 'UI/UX Design',
    client: 'Fitness Startup',
    timeline: '8 Weeks',
    image: '/images/projects/project-4.jpg',
    link: 'https://yourproject.com',
    description: 'iOS and Android UI for a fitness tracking app.',
    year: '2023',
    gallery: [
      { src: '/images/projects/mobile-app-ui/gallery-1.jpg', caption: 'Onboarding Flow' },
      { src: '/images/projects/mobile-app-ui/gallery-2.jpg', caption: 'Dashboard Design' },
      { src: '/images/projects/mobile-app-ui/gallery-3.jpg', caption: 'Workout Tracking' },
      { src: '/images/projects/mobile-app-ui/gallery-4.jpg', caption: 'Progress Analytics' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'The UI was designed with motivation at its core. Bold colors, dynamic data visualizations, and encouraging micro-interactions keep users engaged.',
        'We followed platform-specific guidelines for both iOS and Android while maintaining a unified visual language across both platforms.',
        'User testing revealed that simplicity in navigation was the biggest factor in retention — so we streamlined every flow to three taps or fewer.',
      ],
    },
    parallaxImage: '/images/projects/mobile-app-ui/parallax.jpg',
    summary: [
      'A cross-platform fitness app UI designed to motivate users through clean visuals and intuitive tracking.',
      'The design covers onboarding, daily tracking, workout plans, and progress analytics with a focus on simplicity.',
      'Built with accessibility in mind, supporting dynamic type, high contrast modes, and screen readers.',
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    tagline:
      'A personal portfolio that showcases creative work through bold typography, smooth animations, and thoughtful layout.',
    category: 'Development',
    client: 'Personal Project',
    timeline: '4 Weeks',
    image: '/images/projects/project-5.jpg',
    link: 'https://yourproject.com',
    description: 'Personal portfolio built with Next.js and GSAP.',
    year: '2023',
    gallery: [
      { src: '/images/projects/portfolio-website/gallery-1.jpg', caption: 'Hero Section' },
      { src: '/images/projects/portfolio-website/gallery-2.jpg', caption: 'Project Showcase' },
      { src: '/images/projects/portfolio-website/gallery-3.jpg', caption: 'About Section' },
      { src: '/images/projects/portfolio-website/gallery-4.jpg', caption: 'Contact Form' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'The portfolio was designed to let the work speak for itself. Minimal UI, generous whitespace, and scroll-triggered animations create a cinematic browsing experience.',
        'GSAP was used extensively for smooth page transitions, parallax effects, and hover interactions that feel natural and responsive.',
        'The tech stack — Next.js, Tailwind, and GSAP — was chosen for its performance, flexibility, and developer experience.',
      ],
    },
    parallaxImage: '/images/projects/portfolio-website/parallax.jpg',
    summary: [
      'A developer portfolio that combines modern web technologies with thoughtful design to create a memorable first impression.',
      'Features include smooth scroll animations, dynamic project filtering, and optimized image loading.',
      'Built with Next.js and GSAP, delivering fast page loads and silky-smooth interactions.',
    ],
  },
  {
    slug: 'motion-graphics-pack',
    title: 'Motion Graphics Pack',
    tagline:
      'A collection of animated logo reveals and social media templates designed to elevate digital brand presence.',
    category: 'Motion',
    client: 'Various Clients',
    timeline: '6 Weeks',
    image: '/images/projects/project-6.jpg',
    link: 'https://yourproject.com',
    description: 'Animated logo reveals and social media templates.',
    year: '2022',
    gallery: [
      { src: '/images/projects/motion-graphics-pack/gallery-1.jpg', caption: 'Logo Reveal Concepts' },
      { src: '/images/projects/motion-graphics-pack/gallery-2.jpg', caption: 'Social Media Templates' },
      { src: '/images/projects/motion-graphics-pack/gallery-3.jpg', caption: 'Animation Storyboards' },
      { src: '/images/projects/motion-graphics-pack/gallery-4.jpg', caption: 'Final Renders' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'Each animation was crafted to tell a micro-story — a brief moment that captures attention and communicates brand personality in seconds.',
        'We used a modular approach, creating reusable animation components that clients could adapt across different social platforms and contexts.',
        'The focus was on timing and easing — making every motion feel organic and intentional rather than mechanical.',
      ],
    },
    parallaxImage: '/images/projects/motion-graphics-pack/parallax.jpg',
    summary: [
      'A versatile motion graphics package including logo animations, social media templates, and branded video assets.',
      'Each piece is designed to be adaptable — easily customized for different campaigns, platforms, and aspect ratios.',
      'The collection helps brands stand out in crowded social feeds with polished, professional motion design.',
    ],
  },
]

export const categories = ['All', 'UI/UX Design', 'Development', 'Branding', 'Motion'] as const
export type Category = typeof categories[number]
