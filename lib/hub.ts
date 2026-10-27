import path from 'path'
import { readJsonFile } from '@/lib/json'

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

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  logo?: string
  activities?: string[]
  courses?: string[]
  skills?: string[]
}

export interface LearningData {
  education?: EducationEntry[]
  accomplished: CertificationGroupData[]
  planning: LearningGoal[]
}

const hubFile = path.join(process.cwd(), 'data/hub/hub.json')
const learningFile = path.join(process.cwd(), 'data/learning/learning.json')

export async function getHubSections(): Promise<HubSectionData[]> {
  const data = readJsonFile<HubData>(hubFile, { sections: [] })
  return data.sections || []
}

export async function getLearningData(): Promise<LearningData> {
  return readJsonFile<LearningData>(learningFile, { accomplished: [], planning: [] })
}
