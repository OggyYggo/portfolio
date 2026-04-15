export type Project = {
  // ── Core ──────────────────────────────────────────
  slug: string
  title: string
  tagline: string
  category: 'UI/UX Design' | 'Development' | 'Branding' | 'Motion' | 'UI/UX Design & UX Research'
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

  // ── Section 1: Hook ───────────────────────────────
  heroImage?: string
  role?: string
  problemStatement?: string

  // ── Section 2: Overview ───────────────────────────
  overview?: {
    client: string
    timeline: string
    role: string
    tools: string[]
    link?: string
  }

  // ── Section 3: Problem ────────────────────────────
  problem?: {
    heading: string
    body: string[]
    painPoints: string[]
  }

  // ── Section 4: Research ───────────────────────────
  research?: {
    heading: string
    intro: string
    methods: {
      title: string
      description: string
      stat?: string
      image?: string
      proofImage?: {
        src: string
        alt: string
        caption: string
      }
    }[]
    insights: {
      text: string
      source: string
    }[]
    artifacts?: {
      title: string
      image: string
      description: string
    }[]
  }

  // ── Section 5: Early Thinking ─────────────────────
  earlyThinking?: {
    heading: string
    description: string
    images: {
      src: string
      caption: string
    }[]
  }

  // ── Section 6: Design Decisions ───────────────────
  decisions?: {
    heading: string
    items: {
      decision: string
      reasoning: string
      image?: string
    }[]
  }

  // ── Section 7: Final Designs ──────────────────────
  finalDesigns?: {
    heading: string
    description: string
    images: {
      src: string
      caption: string
    }[]
    figmaEmbed?: string
  }

  // ── Section 8: Before / After ─────────────────────
  beforeAfter?: {
    heading: string
    description: string
    before: string
    after: string
  }

  // ── Section 9: Results ────────────────────────────
  results?: {
    heading: string
    description: string
    metrics: {
      value: string
      label: string
    }[]
    qualitative?: string[]
  }

  // ── Section 10: Reflection ────────────────────────
  reflection?: {
    heading: string
    body: string[]
    wouldDoDifferently: string[]
  }
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
    slug: 'pedi-jobs',
    title: 'Pedi Jobs',
    tagline:
      'A high-performance headless storefront that merges beautiful design with seamless shopping functionality.',
    category: 'UI/UX Design & UX Research',
    client: 'Internship Project',
    timeline: '3 Months',
    image: '/images/Pedi Jobs.jpg',
    link: 'https://yourproject.com',
    description: 'Designed a app for Pedi Jobs.',
    year: '2026',
  
    gallery: [
      { src: '/images/Job Listingss.jpg', caption: 'Job Listings' },
      { src: '/images/Job Details.jpg', caption: 'Job Details' },
      { src: '/images/projects/Application Form.jpg', caption: 'Application Form' },
      { src: '/images/projects/Mobile Experience.jpg', caption: 'Mobile Experience' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'We built a headless commerce experience prioritizing speed and conversion. Every interaction — from product browsing to checkout — was optimized for minimal load times.',
        'The design system uses a neutral palette with bold product imagery, letting the merchandise take center stage while maintaining brand consistency.',
        'Integration with Shopify APIs ensures real-time inventory, seamless payments, and a backend that scales with the business.',
      ],
    },
    parallaxImage: '/images/projects/Pedi Jobs.jpg',
    summary: [
      'A fully headless e-commerce experience powered by Next.js and Shopify, designed for speed and conversion.',
      'The storefront features dynamic product pages, real-time cart updates, and a frictionless checkout flow.',
      'Optimized for SEO and performance, delivering sub-second page loads across all devices.',
    ],

    // ── Case Study Fields ─────────────────────────────
    heroImage: '/images/Pedi Jobs.jpg',
    role: 'UI/UX Designer & UX Researcher',
    problemStatement:
      'Job seekers in the pedicab industry had no centralized platform to find work — relying on word-of-mouth and outdated bulletin boards. We designed a mobile-first app to bridge the gap.',

    overview: {
      client: 'Internship Project',
      timeline: '3 Months',
      role: 'UI/UX Designer & UX Researcher',
      tools: ['Figma', 'FigJam', 'Google Forms', 'Maze'],
      link: 'https://yourproject.com',
    },

    problem: {
      heading: 'The Problem',
      body: [
        'Pedicab drivers and operators had no reliable way to post or find job openings. The existing process was entirely offline — handwritten notices, word-of-mouth referrals, and chance encounters at terminals.',
        'This created a massive inefficiency: qualified drivers couldn\'t find work, and operators struggled to fill positions quickly. Both sides wasted time and missed opportunities.',
      ],
      painPoints: [
        'No centralized job board for the pedicab industry',
        'Application process was entirely manual and in-person',
        'Drivers had no way to showcase experience or credentials',
        'Operators couldn\'t filter or compare applicants effectively',
        'Mobile access was essential — most users only had smartphones',
      ],
    },

    research: {
      heading: 'Research & Discovery',
      intro: 'Before designing a single screen, we spent the first month deeply embedded in the pedicab community — interviewing drivers and operators, surveying 50+ users, and studying existing job platforms. Every design decision traces back to what we learned here.',
      methods: [
        {
          title: 'User Interviews',
          description:
            'Conducted 10 interviews with pedicab drivers and 5 with operators to understand daily workflows, frustrations, and technology comfort levels.',
          stat: '15 participants · 30 min each',
          proofImage: {
            src: '/images/projects/pedi-jobs/research-interviews.jpg',
            alt: 'User interview session with pedicab drivers',
            caption: 'Field interview with pedicab drivers — understanding daily workflows and frustrations firsthand',
          },
        },
        {
          title: 'Survey Analysis',
          description:
            'This graph shows the distribution of survey responses across different age groups and experience levels.',
          stat: '20 respondents',
          proofImage: {
            src: '/research & discovery/Survey Analysis.jpg',
            alt: 'Google Forms survey results',
            caption: 'Survey results — validating pain points and feature priorities across 50+ respondents',
          },
        },
        {
          title: 'Competitive Analysis',
          description:
            'Analyzed 5 general-purpose job platforms (PhilJobNet, Jobstreet, Boss Job, Facebook Jobs) to identify UX patterns that could be adapted for a niche audience.',
          stat: '5 platforms · 10 dimensions',
          proofImage: {
            src: '/research & discovery/Competitive Analysis.jpg',
            alt: 'Competitor analysis board in Google Sheets',
            caption: 'Google Sheets competitor audit — side-by-side comparison of 5 job platforms across 10 UX dimensions',
          },
        },
        {
          title: 'Persona Development',
          description:
            'Created 2 primary personas — a job-seeking driver and a fleet operator — to anchor all design decisions in real user needs.',
          stat: '2 personas',
          proofImage: {
            src: '/images/projects/pedi-jobs/research-personas.jpg',
            alt: 'User persona documents in Figma',
            caption: 'Figma persona documents — driver and operator archetypes grounded in interview data',
          },
        },
      ],
      insights: [
        {
          text: 'Most users access the internet only through smartphones — desktop is not viable.',
          source: 'User interviews + survey data',
        },
        {
          text: 'Trust and legitimacy are top concerns — users need to verify operators before applying.',
          source: 'User interviews',
        },
        {
          text: 'Simplicity is critical — many users have limited digital literacy.',
          source: 'Field observations',
        },
        {
          text: 'Instant notifications for new jobs would be the #1 valued feature.',
          source: 'Survey data',
        },
      ],
    },

    earlyThinking: {
      heading: 'Early Thinking',
      description:
        'We started with paper sketches and FigJam flows before moving to Figma. This helped us focus on information architecture and user flows without getting distracted by visual details.',
      images: [
        { src: '/research & discovery/Flow Chart.jpg', caption: 'Job listings — early wireframe exploration' },
        { src: '/research & discovery/Job Details.jpg', caption: 'Job detail view — information hierarchy' },
      ],
    },

    decisions: {
      heading: 'Design Decisions',
      items: [
        {
          decision: 'Mobile-first over responsive web',
          reasoning:
            'Our research showed 95%+ of target users access the internet exclusively via smartphones. We designed native mobile patterns first, ensuring the core experience was optimized for small screens and touch interactions.',
        },
        {
          decision: 'One-tap apply over multi-step forms',
          reasoning:
            'Given the low digital literacy of many users, we reduced the application flow to a single tap after initial profile setup. This dramatically lowered the barrier to applying for jobs.',
        },
        {
          decision: 'Visual job cards over text-heavy lists',
          reasoning:
            'Testing showed users scanned listings faster and with better comprehension when jobs were presented as visual cards with key details upfront, rather than dense text lists.',
        },
      ],
    },

    finalDesigns: {
      heading: 'Final Designs',
      description:
        'After 2 rounds of usability testing and iteration, here are the final screens. Every component was built in Figma with auto-layout for responsive behavior.',
      images: [
        { src: '/images/Job Listingss.jpg', caption: 'Job Listings' },
        { src: '/images/Job Details.jpg', caption: 'Job Details' },
        { src: '/images/Application Form.jpg', caption: 'Application Form' },
        { src: '/images/Mobile Experience.jpg', caption: 'Mobile Experience' },
      ],
    },

    results: {
      heading: 'Results',
      description:
        'Measured through usability testing sessions with 8 participants using Maze.',
      metrics: [
        { value: '92%', label: 'Task completion rate' },
        { value: '< 30s', label: 'Average time to apply' },
        { value: '4.6/5', label: 'User satisfaction score' },
        { value: '88%', label: 'Would recommend to peers' },
      ],
      qualitative: [
        '"This is so much easier than asking around at the terminal." — Driver, 3 years experience',
        '"I can finally see who\'s applying and compare them side by side." — Fleet operator',
        'Users consistently praised the simplicity and clarity of the job cards',
      ],
    },

    reflection: {
      heading: 'Reflection',
      body: [
        'This project taught me the importance of designing for users with varying levels of digital literacy. What feels intuitive to a designer can be confusing for someone who primarily uses their phone for calls and messaging.',
        'The research phase was the most valuable part of the process — every major design decision traced back to a specific user insight or pain point.',
      ],
      wouldDoDifferently: [
        'Conduct field testing earlier — observing users in their actual environment (terminals, streets) would have surfaced issues we missed in remote testing',
        'Build a simple clickable prototype for the initial interviews instead of showing static screens',
        'Include accessibility testing for users with vision impairments, given outdoor usage conditions',
      ],
    },
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
