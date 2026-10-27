import path from 'path'
import { readJsonFile } from '@/lib/json'

export interface Link {
  id: string
  title: string
  url: string
  description?: string
}

const linksFile = path.join(process.cwd(), 'data/links.json')

export async function getLinks(): Promise<Record<string, Link[]>> {
  return readJsonFile<Record<string, Link[]>>(linksFile, {})
}
