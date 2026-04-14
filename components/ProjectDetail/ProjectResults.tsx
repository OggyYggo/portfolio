'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  description: string
  metrics: { value: string; label: string }[]
  qualitative?: string[]
}

export default function ProjectResults({ heading, description, metrics, qualitative }: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {heading}
            </span>
            <Separator className="flex-1" />
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">{description}</p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-1 p-6 rounded-2xl border bg-background"
            >
              <span className="text-3xl font-bold text-primary">{metric.value}</span>
              <span className="text-xs text-muted-foreground leading-snug">{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Qualitative outcomes */}
        {qualitative && qualitative.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Qualitative Outcomes
            </h3>
            <ul className="flex flex-col gap-3">
              {qualitative.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground p-4 rounded-xl border bg-background"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

      </div>
    </section>
  )
}
