'use client'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'

type Props = {
  client: string
  timeline: string
  role: string
  tools: string[]
  link?: string
}

export default function ProjectOverview({ client, timeline, role, tools, link }: Props) {
  return (
    <section className="py-16 border-b">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Client', value: client },
            { label: 'Timeline', value: timeline },
            { label: 'Role', value: role },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.label}
              </span>
              <span className="font-semibold text-sm">{item.value}</span>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Tools
            </span>
            <div className="flex flex-wrap gap-1">
              {tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {link && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View Live Project <FiExternalLink size={14} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
