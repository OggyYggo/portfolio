'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"], input, textarea, label'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)
  const trackedElements = useRef<WeakSet<Element>>(new WeakSet())

  useEffect(() => {
    const cursor = cursorRef.current
    const circle = circleRef.current
    if (!cursor || !circle) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Follow mouse
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // Scale up on hoverable elements — via event delegation
    const onHoverEnter = (e: Event) => {
      const target = e.target as Element
      if (isHovering.current) return
      isHovering.current = true
      gsap.to(circle, {
        scale: 2.5,
        opacity: 0.4,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onHoverLeave = () => {
      isHovering.current = false
      gsap.to(circle, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.in',
      })
    }

    // Hide cursor when it leaves the window
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 })
      }
    }

    const onMouseIn = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 })
    }

    // Event delegation: attach listeners once on document.body
    // instead of per-element to avoid memory leaks.
    const onBodyMouseOver = (e: Event) => {
      const target = e.target as Element
      if (target.matches(HOVER_SELECTOR)) {
        onHoverEnter(e)
      }
    }

    const onBodyMouseOut = (e: Event) => {
      const target = e.target as Element
      if (target.matches(HOVER_SELECTOR)) {
        onHoverLeave()
      }
    }

    document.addEventListener('mouseover', onBodyMouseOver)
    document.addEventListener('mouseout', onBodyMouseOut)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onMouseOut)
    document.addEventListener('mouseenter', onMouseIn)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mouseover', onBodyMouseOver)
      document.removeEventListener('mouseout', onBodyMouseOut)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onMouseOut)
      document.removeEventListener('mouseenter', onMouseIn)
      trackedElements.current = new WeakSet()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      id="cursor"
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        ref={circleRef}
        className="w-5 h-5 rounded-full border-2 border-accent-green bg-accent-green/20 backdrop-blur-sm"
      />
    </div>
  )
}
