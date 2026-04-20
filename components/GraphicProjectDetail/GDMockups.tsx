'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

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
  const { open, index, openAt, close } = useLightbox()

  const slides = items.map((item) => ({
    src: item.image,
    alt: item.label,
    title: item.label,
  }))

  const fullWidthItems = items.filter((m) => m.fullWidth)
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
          {/* Full-width mockups */}
          {items.map((item, i) =>
            item.fullWidth ? (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => openAt(i)}
                className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden cursor-zoom-in group"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.label}
                </span>
              </motion.div>
            ) : null
          )}

          {/* Grid mockups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) =>
              !item.fullWidth ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  onClick={() => openAt(i)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in"
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-between p-4">
                    <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                    <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      🔍
                    </span>
                  </div>
                </motion.div>
              ) : null
            )}
          </div>
        </div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
