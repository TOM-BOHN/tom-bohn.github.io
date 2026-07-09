'use client'

import { createContext, useContext } from 'react'

export type SidebarSide = 'left' | 'right' | 'hide'
export type VisibleSidebarSide = 'left' | 'right'

type XangaLayoutContextValue = {
  sidebarSide: SidebarSide
  setSidebarSide: (side: SidebarSide) => void
  /** The side the sidebar was on before it was last hidden (defaults to 'right'). */
  lastVisibleSide: VisibleSidebarSide
  /** Brings the sidebar back on whichever side it was on before it was hidden. */
  restoreSidebar: () => void
}

export const XangaLayoutContext = createContext<XangaLayoutContextValue | null>(null)

export function XangaLayoutProvider({
  value,
  children,
}: {
  value: XangaLayoutContextValue
  children: React.ReactNode
}) {
  return (
    <XangaLayoutContext.Provider value={value}>
      {children}
    </XangaLayoutContext.Provider>
  )
}

export function useXangaLayout() {
  const ctx = useContext(XangaLayoutContext)
  if (!ctx) {
    throw new Error('useXangaLayout must be used within XangaLayoutProvider')
  }
  return ctx
}



export function useXangaLayoutOptional() {
  return useContext(XangaLayoutContext)
}

