# UI/UX Project Detail Page — Enhanced Guide

> A project detail page built to impress employers and clients.
> Shows your thinking process, not just your final designs.

---

## Page Structure Overview

```
┌─────────────────────────────────────────┐
│               Header                    │
├─────────────────────────────────────────┤
│         1. Hook / Hero                  │  ← Title, problem statement, role
├─────────────────────────────────────────┤
│         2. Project Overview             │  ← Client, timeline, role, tools
├─────────────────────────────────────────┤
│         3. The Problem                  │  ← Pain point, context, why it matters
├─────────────────────────────────────────┤
│         4. Research & Discovery         │  ← Interviews, personas, journey maps
├─────────────────────────────────────────┤
│         5. Early Thinking               │  ← Sketches, wireframes, low-fi
├─────────────────────────────────────────┤
│         6. Design Decisions             │  ← Why this, not that
├─────────────────────────────────────────┤
│         7. Final Designs                │  ← Mockups, device previews, Figma embed
├─────────────────────────────────────────┤
│         8. Before / After               │  ← Side-by-side comparison slider
├─────────────────────────────────────────┤
│         9. Results                      │  ← Metrics, impact, outcomes
├─────────────────────────────────────────┤
│        10. Reflection                   │  ← What you'd do differently
├─────────────────────────────────────────┤
│        11. CTA                          │  ← Next project + contact
├─────────────────────────────────────────┤
│               Footer                    │
└─────────────────────────────────────────┘
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
│   └── ProjectDetail/
│       ├── ProjectHook.tsx           ← Section 1
│       ├── ProjectOverview.tsx       ← Section 2
│       ├── ProjectProblem.tsx        ← Section 3
│       ├── ProjectResearch.tsx       ← Section 4
│       ├── ProjectEarlyThinking.tsx  ← Section 5
│       ├── ProjectDecisions.tsx      ← Section 6
│       ├── ProjectFinalDesigns.tsx   ← Section 7
│       ├── ProjectBeforeAfter.tsx    ← Section 8
│       ├── ProjectResults.tsx        ← Section 9
│       ├── ProjectReflection.tsx     ← Section 10
│       └── ProjectCTA.tsx            ← Section 11
└── data/
    └── projects.ts
```

---

## Step 1 — Update Projects Data File

Replace the existing `data/projects.ts` with this expanded type:

