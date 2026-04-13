'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { skills } from '@/data/skills'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const categories = ['Design', 'Development', 'Tools'] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate progress bars width on scroll into view
  useGSAP(() => {
    const bars = containerRef.current?.querySelectorAll('.skill-bar')

    bars?.forEach((bar) => {
      const target = bar.getAttribute('data-value') ?? '0'

      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${target}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="skills" className="flex flex-col gap-8">

      {/* Section Label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Skills
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
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        What I <span className="text-primary">work with.</span>
      </motion.h2>

      {/* Skills by Category */}
      <div ref={containerRef} className="flex flex-col gap-10">
        {categories.map((category, ci) => {
          const categorySkills = skills.filter((s) => s.category === category)

          return (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              {/* Category Badge */}
              <Badge variant="secondary" className="w-fit text-xs">
                {category}
              </Badge>

              {/* Skill Bars */}
              <div className="flex flex-col gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{skill.label}</span>
                      <span className="text-muted-foreground">{skill.percentage}%</span>
                    </div>

                    {/* Custom animated bar using GSAP */}
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-primary rounded-full"
                        data-value={skill.percentage}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
