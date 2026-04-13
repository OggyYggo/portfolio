# Sidebar — Component Guide

> Part of Phase A (Shell) — Build this third, right after Header + MenuOffcanvas.

---

## File Structure

```
src/
├── components/
│   └── Sidebar/
│       └── Sidebar.tsx
└── data/
    └── profile.ts   ← already created in Header step
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Avatar` | Profile photo with fallback initials |
| `Badge` | Job title / availability label |
| `Separator` | Visual divider between sections |

Install them if you haven't already:

```bash
npx shadcn@latest add avatar badge separator
```

---

## Step 1 — Update Your Data File

Make sure `data/profile.ts` has everything the Sidebar needs:

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
  available: true,
  socials: {
    linkedin: 'https://linkedin.com/in/yourhandle',
    dribbble: 'https://dribbble.com/yourhandle',
    github: 'https://github.com/yourhandle',
  }
}
```

> Place your profile photo at `public/images/profile.jpg`

---

## Step 2 — Build the Sidebar Component

**File:** `components/Sidebar/Sidebar.tsx`

```tsx
'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { BsDribbble } from 'react-icons/bs'
import { profile } from '@/data/profile'

gsap.registerPlugin(useGSAP)

export default function Sidebar() {
  useGSAP(() => {
    gsap.from('.resume-sidebar', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out',
    })
  })

  return (
    <aside className="resume-sidebar flex flex-col gap-6 p-6 rounded-2xl border bg-card shadow-sm h-fit sticky top-24">

      {/* Profile Photo */}
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-32 h-32 ring-4 ring-primary/10">
          <AvatarImage src={profile.photo} alt={profile.name} />
          <AvatarFallback className="text-3xl font-bold">
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Name + Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{profile.title}</p>
        </div>

        {/* Availability Badge */}
        {profile.available && (
          <Badge variant="secondary" className="flex items-center gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for Work
          </Badge>
        )}
      </div>

      <Separator />

      {/* Contact Info */}
      <ul className="space-y-3 text-sm">
        <li className="flex items-center gap-3 text-muted-foreground">
          <FiMail size={15} className="shrink-0 text-primary" />
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-primary transition-colors truncate"
          >
            {profile.email}
          </a>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <FiPhone size={15} className="shrink-0 text-primary" />
          <span>{profile.phone}</span>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <FiMapPin size={15} className="shrink-0 text-primary" />
          <span>{profile.location}</span>
        </li>
      </ul>

      <Separator />

      {/* Social Icons */}
      <div className="flex justify-center gap-4">
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href={profile.socials.dribbble}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dribbble"
          className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
        >
          <BsDribbble size={20} />
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-200"
        >
          <FiGithub size={20} />
        </a>
      </div>

      <Separator />

      {/* Download CV Button */}
      <a
        href="/cv.pdf"
        download
        className="w-full text-center text-sm font-medium py-2 px-4 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
      >
        Download CV
      </a>

    </aside>
  )
}
```

---

## Step 3 — Add Sidebar to Page Layout

The Sidebar sits in a two-column grid alongside the main content:

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        {/* Left — Sidebar */}
        <Sidebar />

        {/* Right — Main content sections */}
        <main className="flex flex-col gap-10">
          {/* About, Skills, Experience, Portfolio, Contact go here */}
        </main>

      </div>
    </div>
  )
}
```

---

## Step 4 — Place Your CV File

Put your CV PDF at:

```
public/
└── cv.pdf
```

The Download CV button links directly to this file.

---

## Checklist

- [ ] `data/profile.ts` updated with `available` field
- [ ] Profile photo placed at `public/images/profile.jpg`
- [ ] `cv.pdf` placed at `public/cv.pdf`
- [ ] shadcn `Avatar`, `Badge`, `Separator` installed
- [ ] `Sidebar.tsx` created
- [ ] Sidebar added to `app/page.tsx` in a two-column grid
- [ ] Avatar shows photo (or fallback initial if photo missing)
- [ ] Availability badge visible when `available: true`
- [ ] Download CV button works
- [ ] Sidebar is sticky on desktop (`sticky top-24`)
- [ ] Layout stacks to single column on mobile

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Photo not showing | Check path is `/images/profile.jpg` inside `public/` folder |
| Avatar showing initials only | Verify the `src` path is correct and the image file exists |
| Sidebar not sticky | Make sure a parent element doesn't have `overflow: hidden` |
| Layout not two columns | Confirm `lg:grid-cols-[320px_1fr]` is applied on the wrapper in `page.tsx` |
| Badge not showing | Confirm `profile.available` is set to `true` in `data/profile.ts` |
| CV download not working | Make sure `cv.pdf` is inside the `public/` folder |

---

> Next up: **About** — Bio, key stats, and Framer Motion scroll animation.
