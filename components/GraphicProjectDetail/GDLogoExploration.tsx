'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
  chosen:   { label: 'Chosen', variant: 'default' as const },
}

export default function GDLogoExploration({
  heading, description, directions, finalMark
}: Props) {
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
              {/* Logo image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white">
                <Image
                  src={dir.image}
                  alt={dir.label}
                  fill
                  className="object-contain p-6"
                  sizes="33vw"
                />
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
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border">
              <Image
                src={finalMark.image}
                alt="Logo on light background"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-foreground border">
              <Image
                src={finalMark.darkImage}
                alt="Logo on dark background"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic text-center">
            {finalMark.caption}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
