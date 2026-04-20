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
  finalMark: {
    image: string
    darkImage: string
    caption: string
  }
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

        {/* Label + description */}
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

        {/* Directions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-3 p-4 rounded-2xl border ${
                dir.status === 'chosen'
                  ? 'border-primary bg-primary/5'
                  : 'bg-muted/20'
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

              {/* Label + status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{dir.label}</span>
                <Badge variant={statusConfig[dir.status].variant} className="text-xs shrink-0">
                  {statusConfig[dir.status].label}
                </Badge>
              </div>

              {/* Note */}
              <p className="text-xs text-muted-foreground leading-relaxed">{dir.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Final mark — light + dark */}
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
