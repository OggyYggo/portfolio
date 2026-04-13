'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import MenuOffcanvas from '@/components/MenuOffcanvas/MenuOffcanvas'

gsap.registerPlugin(useGSAP)

export default function Header() {
  useGSAP(() => {
    gsap.from('#header', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out',
    })
  })

  return (
    <header
      id="header"
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          JB.
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {/* Available for Work badge */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for Work
          </div>

          {/* Hamburger / Sheet trigger */}
          <MenuOffcanvas />

        </div>
      </div>
    </header>
  )
}