```ts
// data/projects.ts

export type Project = {
  // ── Core ──────────────────────────────────────────
  slug: string
  title: string
  tagline: string               // One-line problem statement
  year: string
  featured?: boolean

  // ── Section 1: Hook ───────────────────────────────
  heroImage: string             // Full-width opening image
  role: string                  // e.g. "Lead UI/UX Designer"
  problemStatement: string      // 1–2 sentences: what was broken

  // ── Section 2: Overview ───────────────────────────
  overview: {
    client: string
    timeline: string
    role: string
    tools: string[]             // e.g. ['Figma', 'FigJam', 'Maze']
    link?: string
  }

  // ── Section 3: Problem ────────────────────────────
  problem: {
    heading: string
    body: string[]              // 2–3 paragraphs
    painPoints: string[]        // bullet list of user pain points
  }

  // ── Section 4: Research ───────────────────────────
  research: {
    heading: string
    methods: {
      title: string             // e.g. "User Interviews"
      description: string
      image?: string
    }[]
    insights: string[]          // Key takeaways from research
  }

  // ── Section 5: Early Thinking ─────────────────────
  earlyThinking: {
    heading: string
    description: string
    images: {
      src: string
      caption: string
    }[]
  }

  // ── Section 6: Design Decisions ───────────────────
  decisions: {
    heading: string
    items: {
      decision: string          // e.g. "Why a bottom nav, not a hamburger"
      reasoning: string
      image?: string
    }[]
  }

  // ── Section 7: Final Designs ──────────────────────
  finalDesigns: {
    heading: string
    description: string
    images: {
      src: string
      caption: string
    }[]
    figmaEmbed?: string         // Figma prototype embed URL
  }

  // ── Section 8: Before / After ─────────────────────
  beforeAfter?: {
    heading: string
    description: string
    before: string              // Image path
    after: string               // Image path
  }

  // ── Section 9: Results ────────────────────────────
  results: {
    heading: string
    description: string
    metrics: {
      value: string             // e.g. "+40%"
      label: string             // e.g. "Task completion rate"
    }[]
    qualitative?: string[]      // Quotes or non-numeric outcomes
  }

  // ── Section 10: Reflection ────────────────────────
  reflection: {
    heading: string
    body: string[]
    wouldDoDifferently: string[]
  }
}

// ─── Example Project ─────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'fintech-dashboard',
    title: 'Fintech Dashboard Redesign',
    tagline: 'Users were abandoning the app because the dashboard felt overwhelming. We redesigned it from the ground up.',
    year: '2024',
    featured: true,

    heroImage: '/images/projects/fintech-dashboard/hero.jpg',
    role: 'Lead UI/UX Designer',
    problemStatement: 'A B2B fintech platform had a 68% drop-off rate on their main dashboard. Users could not find what they needed — and were switching to competitors.',

    overview: {
      client: 'FinFlow Inc.',
      timeline: '10 Weeks',
      role: 'Lead UI/UX Designer',
      tools: ['Figma', 'FigJam', 'Maze', 'Notion', 'Hotjar'],
      link: 'https://yourproject.com',
    },

    problem: {
      heading: 'The Problem',
      body: [
        'FinFlow\'s dashboard had grown organically over 4 years — every new feature was bolted on without a coherent system. Users faced information overload the moment they logged in.',
        'Support tickets about "can\'t find X" made up 43% of all inbound requests. The product team knew something was wrong but didn\'t know where to start.',
      ],
      painPoints: [
        'Critical data buried 3–4 clicks deep',
        'No visual hierarchy — everything looked equally important',
        'Mobile experience was completely broken',
        'No onboarding for new users',
        'Dark mode not supported despite user requests',
      ],
    },

    research: {
      heading: 'Research & Discovery',
      methods: [
        {
          title: 'User Interviews',
          description: 'Conducted 8 moderated interviews with existing users across 3 company sizes. Focused on daily workflows and biggest frustrations.',
          image: '/images/projects/fintech-dashboard/research-interviews.jpg',
        },
        {
          title: 'Heatmap Analysis',
          description: 'Used Hotjar to analyze 2 weeks of session recordings. Discovered users were rage-clicking on non-interactive elements.',
          image: '/images/projects/fintech-dashboard/research-heatmap.jpg',
        },
        {
          title: 'Competitor Analysis',
          description: 'Audited 5 competing fintech dashboards. Identified patterns around information architecture and progressive disclosure.',
        },
        {
          title: 'Card Sorting',
          description: 'Remote card sorting with 12 participants to understand how users mentally group financial data.',
        },
      ],
      insights: [
        'Users check their balance and recent transactions first — every time',
        'Power users want density; casual users want simplicity — need to serve both',
        'Mobile usage was 38% but the mobile experience was nearly unusable',
        'Trust signals (security badges, last login) reduced anxiety significantly',
      ],
    },

    earlyThinking: {
      heading: 'Early Thinking',
      description: 'Before touching Figma, we sketched on paper and whiteboarded information architecture options. Low-fi first forces focus on structure over aesthetics.',
      images: [
        { src: '/images/projects/fintech-dashboard/sketch-1.jpg', caption: 'Initial whiteboard session — IA exploration' },
        { src: '/images/projects/fintech-dashboard/sketch-2.jpg', caption: 'Paper sketches — 3 layout directions' },
        { src: '/images/projects/fintech-dashboard/wireframe-1.jpg', caption: 'Low-fi wireframes — desktop' },
        { src: '/images/projects/fintech-dashboard/wireframe-2.jpg', caption: 'Low-fi wireframes — mobile' },
      ],
    },

    decisions: {
      heading: 'Design Decisions',
      items: [
        {
          decision: 'Progressive disclosure over all-at-once',
          reasoning: 'Research showed power users and casual users had completely different needs. We built a dashboard that shows the most critical data upfront, with expandable modules for deeper analysis — satisfying both user types without overwhelming either.',
          image: '/images/projects/fintech-dashboard/decision-1.jpg',
        },
        {
          decision: 'Persistent sidebar over hamburger menu',
          reasoning: 'Mobile testing showed users couldn\'t find secondary navigation with a hamburger menu. A collapsible sidebar kept navigation visible and reduced time-to-task by 34% in usability tests.',
          image: '/images/projects/fintech-dashboard/decision-2.jpg',
        },
        {
          decision: 'Data visualization over raw numbers',
          reasoning: 'Users said they wanted to "understand trends at a glance." Replacing data tables with sparklines and micro-charts reduced cognitive load and improved satisfaction scores in testing.',
        },
      ],
    },

    finalDesigns: {
      heading: 'Final Designs',
      description: 'After 3 rounds of usability testing and iteration, here\'s the final result. Every screen was built as a component in Figma and handed off with a documented design system.',
      images: [
        { src: '/images/projects/fintech-dashboard/final-1.jpg', caption: 'Dashboard — Desktop' },
        { src: '/images/projects/fintech-dashboard/final-2.jpg', caption: 'Dashboard — Mobile' },
        { src: '/images/projects/fintech-dashboard/final-3.jpg', caption: 'Transaction Detail View' },
        { src: '/images/projects/fintech-dashboard/final-4.jpg', caption: 'Onboarding Flow' },
        { src: '/images/projects/fintech-dashboard/final-5.jpg', caption: 'Dark Mode' },
        { src: '/images/projects/fintech-dashboard/final-6.jpg', caption: 'Design System — Components' },
      ],
      figmaEmbed: 'https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL',
    },

    beforeAfter: {
      heading: 'Before & After',
      description: 'The same dashboard screen — before the redesign and after. Same data, completely different experience.',
      before: '/images/projects/fintech-dashboard/before.jpg',
      after: '/images/projects/fintech-dashboard/after.jpg',
    },

    results: {
      heading: 'Results',
      description: 'Measured 6 weeks after launch using Hotjar, Maze, and in-app analytics.',
      metrics: [
        { value: '68%→12%', label: 'Dashboard drop-off rate' },
        { value: '+41%', label: 'Task completion rate' },
        { value: '4.1→4.7', label: 'App store rating' },
        { value: '-38%', label: 'Support tickets about navigation' },
      ],
      qualitative: [
        '"This actually makes sense now." — Power user, 4 years on platform',
        'Mobile DAU increased 22% within the first month of launch',
        'The design system reduced dev handoff time by half on subsequent features',
      ],
    },

    reflection: {
      heading: 'Reflection',
      body: [
        'This was one of the most complex information architecture challenges I\'ve worked on. The hardest part wasn\'t designing a good layout — it was getting stakeholders aligned on what "good" meant for their very different user segments.',
        'The card sorting exercise was invaluable. Without it, we would have organized the dashboard by feature (the developer\'s mental model) instead of by task (the user\'s mental model).',
      ],
      wouldDoDifferently: [
        'Run usability tests earlier — we waited until hi-fi and had to redo more than expected',
        'Involve engineers in the IA phase — some of our navigation ideas had hidden complexity that caused dev delays',
        'Set up proper analytics before launch to get a true baseline — we had to estimate some before-state metrics',
      ],
    },
  },
]
```

