'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { profile } from '@/data/profile'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-accent-green uppercase">
          About Me
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold leading-snug tracking-tight"
      >
        Designing experiences, <br />
        <span className="text-accent-green">building products.</span>
      </motion.h2>

      {/* Bio */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-muted-foreground leading-relaxed text-base"
      >
        {profile.bio}
      </motion.p>

      {/* Services / Tags */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {profile.services.map((service) => (
          <Badge key={service} variant="outline" className="text-xs px-3 py-1">
            {service}
          </Badge>
        ))}
      </motion.div>

      <Separator />

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        {profile.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-accent-green">{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
