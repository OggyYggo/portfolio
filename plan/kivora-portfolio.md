# Portfolio — Component Guide

> Part of Phase C (Polish) — Build this after Experience.

---

## File Structure

```
src/
├── components/
│   └── Portfolio/
│       └── Portfolio.tsx
├── data/
│   └── projects.ts
└── public/
    └── images/
        └── projects/
            ├── project-1.jpg
            ├── project-2.jpg
            └── ...
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Card`, `CardContent` | Project image + info container |
| `Badge` | Category filter buttons + project tags |
| `Separator` | Section divider |

---

## Step 1 — Create Your Projects Data File

```ts
// data/projects.ts
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
```

---

## Step 2 — Build the Portfolio Component

**File:** `components/Portfolio/Portfolio.tsx`

```tsx
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FiExternalLink } from 'react-icons/fi'
import { projects, categories } from '@/data/projects'
import type { Category } from '@/data/projects'

gsap.registerPlugin(useGSAP)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Portfolio
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        Selected <span className="text-primary">work.</span>
      </motion.h2>

      {/* Category Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="focus:outline-none"
          >
            <Badge
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-1.5 text-xs transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {cat}
            </Badge>
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // GSAP hover — overlay fade in/out
  const { contextSafe } = useGSAP({ scope: cardRef })

  const onEnter = contextSafe(() => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: 'power2.out' })
  })

  const onLeave = contextSafe(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.in' })
  })

  return (
    <div ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Card className="overflow-hidden group border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Hover Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 opacity-0"
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Project <FiExternalLink size={14} />
              </Link>
              <p className="text-xs text-muted-foreground text-center px-6">
                {project.description}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm leading-tight">{project.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{project.year}</p>
            </div>
            {project.featured && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="text-xs shrink-0">
              {project.category}
            </Badge>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Step 3 — Add Portfolio to Page

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Experience from '@/components/Experience/Experience'
import Portfolio from '@/components/Portfolio/Portfolio'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        <Sidebar />

        <main className="flex flex-col gap-16">
          <About />
          <Skills />
          <Experience />
          <Portfolio />
          {/* Contact goes here */}
        </main>

      </div>
    </div>
  )
}
```

---

## Step 4 — Add Your Project Images

Place your project images in:

```
public/
└── images/
    └── projects/
        ├── project-1.jpg   (recommended: 800x600px)
        ├── project-2.jpg
        └── ...
```

> Recommended aspect ratio: **4:3** — matches the `aspect-[4/3]` set on the image container.

---

## How the Filter Works

```
Click category badge → setActiveCategory updates state
→ filtered array recalculates
→ AnimatePresence handles exit animation of removed cards
→ new cards animate in with opacity + scale
→ layout prop on the grid smoothly repositions remaining cards
```

---

## Checklist

- [ ] `data/projects.ts` created with your real projects
- [ ] Project images placed in `public/images/projects/`
- [ ] `Portfolio.tsx` created
- [ ] Portfolio imported and added to `app/page.tsx`
- [ ] Category filter buttons work and update the grid
- [ ] Cards animate in/out when filter changes
- [ ] Hover overlay appears with project link and description
- [ ] `Featured` badge shows on marked projects
- [ ] Images use `next/image` with `fill` and correct `sizes`
- [ ] Grid is 2 columns on tablet/desktop, 1 column on mobile

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Images not showing | Check file paths match exactly — filenames are case-sensitive |
| Filter not working | Verify `category` values in `projects.ts` match `categories` array exactly |
| Hover overlay not animating | Confirm `overlayRef` is attached to the correct div |
| Cards not animating on filter | Make sure `AnimatePresence` wraps the mapped cards and `key` is unique per project |
| Layout shift on filter | Ensure `layout` prop is on both the grid wrapper and each card's motion div |
| `next/image` error | Add your domain to `images.domains` in `next.config.ts` if loading from external URLs |

---

> Next up: **Contact** — CTA section with shadcn Button and optional form.
