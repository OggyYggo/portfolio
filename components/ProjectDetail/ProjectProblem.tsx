'use client'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  body: string[]
  painPoints: string[]
}

export default function ProjectProblem({ heading, body, painPoints }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Body text */}
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
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </motion.div>

          {/* Right — Pain points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              User Pain Points
            </h3>
            <ul className="flex flex-col gap-3">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-destructive shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
