'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FiLinkedin, FiGithub, FiMail, FiMapPin } from 'react-icons/fi'
import { BsDribbble } from 'react-icons/bs'
import { profile, buildEmail } from '@/data/profile'

gsap.registerPlugin(useGSAP)

export default function Sidebar() {
  useGSAP(() => {
    gsap.from('.resume-sidebar', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out',
    })
  })

  return (
    <aside className="resume-sidebar flex flex-col gap-6 p-6 rounded-2xl border bg-card shadow-sm h-fit sticky top-24">

      {/* Profile Photo */}
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-32 h-32 ring-4 ring-accent-green/10">
          <AvatarImage src={profile.photo} alt={profile.name} />
          <AvatarFallback className="text-3xl font-bold">
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Name + Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{profile.title}</p>
        </div>

        {/* Availability Badge */}
        {profile.available && (
          <Badge variant="secondary" className="flex items-center gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for Work
          </Badge>
        )}
      </div>

      <Separator />

      {/* Contact Info */}
      <ul className="space-y-3 text-sm">
        <li className="flex items-center gap-3 text-muted-foreground">
          <FiMail size={15} className="shrink-0 text-accent-green" />
          <a
            href={`mailto:${buildEmail()}`}
            className="hover:text-accent-green transition-colors truncate"
          >
            {buildEmail()}
          </a>
        </li>
        <li className="flex items-center gap-3 text-muted-foreground">
          <FiMapPin size={15} className="shrink-0 text-accent-green" />
          <span>{profile.location}</span>
        </li>
      </ul>

      <Separator />

      {/* Social Icons */}
      <div className="flex justify-center gap-4">
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-accent-green transition-colors hover:scale-110 duration-200"
        >
          <FiLinkedin size={20} />
        </a>
        <a
          href={profile.socials.dribbble}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dribbble"
          className="text-muted-foreground hover:text-accent-green transition-colors hover:scale-110 duration-200"
        >
          <BsDribbble size={20} />
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-accent-green transition-colors hover:scale-110 duration-200"
        >
          <FiGithub size={20} />
        </a>
      </div>

      <Separator />

      {/* Download CV Button */}
      <a
        href="/cv.pdf"
        download
        className="w-full text-center text-sm font-medium py-2 px-4 rounded-lg border border-accent-green text-accent-green hover:bg-accent-green hover:text-primary-foreground transition-colors duration-200"
      >
        Download CV
      </a>

    </aside>
  )
}
