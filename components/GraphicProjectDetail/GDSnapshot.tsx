'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type Props = {
  client: string
  industry: string
  deliverables: string[]
  year: string
  role: string
}

export default function GDSnapshot({ client, industry, deliverables, year, role }: Props) {
  return (
    <section className="border-y py-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Client', value: client },
            { label: 'Industry', value: industry },
            { label: 'Year', value: year },
            { label: 'Role', value: role },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
              <span className="font-semibold text-sm">{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Deliverables
          </span>
          <div className="flex flex-wrap gap-2">
            {deliverables.map((d) => (
              <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
