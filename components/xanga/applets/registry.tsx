'use client'

import type { ComponentType } from 'react'
import { ProfileApplet } from './ProfileApplet'
import { SidebarLayoutApplet } from './SidebarLayoutApplet'
import { MusicPlayerApplet } from './MusicPlayerApplet'
import { ChicagoWeatherApplet } from './ChicagoWeatherApplet'
import { NowListeningApplet } from './NowListeningApplet'
import { XangaHistoryApplet } from './XangaHistoryApplet'
import { HitCounterApplet } from './HitCounterApplet'

export type XangaAppletDefinition = {
  id: string
  title: string
  Component: ComponentType
  enabled?: boolean
}

export const XANGA_APPLETS: XangaAppletDefinition[] = [
  { id: 'profile', title: 'Profile', Component: ProfileApplet, enabled: true },
  { id: 'layout', title: 'Layout', Component: SidebarLayoutApplet, enabled: true },
  { id: 'music', title: 'Vibe Tunes', Component: MusicPlayerApplet, enabled: true },
  { id: 'weather', title: 'Weather', Component: ChicagoWeatherApplet, enabled: true },
  { id: 'now-listening', title: "Now Listening", Component: NowListeningApplet, enabled: true },
  { id: 'xanga-history', title: 'Xanga History', Component: XangaHistoryApplet, enabled: true },
  { id: 'hit-counter', title: 'Hit Counter', Component: HitCounterApplet, enabled: true },
]

