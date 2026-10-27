import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ProjectsPageHeader } from '@/components/projects/ProjectsPageHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Projects',
}

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <PageShell>
      <PageHeader
        title="PROJECTS"
        actions={<ProjectsPageHeader />}
        description="A collection of projects organized by theme, showcasing artifacts, deliverables, and project phases"
      />

      <ScrollReveal>
        <ProjectsSection themes={projectsData.themes} />
      </ScrollReveal>
    </PageShell>
  )
}