---

## Step 2 — Dynamic Route Page

**File:** `app/projects/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import ProjectHook from '@/components/ProjectDetail/ProjectHook'
import ProjectOverview from '@/components/ProjectDetail/ProjectOverview'
import ProjectProblem from '@/components/ProjectDetail/ProjectProblem'
import ProjectResearch from '@/components/ProjectDetail/ProjectResearch'
import ProjectEarlyThinking from '@/components/ProjectDetail/ProjectEarlyThinking'
import ProjectDecisions from '@/components/ProjectDetail/ProjectDecisions'
import ProjectFinalDesigns from '@/components/ProjectDetail/ProjectFinalDesigns'
import ProjectBeforeAfter from '@/components/ProjectDetail/ProjectBeforeAfter'
import ProjectResults from '@/components/ProjectDetail/ProjectResults'
import ProjectReflection from '@/components/ProjectDetail/ProjectReflection'
import ProjectCTA from '@/components/ProjectDetail/ProjectCTA'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.tagline,
      images: [project.heroImage],
    },
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <main className="flex flex-col">
      <ProjectHook
        title={project.title}
        tagline={project.tagline}
        role={project.role}
        heroImage={project.heroImage}
        problemStatement={project.problemStatement}
      />
      <ProjectOverview {...project.overview} />
      <ProjectProblem {...project.problem} />
      <ProjectResearch {...project.research} />
      <ProjectEarlyThinking {...project.earlyThinking} />
      <ProjectDecisions {...project.decisions} />
      <ProjectFinalDesigns {...project.finalDesigns} />
      {project.beforeAfter && <ProjectBeforeAfter {...project.beforeAfter} />}
      <ProjectResults {...project.results} />
      <ProjectReflection {...project.reflection} />
      <ProjectCTA />
    </main>
  )
}
```

---

## Step 3 — Section Components

### ProjectHook

```tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  tagline: string
  role: string
  heroImage: string
  problemStatement: string
}

export default function ProjectHook({ title, tagline, role, heroImage, problemStatement }: Props) {
  return (
    <section className="flex flex-col">

      {/* Text Hero */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl flex flex-col gap-6"
        >
          <Badge variant="outline" className="w-fit">{role}</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {problemStatement}
          </p>
        </motion.div>
      </div>

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full aspect-[21/9] overflow-hidden"
      >
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

    </section>
  )
}
```

