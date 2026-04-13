'use client'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const TYPEWRITER_TEXT = 'JAYBEE.'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Typewriter effect — reveal one character at a time
    let charIndex = 0
    const interval = setInterval(() => {
      charIndex++
      setDisplayText(TYPEWRITER_TEXT.slice(0, charIndex))
      if (charIndex >= TYPEWRITER_TEXT.length) clearInterval(interval)
    }, 120)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      })
      tl.to('.inner-bar', {
        width: '100%',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.inOut',
      })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.6,
          ease: 'power2.inOut',
        })
    }, containerRef)

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <span className="preloader-name text-2xl font-bold tracking-widest">
        {displayText}
        <span className="inline-block w-[2px] h-[1em] bg-accent-green ml-0.5 align-middle animate-pulse" />
      </span>
      <div className="preloader-gutters mt-8 flex gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bar h-1 w-8 overflow-hidden rounded bg-muted"
          >
            <div className="inner-bar h-full w-0 bg-accent-green" />
          </div>
        ))}
      </div>
    </div>
  )
}
