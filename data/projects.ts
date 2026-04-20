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
  routePrefix?: string          // e.g. 'gd' → /projects/gd/[slug]
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
    clientLabel?: string
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
    slug: 'pedi-jobs',
    title: 'Pedi Jobs',
    tagline:
      'A high-performance headless storefront that merges beautiful design with seamless shopping functionality.',
    category: 'UI/UX Design & UX Research',
    client: 'Internship Project',
    timeline: '3 Months',
    image: '/images/Pedi Jobs.jpg',
    link: 'https://yourproject.com',
    description: 'Designed a mobile app for Pedi Jobs.',
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
      clientLabel: 'Industry',
      timeline: '3 Months',
      role: 'UI/UX Designer & UX Researcher',
      tools: ['Figma', 'FigJam', 'Google Forms'],
      link: 'https://www.figma.com/design/zscnhDZ0ZCdxKdUzbLRW8x/Job-Screenshots?node-id=0-1&t=UJRJsRtlZjuAVAt7-1',
    },

    problem: {
      heading: 'The Problem',
      body: [
        'Pedicab drivers and operators had no reliable way to post or find job openings. The existing process was entirely offline — handwritten notices, word-of-mouth referrals, and chance encounters at terminals.',
        'This created a massive inefficiency: qualified drivers couldn\'t find work, and operators struggled to fill positions quickly. Both sides wasted time and missed opportunities.',
      ],
      painPoints: [
        'Enables quick and easy job applications',
        'Reduces user effort and cognitive load',
        'Provides a clean, intuitive interface',
        'Helps users discover and apply to jobs efficiently',
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
    slug: '1st-med-pharmacy',
    title: '1st Med Pharmacy',
    tagline: 'A complete brand identity for a medical pharmacy from mark to packaging to in-store experience.',
    category: 'Branding',
    client: '1st Medical Pharmacy',
    timeline: '6 Weeks',
    image: '/1stmed/1stMed.jpg',
    link: '',
    description: 'Full brand identity logo system, packaging, guidelines, and in-store signage.',
    year: '2021',
    routePrefix: 'gd',
  },
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
  

]

export const categories = ['All', 'UI/UX Design', 'Development', 'Branding', 'Motion'] as const
export type Category = typeof categories[number]
