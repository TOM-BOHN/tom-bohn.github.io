import fs from 'fs'
import path from 'path'

export interface HubLink {
  id: string
  title: string
  url: string
  description?: string
}

const hubFile = path.join(process.cwd(), 'data/hub.json')

export async function getHubLinks(): Promise<HubLink[]> {
  if (!fs.existsSync(hubFile)) {
    return []
  }

  const fileContents = fs.readFileSync(hubFile, 'utf8')
  const links = JSON.parse(fileContents)
  return links
}
