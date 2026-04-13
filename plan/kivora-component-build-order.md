# Kivora Portfolio — Component Build Order

> Recommended build sequence based on the Kivora template structure.
> Each component builds on the previous for a smooth development flow.

---

## Build Order Overview

| Order | Component | shadcn Primitives | Priority |
|---|---|---|---|
| 1 | Preloader | — | 🔴 First |
| 2 | Header + MenuOffcanvas | `Sheet`, `Button` | 🔴 First |
| 3 | Sidebar | `Avatar`, `Badge`, `Separator` | 🔴 First |
| 4 | About | `Separator` | 🟡 Second |
| 5 | Skills | `Progress` | 🟡 Second |
| 6 | Experience | `Card` | 🟡 Second |
| 7 | Portfolio | `Card`, `Badge` | 🟢 Third |
| 8 | Contact | `Button` | 🟢 Third |
| 9 | Cursor | — | 🟢 Third |

---

## Phase A — Shell (Build These First)

> Goal: Get a fully working skeleton visible in the browser.

---

### 1. Preloader

**Why first:** First thing users see. Sets the visual tone of the whole portfolio.

**File:** `components/Preloader/Preloader.tsx`

**What to build:**
- Animated loading bars (mirror the original Kivora gutters)
- Site name fade-in text
- Auto-dismiss after 2–3 seconds using `useState` + `useEffect`
- GSAP timeline for the exit animation

**Code outline:**
```tsx
'use client'
import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false)
    })
    tl.to('.inner-bar', { width: '100%', duration: 1, stagger: 0.1 })
      .to('.preloader', { opacity: 0, duration: 0.5 })
  }, [])

  if (!visible) return null

  return (
    <div className="preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <span className="text-2xl font-bold tracking-widest">Kivora.</span>
      <div className="preloader-gutters mt-8 flex gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bar w-8 h-1 bg-muted overflow-hidden rounded">
            <div className="inner-bar h-full w-0 bg-primary" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### 2. Header + MenuOffcanvas

**Why second:** Navigation wraps the whole app. Build it early so you can test routing as you add sections.

**Files:**
- `components/Header/Header.tsx`
- `components/MenuOffcanvas/MenuOffcanvas.tsx`

**What to build:**
- Sticky header with logo and "Available for Work" badge
- Hamburger button that triggers the shadcn `Sheet`
- Offcanvas with name, tagline, contact info, and social icons
- GSAP fade-in on page load

**Header code outline:**
```tsx
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MenuOffcanvas from '@/components/MenuOffcanvas/MenuOffcanvas'

export default function Header() {
  useGSAP(() => {
    gsap.from('#header', { opacity: 0, y: -20, duration: 0.6 })
  })

  return (
    <header id="header" className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="/" className="text-xl font-bold">Kivora.</a>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Work
          </span>
          <MenuOffcanvas />
        </div>
      </div>
    </header>
  )
}
```

**MenuOffcanvas code outline:**
```tsx
'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

