# Contact — Component Guide

> Part of Phase C (Polish) — Build this after Portfolio.

---

## File Structure

```
src/
├── components/
│   └── Contact/
│       └── Contact.tsx
└── data/
    └── profile.ts   ← already has email and socials
```

---

## shadcn Components Used

| Component | Purpose |
|---|---|
| `Button` | CTA — email and social links |
| `Separator` | Section divider |
| `Card`, `CardContent` | Contact info container |
| `Input` | Form field |
| `Textarea` | Message field |
| `Label` | Accessible form labels |

Install if not already added:

```bash
npx shadcn@latest add input textarea label
```

---

## Step 1 — Install Form Libraries

For form validation, install:

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Step 2 — Build the Contact Component

**File:** `components/Contact/Contact.tsx`

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import { BsDribbble } from 'react-icons/bs'
import { profile } from '@/data/profile'

// ─── Validation Schema ─────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

// ─── Fade animation ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    // Replace this with your preferred email service:
    // - Resend (recommended): https://resend.com
    // - EmailJS: https://emailjs.com
    // - Formspree: https://formspree.io
    console.log('Form submitted:', data)

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200))

    setLoading(false)
    setSubmitted(true)
    reset()
  }

  return (
    <section id="contact" className="flex flex-col gap-8 pb-20">

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
          Contact
        </span>
        <Separator className="flex-1" />
      </motion.div>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Let's <span className="text-primary">work together.</span>
        </h2>
        <p className="text-muted-foreground text-base max-w-lg">
          Have a project in mind or just want to say hi? Fill out the form below
          or reach out directly — I'll get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

        {/* Left — Contact Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center border rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FiSend size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg">Message sent!</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  {...register('subject')}
                  className={errors.subject ? 'border-destructive' : ''}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  {...register('message')}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-fit gap-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Message <FiSend size={14} />
                  </>
                )}
              </Button>

            </form>
          )}
        </motion.div>

        {/* Right — Contact Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {/* Direct Email */}
          <Card>
            <CardContent className="p-4 flex flex-col gap-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Email me directly
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <FiMail size={14} className="text-primary shrink-0" />
                {profile.email}
              </a>
            </CardContent>
          </Card>

          {/* Socials */}
          <Card>
            <CardContent className="p-4 flex flex-col gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Find me on
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FiLinkedin size={14} className="text-primary" />
                  LinkedIn
                </a>
                <a
                  href={profile.socials.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                >
                  <BsDribbble size={14} className="text-primary" />
                  Dribbble
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FiGithub size={14} className="text-primary" />
                  GitHub
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-semibold text-primary">
                  Available for work
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently taking on new projects and freelance work.
              </p>
            </CardContent>
          </Card>

        </motion.div>
      </div>

    </section>
  )
}
```

---

## Step 3 — Connect a Real Email Service

Replace the `console.log` in `onSubmit` with one of these:

### Option A — Resend (Recommended)
```bash
npm install resend
```
```ts
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'you@email.com',
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} (${email})\n\n${message}`,
  })

  return Response.json({ success: true })
}
```

Then update `onSubmit` in `Contact.tsx`:
```ts
const res = await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
})
```

### Option B — Formspree (No backend needed)
```ts
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
})
```

---

## Step 4 — Add Contact to Page

```tsx
// app/page.tsx
import Sidebar from '@/components/Sidebar/Sidebar'
import About from '@/components/About/About'
import Skills from '@/components/Skills/Skills'
import Experience from '@/components/Experience/Experience'
import Portfolio from '@/components/Portfolio/Portfolio'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        <Sidebar />

        <main className="flex flex-col gap-16">
          <About />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
        </main>

      </div>
    </div>
  )
}
```

---

## Checklist

- [ ] shadcn `Input`, `Textarea`, `Label` installed
- [ ] `react-hook-form`, `zod`, `@hookform/resolvers` installed
- [ ] `Contact.tsx` created
- [ ] Contact imported and added to `app/page.tsx`
- [ ] Form validates name, email, subject, and message
- [ ] Error messages appear under invalid fields
- [ ] Success state shows after submission
- [ ] "Send another message" resets the form
- [ ] Email service connected (Resend or Formspree)
- [ ] Direct email link works
- [ ] Social links open in new tab
- [ ] Availability card visible
- [ ] Layout is 2-column on desktop, stacked on mobile

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Form submits with empty fields | Check `zodResolver` is passed to `useForm` |
| Error messages not showing | Confirm `errors.fieldName` is accessed correctly |
| Emails not arriving | Check API key is set in `.env.local` and the route is correct |
| Success state not showing | Make sure `setSubmitted(true)` is called after the API resolves |
| Layout not 2-column | Confirm `lg:grid-cols-[1fr_280px]` is on the content grid div |

---

> Next up: **Cursor** — Custom animated cursor with GSAP. Final component!
