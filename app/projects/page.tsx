import { getProjects } from '@/lib/projects'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ProjectsPageHeader } from '@/components/projects/ProjectsPageHeader'

export default async function Projects() {
  const projectsData = await getProjects()

  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">{'>'} PRODUCT MANAGER & SOFTWARE DESIGNER</p>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'PROJECTS'}
              </h1>
              <ProjectsPageHeader />
            </div>
            <p className="text-text-secondary leading-relaxed">
              A collection of projects organized by theme, showcasing artifacts, deliverables, and project phases
            </p>
          </div>

          <div className="fade-in-up fade-in-up-delay-1">
            <ProjectsSection themes={projectsData.themes} />
          </div>
        </div>
      </div>
    </>
  )
}
