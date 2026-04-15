'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type MockupItem = {
  label: string
  image: string
  fullWidth?: boolean
}

type Props = {
  heading: string
  description: string
  items: MockupItem[]
}

export default function GDMockups({ heading, description, items }: Props) {
  const gridItems = items.filter((m) => !m.fullWidth)

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={item.fullWidth ? 'w-full' : 'hidden'}
            >
              {item.fullWidth ? (
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              ) : null}
            </motion.div>
          ))}

          {/* Grid items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 pb-4">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
