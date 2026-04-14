import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import Header from '@/components/Header/Header'
import ProjectHero from '@/components/ProjectDetail/ProjectHero'
import ProjectMeta from '@/components/ProjectDetail/ProjectMeta'
import ProjectGallery from '@/components/ProjectDetail/ProjectGallery'
import ProjectStrategy from '@/components/ProjectDetail/ProjectStrategy'
import ProjectParallax from '@/components/ProjectDetail/ProjectParallax'
import ProjectCTA from '@/components/ProjectDetail/ProjectCTA'

// Generate static paths for all projects at build time
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// Generate metadata per project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Portfolio`,
    description: project.tagline,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <Header />
      <main>
        <ProjectHero title={project.title} tagline={project.tagline} />

        {/* Hero image + meta + summary */}
        <section className="container mx-auto px-6 py-16">
          <ProjectMeta
            heroImage={project.image}
            category={project.category}
            client={project.client}
            timeline={project.timeline}
            link={project.link}
            summary={project.summary ?? []}
          />
        </section>

        {/* Gallery */}
        {project.gallery && <ProjectGallery images={project.gallery} />}

        {/* Strategy text */}
        {project.strategy && (
          <ProjectStrategy
            heading={project.strategy.heading}
            paragraphs={project.strategy.paragraphs}
          />
        )}

        {/* Parallax */}
        {project.parallaxImage && (
          <ProjectParallax image={project.parallaxImage} gallery={project.gallery} />
        )}

        {/* CTA */}
        <ProjectCTA />
      </main>
    </>
  )
}
