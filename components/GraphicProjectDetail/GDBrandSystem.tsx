'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

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
  const { open, index, openAt, close } = useLightbox()

  const slides = [
    { src: systemImage, alt: 'Brand system overview', title: 'Brand System Overview' },
    ...components.map((c) => ({
      src: c.image,
      alt: c.title,
      title: c.title,
      description: c.description,
    })),
  ]

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

        {/* Full system overview — clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onClick={() => openAt(0)}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border cursor-zoom-in group"
        >
          <Image
            src={systemImage}
            alt="Brand system overview"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
              View
            </span>
          </div>
        </motion.div>

        {/* Components grid — clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {components.map((comp, i) => (
            <motion.div
              key={comp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => openAt(i + 1)}
                className="cursor-zoom-in group overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={comp.image}
                      alt={comp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <h3 className="font-bold text-sm">{comp.title}</h3>
                    <p className="text-xs text-muted-foreground">{comp.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
