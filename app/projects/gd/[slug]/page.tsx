import { notFound } from 'next/navigation'
import { gdProjects } from '@/data/gd-projects'
import Header from '@/components/Header/Header'
import GDHook from '@/components/GraphicProjectDetail/GDHook'
import GDSnapshot from '@/components/GraphicProjectDetail/GDSnapshot'
import GDBrief from '@/components/GraphicProjectDetail/GDBrief'
import GDCreativeDirection from '@/components/GraphicProjectDetail/GDCreativeDirection'
import GDLogoExploration from '@/components/GraphicProjectDetail/GDLogoExploration'
import GDBrandSystem from '@/components/GraphicProjectDetail/GDBrandSystem'
import GDMockups from '@/components/GraphicProjectDetail/GDMockups'
import GDGallery from '@/components/GraphicProjectDetail/GDGallery'
import GDBeforeAfter from '@/components/GraphicProjectDetail/GDBeforeAfter'
import GDClientQuote from '@/components/GraphicProjectDetail/GDClientQuote'
import GDCTA from '@/components/GraphicProjectDetail/GDCTA'

export async function generateStaticParams() {
  return gdProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = gdProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Graphic Design`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Graphic Design`,
      description: project.tagline,
      images: [project.heroImage],
    },
  }
}

export default async function GDProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = gdProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <GDHook
          title={project.title}
          tagline={project.tagline}
          heroImage={project.heroImage}
          heroColor={project.heroColor}
        />
        <GDSnapshot {...project.snapshot} />
        <GDBrief {...project.brief} />
        <GDCreativeDirection {...project.creativeDirection} />
        <GDLogoExploration {...project.logoExploration} />
        <GDBrandSystem {...project.brandSystem} />
        <GDMockups {...project.mockups} />
        <GDGallery {...project.gallery} />
        {project.beforeAfter && <GDBeforeAfter {...project.beforeAfter} />}
        {project.clientQuote && <GDClientQuote {...project.clientQuote} />}
        <GDCTA />
      </main>
    </>
  )
}
