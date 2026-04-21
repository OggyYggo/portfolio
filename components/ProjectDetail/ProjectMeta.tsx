'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heroImage: string
  category: string
  client: string
  timeline: string
  link: string
  summary: string[]
}

export default function ProjectMeta({
  heroImage, category, client, timeline, link, summary
}: Props) {
  const { open, index, openAt, close } = useLightbox()

  const slides = [{ src: heroImage, alt: 'Project hero', title: 'Project Preview' }]

  return (
    <div className="flex flex-col gap-10">

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden cursor-zoom-in group"
        onClick={() => openAt(0)}
      >
        <Image
          src={heroImage}
          alt="Project hero"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
            View
          </span>
        </div>
      </motion.div>

      {/* Meta + Summary two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left — Project Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ul className="flex flex-col divide-y divide-border">
            {[
              { label: 'Category', value: category },
              { label: 'Client', value: client },
              { label: 'Timeline', value: timeline },
            ].map((item) => (
              <li key={item.label} className="flex justify-between py-4">
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                <span className="text-sm font-semibold">{item.value}</span>
              </li>
            ))}
            <li className="flex justify-between py-4">
              <span className="text-sm text-muted-foreground font-medium">Link</span>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Visit Live Project <FiExternalLink size={12} />
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Right — Summary Paragraphs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {summary.map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-sm">
              {para}
            </p>
          ))}
        </motion.div>

      </div>
      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </div>
  )
}
