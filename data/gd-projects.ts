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
    challenge: string             // What problem did the client bring you?
    audience: string              // Who is the target audience?
    goals: string[]               // What did success look like?
  }

  // ── Section 4: Creative Direction ─────────────────────────────
  creativeDirection: {
    heading: string
    approach: string              // Your overall creative thinking
    moodboard: {
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
    title: '1st Med Pharmacy',
    tagline: 'A complete brand identity for a medical pharmacy — from mark to packaging to in-store experience.',
    year: '2021',

    heroImage: '/1stmed/Cover.jpg',
    heroColor: '#F5EFE6',

    snapshot: {
      client: '1st Medical Pharmacy',
      industry: 'Healthcare & Pharmacy',
      deliverables: [
        'Brand Identity',
        'Logo System',
        'Packaging Design',
        'Brand Guidelines',
        'Social Media Kit',
        'In-store Signage',
      ],
      year: '2024',
      role: 'Brand Designer',
    },

    brief: {
      heading: 'The Brief',
      challenge: 'Bloom was a beloved neighborhood bakery with a loyal following — but their visual identity looked like it was made in Microsoft Word in 2009. They were expanding to 3 new locations and needed a brand that matched the quality of their product.',
      audience: 'Urban professionals aged 25–45 who treat themselves to premium everyday experiences. They care about craft, quality, and aesthetics. They\'d notice bad kerning.',
      goals: [
        'Feel premium without feeling pretentious',
        'Work across packaging, signage, digital, and merchandise',
        'Be timeless — not trend-chasing',
        'Reflect the handmade, organic nature of the product',
      ],
    },

    creativeDirection: {
      heading: 'Creative Direction',
      approach: 'We landed on "refined warmth" — the feeling of a Sunday morning, natural light, and something baked from scratch. The direction pulls from vintage French patisserie aesthetics but strips away the fussiness, leaving something clean, confident, and contemporary.',
      moodboard: {
        images: [
          '/images/gd-projects/bloom-bakery/mood-1.jpg',
          '/images/gd-projects/bloom-bakery/mood-2.jpg',
          '/images/gd-projects/bloom-bakery/mood-3.jpg',
          '/images/gd-projects/bloom-bakery/mood-4.jpg',
          '/images/gd-projects/bloom-bakery/mood-5.jpg',
          '/images/gd-projects/bloom-bakery/mood-6.jpg',
        ],
        caption: 'Moodboard — refined warmth, vintage French patisserie stripped of fussiness',
      },
      palette: [
        { name: 'Warm Cream', hex: '#F5EFE6', usage: 'Primary background — packaging, stationery' },
        { name: 'Espresso', hex: '#2C1810', usage: 'Primary text, logo mark' },
        { name: 'Dusty Rose', hex: '#D4A5A5', usage: 'Accent — seasonal items, social media' },
        { name: 'Sage', hex: '#8FAF8B', usage: 'Secondary accent — savory range' },
        { name: 'Warm White', hex: '#FAFAF7', usage: 'Clean backgrounds, digital' },
      ],
      typography: [
        {
          role: 'Display',
          fontName: 'Canela Display',
          sample: 'Bloom',
          rationale: 'Canela has an organic, handcrafted quality in its curves — it feels warm without being childish. The italics especially evoke a hand-lettered signage aesthetic.',
        },
        {
          role: 'Body',
          fontName: 'Freight Text Pro',
          sample: 'Baked fresh daily',
          rationale: 'A refined serif for packaging copy and menus. Legible at small sizes, elegant at large ones. Pairs with Canela without competing.',
        },
        {
          role: 'Accent',
          fontName: 'Neue Haas Grotesk',
          sample: 'EST. 2019',
          rationale: 'A clean sans-serif for labels, stamps, and utility text. Grounds the warmth of the other two fonts.',
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
        image: '/images/gd-projects/bloom-bakery/logo-final-light.jpg',
        darkImage: '/images/gd-projects/bloom-bakery/logo-final-dark.jpg',
        caption: 'Final logo — light and dark versions',
      },
    },

    brandSystem: {
      heading: 'Brand System',
      description: 'A brand is more than a logo. Every touchpoint — from the color of a paper bag to the weight of a price tag font — is part of the system.',
      systemImage: '/images/gd-projects/bloom-bakery/brand-system-overview.jpg',
      components: [
        {
          title: 'Color System',
          image: '/images/gd-projects/bloom-bakery/system-colors.jpg',
          description: 'Five colors with defined usage rules — primary, secondary, and seasonal accents.',
        },
        {
          title: 'Type Scale',
          image: '/images/gd-projects/bloom-bakery/system-type.jpg',
          description: 'Defined hierarchy from display headings to caption text across print and digital.',
        },
        {
          title: 'Texture & Pattern',
          image: '/images/gd-projects/bloom-bakery/system-pattern.jpg',
          description: 'A custom geometric pattern derived from the logo mark — used on tissue paper, bags, and seasonal packaging.',
        },
        {
          title: 'Iconography',
          image: '/images/gd-projects/bloom-bakery/system-icons.jpg',
          description: 'A small set of hand-drawn icons for menu categories — pastries, breads, drinks, seasonal.',
        },
      ],
    },

    mockups: {
      heading: 'In the Real World',
      description: 'Design only exists in context. Here\'s how the brand lives across every touchpoint.',
      items: [
        { label: 'Packaging — Bread Bags', image: '/images/gd-projects/bloom-bakery/mockup-bags.jpg', fullWidth: true },
        { label: 'Business Cards', image: '/images/gd-projects/bloom-bakery/mockup-cards.jpg' },
        { label: 'Coffee Cups', image: '/images/gd-projects/bloom-bakery/mockup-cups.jpg' },
        { label: 'Tote Bag', image: '/images/gd-projects/bloom-bakery/mockup-tote.jpg' },
        { label: 'In-store Signage', image: '/images/gd-projects/bloom-bakery/mockup-signage.jpg', fullWidth: true },
        { label: 'Social Media Templates', image: '/images/gd-projects/bloom-bakery/mockup-social.jpg' },
        { label: 'Staff Aprons', image: '/images/gd-projects/bloom-bakery/mockup-apron.jpg' },
      ],
    },

    gallery: {
      heading: 'Final Deliverables',
      images: [
        { src: '/images/gd-projects/bloom-bakery/final-1.jpg', span: 'wide' },
        { src: '/images/gd-projects/bloom-bakery/final-2.jpg', caption: 'Primary logo suite' },
        { src: '/images/gd-projects/bloom-bakery/final-3.jpg', caption: 'Secondary marks' },
        { src: '/images/gd-projects/bloom-bakery/final-4.jpg', span: 'wide', caption: 'Brand guidelines cover' },
        { src: '/images/gd-projects/bloom-bakery/final-5.jpg', caption: 'Packaging system' },
        { src: '/images/gd-projects/bloom-bakery/final-6.jpg', caption: 'Social media kit' },
      ],
    },

    beforeAfter: {
      heading: 'Before & After',
      description: 'The same brand. Two completely different stories.',
      before: '/images/gd-projects/bloom-bakery/before.jpg',
      after: '/images/gd-projects/bloom-bakery/after.jpg',
      beforeLabel: 'Old Identity',
      afterLabel: 'New Identity',
    },

    clientQuote: {
      quote: 'We\'ve had customers come in just because they saw our new bags and wanted to know who we were. The rebrand paid for itself in the first month.',
      name: 'Sarah Chen',
      title: 'Founder, Bloom Bakery Co.',
      avatar: '/images/gd-projects/bloom-bakery/client-avatar.jpg',
    },
  },
]
