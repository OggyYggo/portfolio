'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  systemImage: string
  components: {
    title: string
    image: string
    description: string
  }[]
}

export default function GDBrandSystem({ heading, description, systemImage, components }: Props) {
  return (
    <section className="py-20 bg-muted/20">
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

        {/* Full brand system overview image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border"
        >
          <Image
            src={systemImage}
            alt="Brand system overview"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* System components grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((comp, i) => (
            <motion.div
              key={comp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 p-4 rounded-2xl border bg-background"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={comp.image}
                  alt={comp.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <h4 className="text-sm font-semibold">{comp.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
