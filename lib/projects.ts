import fs from 'fs'
import path from 'path'

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
  if (!fs.existsSync(projectsFile)) {
    return { themes: [] }
  }

  const fileContents = fs.readFileSync(projectsFile, 'utf8')
  const projects = JSON.parse(fileContents)
  
  // Support legacy format
  if (Array.isArray(projects)) {
    return { themes: [] }
  }
  
  return projects
}
