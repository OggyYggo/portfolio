# Experience — Component Guide

> Part of Phase B (Content) — Build this after Skills.

---

## File Structure

```
src/
├── components/
│   └── Experience/
│       └── Experience.tsx
└── data/
    └── experience.ts
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Card`, `CardHeader`, `CardContent` | Job entry container |
| `Badge` | Employment type label (Full-time, Freelance, etc.) |
| `Separator` | Section divider |

Install if not already added:

```bash
npx shadcn@latest add card
```

---

## Step 1 — Create Your Experience Data File

```ts
// data/experience.ts
export type Experience = {
  role: string
  company: string
  period: string
  type: 'Full-time' | 'Freelance' | 'Contract' | 'Internship'
  location: string
  description: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: 'Senior UI/UX Designer',
    company: 'Company Name',
    period: '2022 — Present',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Led end-to-end design for multiple SaaS products, working closely with product and engineering teams to ship high-quality user interfaces.',
    highlights: [
      'Redesigned the core dashboard — reduced user drop-off by 30%',
      'Built and maintained a company-wide design system in Figma',
      'Mentored 2 junior designers and conducted weekly design reviews',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Another Company',
    period: '2020 — 2022',
    type: 'Full-time',
    location: 'On-site',
    description:
      'Developed responsive web applications using React and TypeScript, collaborating with designers to bring Figma mockups to pixel-perfect production code.',
    highlights: [
      'Built 10+ reusable component libraries used across 3 products',
      'Improved Lighthouse performance score from 62 to 94',
      'Introduced Storybook for component documentation',
    ],
  },
  {
    role: 'UI Designer',
    company: 'Freelance',
    period: '2018 — 2020',
    type: 'Freelance',
    location: 'Remote',
    description:
      'Delivered branding, UI design, and landing page development for small businesses and startups across various industries.',
    highlights: [
      'Completed 40+ projects for clients across 8 countries',
      'Average client satisfaction rating of 4.9 / 5',
    ],
  },
]
```

---

## Step 2 — Build the Experience Component

**File:** `components/Experience/Experience.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { experience } from '@/data/experience'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

const badgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  'Full-time': 'default',
  'Freelance': 'secondary',
  'Contract': 'outline',
  'Internship': 'outline',
}

export default function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Experience
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        Where I've <span className="text-primary">worked.</span>
      </motion.h2>

      {/* Timeline */}
      <div className="relative flex flex-col gap-6">

        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

        {experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative sm:pl-14"
          >
            {/* Timeline dot */}
            <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full bg-primary ring-4 ring-background hidden sm:block" />

            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{job.role}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={badgeVariant[job.type] ?? 'outline'}>
                      {job.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>

                {/* Highlights */}
                <ul className="flex flex-col gap-2">
                  {job.highlights.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
```

---

## Step 3 — Add Experience to Page

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Experience from '@/components/Experience/Experience'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        <Sidebar />

        <main className="flex flex-col gap-16">
          <About />
          <Skills />
          <Experience />
          {/* Portfolio, Contact go here */}
        </main>

      </div>
    </div>
  )
}
```

---

## How the Timeline Works

```
Vertical line  →  absolute left-positioned border
Timeline dot   →  absolute circle anchored to each card
Cards          →  offset with sm:pl-14 to clear the dot
Stagger        →  Framer Motion custom variant with delay: i * 0.12
```

On mobile the vertical line and dots are hidden (`hidden sm:block`) and cards render full width — no offset needed.

---

## Checklist

- [ ] `data/experience.ts` created with your real work history
- [ ] shadcn `Card` installed
- [ ] `Experience.tsx` created
- [ ] Experience imported and added to `app/page.tsx`
- [ ] Timeline vertical line renders on desktop
- [ ] Timeline dots align correctly with each card
- [ ] Cards stagger in on scroll
- [ ] Badge colors match employment type
- [ ] Highlight bullet points render correctly
- [ ] Mobile layout stacks cleanly without timeline line

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Timeline line not showing | Check `absolute left-5` on the line div and `relative` on the parent |
| Dots misaligned | Adjust `top-5` on the dot to vertically center with the card header |
| Cards not staggering | Make sure `custom={i}` is passed and `variants={fadeUp}` uses the custom function |
| Badge color wrong | Check `badgeVariant` map keys match the `type` values in `experience.ts` exactly |
| Cards overlapping on mobile | Confirm `sm:pl-14` is only applied at `sm` breakpoint and not on mobile |

---

> Next up: **Portfolio** — Project grid with shadcn Cards, Badge filters, and GSAP hover effects.
