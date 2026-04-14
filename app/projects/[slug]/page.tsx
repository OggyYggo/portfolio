import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import Header from '@/components/Header/Header'
import ProjectHero from '@/components/ProjectDetail/ProjectHero'
import ProjectMeta from '@/components/ProjectDetail/ProjectMeta'
import ProjectGallery from '@/components/ProjectDetail/ProjectGallery'
import ProjectStrategy from '@/components/ProjectDetail/ProjectStrategy'
import ProjectParallax from '@/components/ProjectDetail/ProjectParallax'
import ProjectCTA from '@/components/ProjectDetail/ProjectCTA'
import ProjectHook from '@/components/ProjectDetail/ProjectHook'
import ProjectOverview from '@/components/ProjectDetail/ProjectOverview'
import ProjectProblem from '@/components/ProjectDetail/ProjectProblem'
import ProjectResearch from '@/components/ProjectDetail/ProjectResearch'
import ProjectEarlyThinking from '@/components/ProjectDetail/ProjectEarlyThinking'
import ProjectDecisions from '@/components/ProjectDetail/ProjectDecisions'
import ProjectFinalDesigns from '@/components/ProjectDetail/ProjectFinalDesigns'
import ProjectBeforeAfter from '@/components/ProjectDetail/ProjectBeforeAfter'
import ProjectResults from '@/components/ProjectDetail/ProjectResults'
import ProjectReflection from '@/components/ProjectDetail/ProjectReflection'

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
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.tagline,
      images: [project.heroImage ?? project.image],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  // Determine if this is an enhanced case study project
  const isCaseStudy = !!(project.overview || project.problem || project.research)

  return (
    <>
      <Header />
      <main className="flex flex-col">

        {/* ── Case Study Hero (Hook) or Simple Hero ────────── */}
        {isCaseStudy && project.heroImage && project.role && project.problemStatement ? (
          <ProjectHook
            title={project.title}
            tagline={project.tagline}
            role={project.role}
            heroImage={project.heroImage}
            problemStatement={project.problemStatement}
          />
        ) : (
          <ProjectHero title={project.title} tagline={project.tagline} />
        )}

        {/* ── Case Study Sections ──────────────────────────── */}
        {isCaseStudy ? (
          <>
            {project.overview && <ProjectOverview {...project.overview} />}
            {project.problem && <ProjectProblem {...project.problem} />}
            {project.research && <ProjectResearch {...project.research} />}
            {project.earlyThinking && <ProjectEarlyThinking {...project.earlyThinking} />}
            {project.decisions && <ProjectDecisions {...project.decisions} />}
            {project.finalDesigns && <ProjectFinalDesigns {...project.finalDesigns} />}
            {project.beforeAfter && <ProjectBeforeAfter {...project.beforeAfter} />}
            {project.results && <ProjectResults {...project.results} />}
            {project.reflection && <ProjectReflection {...project.reflection} />}
          </>
        ) : (
          <>
            {/* ── Simple Project Layout (existing) ───────────── */}
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

            {project.gallery && <ProjectGallery images={project.gallery} />}

            {project.strategy && (
              <ProjectStrategy
                heading={project.strategy.heading}
                paragraphs={project.strategy.paragraphs}
              />
            )}

            {project.parallaxImage && (
              <ProjectParallax image={project.parallaxImage} gallery={project.gallery} />
            )}
          </>
        )}

        {/* CTA — always shown */}
        <ProjectCTA />
      </main>
    </>
  )
}
