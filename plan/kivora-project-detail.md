# Project Detail Page — Component Guide

> This is the page that opens when an employer or visitor clicks a project from your Portfolio section.
> Built as a dynamic Next.js route: `app/projects/[slug]/page.tsx`

---

## Page Structure Overview

```
┌─────────────────────────────────────┐
│             Header                  │
├─────────────────────────────────────┤
│          Hero / Top Bar             │  ← Project title + short description
├─────────────────────────────────────┤
│         Hero Image (full width)     │  ← Main project image
│                                     │
│   Project Meta  │  Project Summary  │  ← Category, client, timeline, link | 3 paragraphs
├─────────────────────────────────────┤
│         Gallery Grid                │  ← 4 images with caption labels
├─────────────────────────────────────┤
│         Design Strategy             │  ← Centered text content block
├─────────────────────────────────────┤
│         Parallax Image              │  ← Full-width parallax background
├─────────────────────────────────────┤
│         CTA / Newsletter            │  ← "Let's Talk" or next project prompt
├─────────────────────────────────────┤
│             Footer                  │
└─────────────────────────────────────┘
```

---

## File Structure

```
src/
├── app/
│   └── projects/
│       └── [slug]/
│           └── page.tsx          ← Dynamic project detail page
├── components/
│   └── ProjectDetail/
│       ├── ProjectHero.tsx       ← Top bar with title + description
│       ├── ProjectMeta.tsx       ← Category, client, timeline, live link
│       ├── ProjectGallery.tsx    ← 4-image grid with captions
│       ├── ProjectStrategy.tsx   ← Centered text content block
│       ├── ProjectParallax.tsx   ← Full-width parallax image
│       └── ProjectCTA.tsx        ← Bottom CTA section
└── data/
    └── projects.ts               ← Add detail fields here
```

---

## Step 1 — Update Projects Data File

Extend `data/projects.ts` with the full detail fields each project page needs:

```ts
// data/projects.ts
export type Project = {
  slug: string                    // ← URL: /projects/alchemists-feed
  title: string
  tagline: string                 // ← Short subtitle shown in hero
  category: string
  client: string
  timeline: string
  link: string
  description: string
  year: string
  featured?: boolean
  image: string                   // ← Main hero image
  gallery: {                      // ← 4 gallery images with captions
    src: string
    caption: string
  }[]
  strategy: {                     // ← Design strategy text block
    heading: string
    paragraphs: string[]
  }
  parallaxImage: string           // ← Full-width parallax bg image
  summary: string[]               // ← 2–3 paragraphs next to the meta
}

export const projects: Project[] = [
  {
    slug: 'alchemists-feed',
    title: "The Alchemist's Feed",
    tagline:
      'Where creativity meets data — a digital transformation project that blends storytelling and user experience into one cohesive narrative.',
    category: 'UI & Brand Design',
    client: 'Focal Themes Studio',
    timeline: '12 Weeks',
    link: 'https://yourproject.com',
    description: 'End-to-end redesign of a creative brand platform.',
    year: '2024',
    featured: true,
    image: '/images/projects/alchemists-feed/hero.jpg',
    gallery: [
      { src: '/images/projects/alchemists-feed/gallery-1.jpg', caption: 'Process Overview' },
      { src: '/images/projects/alchemists-feed/gallery-2.jpg', caption: 'Design Refinement Stage' },
      { src: '/images/projects/alchemists-feed/gallery-3.jpg', caption: 'Final Presentation Frames' },
      { src: '/images/projects/alchemists-feed/gallery-4.jpg', caption: 'Live Implementation Preview' },
    ],
    strategy: {
      heading: 'DESIGN STRATEGY',
      paragraphs: [
        'Our strategy revolved around understanding how people emotionally interact with creative content online. We crafted a flexible design system — built on neutral tones, strong type hierarchy, and high-contrast compositions.',
        'We prototyped multiple motion flows using Figma and GSAP before finalizing the scroll-triggered sequences. This iterative process helped us refine the pacing, ensuring each section feels cinematic yet purposeful.',
        'Every micro-interaction — from hover states to transition delays — was tuned to create a sense of rhythm and discovery.',
      ],
    },
    parallaxImage: '/images/projects/alchemists-feed/parallax.jpg',
    summary: [
      'This project explores how minimalist design and modern typography can communicate creativity without unnecessary noise.',
      'Our focus was to highlight brand personality through subtle animation, bold type, and fluid composition. The layout adapts across all devices.',
      'The result is a fully responsive, high-performing experience where aesthetics meet usability — built for creators, strategists, and storytellers.',
    ],
  },
]
```

