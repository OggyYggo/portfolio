'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'
import { Target, AlertTriangle, Quote, User } from 'lucide-react'

type Persona = {
  name: string
  role: string
  avatar?: string
  quote: string
  goals: string[]
  painPoints: string[]
}

type ResearchMethod = {
  title: string
  description: string
  stat?: string
  image?: string
  proofImage?: {
    src: string
    alt: string
    caption: string
  }
  personas?: Persona[]
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
  intro: string[]
  methods: ResearchMethod[]
  insights?: ResearchInsight[]
  artifacts?: ResearchArtifact[]
}

export default function ProjectResearch({
  heading,
  intro,
  methods,
  artifacts,
}: Props) {
  const { open, index, openAt, close } = useLightbox()

  // Build slides from all method proof images + artifact images
  const methodSlides = methods
    .map((m) => {
      if (m.proofImage) return { src: m.proofImage.src, alt: m.proofImage.alt, title: m.title, description: m.proofImage.caption }
      if (m.image) return { src: m.image, alt: m.title, title: m.title }
      return null
    })
    .filter(Boolean) as { src: string; alt: string; title: string; description?: string }[]

  const artifactSlides = (artifacts ?? []).map((a) => ({
    src: a.image,
    alt: a.title,
    title: a.title,
    description: a.description,
  }))

  const slides = [...methodSlides, ...artifactSlides]

  // Track which slide index each method maps to
  const methodIndices = methods.map((m) => {
    if (m.proofImage || m.image) {
      const idx = methodSlides.findIndex(
        (s) => s.src === (m.proofImage?.src ?? m.image)
      )
      return idx
    }
    return -1
  })

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
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
            {intro.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Research Methods — alternating layout */}
        <div className="flex flex-col gap-20">
          {methods.map((method, i) => (
            method.personas ? (
              /* ── Persona Cards Layout ── */
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-8"
              >
                {/* Header */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-primary/50 tracking-widest uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-2xl font-bold tracking-tight">{method.title}</h3>
                    {method.stat && (
                      <Badge variant="secondary" className="w-fit text-xs">
                        {method.stat}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">
                    {method.description}
                  </p>
                </div>

                {/* Persona Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {method.personas.map((persona, pi) => (
                    <motion.div
                      key={persona.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: pi * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full border bg-background overflow-hidden">
                        {/* Card top accent */}
                        <div className={`h-1 w-full ${
                          pi === 0 ? 'bg-primary' : 'bg-primary/60'
                        }`} />
                        <CardContent className="p-6 flex flex-col gap-5">
                          {/* Avatar + Name + Role */}
                          <div className="flex items-center gap-4">
                            {persona.avatar ? (
                              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border">
                                <Image
                                  src={persona.avatar}
                                  alt={persona.name}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                                pi === 0
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-primary/5 text-primary/70'
                              }`}>
                                <User className="w-6 h-6" />
                              </div>
                            )}
                            <div>
                              <h4 className="text-base font-semibold leading-tight">{persona.name}</h4>
                              <span className="text-xs text-muted-foreground">{persona.role}</span>
                            </div>
                          </div>

                          {/* Quote */}
                          <div className="flex gap-2 items-start bg-muted/50 rounded-lg p-3">
                            <Quote className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                            <p className="text-sm italic text-muted-foreground leading-relaxed">
                              {persona.quote}
                            </p>
                          </div>

                          {/* Goals */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Target className="w-3.5 h-3.5 text-green-500" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Goals</span>
                            </div>
                            <ul className="space-y-1.5 pl-5">
                              {persona.goals.map((goal, gi) => (
                                <li key={gi} className="text-sm text-muted-foreground leading-relaxed list-disc">
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pain Points */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">Pain Points</span>
                            </div>
                            <ul className="space-y-1.5 pl-5">
                              {persona.painPoints.map((pain, pi2) => (
                                <li key={pi2} className="text-sm text-muted-foreground leading-relaxed list-disc">
                                  {pain}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ── Default Alternating Layout ── */
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
                  {method.proofImage ? (
                    <>
                      <div
                        onClick={() => methodIndices[i] >= 0 && openAt(methodIndices[i])}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-sm cursor-zoom-in group"
                      >
                        <Image
                          src={method.proofImage.src}
                          alt={method.proofImage.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            🔍
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic text-center px-2">
                        {method.proofImage.caption}
                      </p>
                    </>
                  ) : method.image ? (
                    <div
                      onClick={() => methodIndices[i] >= 0 && openAt(methodIndices[i])}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-sm cursor-zoom-in group"
                    >
                      <Image
                        src={method.image}
                        alt={method.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                          🔍
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-2xl border border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/50">
                      <span className="text-xs text-muted-foreground/50 uppercase tracking-widest">
                        Research Photo
                      </span>
                    </div>
                  )}
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
            )
          ))}
        </div>

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
                  <div
                    onClick={() => openAt(methodSlides.length + i)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border shadow-sm group cursor-zoom-in"
                  >
                    <Image
                      src={artifact.image}
                      alt={artifact.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        🔍
                      </span>
                    </div>
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

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
