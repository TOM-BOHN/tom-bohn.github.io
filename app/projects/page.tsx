import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import { ProjectsPageWrapper } from '@/components/projects/ProjectsPageWrapper'

export const metadata: Metadata = {
  title: 'Projects',
}

export default async function Projects() {
  const projectsData = await getProjects()

  return <ProjectsPageWrapper themes={projectsData.themes} />
}
