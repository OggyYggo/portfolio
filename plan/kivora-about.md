# About — Component Guide

> Part of Phase B (Content) — First content section after the shell.

---

## File Structure

```
src/
├── components/
│   └── About/
│       └── About.tsx
└── data/
    └── profile.ts   ← add bio and stats here
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Separator` | Visual divider between bio and stats |
| `Badge` | Skill/service tags |

---

## Step 1 — Update Your Data File

Add `bio`, `stats`, and `services` to `data/profile.ts`:

```ts
// data/profile.ts
export const profile = {
  // ... existing fields

  bio: `I'm a UI/UX Designer and Frontend Developer with a passion for crafting
  clean, functional, and visually compelling digital experiences. I bridge the
  gap between design and code — from wireframes to fully deployed products.`,

  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '120+', label: 'Projects Completed' },
    { value: '40+', label: 'Happy Clients' },
    { value: '12+', label: 'Awards Won' },
  ],

  services: [
    'UI Design',
    'UX Research',
    'Frontend Dev',
    'Branding',
    'Prototyping',
  ],
}
```

---

## Step 2 — Build the About Component

**File:** `components/About/About.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { profile } from '@/data/profile'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="flex flex-col gap-8">

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
          About Me
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
        className="text-3xl md:text-4xl font-bold leading-snug tracking-tight"
      >
        Designing experiences, <br />
        <span className="text-primary">building products.</span>
      </motion.h2>

      {/* Bio */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-muted-foreground leading-relaxed text-base"
      >
        {profile.bio}
      </motion.p>

      {/* Services / Tags */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {profile.services.map((service) => (
          <Badge key={service} variant="outline" className="text-xs px-3 py-1">
            {service}
          </Badge>
        ))}
      </motion.div>

      <Separator />

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {profile.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary">{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
```

---

## Step 3 — Add About to Page

Slot it into the main content column in `app/page.tsx`:

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        <Sidebar />

        <main className="flex flex-col gap-16">
          <About />
          {/* Skills, Experience, Portfolio, Contact go here */}
        </main>

      </div>
    </div>
  )
}
```

---

## Animation Reference

All animations use Framer Motion's `whileInView` with `once: true` so they only trigger once as the user scrolls down.

| Element | Delay | Effect |
|---|---|---|
| Section label | 0s | Fade up |
| Heading | 0.1s | Fade up |
| Bio paragraph | 0.2s | Fade up |
| Service badges | 0.3s | Fade up |
| Stats grid | 0.4s | Fade up |

To make animations feel snappier, reduce `duration` to `0.4`. For a more cinematic feel, increase to `0.7`.

---

## Checklist

- [ ] `bio`, `stats`, and `services` added to `data/profile.ts`
- [ ] `About.tsx` created
- [ ] About imported and added to `app/page.tsx`
- [ ] Section label and heading render correctly
- [ ] Bio text displays from `profile.bio`
- [ ] Service badges render from `profile.services`
- [ ] Stats grid shows 4 items in a row on desktop
- [ ] All elements animate on scroll
- [ ] Animations only trigger once (not on scroll up)

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Animations not triggering | Make sure `viewport={{ once: true }}` is set and the element is below the fold |
| Stats not in a row on mobile | The grid uses `grid-cols-2` on mobile — expected behavior |
| Bio text shows `undefined` | Check that `bio` is exported from `data/profile.ts` |
| Badges wrapping oddly | Ensure the parent has `flex flex-wrap gap-2` |
| Framer Motion not installed | Run `npm install framer-motion` |

---

> Next up: **Skills** — Animated Progress bars with shadcn + GSAP.
