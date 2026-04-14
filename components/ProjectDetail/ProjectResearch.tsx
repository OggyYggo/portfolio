'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  heading: string
  methods: { title: string; description: string; image?: string }[]
  insights: string[]
}

export default function ProjectResearch({ heading, methods, insights }: Props) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {heading}
          </span>
          <Separator className="flex-1" />
        </motion.div>

        {/* Research methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {methods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col gap-4">
                  {method.image && (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src={method.image} alt={method.title} fill className="object-cover" sizes="50vw" />
                    </div>
                  )}
                  <h3 className="font-bold">{method.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border bg-background text-sm"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                {insight}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