---

## Step 2 — Dynamic Route Page

**File:** `app/projects/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import ProjectHero from '@/components/ProjectDetail/ProjectHero'
import ProjectMeta from '@/components/ProjectDetail/ProjectMeta'
import ProjectGallery from '@/components/ProjectDetail/ProjectGallery'
import ProjectStrategy from '@/components/ProjectDetail/ProjectStrategy'
import ProjectParallax from '@/components/ProjectDetail/ProjectParallax'
import ProjectCTA from '@/components/ProjectDetail/ProjectCTA'

// Generate static paths for all projects at build time
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// Generate metadata per project
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Portfolio`,
    description: project.tagline,
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <main>
      <ProjectHero title={project.title} tagline={project.tagline} />

      {/* Hero image + meta + summary */}
      <section className="container mx-auto px-6 pb-16">
        <ProjectMeta
          heroImage={project.image}
          category={project.category}
          client={project.client}
          timeline={project.timeline}
          link={project.link}
          summary={project.summary}
        />
      </section>

      {/* Gallery */}
      <ProjectGallery images={project.gallery} />

      {/* Strategy text */}
      <ProjectStrategy
        heading={project.strategy.heading}
        paragraphs={project.strategy.paragraphs}
      />

      {/* Parallax */}
      <ProjectParallax image={project.parallaxImage} />

      {/* CTA */}
      <ProjectCTA />
    </main>
  )
}
```

---

## Step 3 — ProjectHero Component

Full-width top bar with project title and tagline, with a background image.

**File:** `components/ProjectDetail/ProjectHero.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'

type Props = {
  title: string
  tagline: string
}

