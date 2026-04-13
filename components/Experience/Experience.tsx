'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { experience } from '@/data/experience'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

const badgeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  'Full-time': 'default',
  'Freelance': 'secondary',
  'Contract': 'outline',
  'Internship': 'outline',
}

export default function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Experience
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        Where I&apos;ve <span className="text-primary">worked.</span>
      </motion.h2>

      {/* Timeline */}
      <div className="relative flex flex-col gap-6">

        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

        {experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative sm:pl-14"
          >
            {/* Timeline dot */}
            <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full bg-primary ring-4 ring-background hidden sm:block" />

            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{job.role}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={badgeVariant[job.type] ?? 'outline'}>
                      {job.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>

                {/* Highlights */}
                <ul className="flex flex-col gap-2">
                  {job.highlights.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
