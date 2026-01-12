import fs from 'fs'
import path from 'path'

export interface Certification {
  id: string
  title: string
  issuer?: string
  date?: string
  description?: string
  url?: string
  status?: 'completed' | 'in-progress' | 'planned'
}

const certificationsFile = path.join(process.cwd(), 'data/certifications.json')

export async function getCertifications(): Promise<Certification[]> {
  if (!fs.existsSync(certificationsFile)) {
    return []
  }

  const fileContents = fs.readFileSync(certificationsFile, 'utf8')
  const certifications = JSON.parse(fileContents)
  return certifications.sort((a: Certification, b: Certification) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
