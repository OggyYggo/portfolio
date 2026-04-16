'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  challenge1: string
  challenge2: string
  audience: string
  goals: string[]
}

export default function GDBrief({ heading, challenge1, challenge2, audience, goals }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Challenge + Audience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                {heading}
              </span>
              <Separator className="flex-1" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{challenge1}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">{challenge2}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground leading-relaxed text-sm">{audience}</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Goals
            </h3>
            <ul className="flex flex-col gap-3">
              {goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border bg-muted/30 text-sm"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
