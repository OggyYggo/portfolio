'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  paragraphs: string[]
}

export default function ProjectStrategy({ heading, paragraphs }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-sm">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
