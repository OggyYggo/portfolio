'use client'

import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import Lightbox from '@/components/ui/Lightbox'
import { useLightbox } from '@/hooks/useLightbox'

type Props = {
  heading: string
  description: string
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export default function GDBeforeAfter({
  heading, description, before, after, beforeLabel = 'Before', afterLabel = 'After'
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const { open, index, openAt, close } = useLightbox()

  const slides = [
    { src: before, alt: beforeLabel, title: beforeLabel },
    { src: after,  alt: afterLabel,  title: afterLabel  },
  ]

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleMouseDown = () => { isDragging.current = true }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

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
          <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
          <p className="text-xs text-muted-foreground">
            Drag to compare · Click either side to view full size
          </p>
        </motion.div>

        {/* Interactive slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border cursor-col-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After */}
          <div onClick={() => openAt(1)} className="absolute inset-0 cursor-zoom-in">
            <Image src={after} alt={afterLabel} fill className="object-cover" sizes="100vw" />
          </div>

          {/* Before — clipped */}
          <div
            className="absolute inset-0 overflow-hidden cursor-zoom-in"
            style={{ width: `${sliderPosition}%` }}
            onClick={() => openAt(0)}
          >
            <Image src={before} alt={beforeLabel} fill className="object-cover" sizes="100vw" />
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-10 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-bold text-foreground">
              ↔
            </div>
          </div>

          {/* Labels */}
          <span className="absolute bottom-4 left-4 z-10 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded pointer-events-none">
            {beforeLabel}
          </span>
          <span className="absolute bottom-4 right-4 z-10 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded pointer-events-none">
            {afterLabel}
          </span>

          {/* Drag range — on top */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </motion.div>

      </div>

      <Lightbox slides={slides} open={open} index={index} onClose={close} />
    </section>
  )
}
