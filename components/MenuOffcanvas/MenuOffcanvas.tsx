'use client'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { FiLinkedin, FiGithub } from 'react-icons/fi'
import { BsDribbble } from 'react-icons/bs'
import { profile } from '@/data/profile'

export default function MenuOffcanvas() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="flex flex-col gap-1.5 w-10 h-10"
        >
          <span className="block w-6 h-0.5 bg-foreground transition-all" />
          <span className="block w-4 h-0.5 bg-foreground transition-all" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col gap-8 pt-16 px-8 w-[320px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation and contact information
        </SheetDescription>

        {/* Name + Tagline */}
        <div>
          <h3 className="text-3xl font-bold tracking-tight">
            {profile.name.toUpperCase()}.
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Let&apos;s Bring Your Vision to Life
          </p>
        </div>

        {/* Contact Info */}
        <ul className="space-y-2 text-sm">
          <li>
            <span className="text-muted-foreground">Email: </span>
            <a
              href={`mailto:${profile.email}`}
              className="underline underline-offset-4 hover:text-accent-green transition-colors"
            >
              {profile.email}
            </a>
          </li>
          <li>
            <span className="text-muted-foreground">Phone: </span>
            <span>{profile.phone}</span>
          </li>
          <li>
            <span className="text-muted-foreground">Location: </span>
            <span>{profile.location}</span>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-green transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={profile.socials.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-green transition-colors"
            aria-label="Dribbble"
          >
            <BsDribbble size={20} />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-green transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
        </div>

      </SheetContent>
    </Sheet>
  )
}
