'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

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
  const { open, index, openAt, close } = useLightbox()

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.caption ?? 'Gallery image',
    title: img.caption,
  }))

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              onClick={() => openAt(i)}
              className={`relative overflow-hidden rounded-2xl cursor-zoom-in group ${
                img.span === 'wide' ? 'sm:col-span-2 aspect-[16/7]' : 'aspect-square'
              }`}
            >
              <Image
                src={img.src}
                alt={img.caption ?? `Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={img.span === 'wide' ? '100vw' : '50vw'}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-between p-4">
                {img.caption && (
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                  </span>
                )}
                <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  🔍
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
