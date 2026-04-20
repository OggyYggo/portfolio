# Lightbox — Full Implementation Guide

> Click any image → opens full screen → pinch/scroll to zoom → swipe or arrow keys to navigate.
> Applied to ALL image sections across the Graphic Design project detail page.
> Library: `yet-another-react-lightbox` (yarl)

---

## Why yet-another-react-lightbox

| Feature | Support |
|---|---|
| Zoom (pinch + scroll) | ✅ Built-in plugin |
| Keyboard navigation | ✅ Arrow keys + Escape |
| Touch swipe (mobile) | ✅ Native |
| Thumbnails strip | ✅ Built-in plugin |
| Captions | ✅ Built-in plugin |
| Next.js Image compatible | ✅ Custom render support |
| Accessible (ARIA) | ✅ Out of the box |
| Bundle size | ~13kb gzipped |

---

## Step 1 — Install

```bash
npm install yet-another-react-lightbox
```

---

## Step 2 — Create a Reusable Lightbox Component

Build this once — every image section imports and uses it.

**File:** `components/ui/Lightbox.tsx`

```tsx
'use client'

import YARLightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/captions.css'

export type LightboxSlide = {
  src: string
  alt?: string
  title?: string        // shown as caption title
  description?: string  // shown as caption subtitle
}

type Props = {
  slides: LightboxSlide[]
  open: boolean
  index: number
  onClose: () => void
}

export default function Lightbox({ slides, open, index, onClose }: Props) {
  return (
    <YARLightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides.map((s) => ({
        src: s.src,
        alt: s.alt ?? '',
        title: s.title,
        description: s.description,
      }))}
      plugins={[Zoom, Thumbnails, Captions]}
      zoom={{
        maxZoomPixelRatio: 4,       // how far they can zoom in
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        scrollToZoom: true,         // scroll wheel zooms
      }}
      thumbnails={{
        position: 'bottom',
        width: 80,
        height: 60,
        border: 2,
        borderRadius: 6,
        padding: 4,
        gap: 8,
      }}
      captions={{
        showToggle: true,
        descriptionTextAlign: 'center',
      }}
      carousel={{
        finite: false,              // loops around
        preload: 2,
      }}
      animation={{
        fade: 250,
        swipe: 300,
      }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        root: { '--yarl__color_backdrop': 'rgba(0,0,0,0.95)' },
      }}
    />
  )
}
```

---

## Step 3 — Create a Reusable Hook

This hook manages open/close state and which image is active.
Build it once — all sections use it.

**File:** `hooks/useLightbox.ts`

```ts
import { useState, useCallback } from 'react'

export function useLightbox() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  return { open, index, openAt, close }
}
```

---

## Step 4 — Apply to Every Section

### GDHook — Hero Image

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  title: string
  tagline: string
  heroImage: string
  heroColor?: string
}

export default function GDHook({ title, tagline, heroImage, heroColor }: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = [{ src: heroImage, alt: title, title, description: tagline }]

  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full cursor-zoom-in"
        style={{ backgroundColor: heroColor ?? 'transparent' }}
        onClick={() => openAt(0)}
      >
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
            <span>🔍</span> Click to zoom
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {tagline}
          </p>
        </motion.div>
      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDCreativeDirection — Moodboard + Color + Typography

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heading: string
  approach: string
  moodboard: { images: string[]; caption: string }
  palette: { name: string; hex: string; usage: string }[]
  typography: { role: string; fontName: string; sample: string; rationale: string }[]
}