export default function ProjectHero({ title, tagline }: Props) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-muted">

      {/* Background decorative image (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/inner-bg.png')] bg-cover bg-center" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'power2.out' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Step 4 — ProjectMeta Component

Hero image + two-column layout: project details on the left, summary paragraphs on the right.

**File:** `components/ProjectDetail/ProjectMeta.tsx`

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { Separator } from '@/components/ui/separator'

type Props = {
  heroImage: string
  category: string
  client: string
  timeline: string
  link: string
  summary: string[]
}

export default function ProjectMeta({
  heroImage, category, client, timeline, link, summary
}: Props) {
  return (
    <div className="flex flex-col gap-10">

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden"
      >
        <Image
          src={heroImage}
          alt="Project hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Meta + Summary two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left — Project Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {[
              { label: 'Category', value: category },
              { label: 'Client', value: client },
              { label: 'Timeline', value: timeline },
            ].map((item) => (
              <li key={item.label} className="flex justify-between py-4">
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                <span className="text-sm font-semibold">{item.value}</span>
              </li>
            ))}
            <li className="flex justify-between py-4">
              <span className="text-sm text-muted-foreground font-medium">Link</span>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Visit Live Project <FiExternalLink size={12} />
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Right — Summary Paragraphs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {summary.map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-sm">
              {para}
            </p>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
```

---

## Step 5 — ProjectGallery Component

4-image horizontal scroll gallery with caption labels on hover.

**File:** `components/ProjectDetail/ProjectGallery.tsx`

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type GalleryImage = {
  src: string
  caption: string
}

type Props = {
  images: GalleryImage[]
}

export default function ProjectGallery({ images }: Props) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl aspect-[3/4]"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Caption overlay */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm font-semibold">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Step 6 — ProjectStrategy Component

Centered text block — heading + paragraphs. Mirrors the "Design Strategy" section in the original.

**File:** `components/ProjectDetail/ProjectStrategy.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  paragraphs: string[]
}

export default function ProjectStrategy({ heading, paragraphs }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Step 7 — ProjectParallax Component

Full-width parallax background image using GSAP ScrollTrigger.

**File:** `components/ProjectDetail/ProjectParallax.tsx`

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = {
  image: string
}

export default function ProjectParallax({ image }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative h-[50vh] overflow-hidden my-16">
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-background/20" />
    </section>
  )
}
```

---

## Step 8 — ProjectCTA Component

Bottom CTA section prompting the viewer to get in touch or view more work.

**File:** `components/ProjectDetail/ProjectCTA.tsx`

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ProjectCTA() {
  return (
    <section className="py-20 border-t">
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
              Let's <span className="text-primary">work together.</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Have a project in mind? I'd love to hear about it. Let's create something great.
            </p>
          </div>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/#contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#portfolio">View More Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Step 9 — Link Portfolio Cards to Detail Page

Update `data/projects.ts` — the Portfolio cards on the main page now link to the detail page instead of an external URL:

```tsx
// components/Portfolio/Portfolio.tsx — inside ProjectCard
import Link from 'next/link'

// Change this:
<Link href={project.link} target="_blank">

// To this:
<Link href={`/projects/${project.slug}`}>
  View Project <FiArrowRight size={14} />
</Link>
```

---

## Step 10 — Add Images

Organize project images like this:

```
public/
└── images/
    └── projects/
        └── alchemists-feed/
            ├── hero.jpg          (1600x900px recommended)
            ├── gallery-1.jpg     (600x800px — portrait)
            ├── gallery-2.jpg
            ├── gallery-3.jpg
            ├── gallery-4.jpg
            └── parallax.jpg      (1600x900px recommended)
```

---

## Section Summary

| Section | Component | Key Feature |
|---|---|---|
| Hero / Top Bar | `ProjectHero` | Title + tagline, fade-in on load |
| Hero Image + Meta | `ProjectMeta` | Full-width image, 2-col meta grid |
| Gallery | `ProjectGallery` | 4-col grid, hover caption overlay |
| Design Strategy | `ProjectStrategy` | Centered text, section label |
| Parallax | `ProjectParallax` | GSAP ScrollTrigger parallax bg |
| CTA | `ProjectCTA` | Links back to contact + portfolio |

---

## Checklist

- [ ] `data/projects.ts` updated with `slug`, `gallery`, `strategy`, `parallaxImage`, `summary` fields
- [ ] `app/projects/[slug]/page.tsx` created
- [ ] All 6 `ProjectDetail` components created
- [ ] Portfolio cards updated to link to `/projects/[slug]`
- [ ] Project images organized in `public/images/projects/[slug]/`
- [ ] `generateStaticParams` exports all project slugs
- [ ] `generateMetadata` sets title and description per project
- [ ] `notFound()` handles invalid slugs gracefully
- [ ] Gallery hover captions work on desktop
- [ ] Parallax scrolls correctly
- [ ] CTA links back to `/#contact` and `/#portfolio`
- [ ] Page is responsive on mobile

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `/projects/[slug]` returns 404 | Check `generateStaticParams` is exporting the correct slug values |
| Parallax not working | Make sure `ScrollTrigger` is registered and `scrub: true` is set |
| Gallery images not showing | Verify paths match exactly under `public/images/projects/[slug]/` |
| Hero image stretched | Confirm `object-cover` is on the `Image` component |
| CTA links broken | Use `/#contact` and `/#portfolio` for same-page anchor links |

---

> This completes the full Kivora Next.js portfolio build. You now have a home page + individual project detail pages.
