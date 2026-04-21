'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type GalleryImage = {
  src: string
  caption: string
}

type Props = {
  images: GalleryImage[]
}

export default function ProjectGallery({ images }: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.caption,
    title: img.caption,
  }))

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openAt(i)}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] cursor-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Caption + zoom overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-between p-4">
                <p className="text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
                <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
