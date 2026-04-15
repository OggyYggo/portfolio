'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  quote: string
  name: string
  title: string
  avatar?: string
}

export default function GDClientQuote({ quote, name, title, avatar }: Props) {
  return (
    <section className="py-20 border-y bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center"
        >
          {/* Large quote mark */}
          <span className="text-8xl font-serif text-primary/20 leading-none select-none">
            &ldquo;
          </span>

          <blockquote className="text-2xl md:text-3xl font-medium leading-snug tracking-tight -mt-10">
            {quote}
          </blockquote>

          {/* Client attribution */}
          <div className="flex items-center gap-3">
            {avatar && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
