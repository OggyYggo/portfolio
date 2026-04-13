# Header + MenuOffcanvas — Component Guide

> Part of Phase A (Shell) — Build this second, right after Preloader.

---

## File Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.tsx
│   └── MenuOffcanvas/
│       └── MenuOffcanvas.tsx
└── data/
    └── profile.ts
```

---

## Step 1 — Set Up Your Data File

Fill in your personal info before building the components. Both `Header` and `MenuOffcanvas` pull from this file.

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
    github:   'https://github.com/yourhandle',
  }
}
```

---

## Step 2 — MenuOffcanvas Component

Build this first since `Header` imports it.

**shadcn components used:** `Sheet`, `SheetContent`, `SheetTrigger`, `Button`

**File:** `components/MenuOffcanvas/MenuOffcanvas.tsx`

```tsx
'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { FiLinkedin, FiGithub } from 'react-icons/fi'
import { BsDribbble } from 'react-icons/bs'
import { profile } from '@/data/profile'

export default function MenuOffcanvas() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="flex flex-col gap-1.5 w-10 h-10"
        >
          <span className="block w-6 h-0.5 bg-foreground transition-all" />
          <span className="block w-4 h-0.5 bg-foreground transition-all" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col gap-8 pt-16 px-8 w-[320px]">

        {/* Name + Tagline */}
        <div>
          <h3 className="text-3xl font-bold tracking-tight">
            {profile.name.toUpperCase()}.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Let's Bring Your Vision to Life
          </p>
        </div>

        {/* Contact Info */}
        <ul className="space-y-2 text-sm">
          <li>
            <span className="text-muted-foreground">Email: </span>
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              {profile.email}
            </a>
          </li>
          <li>
            <span className="text-muted-foreground">Phone: </span>
            <span>{profile.phone}</span>
          </li>
          <li>
            <span className="text-muted-foreground">Location: </span>
            <span>{profile.location}</span>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={profile.socials.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Dribbble"
          >
            <BsDribbble size={20} />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
        </div>

      </SheetContent>
    </Sheet>
  )
}
```

---

## Step 3 — Header Component

**shadcn components used:** none directly — uses `MenuOffcanvas`

**Animations:** GSAP fade-in on mount

**File:** `components/Header/Header.tsx`

```tsx
'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import MenuOffcanvas from '@/components/MenuOffcanvas/MenuOffcanvas'

export default function Header() {
  useGSAP(() => {
    gsap.from('#header', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out',
    })
  })

  return (
    <header
      id="header"
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          Kivora.
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {/* Available for Work badge */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for Work
          </div>

          {/* Hamburger / Sheet trigger */}
          <MenuOffcanvas />

        </div>
      </div>
    </header>
  )
}
```

---

## Step 4 — Register GSAP Plugin

Add this once at the top of `Header.tsx` before using `useGSAP`:

```tsx
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)
```

---

## Step 5 — Add Header to Layout

Mount `Header` globally so it appears on every page:

```tsx
// app/layout.tsx
import Header from '@/components/Header/Header'
import Preloader from '@/components/Preloader/Preloader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

---

## Checklist

- [ ] `data/profile.ts` filled in with your real info
- [ ] `MenuOffcanvas.tsx` created and working
- [ ] `Header.tsx` created and working
- [ ] GSAP plugin registered at the top of `Header.tsx`
- [ ] Header added to `app/layout.tsx`
- [ ] "Available for Work" pulse visible on desktop
- [ ] Sheet slides open on hamburger click
- [ ] Social links open in new tab
- [ ] Tested on mobile (sheet should fill most of the screen)

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Sheet not opening | Make sure `SheetTrigger` wraps the button with `asChild` |
| GSAP animation not firing | Register `useGSAP` plugin before using it |
| Social icons not showing | Run `npm install react-icons` |
| Header not sticky | Ensure `sticky top-0 z-50` classes are applied and no parent has `overflow: hidden` |
| "Available for Work" hidden on mobile | It has `hidden sm:flex` — intentional, shows on `sm` and above |

---

> Next up: **Sidebar** — Avatar, Badge, contact info, and social links.
