'use client'

import type { ComponentType } from 'react'
import { MusicPlayerApplet } from './MusicPlayerApplet'
import { ChicagoWeatherApplet } from './ChicagoWeatherApplet'
import { NowListeningApplet } from './NowListeningApplet'

export type XangaAppletDefinition = {
  id: string
  title: string
  Component: ComponentType
  enabled?: boolean
}

export const XANGA_APPLETS: XangaAppletDefinition[] = [
  { id: 'music', title: 'Music Player (90s)', Component: MusicPlayerApplet, enabled: true },
  { id: 'weather', title: 'Weather (Chicago)', Component: ChicagoWeatherApplet, enabled: true },
  { id: 'now-listening', title: "Now Listening", Component: NowListeningApplet, enabled: true },
]

