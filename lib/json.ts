import fs from 'fs'

/**
 * Synchronously read and parse a JSON file, returning `fallback` when the
 * file is missing. Used by the thin data loaders under `lib/`.
 */
export function readJsonFile<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as T
}
