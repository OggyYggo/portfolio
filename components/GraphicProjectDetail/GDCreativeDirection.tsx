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

        {/* Color Palette */}
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

        {/* Typography */}
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
                {/* Role label */}
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">
                  {type.role}
                </span>

                {/* Sample */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{type.fontName}</span>
                  <span className="text-4xl md:text-5xl font-bold leading-none tracking-tight">
                    {type.sample}
                  </span>
                </div>

                {/* Rationale */}
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
