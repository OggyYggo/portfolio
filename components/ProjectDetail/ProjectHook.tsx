'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  tagline: string
  role: string
  heroImage: string
  problemStatement: string
}

export default function ProjectHook({ title, tagline, role, heroImage, problemStatement }: Props) {
  return (
    <section className="flex flex-col">

      {/* Text Hero */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl flex flex-col gap-6"
        >
          <Badge variant="outline" className="w-fit">{role}</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {problemStatement}
          </p>
        </motion.div>
      </div>

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full aspect-[21/9] overflow-hidden"
      >
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

    </section>
  )
}
