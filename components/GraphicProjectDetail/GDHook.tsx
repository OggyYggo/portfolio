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
      {/* Full-bleed hero image — no text on top */}
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
            <span>View</span>
          </div>
        </div>
      </motion.div>

      {/* Title below image — not on top of it */}
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
