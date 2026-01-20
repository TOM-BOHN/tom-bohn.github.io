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

export interface V2MeVision {
  id: string
  title: string
  description: string
}

export interface V2MeData {
  vision: V2MeVision
  values: V2MeValue[]
  methods: V2MeMethod[]
  obstacles: V2MeObstacle[]
  measures: V2MeMeasure[]
}

const v2meFile = path.join(process.cwd(), 'data/v2me.json')

export async function getV2Me(): Promise<V2MeData> {
  if (!fs.existsSync(v2meFile)) {
    return {
      vision: {
        id: 'vision-1',
        title: 'Vision',
        description: '',
      },
      values: [],
      methods: [],
      obstacles: [],
      measures: [],
    }
  }

  const fileContents = fs.readFileSync(v2meFile, 'utf8')
  const v2me = JSON.parse(fileContents)
  // Handle migration from old string vision to new object vision
  if (typeof v2me.vision === 'string') {
    v2me.vision = {
      id: 'vision-1',
      title: 'Vision',
      description: v2me.vision,
    }
  }
  return v2me
}
