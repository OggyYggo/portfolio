'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

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

    // Scale up on hoverable elements
    const onEnter = () => {
      if (isHovering.current) return
      isHovering.current = true
      gsap.to(circle, {
        scale: 2.5,
        opacity: 0.4,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
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

    // Attach hover listeners to interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [data-cursor="hover"], input, textarea, label'
      )
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addHoverListeners()
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onMouseOut)
    document.addEventListener('mouseenter', onMouseIn)

    // Re-attach when DOM changes (e.g. filter updates in Portfolio)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onMouseOut)
      document.removeEventListener('mouseenter', onMouseIn)
      observer.disconnect()
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
        className="w-5 h-5 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm"
      />
    </div>
  )
}
