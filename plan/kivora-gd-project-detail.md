# Graphic Design Project Detail Page — Full Guide

> A project detail page built specifically for graphic designers.
> Sells your vision, craft, and range — not just your process.
> Every section is designed to make employers and clients stop scrolling.

---

## Page Structure Overview

```
┌─────────────────────────────────────────────┐
│                  Header                     │
├─────────────────────────────────────────────┤
│        1. Full-Bleed Visual Hook            │  ← One stunning hero. No text competing.
├─────────────────────────────────────────────┤
│        2. Project Snapshot                  │  ← Client, deliverables, industry, year
├─────────────────────────────────────────────┤
│        3. The Brief                         │  ← What problem did the client bring you?
├─────────────────────────────────────────────┤
│        4. Creative Direction                │  ← Moodboard, palette, typography rationale
├─────────────────────────────────────────────┤
│        5. Logo / Mark Exploration           │  ← Sketches + rejected directions
├─────────────────────────────────────────────┤
│        6. Brand System                      │  ← Color, type, grid, iconography
├─────────────────────────────────────────────┤
│        7. Mockups in Context                │  ← Real-world application
├─────────────────────────────────────────────┤
│        8. Full Deliverables Gallery         │  ← Every final asset, beautifully presented
├─────────────────────────────────────────────┤
│        9. Before / After                    │  ← Interactive comparison slider
├─────────────────────────────────────────────┤
│       10. Client Quote                      │  ← Testimonial for trust
├─────────────────────────────────────────────┤
│       11. CTA                               │  ← Next project + contact
├─────────────────────────────────────────────┤
│                  Footer                     │
└─────────────────────────────────────────────┘
```

---

## File Structure

```
src/
├── app/
│   └── projects/
│       └── [slug]/
│           └── page.tsx
├── components/
│   └── GraphicProjectDetail/
│       ├── GDHook.tsx                  ← Section 1
│       ├── GDSnapshot.tsx              ← Section 2
│       ├── GDBrief.tsx                 ← Section 3
│       ├── GDCreativeDirection.tsx     ← Section 4
│       ├── GDLogoExploration.tsx       ← Section 5
│       ├── GDBrandSystem.tsx           ← Section 6
│       ├── GDMockups.tsx               ← Section 7
│       ├── GDGallery.tsx               ← Section 8
│       ├── GDBeforeAfter.tsx           ← Section 9
│       ├── GDClientQuote.tsx           ← Section 10
│       └── GDCTA.tsx                   ← Section 11
└── data/
    └── gd-projects.ts                  ← Separate data file for GD projects
```

---

## Step 1 — Data File

Create a separate data file for graphic design projects:

**File:** `data/gd-projects.ts`

```ts
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
    slug: 'bloom-bakery',
    title: 'Bloom Bakery',
    tagline: 'A complete brand identity for an artisan bakery — from mark to packaging to in-store experience.',
    year: '2024',
    featured: true,

    heroImage: '/images/gd-projects/bloom-bakery/hero.jpg',
    heroColor: '#F5EFE6',

    snapshot: {
      client: 'Bloom Bakery Co.',
      industry: 'Food & Hospitality',
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
```

---

## Step 2 — Dynamic Route Page

**File:** `app/projects/gd/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation'
import { gdProjects } from '@/data/gd-projects'
import GDHook from '@/components/GraphicProjectDetail/GDHook'
import GDSnapshot from '@/components/GraphicProjectDetail/GDSnapshot'
import GDBrief from '@/components/GraphicProjectDetail/GDBrief'
import GDCreativeDirection from '@/components/GraphicProjectDetail/GDCreativeDirection'
import GDLogoExploration from '@/components/GraphicProjectDetail/GDLogoExploration'
import GDBrandSystem from '@/components/GraphicProjectDetail/GDBrandSystem'
import GDMockups from '@/components/GraphicProjectDetail/GDMockups'
import GDGallery from '@/components/GraphicProjectDetail/GDGallery'
import GDBeforeAfter from '@/components/GraphicProjectDetail/GDBeforeAfter'
import GDClientQuote from '@/components/GraphicProjectDetail/GDClientQuote'
import GDCTA from '@/components/GraphicProjectDetail/GDCTA'

export async function generateStaticParams() {
  return gdProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = gdProjects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Graphic Design`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Graphic Design`,
      description: project.tagline,
      images: [project.heroImage],
    },
  }
}

export default function GDProjectPage({ params }: { params: { slug: string } }) {
  const project = gdProjects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <main>
      <GDHook
        title={project.title}
        tagline={project.tagline}
        heroImage={project.heroImage}
        heroColor={project.heroColor}
      />
      <GDSnapshot {...project.snapshot} />
      <GDBrief {...project.brief} />
      <GDCreativeDirection {...project.creativeDirection} />
      <GDLogoExploration {...project.logoExploration} />
      <GDBrandSystem {...project.brandSystem} />
      <GDMockups {...project.mockups} />
      <GDGallery {...project.gallery} />
      {project.beforeAfter && <GDBeforeAfter {...project.beforeAfter} />}
      {project.clientQuote && <GDClientQuote {...project.clientQuote} />}
      <GDCTA />
    </main>
  )
}
```

