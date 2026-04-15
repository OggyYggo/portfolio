'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  title: string
  tagline: string
  heroImage: string
  heroColor?: string
}

export default function GDHook({ title, tagline, heroImage, heroColor }: Props) {
  return (
    <section>
      {/* Full-bleed hero image — no text on top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full"
        style={{ backgroundColor: heroColor ?? 'transparent' }}
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
    </section>
  )
}
