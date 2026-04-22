export type GDProject = {
  // ── Core ──────────────────────────────────────────────────────
  slug: string
  title: string
  tagline: string
  year: string
  featured?: boolean

  // ── Section 1: Hook ───────────────────────────────────────────
  heroImage: string               // Full-bleed stunning opener
  heroColor?: string              // Optional bg color behind hero e.g. '#1A1A2E'

  // ── Section 2: Snapshot ───────────────────────────────────────
  snapshot: {
    client: string
    industry: string
    deliverables: string[]        // e.g. ['Brand Identity', 'Packaging', 'Social Kit']
    year: string
    role: string
  }

  // ── Section 3: Brief ──────────────────────────────────────────
  brief: {
    heading: string
    challenge1: string             // What problem did the client bring you?
    // challenge2: string             // What problem did the client bring you?
    // audience: string              // Who is the target audience?
    goals: string[]               // What did success look like?
  }

  // ── Section 4: Creative Direction ─────────────────────────────
  creativeDirection: {
    heading: string
    approach: string              // Your overall creative thinking
    moodboard?: {
      images: string[]            // 4–6 moodboard images
      caption: string
    }
    palette: {
      name: string                // e.g. "Midnight Navy"
      hex: string                 // e.g. "#1A1A2E"
      usage: string               // e.g. "Primary — backgrounds, headers"
    }[]
    typography: {
      role: string                // e.g. "Display" / "Body" / "Accent"
      fontName: string            // e.g. "Canela Display"
      sample: string              // A sample text to show the font
      rationale: string           // Why this font?
    }[]
  }

  // ── Section 5: Logo / Mark Exploration ────────────────────────
  logoExploration: {
    heading: string
    description: string           // Your exploration process
    directions: {
      label: string               // e.g. "Direction A — Geometric"
      image: string
      status: 'rejected' | 'refined' | 'chosen'
      note: string                // Why rejected or why chosen
    }[]
    finalMark: {
      image: string               // Final logo on white
      darkImage: string           // Final logo on dark bg
      caption: string
    }
  }

  // ── Section 6: Brand System ───────────────────────────────────
  brandSystem: {
    heading: string
    description: string
    systemImage: string           // Full brand system overview (one big image)
    components: {
      title: string               // e.g. "Color System", "Type Scale", "Iconography"
      image: string
      description: string
    }[]
  }

  // ── Section 7: Mockups in Context ─────────────────────────────
  mockups: {
    heading: string
    description: string
    items: {
      label: string               // e.g. "Business Cards", "Tote Bag", "Storefront"
      image: string
      fullWidth?: boolean         // Some mockups deserve full-width treatment
    }[]
  }

  // ── Section 8: Deliverables Gallery ───────────────────────────
  gallery: {
    heading: string
    images: {
      src: string
      caption?: string
      span?: 'normal' | 'wide'    // 'wide' spans 2 columns
    }[]
  }

  // ── Section 9: Before / After ─────────────────────────────────
  beforeAfter?: {
    heading: string
    description: string
    before: string
    after: string
    beforeLabel?: string          // e.g. "Old Identity"
    afterLabel?: string           // e.g. "New Identity"
  }

  // ── Section 10: Client Quote ──────────────────────────────────
  clientQuote?: {
    quote: string
    name: string
    title: string
    avatar?: string
  }
}

// ─── Example Project ─────────────────────────────────────────────────────────

