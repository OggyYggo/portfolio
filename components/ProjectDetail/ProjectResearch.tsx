'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

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
  intro: string
  methods: ResearchMethod[]
  insights: ResearchInsight[]
  artifacts?: ResearchArtifact[]
}

export default function ProjectResearch({
  heading,
  intro,
  methods,
  insights,
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
          <p className="text-muted-foreground leading-relaxed">{intro}</p>
        </motion.div>

        {/* Research Methods — alternating layout */}
        <div className="flex flex-col gap-20">
          {methods.map((method, i) => (
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
          ))}
        </div>

        <Separator />

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border bg-background">
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <p className="text-sm leading-relaxed">{insight.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground italic mt-auto">
                      — {insight.source}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
