import fs from 'fs'
import path from 'path'

export interface V2MeValue {
  id: string
  title: string
  description: string
}

export interface V2MeMethod {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface V2MeObstacle {
  id: string
  title: string
  description: string
}

export interface V2MeMeasure {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface V2MeData {
  vision: string
  values: V2MeValue[]
  methods: V2MeMethod[]
  obstacles: V2MeObstacle[]
  measures: V2MeMeasure[]
}

const v2meFile = path.join(process.cwd(), 'data/v2me.json')

export async function getV2Me(): Promise<V2MeData> {
  if (!fs.existsSync(v2meFile)) {
    return {
      vision: '',
      values: [],
      methods: [],
      obstacles: [],
      measures: [],
    }
  }

  const fileContents = fs.readFileSync(v2meFile, 'utf8')
  const v2me = JSON.parse(fileContents)
  return v2me
}
