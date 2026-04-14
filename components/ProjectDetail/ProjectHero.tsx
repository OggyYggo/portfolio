'use client'

import { motion } from 'framer-motion'

type Props = {
  title: string
  tagline: string
}

export default function ProjectHero({ title, tagline }: Props) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-muted">

      {/* Background decorative image (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/inner-bg.png')] bg-cover bg-center" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
