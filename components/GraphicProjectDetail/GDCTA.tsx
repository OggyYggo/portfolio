'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function GDCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Like what you see?
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              I&apos;m available for brand identity, packaging, and creative direction projects.
              Let&apos;s make something worth looking at.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/#contact">Start a Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#portfolio">More Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
