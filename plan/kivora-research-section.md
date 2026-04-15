# Research & Discovery — Enhanced Section Guide

> Updated version of Section 4 from the UI/UX Project Detail page.
> Shows actual proof of your research process — photos, screenshots, artifacts.
> This is what separates junior from senior designers.

---

## Why Photos Matter Here

Anyone can write "I conducted user interviews." 
Showing a photo of your interview setup, your FigJam board, or your sticky note wall makes it **real**.

Employers and clients who see actual research artifacts think:
- This person actually does the work
- This isn't just a pretty mockup
- I can trust their decisions are grounded in data

---

## What Photos to Use Per Research Method

| Method | Photo to Show |
|---|---|
| User Interviews | Your interview setup, Zoom recording screenshot, consent form |
| Competitor Analysis | Side-by-side screenshots of competitor apps annotated in Figma |
| Personas | Printed or Figma persona document |
| Journey Maps | FigJam or Miro board screenshot, or printed on a wall |
| Card Sorting | Maze or OptimalSort results screenshot |
| Heatmaps | Hotjar heatmap screenshot of the old design |
| Affinity Mapping | Photo of sticky notes on a whiteboard or FigJam cluster |
| Surveys | Google Forms results screenshot or pie chart |

> **No photos yet?** Use screenshots of your FigJam/Miro boards, Figma research files, Notion research docs, or Maze results. Digital artifacts are just as credible.

---

## Updated Data Structure

Add this to your project in `data/projects.ts`:

```ts
research: {
  heading: string
  intro: string                    // ← 1–2 sentence overview of your research approach
  methods: {
    title: string
    description: string
    stat?: string                  // ← e.g. "8 participants" or "5 competitors"
    proofImage: {                  // ← The photo / screenshot proving you did it
      src: string
      alt: string
      caption: string              // ← What the viewer is looking at
    }
  }[]
  insights: {
    text: string
    source: string                 // ← e.g. "From user interviews" or "Hotjar data"
  }[]
  artifacts?: {                    // ← Optional: Personas, journey maps as full images
    title: string
    image: string
    description: string
  }[]
}
```

### Example Data

```ts
research: {
  heading: 'Research & Discovery',
  intro: 'Before touching Figma, we spent 3 weeks in discovery — talking to real users, studying competitors, and mapping the existing experience. Every design decision in this project traces back to something we found here.',
  methods: [
    {
      title: 'User Interviews',
      description: 'Conducted 8 moderated, 45-minute interviews with existing users across 3 company sizes — small startups, mid-market teams, and enterprise. We focused on daily workflows, biggest frustrations, and workarounds they\'d invented to deal with the product\'s limitations.',
      stat: '8 participants · 45 min each',
      proofImage: {
        src: '/images/projects/fintech-dashboard/research-interviews.jpg',
        alt: 'User interview session via Zoom',
        caption: 'Remote interview setup — participants shared their screen while narrating their workflow',
      },
    },
    {
      title: 'Affinity Mapping',
      description: 'After interviews, we transcribed key quotes and observations into FigJam. Through affinity mapping, 94 individual observations clustered into 6 clear themes — navigation confusion and information overload dominated the board.',
      stat: '94 observations · 6 themes',
      proofImage: {
        src: '/images/projects/fintech-dashboard/research-affinity.jpg',
        alt: 'FigJam affinity map with color-coded sticky notes',
        caption: 'FigJam affinity map — 94 observations clustered into 6 themes after interview synthesis',
      },
    },
    {
      title: 'Competitor Analysis',
      description: 'Audited 5 direct competitors (Brex, Ramp, Mercury, Pilot, Airbase) across 12 UX dimensions including navigation patterns, data density, onboarding, and mobile experience. Documented patterns and opportunities in a Figma audit board.',
      stat: '5 competitors · 12 dimensions',
      proofImage: {
        src: '/images/projects/fintech-dashboard/research-competitor.jpg',
        alt: 'Competitor analysis board in Figma',
        caption: 'Figma competitor audit board — side-by-side comparison of 5 fintech dashboards across 12 dimensions',
      },
    },
    {
      title: 'Heatmap Analysis',
      description: 'Used Hotjar to analyze 2 weeks of session recordings on the existing dashboard. Discovered users were rage-clicking on non-interactive chart elements, and that 61% of users never scrolled past the fold on the main view.',
      stat: '2 weeks · 340 sessions analyzed',
      proofImage: {
        src: '/images/projects/fintech-dashboard/research-heatmap.jpg',
        alt: 'Hotjar heatmap of existing dashboard',
        caption: 'Hotjar click heatmap of the old dashboard — red zones show where users expected interactivity but found none',
      },
    },
  ],
  insights: [
    {
      text: 'Users check balance and recent transactions first — every single session. This should be the hero of the dashboard.',
      source: 'User interviews + session recordings',
    },
    {
      text: 'Power users want density; casual users want simplicity. The design needs to serve both without compromise.',
      source: 'User interviews',
    },
    {
      text: '61% of users never scrolled past the fold on the existing dashboard.',
      source: 'Hotjar session data',
    },
    {
      text: 'Trust signals (security badges, last login timestamp) significantly reduced anxiety in new users.',
      source: 'User interviews',
    },
    {
      text: 'Mobile usage was 38% of sessions but the mobile experience was rated 1.9/5 by users.',
      source: 'Analytics + survey data',
    },
    {
      text: 'Competitors all used progressive disclosure — none exposed all features upfront.',
      source: 'Competitor analysis',
    },
  ],
  artifacts: [
    {
      title: 'User Persona — The Power User',
      image: '/images/projects/fintech-dashboard/persona-1.jpg',
      description: 'Sarah, 34 — CFO at a 60-person SaaS company. Checks the dashboard 3x daily. Needs density and speed.',
    },
    {
      title: 'User Persona — The Casual User',
      image: '/images/projects/fintech-dashboard/persona-2.jpg',
      description: 'Marcus, 28 — Founder at an 8-person startup. Checks monthly for investor updates. Needs clarity and confidence.',
    },
    {
      title: 'Journey Map — Existing Experience',
      image: '/images/projects/fintech-dashboard/journey-map.jpg',
      description: 'End-to-end journey of a power user completing their most common daily task — revealing 4 major friction points.',
    },
  ],
},
```

