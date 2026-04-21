'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heading: string
  description: string
  images: { src: string; caption: string; explanation?: string }[]
  figmaEmbed?: string
}

export default function ProjectFinalDesigns({ heading, description, images, figmaEmbed }: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.caption,
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

        {/* Final design images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group flex flex-col gap-3"
            >
              <div
                onClick={() => openAt(i)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border bg-muted cursor-zoom-in"
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{img.caption}</p>
              {img.explanation && (
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{img.explanation}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Figma prototype embed */}
        {figmaEmbed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <iframe
              src={figmaEmbed}
              className="w-full aspect-video rounded-xl border"
              allowFullScreen
              title="Figma Prototype"
            />
          </motion.div>
        )}

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
