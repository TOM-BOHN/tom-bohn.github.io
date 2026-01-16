import fs from 'fs'
import path from 'path'

export interface HubLink {
  id: string
  title: string
  url: string
  description?: string
}

export interface HubSectionData {
  id: string
  title: string
  links: HubLink[]
  type?: 'standard' | 'learning'
}

export interface HubData {
  sections: HubSectionData[]
}

export interface BadgeImage {
  src: string
  alt: string
  url?: string
}

export interface CertificationGroupData {
  id: string
  title: string
  description?: string
  badgeImages: BadgeImage[]
  learnMoreUrl?: string
  viewCertsUrl?: string
  metadata?: {
    label: string
    value: string
  }[]
}

export interface LearningGoal {
  id: string
  title: string
  description?: string
  completed: boolean
  targetDate?: string
  notes?: string
}

export interface LearningData {
  accomplished: CertificationGroupData[]
  planning: LearningGoal[]
}

const hubFile = path.join(process.cwd(), 'data/hub/hub.json')
const learningFile = path.join(process.cwd(), 'data/learning/learning.json')

export async function getHubLinks(): Promise<HubLink[]> {
  if (!fs.existsSync(hubFile)) {
    return []
  }

  const fileContents = fs.readFileSync(hubFile, 'utf8')
  const links = JSON.parse(fileContents)
  return links
}

export async function getHubSections(): Promise<HubSectionData[]> {
  if (!fs.existsSync(hubFile)) {
    return []
  }

  const fileContents = fs.readFileSync(hubFile, 'utf8')
  const data: HubData = JSON.parse(fileContents)
  return data.sections || []
}

export async function getLearningData(): Promise<LearningData> {
  if (!fs.existsSync(learningFile)) {
    return { accomplished: [], planning: [] }
  }

  const fileContents = fs.readFileSync(learningFile, 'utf8')
  const data: LearningData = JSON.parse(fileContents)
  return data
}
