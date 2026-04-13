# Skills — Component Guide

> Part of Phase B (Content) — Build this after About.

---

## File Structure

```
src/
├── components/
│   └── Skills/
│       └── Skills.tsx
└── data/
    └── skills.ts
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Progress` | Animated skill percentage bar |
| `Separator` | Section divider |
| `Badge` | Category label |

Install if not already added:

```bash
npx shadcn@latest add progress
```

---

## Step 1 — Create Your Skills Data File

```ts
// data/skills.ts
export type Skill = {
  label: string
  percentage: number
  category: 'Design' | 'Development' | 'Tools'
}

export const skills: Skill[] = [
  // Design
  { label: 'UI Design',       percentage: 92, category: 'Design' },
  { label: 'UX Research',     percentage: 85, category: 'Design' },
  { label: 'Prototyping',     percentage: 88, category: 'Design' },
  { label: 'Branding',        percentage: 80, category: 'Design' },

  // Development
  { label: 'React / Next.js', percentage: 87, category: 'Development' },
  { label: 'TypeScript',      percentage: 82, category: 'Development' },
  { label: 'Tailwind CSS',    percentage: 90, category: 'Development' },
  { label: 'Node.js',         percentage: 72, category: 'Development' },

  // Tools
  { label: 'Figma',           percentage: 95, category: 'Tools' },
  { label: 'Framer',          percentage: 78, category: 'Tools' },
  { label: 'Git / GitHub',    percentage: 85, category: 'Tools' },
]
```

---

## Step 2 — Build the Skills Component

**File:** `components/Skills/Skills.tsx`

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { skills } from '@/data/skills'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const categories = ['Design', 'Development', 'Tools'] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate progress bars width on scroll into view
  useGSAP(() => {
    const bars = containerRef.current?.querySelectorAll('.skill-bar')

    bars?.forEach((bar) => {
      const target = bar.getAttribute('data-value') ?? '0'

      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${target}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="skills" className="flex flex-col gap-8">

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
          Skills
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
        What I <span className="text-primary">work with.</span>
      </motion.h2>

      {/* Skills by Category */}
      <div ref={containerRef} className="flex flex-col gap-10">
        {categories.map((category, ci) => {
          const categorySkills = skills.filter((s) => s.category === category)

          return (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              {/* Category Badge */}
              <Badge variant="secondary" className="w-fit text-xs">
                {category}
              </Badge>

              {/* Skill Bars */}
              <div className="flex flex-col gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{skill.label}</span>
                      <span className="text-muted-foreground">{skill.percentage}%</span>
                    </div>

                    {/* Custom animated bar using GSAP */}
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-primary rounded-full"
                        data-value={skill.percentage}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
```

---

## Step 3 — Add Skills to Page

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        <Sidebar />

        <main className="flex flex-col gap-16">
          <About />
          <Skills />
          {/* Experience, Portfolio, Contact go here */}
        </main>

      </div>
    </div>
  )
}
```

---

## How the Animation Works

The shadcn `Progress` component animates via React state, but for precise scroll-triggered control we use a **custom div** with GSAP `ScrollTrigger` instead:

```
User scrolls → ScrollTrigger fires → GSAP animates width: 0% → width: XX%
```

Each bar has a `data-value` attribute holding the target percentage. GSAP reads this and animates accordingly. The `once: true` flag ensures bars only animate the first time they enter the viewport.

---

## Checklist

- [ ] `data/skills.ts` created with your real skills and percentages
- [ ] shadcn `Progress` installed (even if using custom bar)
- [ ] `Skills.tsx` created
- [ ] Skills imported and added to `app/page.tsx`
- [ ] Skills grouped by category (Design / Development / Tools)
- [ ] Bars animate from 0% on scroll into view
- [ ] Bars only animate once (not on scroll up)
- [ ] Percentages display correctly next to each label
- [ ] `ScrollTrigger` registered at the top of the file

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Bars not animating | Make sure `ScrollTrigger` is registered with `gsap.registerPlugin(ScrollTrigger)` |
| All bars animate at once | Check `scrollTrigger.trigger` is set to the individual `bar` element |
| Bars stay at 0% | Confirm `data-value` attribute is set on each `.skill-bar` div |
| Categories not filtering | Check the `category` values in `skills.ts` match the `categories` array exactly |
| Animation fires on page load instead of scroll | Make sure `start: 'top 90%'` and `once: true` are set in ScrollTrigger config |

---

> Next up: **Experience** — Work history timeline with shadcn Cards and Framer Motion stagger.
