'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  images: { src: string; caption: string }[]
}

export default function ProjectEarlyThinking({ heading, description, images }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

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
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </motion.div>

        {/* Sketch / wireframe images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="text-xs text-muted-foreground">{img.caption}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
