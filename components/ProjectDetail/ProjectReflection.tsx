'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  body: string[]
  wouldDoDifferently: string[]
}

export default function ProjectReflection({ heading, body, wouldDoDifferently }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Reflection body */}
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
            {body.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-sm">{para}</p>
            ))}
          </motion.div>

          {/* Right — What I'd do differently */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              What I&apos;d Do Differently
            </h3>
            <ul className="flex flex-col gap-3">
              {wouldDoDifferently.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/50 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