export default function MenuOffcanvas() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          {/* Hamburger lines */}
          <div className="flex flex-col gap-1.5">
            <span className="block w-6 h-0.5 bg-foreground" />
            <span className="block w-6 h-0.5 bg-foreground" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-6 pt-12">
        <div>
          <h3 className="text-2xl font-bold">{profile.name.toUpperCase()}.</h3>
          <p className="text-muted-foreground mt-1">Let's Bring Your Vision to Life</p>
        </div>
        <ul className="text-sm space-y-1">
          <li>Email: <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a></li>
          <li>Phone: {profile.phone}</li>
        </ul>
        <div className="flex gap-3">
          {/* Social icon links */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

---

### 3. Sidebar

**Why third:** The core identity of a resume portfolio. Your photo, name, title, and links live here.

**File:** `components/Sidebar/Sidebar.tsx`

**What to build:**
- Profile avatar using shadcn `Avatar`
- Name, title, and status badge
- Contact details list
- Social icon links
- GSAP fade-in on mount

**Code outline:**
```tsx
'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { profile } from '@/data/profile'

export default function Sidebar() {
  useGSAP(() => {
    gsap.from('.resume-sidebar', { opacity: 0, x: -30, duration: 0.8 })
  })

  return (
    <aside className="resume-sidebar flex flex-col gap-4 p-6 rounded-2xl border bg-card">
      <Avatar className="w-28 h-28 mx-auto">
        <AvatarImage src={profile.photo} alt={profile.name} />
        <AvatarFallback>{profile.name[0]}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <Badge variant="secondary" className="mt-1">{profile.title}</Badge>
      </div>
      <Separator />
      <ul className="text-sm space-y-2 text-muted-foreground">
        <li><span className="font-medium text-foreground">Email:</span> {profile.email}</li>
        <li><span className="font-medium text-foreground">Phone:</span> {profile.phone}</li>
        <li><span className="font-medium text-foreground">Location:</span> {profile.location}</li>
      </ul>
      <Separator />
      <div className="flex justify-center gap-3">
        {/* Social icons from react-icons */}
      </div>
    </aside>
  )
}
```

---

## Phase B — Content Sections

> Goal: Fill in the main content after the shell is working.

---

### 4. About

**File:** `components/About/About.tsx`

**What to build:**
- Bio paragraph
- Key stats (years of experience, projects completed, etc.)
- Framer Motion fade-in on scroll

**Key snippet:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
</motion.div>
```

---

### 5. Skills

**File:** `components/Skills/Skills.tsx`

**What to build:**
- List of skills with percentage values
- shadcn `Progress` bar per skill
- Animate progress bars when they enter the viewport using GSAP

**Key snippet:**
```tsx
import { Progress } from '@/components/ui/progress'
import { skills } from '@/data/skills'

{skills.map((skill) => (
  <div key={skill.label} className="mb-5">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium">{skill.label}</span>
      <span className="text-muted-foreground">{skill.percentage}%</span>
    </div>
    <Progress value={skill.percentage} className="h-1.5" />
  </div>
))}
```

---

### 6. Experience

**File:** `components/Experience/Experience.tsx`

**What to build:**
- Timeline of work history
- shadcn `Card` per job entry
- Role, company, date range, and description
- Framer Motion stagger animation on scroll

**Key snippet:**
```tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { experience } from '@/data/experience'

{experience.map((job, i) => (
  <motion.div
    key={job.company}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="mb-4">
      <CardHeader>
        <h3 className="font-bold">{job.role}</h3>
        <p className="text-sm text-muted-foreground">{job.company} · {job.period}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{job.description}</p>
      </CardContent>
    </Card>
  </motion.div>
))}
```

---

## Phase C — Polish

> Goal: Visual richness and finishing touches.

---

### 7. Portfolio

**File:** `components/Portfolio/Portfolio.tsx`

**What to build:**
- Project cards grid (2–3 columns)
- shadcn `Card` with project image, title, and category `Badge`
- Hover overlay effect with GSAP
- Link to live project or case study

**Note:** Have your real project images ready before building this section.

---

### 8. Contact

**File:** `components/Contact/Contact.tsx`

**What to build:**
- Simple contact info block or form
- shadcn `Button` for CTA (email / download CV)
- Optional: form with validation using `react-hook-form` + `zod`

---

### 9. Cursor

**File:** `components/Cursor/Cursor.tsx`

**What to build:**
- Custom cursor circle that follows mouse position
- Scale effect on hover over links/buttons
- Use `useEffect` + `mousemove` event listener
- Pure CSS + GSAP — no shadcn needed

**Key snippet:**
```tsx
useEffect(() => {
  const cursor = document.getElementById('cursor')
  const onMove = (e: MouseEvent) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15 })
  }
  window.addEventListener('mousemove', onMove)
  return () => window.removeEventListener('mousemove', onMove)
}, [])
```

---

## Data Files to Prepare

Before building components, fill in your personal data:

```ts
// data/profile.ts
export const profile = {
  name: 'Your Name',
  title: 'UI/UX Designer & Developer',
  photo: '/images/profile.jpg',
  email: 'you@email.com',
  phone: '+1 (000) 000-0000',
  location: 'Your City, Country',
  bio: 'A short paragraph about who you are and what you do.',
  socials: {
    linkedin: 'https://linkedin.com/in/yourhandle',
    dribbble: 'https://dribbble.com/yourhandle',
    github: 'https://github.com/yourhandle',
  }
}
```

```ts
// data/skills.ts
export const skills = [
  { label: 'UI Design', percentage: 90 },
  { label: 'React / Next.js', percentage: 85 },
  { label: 'Framer Motion', percentage: 75 },
  { label: 'TypeScript', percentage: 80 },
]
```

```ts
// data/experience.ts
export const experience = [
  {
    role: 'Senior UI Designer',
    company: 'Company Name',
    period: '2022 — Present',
    description: 'Brief description of your responsibilities and achievements.',
  },
]
```

```ts
// data/projects.ts
export const projects = [
  {
    title: 'Project Name',
    category: 'Web Design',
    image: '/images/project-1.jpg',
    link: 'https://yourproject.com',
  },
]
```

---

## Summary

```
Phase A (Shell)     →  Preloader → Header + MenuOffcanvas → Sidebar
Phase B (Content)   →  About → Skills → Experience
Phase C (Polish)    →  Portfolio → Contact → Cursor
```

> Built with: Next.js · TypeScript · Tailwind CSS · shadcn/ui · GSAP · Framer Motion · Lenis
