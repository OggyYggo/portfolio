'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  items: {
    decision: string
    reasoning: string
    image?: string
  }[]
}

export default function ProjectDecisions({ heading, items }: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {heading}
          </span>
          <Separator className="flex-1" />
        </motion.div>

        <div className="flex flex-col gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.decision}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">{item.decision}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.reasoning}
                </p>
              </div>

              {item.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border">
                  <Image
                    src={item.image}
                    alt={item.decision}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
