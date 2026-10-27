import path from 'path'
import { readJsonFile } from '@/lib/json'

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

const emptyV2Me: V2MeData = {
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

export async function getV2Me(): Promise<V2MeData> {
  const v2me = readJsonFile<V2MeData & { vision?: V2MeVision | string }>(v2meFile, emptyV2Me)
  // Handle migration from old string vision to new object vision
  if (typeof v2me.vision === 'string') {
    v2me.vision = {
      id: 'vision-1',
      title: 'Vision',
      description: v2me.vision,
    }
  }
  return v2me as V2MeData
}
