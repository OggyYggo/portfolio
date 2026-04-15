'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type GalleryImage = {
  src: string
  caption?: string
  span?: 'normal' | 'wide'
}

type Props = {
  heading: string
  images: GalleryImage[]
}

export default function GDGallery({ heading, images }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col gap-10">

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-2 ${
                img.span === 'wide' ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border ${
                  img.span === 'wide' ? 'aspect-[21/9]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption ?? `Deliverable ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes={img.span === 'wide' ? '100vw' : '50vw'}
                />
              </div>
              {img.caption && (
                <p className="text-xs text-muted-foreground text-center italic">
                  {img.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
