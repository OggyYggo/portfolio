'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { skills, skillCategories } from '@/data/skills'
import {
  SiClaude,
  SiGooglegemini,
  SiOpenai,
  SiMongodb,
  SiFigma,
  SiGithub,
  SiPostman,
  SiSketchup,
} from 'react-icons/si'
import { TbApi, TbNeedleThread } from 'react-icons/tb'

// ─── Icon map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, ReactNode> = {
  claude:       <SiClaude       size={28} className="text-orange-400" />,
  gemini:       <SiGooglegemini size={28} className="text-blue-400" />,
  stitch:       <TbNeedleThread size={28} className="text-purple-400" />,
  chatgpt:      <SiOpenai       size={28} className="text-green-500" />,
  mongodb:      <SiMongodb      size={28} className="text-green-400" />,
  api:          <TbApi          size={28} className="text-muted-foreground" />,
  figma:        <SiFigma        size={28} className="text-pink-400" />,
  illustrator:  <img src="/Icons/illustrator.svg" alt="Illustrator" width={28} height={28} />,
  photoshop:    <img src="/Icons/Photoshop.svg" alt="Photoshop" width={28} height={28} />,
  sketchup:     <SiSketchup         size={28} className="text-red-400" />,
  github:       <SiGithub       size={28} className="text-foreground" />,
  postman:      <SiPostman      size={28} className="text-orange-500" />,
}

// ─── Animation ───────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Skills() {
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
        <span className="text-xs font-semibold tracking-widest text-accent-green uppercase">
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
        Tools
      </motion.h2>

      {/* 2-Column Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {skillCategories.map((category, ci) => {
          const categorySkills = skills.filter((s) => s.category === category)

          return (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {/* Category Heading */}
              <h3 className="text-lg font-bold tracking-tight">{category}</h3>

              {/* Skill Cards */}
              <div className="flex flex-col gap-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.label}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-accent-green/30"
                  >
                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {iconMap[skill.icon] ?? <span className="text-xs">?</span>}
                    </div>

                    {/* Label + Description */}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{skill.label}</span>
                      <span className="text-xs text-muted-foreground">{skill.description}</span>
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