---

## Updated Component

**File:** `components/ProjectDetail/ProjectResearch.tsx`

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type ResearchMethod = {
  title: string
  description: string
  stat?: string
  proofImage: {
    src: string
    alt: string
    caption: string
  }
}

type ResearchInsight = {
  text: string
  source: string
}

type ResearchArtifact = {
  title: string
  image: string
  description: string
}

type Props = {
  heading: string
  intro: string
  methods: ResearchMethod[]
  insights: ResearchInsight[]
  artifacts?: ResearchArtifact[]
}

export default function ProjectResearch({
  heading,
  intro,
  methods,
  insights,
  artifacts,
}: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-16">

        {/* Section Label + Intro */}
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
          <p className="text-muted-foreground leading-relaxed">{intro}</p>
        </motion.div>

        {/* Research Methods — alternating layout */}
        <div className="flex flex-col gap-20">
          {methods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ direction: i % 2 !== 0 ? 'rtl' : 'ltr' }}
            >

              {/* Photo / Screenshot — proof */}
              <div style={{ direction: 'ltr' }} className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-sm">
                  <Image
                    src={method.proofImage.src}
                    alt={method.proofImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Caption below photo */}
                <p className="text-xs text-muted-foreground italic text-center px-2">
                  {method.proofImage.caption}
                </p>
              </div>

              {/* Text content */}
              <div style={{ direction: 'ltr' }} className="flex flex-col gap-5">

                {/* Step number */}
                <span className="text-xs font-bold text-primary/50 tracking-widest uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title + stat */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-tight">{method.title}</h3>
                  {method.stat && (
                    <Badge variant="secondary" className="w-fit text-xs">
                      {method.stat}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {method.description}
                </p>

              </div>

            </motion.div>
          ))}
        </div>

        <Separator />

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border bg-background">
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <p className="text-sm leading-relaxed">{insight.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground italic mt-auto">
                      — {insight.source}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Artifacts — Personas + Journey Maps */}
        {artifacts && artifacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Research Artifacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artifacts.map((artifact, i) => (
                <motion.div
                  key={artifact.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border shadow-sm group">
                    <Image
                      src={artifact.image}
                      alt={artifact.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold">{artifact.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
    └── projects/
        └── fintech-dashboard/
            ├── research-interviews.jpg     ← Zoom screenshot or interview setup photo
            ├── research-affinity.jpg       ← FigJam/Miro affinity map screenshot
            ├── research-competitor.jpg     ← Figma competitor audit board
            ├── research-heatmap.jpg        ← Hotjar/Clarity heatmap screenshot
            ├── persona-1.jpg               ← Persona document (Figma or printed)
            ├── persona-2.jpg
            └── journey-map.jpg             ← Journey map screenshot
```

> **Recommended dimensions:** 1200×900px (4:3 ratio) for method photos, 1600×900px (16:9) for journey maps.

---

## Tips for Getting Good Research Photos

**If you're doing new projects:**
- Screenshot your FigJam/Miro boards at every stage — before and after clustering
- Screenshot Zoom calls (with permission) or your interview notes doc
- Export your Maze or Hotjar reports and screenshot the key charts
- Photograph your whiteboard sessions with your phone

**If your research is already done:**
- Go back into Figma/FigJam and screenshot your research files
- Export your persona documents as images
- Take a photo of any printed artifacts you have
- Screenshot your research Notion doc or Google Doc

**If you did the research but have no photos:**
- Recreate the affinity map in FigJam from memory — it's still real research
- Build a clean persona in Figma using a free template
- Screenshot your interview notes (blur any personally identifying info)

---

## Checklist

- [ ] `research` field updated in `data/projects.ts` with `intro`, `stat`, `proofImage`, `insights.source`, and `artifacts`
- [ ] `ProjectResearch.tsx` replaced with the new component
- [ ] Method photos placed in `public/images/projects/[slug]/`
- [ ] Persona images placed and linked
- [ ] Journey map image placed and linked
- [ ] Alternating layout (text left / photo right, then photo left / text right) working correctly
- [ ] Photo captions render below each image
- [ ] Stat badges show next to method title
- [ ] Insight cards show source attribution
- [ ] Artifacts grid renders at bottom of section
- [ ] All images use `next/image` with correct `sizes`
- [ ] Section is responsive on mobile (stacks to single column)

---

## What This Looks Like to an Employer

```
Without photos:           With photos:
─────────────────         ──────────────────────────────────
"I did 8 interviews"  →   [Zoom screenshot] + "8 participants, 45 min each"
"I made an affinity       [FigJam board photo] + "94 observations,
 map"                      6 themes emerged"
"I analyzed               [Figma audit board] + "5 competitors,
 competitors"              12 dimensions"
─────────────────         ──────────────────────────────────
Sounds like everyone.     Looks like the real thing.
```

---

> Replace the `ProjectResearch` import in `app/projects/[slug]/page.tsx` with this updated component — everything else stays the same.