export default function GDCreativeDirection({
  heading, approach, moodboard, palette, typography
}: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = moodboard.images.map((src, i) => ({
    src,
    alt: `Moodboard image ${i + 1}`,
    title: 'Moodboard',
    description: moodboard.caption,
  }))

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col gap-16">

        {/* Section label + approach */}
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
          <p className="text-muted-foreground leading-relaxed">{approach}</p>
        </motion.div>

        {/* Moodboard — clickable grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Moodboard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {moodboard.images.map((src, i) => (
              <div
                key={i}
                onClick={() => openAt(i)}
                className={`relative overflow-hidden rounded-xl cursor-zoom-in group ${
                  i === 0 ? 'aspect-[4/3] md:row-span-2' : 'aspect-square'
                }`}
              >
                <Image
                  src={src}
                  alt={`Moodboard ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            {moodboard.caption}
          </p>
        </motion.div>

        {/* Color Palette — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Color Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {palette.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div
                  className="w-full aspect-square rounded-xl border shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold">{color.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{color.hex}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{color.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typography — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Typography
          </h3>
          <div className="flex flex-col divide-y divide-border">
            {typography.map((type) => (
              <div
                key={type.role}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 py-6 items-start"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">
                  {type.role}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{type.fontName}</span>
                  <span className="text-4xl md:text-5xl font-bold leading-none tracking-tight">
                    {type.sample}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.rationale}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDLogoExploration — Direction Images + Final Mark

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Direction = {
  label: string
  image: string
  status: 'rejected' | 'refined' | 'chosen'
  note: string
}

type Props = {
  heading: string
  description: string
  directions: Direction[]
  finalMark: { image: string; darkImage: string; caption: string }
}

const statusConfig = {
  rejected: { label: 'Rejected', variant: 'destructive' as const },
  refined:  { label: 'Refined',  variant: 'secondary' as const },
  chosen:   { label: 'Chosen ✓', variant: 'default' as const },
}

export default function GDLogoExploration({
  heading, description, directions, finalMark
}: Props) {
  const { open, index, openAt, close } = useLightbox()

  // All images in one flat slides array
  const slides = [
    ...directions.map((d) => ({
      src: d.image,
      alt: d.label,
      title: d.label,
      description: d.note,
    })),
    {
      src: finalMark.image,
      alt: 'Final logo — light',
      title: 'Final Mark — Light',
      description: finalMark.caption,
    },
    {
      src: finalMark.darkImage,
      alt: 'Final logo — dark',
      title: 'Final Mark — Dark',
      description: finalMark.caption,
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-12">

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
          <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
        </motion.div>

        {/* Directions — clickable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-3 p-4 rounded-2xl border ${
                dir.status === 'chosen' ? 'border-primary bg-primary/5' : 'bg-muted/20'
              }`}
            >
              <div
                onClick={() => openAt(i)}
                className="relative aspect-square rounded-xl overflow-hidden bg-white cursor-zoom-in group"
              >
                <Image
                  src={dir.image}
                  alt={dir.label}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{dir.label}</span>
                <Badge variant={statusConfig[dir.status].variant} className="text-xs shrink-0">
                  {statusConfig[dir.status].label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{dir.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Final mark — clickable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Final Mark
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: finalMark.image, alt: 'Light', bg: 'bg-white', slideIndex: directions.length },
              { src: finalMark.darkImage, alt: 'Dark', bg: 'bg-foreground', slideIndex: directions.length + 1 },
            ].map((item) => (
              <div
                key={item.alt}
                onClick={() => openAt(item.slideIndex)}
                className={`relative aspect-video rounded-2xl overflow-hidden border cursor-zoom-in group ${item.bg}`}
              >
                <Image
                  src={item.src}
                  alt={`Logo on ${item.alt} background`}
                  fill
                  className="object-contain p-10 transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            {finalMark.caption}
          </p>
        </motion.div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDBrandSystem — System Overview + Components

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heading: string
  description: string
  systemImage: string
  components: { title: string; image: string; description: string }[]
}

export default function GDBrandSystem({
  heading, description, systemImage, components
}: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = [
    { src: systemImage, alt: 'Brand system overview', title: 'Brand System Overview' },
    ...components.map((c) => ({
      src: c.image,
      alt: c.title,
      title: c.title,
      description: c.description,
    })),
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

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
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>

        {/* Full system overview — clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onClick={() => openAt(0)}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border cursor-zoom-in group"
        >
          <Image
            src={systemImage}
            alt="Brand system overview"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
              🔍
            </span>
          </div>
        </motion.div>

        {/* Components grid — clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {components.map((comp, i) => (
            <motion.div
              key={comp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => openAt(i + 1)}
                className="cursor-zoom-in group overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={comp.image}
                      alt={comp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        🔍
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <h3 className="font-bold text-sm">{comp.title}</h3>
                    <p className="text-xs text-muted-foreground">{comp.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDMockups — All Mockups

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type MockupItem = {
  label: string
  image: string
  fullWidth?: boolean
}

type Props = {
  heading: string
  description: string
  items: MockupItem[]
}

export default function GDMockups({ heading, description, items }: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = items.map((item) => ({
    src: item.image,
    alt: item.label,
    title: item.label,
  }))

  const fullWidthItems = items.filter((m) => m.fullWidth)
  const gridItems = items.filter((m) => !m.fullWidth)

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {/* Full-width mockups */}
          {items.map((item, i) =>
            item.fullWidth ? (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => openAt(i)}
                className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden cursor-zoom-in group"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.label}
                </span>
              </motion.div>
            ) : null
          )}

          {/* Grid mockups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) =>
              !item.fullWidth ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  onClick={() => openAt(i)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in"
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-between p-4">
                    <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                    <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      🔍
                    </span>
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        </div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDGallery — Final Deliverables

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type GalleryImage = {
  src: string
  caption?: string
  span?: 'normal' | 'wide'
}

type Props = {
  heading: string
  images: GalleryImage[]
}

export default function GDGallery({ heading, images }: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.caption ?? 'Gallery image',
    title: img.caption,
  }))

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-8">

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              onClick={() => openAt(i)}
              className={`relative overflow-hidden rounded-2xl cursor-zoom-in group ${
                img.span === 'wide' ? 'sm:col-span-2 aspect-[16/7]' : 'aspect-square'
              }`}
            >
              <Image
                src={img.src}
                alt={img.caption ?? `Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={img.span === 'wide' ? '100vw' : '50vw'}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-between p-4">
                {img.caption && (
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                  </span>
                )}
                <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

### GDBeforeAfter — Slider Images (Lightbox for individual sides)

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heading: string
  description: string
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export default function GDBeforeAfter({
  heading, description, before, after, beforeLabel = 'Before', afterLabel = 'After'
}: Props) {
  const [position, setPosition] = useState(50)
  const { open, index, openAt, close } = useLightbox()

  const slides = [
    { src: before, alt: beforeLabel, title: beforeLabel },
    { src: after,  alt: afterLabel,  title: afterLabel  },
  ]

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
          <p className="text-xs text-muted-foreground">
            Drag to compare · Click either side to view full size
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden select-none"
        >
          {/* After */}
          <div onClick={() => openAt(1)} className="absolute inset-0 cursor-zoom-in">
            <Image src={after} alt={afterLabel} fill className="object-cover" sizes="100vw" />
          </div>

          {/* Before — clipped */}
          <div
            className="absolute inset-0 overflow-hidden cursor-zoom-in"
            style={{ width: `${position}%` }}
            onClick={() => openAt(0)}
          >
            <Image src={before} alt={beforeLabel} fill className="object-cover" sizes="100vw" />
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-10 pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold text-foreground">
              ↔
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-4 left-4 z-10 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded pointer-events-none">
            {beforeLabel}
          </span>
          <span className="absolute bottom-4 right-4 z-10 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded pointer-events-none">
            {afterLabel}
          </span>

          {/* Drag range — on top */}
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </motion.div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
```

---

## Step 5 — Global CSS Overrides (Optional)

Override lightbox styles to match your site theme in `app/globals.css`:

```css
/* Lightbox theme overrides */
:root {
  --yarl__color_backdrop: rgba(0, 0, 0, 0.95);
  --yarl__color_button: rgba(255, 255, 255, 0.8);
  --yarl__color_button_active: rgba(255, 255, 255, 1);
  --yarl__thumbnails_thumbnail_border_radius: 6px;
  --yarl__thumbnails_thumbnail_active_border_color: hsl(var(--primary));
}
```

---

## Checklist

- [ ] `npm install yet-another-react-lightbox` done
- [ ] `components/ui/Lightbox.tsx` created
- [ ] `hooks/useLightbox.ts` created
- [ ] `GDHook.tsx` updated with lightbox
- [ ] `GDCreativeDirection.tsx` updated with lightbox on moodboard
- [ ] `GDLogoExploration.tsx` updated with lightbox on all logo images
- [ ] `GDBrandSystem.tsx` updated with lightbox
- [ ] `GDMockups.tsx` updated with lightbox
- [ ] `GDGallery.tsx` updated with lightbox
- [ ] `GDBeforeAfter.tsx` updated with lightbox on both sides
- [ ] CSS overrides added to `globals.css`
- [ ] Zoom works on scroll wheel (desktop)
- [ ] Zoom works on pinch (mobile)
- [ ] Keyboard arrows navigate between images
- [ ] Escape key closes lightbox
- [ ] Thumbnails strip shows at bottom
- [ ] Captions show image title and description
- [ ] `cursor-zoom-in` cursor appears on hover over all images

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Styles not applying | Make sure all 3 CSS imports are in `Lightbox.tsx` |
| Thumbnails not showing | Confirm `Thumbnails` is in the `plugins` array and its CSS is imported |
| Zoom not working | Confirm `Zoom` plugin is imported from `yet-another-react-lightbox/plugins/zoom` |
| Lightbox opens at wrong image | Double-check `openAt(i)` index matches the correct position in `slides` array |
| Cursor not changing | Add `cursor-zoom-in` class to every clickable image wrapper |
| Before/After drag conflicts with lightbox click | The `z-20` range input handles drag; clicks on image divs open lightbox — they don't conflict |

---

> Every image across the entire Graphic Design project detail page now opens in a full-screen lightbox with zoom, thumbnails, captions, keyboard navigation, and touch swipe.
