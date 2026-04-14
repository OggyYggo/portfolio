'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  before: string
  after: string
}

export default function ProjectBeforeAfter({ heading, description, before, after }: Props) {
  const [position, setPosition] = useState(50)

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
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden select-none"
        >
          {/* After image (full width base) */}
          <Image src={after} alt="After" fill className="object-cover" sizes="100vw" />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <Image src={before} alt="Before" fill className="object-cover" sizes="100vw" />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-foreground">
              &#x2194;
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
            BEFORE
          </span>
          <span className="absolute bottom-4 right-4 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">
            AFTER
          </span>

          {/* Range input overlay */}
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </motion.div>

      </div>
    </section>
  )
}
