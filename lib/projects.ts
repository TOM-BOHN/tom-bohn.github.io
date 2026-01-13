import fs from 'fs'
import path from 'path'

export interface Project {
  id: string
  title: string
  description: string
  url?: string
  tags: string[]
}

const projectsFile = path.join(process.cwd(), 'data/projects.json')

export async function getProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsFile)) {
    return []
  }

  const fileContents = fs.readFileSync(projectsFile, 'utf8')
  const projects = JSON.parse(fileContents)
  return projects
}