export const gdProjects: GDProject[] = [
  {
    slug: '1st-med-pharmacy',
    title: '1STMED Pharmacy',
    tagline: 'A complete brand identity for a medical pharmacy from mark to packaging to in-store experience.',
    year: '2021',

    heroImage: '/1stmed/Cover.jpg',
    

    snapshot: {
      client: '1STMED Pharmacy',
      industry: 'Pharmacy',
      deliverables: [
        'Logo Redesign',
        'Color Palette',
        'Typography',
        'Signage Design',
        'Staff Shirt Design',
        'Packaging Design',
      ],
      year: '2021',
      role: 'Brand & Graphic Designer',
    },

    brief: {
      heading: 'The Brief',
      challenge1: '1STMED had been operating for several years but their visual identity didnt reflect the quality of their service. Their logo felt dated, their signage was inconsistent, and their staff uniforms had no brand cohesion. The goal was to build a complete brand system that felt trustworthy, modern, and distinctly Filipino healthcare.',
      goals: [
        'Improve brand recognition',
        'Ensure Consistency Across All Touchpoints',
        'Build customer trust through visuals',
      ],
    },

    creativeDirection: {
      heading: 'Creative Direction',
      approach: 'The creative direction integrates subtle Christian symbolism representing the Book, the Blood, and the Blessed Hope into a clean and modern healthcare identity that maintains professionalism while reflecting the client’s faith.',
      palette: [
        { name: 'Cyan', hex: '#01e1bf', usage: 'Primary background — packaging, stationery' },
        { name: 'Dark Cyan', hex: '#00c3af', usage: 'Primary text, logo mark' },
        { name: 'Secondary Color', hex: '#017165', usage: 'Secondary accent — savory range' },
         { name: 'Crimson Red', hex: '#d20001', usage: 'Accent — seasonal items, social media' },
        { name: 'White', hex: '#FFFFFF', usage: 'Clean backgrounds, digital' },
      ],
      typography: [
        {
          role: 'Main',
          fontName: 'Core Mellow',
          sample: '1STMED PHARMACY',
          rationale: 'Core Mellow was used for the main “1STMED Pharmacy” text due to its clean, modern, and approachable form. Its rounded and structured letterforms create a sense of trust and friendliness, making it well-suited for a healthcare brand that aims to feel both professional and community-oriented.',
        },
        {
          role: 'Secondary',
          fontName: 'Freestyle Script',
          sample: 'Your health is our first priority',
          rationale: 'Freestyle Script was applied to supporting text to introduce a human and expressive touch. This adds warmth and personality to the brand, subtly reflecting care and approachability while helping the identity feel less clinical and more relatable.',
        },
        {
          role: 'Secondary',
          fontName: 'Trebuchet MS',
          sample: 'Generic and Branded Medicines',
          rationale: 'Trebuchet MS was used for subtext and informational content because of its high readability and accessibility, especially across both print and digital formats. Its clean structure ensures that important information remains clear, particularly for a wide audience including elderly customers.',
        },
      ],
    },

    logoExploration: {
      heading: 'Logo Exploration',
      description: 'We explored three distinct directions before arriving at the final mark. The client saw all three — showing rejected directions builds trust and demonstrates the thinking behind the final choice.',
      directions: [
        {
          label: 'Direction A — Illustrated',
          image: '/images/gd-projects/bloom-bakery/logo-direction-a.jpg',
          status: 'rejected',
          note: 'Beautiful but too illustrative — would be difficult to reproduce at small sizes and on embossed packaging.',
        },
        {
          label: 'Direction B — Wordmark Only',
          image: '/images/gd-projects/bloom-bakery/logo-direction-b.jpg',
          status: 'rejected',
          note: 'Clean and versatile, but lacked the premium brand mark the client needed for their new packaging line.',
        },
        {
          label: 'Direction C — Mark + Wordmark',
          image: '/images/gd-projects/bloom-bakery/logo-direction-c.jpg',
          status: 'chosen',
          note: 'The winning direction. A geometric bloom mark that works as a standalone stamp, paired with a refined wordmark. Versatile, premium, and timeless.',
        },
      ],
      finalMark: {
        image: '/1stmed/LogoA.png',
        darkImage: '/1stmed/LogoA.png',
        caption: 'Final logo — light and dark versions',
      },
    },

    brandSystem: {
      heading: 'Brand System',
      description: 'A brand is more than a logo. Every touchpoint — from the color of a paper bag to the weight of a price tag font — is part of the system.',
      systemImage: '/1stmed/Brand System Overviewss.jpg',
      components: [
        {
          title: 'Color System',
          image: '/1stmed/Color System Final.jpg',
          description: 'Five colors with defined usage rules — primary, secondary, and seasonal accents.',
        },
        {
          title: 'Type Scale',
          image: '/1stmed/Typescale.jpg',
          description: 'Defined hierarchy from display headings to caption text across print and digital.',
        },
      ],
    },

    mockups: {
      heading: 'In the Real World',
      description: 'Design only exists in context. Here\'s how the brand lives across every touchpoint.',
      items: [
        { label: 'Packaging', image: '/Mockups/Tote.jpg', fullWidth: true },
        { label: 'Staff ID', image: '/Mockups/Staff ID.jpg' },
        { label: 'Umbrella', image: '/Mockups/Umbrella.jpg' },
        { label: 'Tote Bag', image: '/Mockups/Mug Design.jpg' },
        { label: 'Signage', image: '/Mockups/Signage.jpg', fullWidth: true },
        { label: 'Social Media Post', image: '/Mockups/Social Media Post.jpg' },
        { label: 'Staff Shirt', image: '/Mockups/Shirt.jpg' },
        { label: 'Tarp Design', image: '/Mockups/Tarp.jpg' },
      ],
    },

    gallery: {
      heading: 'Final Deliverables',
      images: [
        { src: '/1stmed/Primary Logo Suite.jpg', caption: 'Primary logo suite' },
        { src: '/1stmed/Secondary Suite.jpg', caption: 'Secondary marks' },
        { src: '/Mockups/Tote.jpg', caption: 'Packaging system' },
        { src: '/1stmed/02.jpg', caption: 'Social media kit' },
      ],
    },

    beforeAfter: {
      heading: 'Before & After',
      description: 'The same brand. Two completely different stories.',
      before: '/1stmed/Beforee.jpg',
      after: '/1stmed/Afterrs.jpg',
      beforeLabel: 'Old Identity',
      afterLabel: 'New Identity',
    },

    clientQuote: {
      quote: 'We\'ve had customers come in just because they saw our new bags and wanted to know who we were. The rebrand paid for itself in the first month.',
      name: 'Jyro Alingasa',
      title: 'Founder, 1STMED PHARMACY',
      avatar: '/1stmed/Avatar.jpg',
    },
  },
]