---

## Step 3 — Section Components

### GDHook

The hero is the work. No text competing with it.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  title: string
  tagline: string
  heroImage: string
  heroColor?: string
}

export default function GDHook({ title, tagline, heroImage, heroColor }: Props) {
  return (
    <section>
      {/* Full-bleed hero image — no text on top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full"
        style={{ backgroundColor: heroColor ?? 'transparent' }}
      >
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Title below image — not on top of it */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### GDSnapshot

```tsx
'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type Props = {
  client: string
  industry: string
  deliverables: string[]
  year: string
  role: string
}

export default function GDSnapshot({ client, industry, deliverables, year, role }: Props) {
  return (
    <section className="border-y py-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Client', value: client },
            { label: 'Industry', value: industry },
            { label: 'Year', value: year },
            { label: 'Role', value: role },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
              <span className="font-semibold text-sm">{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Deliverables
          </span>
          <div className="flex flex-wrap gap-2">
            {deliverables.map((d) => (
              <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### GDBrief

```tsx
'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  challenge: string
  audience: string
  goals: string[]
}

export default function GDBrief({ heading, challenge, audience, goals }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Challenge + Audience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                {heading}
              </span>
              <Separator className="flex-1" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{challenge}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Audience
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{audience}</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Goals
            </h3>
            <ul className="flex flex-col gap-3">
              {goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border bg-muted/30 text-sm"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

---

### GDCreativeDirection

The most design-forward section — moodboard, color swatches, and type specimens.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  approach: string
  moodboard: { images: string[]; caption: string }
  palette: { name: string; hex: string; usage: string }[]
  typography: { role: string; fontName: string; sample: string; rationale: string }[]
}

export default function GDCreativeDirection({
  heading, approach, moodboard, palette, typography
}: Props) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col gap-16">

        {/* Section label + approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground leading-relaxed">{approach}</p>
        </motion.div>

        {/* Moodboard grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Moodboard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {moodboard.images.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${
                  i === 0 ? 'aspect-[4/3] md:row-span-2' : 'aspect-square'
                }`}
              >
                <Image
                  src={src}
                  alt={`Moodboard image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            {moodboard.caption}
          </p>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Color Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {palette.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div
                  className="w-full aspect-square rounded-xl border shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold">{color.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{color.hex}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{color.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Typography
          </h3>
          <div className="flex flex-col divide-y divide-border">
            {typography.map((type) => (
              <div
                key={type.role}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 py-6 items-start"
              >
                {/* Role label */}
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">
                  {type.role}
                </span>

                {/* Sample */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{type.fontName}</span>
                  <span
                    className="text-4xl md:text-5xl font-bold leading-none tracking-tight"
                    style={{ fontFamily: type.fontName }}
                  >
                    {type.sample}
                  </span>
                </div>

                {/* Rationale */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.rationale}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
```

---

### GDLogoExploration

Shows rejected directions — the most trust-building section for designers.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type Direction = {
  label: string
  image: string
  status: 'rejected' | 'refined' | 'chosen'
  note: string
}

type Props = {
  heading: string
  description: string
  directions: Direction[]
  finalMark: {
    image: string
    darkImage: string
    caption: string
  }
}

const statusConfig = {
  rejected: { label: 'Rejected', variant: 'destructive' as const },
  refined:  { label: 'Refined',  variant: 'secondary' as const },
  chosen:   { label: 'Chosen ✓', variant: 'default' as const },
}

export default function GDLogoExploration({
  heading, description, directions, finalMark
}: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-12">

        {/* Label + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
        </motion.div>

        {/* Directions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-3 p-4 rounded-2xl border ${
                dir.status === 'chosen'
                  ? 'border-primary bg-primary/5'
                  : 'bg-muted/20'
              }`}
            >
              {/* Logo image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
                <Image
                  src={dir.image}
                  alt={dir.label}
                  fill
                  className="object-contain p-6"
                  sizes="33vw"
                />
              </div>

              {/* Label + status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{dir.label}</span>
                <Badge variant={statusConfig[dir.status].variant} className="text-xs shrink-0">
                  {statusConfig[dir.status].label}
                </Badge>
              </div>

              {/* Note */}
              <p className="text-xs text-muted-foreground leading-relaxed">{dir.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Final mark — light + dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Final Mark
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border">
              <Image
                src={finalMark.image}
                alt="Logo on light background"
                fill
                className="object-contain p-10"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-foreground border">
              <Image
                src={finalMark.darkImage}
                alt="Logo on dark background"
                fill
                className="object-contain p-10"
                sizes="50vw"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            {finalMark.caption}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
```

---

### GDMockups

Real-world context — the most visually impactful section.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type MockupItem = {
  label: string
  image: string
  fullWidth?: boolean
}

type Props = {
  heading: string
  description: string
  items: MockupItem[]
}

export default function GDMockups({ heading, description, items }: Props) {
  const fullWidthItems = items.filter((m) => m.fullWidth)
  const gridItems = items.filter((m) => !m.fullWidth)

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={item.fullWidth ? 'w-full' : ''}
            >
              {item.fullWidth ? (
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              ) : null}
            </motion.div>
          ))}

          {/* Grid items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 pb-4">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
```

---

### GDClientQuote

The trust closer — one sentence from the client.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  quote: string
  name: string
  title: string
  avatar?: string
}

export default function GDClientQuote({ quote, name, title, avatar }: Props) {
  return (
    <section className="py-20 border-y bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center"
        >
          {/* Large quote mark */}
          <span className="text-8xl font-serif text-primary/20 leading-none select-none">
            "
          </span>

          <blockquote className="text-2xl md:text-3xl font-medium leading-snug tracking-tight -mt-10">
            {quote}
          </blockquote>

          {/* Client attribution */}
          <div className="flex items-center gap-3">
            {avatar && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### GDCTA

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function GDCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Like what you see?
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              I'm available for brand identity, packaging, and creative direction projects.
              Let's make something worth looking at.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/#contact">Start a Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#portfolio">More Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Image Organization

```
public/
└── images/
    └── gd-projects/
        └── bloom-bakery/
            ├── hero.jpg                      (2400×1100px — 21:9)
            ├── mood-1.jpg                    (800×600px)
            ├── mood-2.jpg
            ├── mood-3.jpg
            ├── mood-4.jpg
            ├── mood-5.jpg
            ├── mood-6.jpg
            ├── logo-direction-a.jpg          (800×800px — square)
            ├── logo-direction-b.jpg
            ├── logo-direction-c.jpg
            ├── logo-final-light.jpg          (1200×675px)
            ├── logo-final-dark.jpg
            ├── brand-system-overview.jpg     (1600×900px)
            ├── system-colors.jpg
            ├── system-type.jpg
            ├── system-pattern.jpg
            ├── system-icons.jpg
            ├── mockup-bags.jpg               (2400×1100px — full width)
            ├── mockup-cards.jpg              (800×800px)
            ├── mockup-cups.jpg
            ├── mockup-tote.jpg
            ├── mockup-signage.jpg            (2400×1100px — full width)
            ├── mockup-social.jpg
            ├── mockup-apron.jpg
            ├── final-1.jpg
            ├── final-2.jpg
            ├── final-3.jpg
            ├── final-4.jpg
            ├── final-5.jpg
            ├── final-6.jpg
            ├── before.jpg
            ├── after.jpg
            └── client-avatar.jpg             (80×80px)
```

---

## Checklist

- [ ] `data/gd-projects.ts` created with full project data
- [ ] `app/projects/gd/[slug]/page.tsx` created
- [ ] All 11 section components created
- [ ] All project images organized in `public/images/gd-projects/[slug]/`
- [ ] Hero image is visually stunning — this is the first impression
- [ ] Color swatches render with correct hex colors
- [ ] Logo directions show correct status badges (Rejected / Chosen)
- [ ] Final mark shows both light and dark versions
- [ ] Full-width mockups use 21:9 aspect ratio
- [ ] Before/After slider is draggable
- [ ] Client quote renders with attribution
- [ ] `generateMetadata` sets OG image to hero image
- [ ] `generateStaticParams` exports all slugs
- [ ] Mobile layout tested — all sections stack cleanly

---

## What Makes This Page Stand Out

| Section | Why Employers Care |
|---|---|
| Full-bleed hero | First impression — if this doesn't stop them, nothing will |
| Brief | Shows you understand strategy, not just aesthetics |
| Creative direction | Proves your visual choices are intentional, not accidental |
| Logo exploration + rejections | The most honest thing a designer can show |
| Color rationale | Separates designers who choose colors from those who pick them |
| Typography rationale | Most designers never explain why — you will |
| Mockups in context | Makes the work feel real and tangible |
| Client quote | Social proof that you deliver, not just design |

---

> The page itself is part of your portfolio. If it's beautifully designed and thoughtfully structured, you've already shown what you can do before they've read a word.