---

### ProjectOverview

```tsx
'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'

type Props = {
  client: string
  timeline: string
  role: string
  tools: string[]
  link?: string
}

export default function ProjectOverview({ client, timeline, role, tools, link }: Props) {
  return (
    <section className="py-16 border-b">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Client', value: client },
            { label: 'Timeline', value: timeline },
            { label: 'Role', value: role },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
              <span className="font-semibold text-sm">{item.value}</span>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Tools
            </span>
            <div className="flex flex-wrap gap-1">
              {tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {link && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View Live Project <FiExternalLink size={14} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
```

---

### ProjectProblem

```tsx
'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  body: string[]
  painPoints: string[]
}

export default function ProjectProblem({ heading, body, painPoints }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Body text */}
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
            {body.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </motion.div>

          {/* Right — Pain points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              User Pain Points
            </h3>
            <ul className="flex flex-col gap-3">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-destructive shrink-0" />
                  {point}
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

### ProjectResearch

```tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  methods: { title: string; description: string; image?: string }[]
  insights: string[]
}

export default function ProjectResearch({ heading, methods, insights }: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {heading}
          </span>
          <Separator className="flex-1" />
        </motion.div>

        {/* Research methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {methods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col gap-4">
                  {method.image && (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src={method.image} alt={method.title} fill className="object-cover" sizes="50vw" />
                    </div>
                  )}
                  <h3 className="font-bold">{method.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border bg-background text-sm"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                {insight}
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

### ProjectBeforeAfter

Interactive before/after slider using a range input — no extra library needed.

```tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  before: string
  after: string
}

export default function ProjectBeforeAfter({ heading, description, before, after }: Props) {
  const [position, setPosition] = useState(50)

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">{description}</p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden select-none"
        >
          {/* After image (full width base) */}
          <Image src={after} alt="After" fill className="object-cover" sizes="100vw" />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <Image src={before} alt="Before" fill className="object-cover" sizes="100vw" />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-foreground">
              ↔
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
            BEFORE
          </span>
          <span className="absolute bottom-4 right-4 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
            AFTER
          </span>

          {/* Range input overlay */}
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </motion.div>

      </div>
    </section>
  )
}
```

---

### ProjectResults

```tsx
'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  metrics: { value: string; label: string }[]
  qualitative?: string[]
}

export default function ProjectResults({ heading, description, metrics, qualitative }: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">{description}</p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-1 p-6 rounded-2xl border bg-background"
            >
              <span className="text-3xl font-bold text-primary">{metric.value}</span>
              <span className="text-xs text-muted-foreground leading-snug">{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Qualitative outcomes */}
        {qualitative && qualitative.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Qualitative Outcomes
            </h3>
            <ul className="flex flex-col gap-3">
              {qualitative.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground p-4 rounded-xl border bg-background"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

      </div>
    </section>
  )
}
```

---

### ProjectReflection

```tsx
'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  body: string[]
  wouldDoDifferently: string[]
}

export default function ProjectReflection({ heading, body, wouldDoDifferently }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Reflection body */}
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
            {body.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-sm">{para}</p>
            ))}
          </motion.div>

          {/* Right — What I'd do differently */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              What I'd Do Differently
            </h3>
            <ul className="flex flex-col gap-3">
              {wouldDoDifferently.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/50 shrink-0" />
                  {item}
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

## Checklist

- [ ] `data/projects.ts` updated with all new fields
- [ ] `app/projects/[slug]/page.tsx` created
- [ ] All 11 section components created
- [ ] Portfolio cards link to `/projects/[slug]`
- [ ] All project images placed in `public/images/projects/[slug]/`
- [ ] Before/After slider works on drag
- [ ] Figma embed URL added (if applicable)
- [ ] Results metrics display correctly
- [ ] `generateMetadata` sets OG image per project
- [ ] `notFound()` handles invalid slugs
- [ ] All sections animate on scroll
- [ ] Mobile layout tested on all sections

---

## What Makes This Page Stand Out

| Section | Why Employers Care |
|---|---|
| Problem Statement | Shows you understand the user, not just the brief |
| Research Methods | Proves you validate before you design |
| Early Thinking | Shows your process isn't just aesthetics |
| Design Decisions | Demonstrates strategic, reasoned thinking |
| Before / After | Visual proof of impact — hard to ignore |
| Results with Metrics | Shows you care about outcomes, not just output |
| Reflection | Shows maturity, self-awareness, and growth mindset |

---

> This is the difference between a portfolio that gets a "nice work" and one that gets a job offer.
