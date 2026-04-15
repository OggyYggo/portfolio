'use client'

import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

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
          {/* After image (full background) */}
          <Image
            src={after}
            alt={afterLabel}
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <Image
              src={before}
              alt={beforeLabel}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black">
                <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm z-10">
            {beforeLabel}
          </span>
          <span className="absolute top-4 right-4 text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm z-10">
            {afterLabel}
          </span>
        </motion.div>

      </div>
    </section>
  )
}
