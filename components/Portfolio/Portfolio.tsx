'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FiExternalLink } from 'react-icons/fi'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { projects, categories } from '@/data/projects'
import type { Category } from '@/data/projects'

gsap.registerPlugin(useGSAP)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Portfolio
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        Selected <span className="text-primary">work.</span>
      </motion.h2>

      {/* Category Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="focus:outline-none"
          >
            <Badge
              variant={activeCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-1.5 text-xs transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {cat}
            </Badge>
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // GSAP hover — overlay fade in/out
  const { contextSafe } = useGSAP({ scope: cardRef })

  const onEnter = contextSafe(() => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: 'power2.out' })
  })

  const onLeave = contextSafe(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.in' })
  })

  return (
    <div ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative rounded-xl p-0.5">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <Card className="overflow-hidden group border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl">
        <CardContent className="p-0">

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Hover Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 opacity-0"
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Project <FiExternalLink size={14} />
              </Link>
              <p className="text-xs text-muted-foreground text-center px-6">
                {project.description}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm leading-tight">{project.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{project.year}</p>
            </div>
            {project.featured && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="text-xs shrink-0">
              {project.category}
            </Badge>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
