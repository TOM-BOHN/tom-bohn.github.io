import { getProjects } from '@/lib/projects'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ProjectsPageHeader } from '@/components/projects/ProjectsPageHeader'

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-text-primary font-mono">
              {'// PROJECTS'}
            </h1>
            <ProjectsPageHeader />
          </div>
          <p className="text-text-secondary leading-relaxed">
            A collection of projects organized by theme, showcasing artifacts, deliverables, and project phases
          </p>
        </div>

        <ProjectsSection themes={projectsData.themes} />
      </div>
    </div>
  )
}
