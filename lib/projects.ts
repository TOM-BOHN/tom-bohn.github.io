import path from 'path'
import { readJsonFile } from '@/lib/json'

export interface ProjectArtifact {
  id: string
  title: string
  description?: string
  type: 'artifact' | 'deliverable' | 'phase' | 'example'
  url?: string
  date?: string
}

export interface ProjectTheme {
  id: string
  title: string
  description: string
  artifacts: ProjectArtifact[]
}

export interface ProjectsData {
  themes: ProjectTheme[]
}

const projectsFile = path.join(process.cwd(), 'data/projects.json')

export async function getProjects(): Promise<ProjectsData> {
  const projects = readJsonFile<ProjectsData | ProjectTheme[]>(projectsFile, { themes: [] })

  // Support legacy array format
  if (Array.isArray(projects)) {
    return { themes: [] }
  }

  return projects
}
