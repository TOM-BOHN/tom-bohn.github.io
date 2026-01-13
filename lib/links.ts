import fs from 'fs'
import path from 'path'

export interface Link {
  id: string
  title: string
  url: string
  description?: string
}

const linksFile = path.join(process.cwd(), 'data/links.json')

export async function getLinks(): Promise<Record<string, Link[]>> {
  if (!fs.existsSync(linksFile)) {
    return {}
  }

  const fileContents = fs.readFileSync(linksFile, 'utf8')
  const links = JSON.parse(fileContents)
  return links
}
