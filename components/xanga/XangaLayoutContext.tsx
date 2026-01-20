'use client'

import { createContext, useContext } from 'react'

export type SidebarSide = 'left' | 'right' | 'hide'

type XangaLayoutContextValue = {
  sidebarSide: SidebarSide
  setSidebarSide: (side: SidebarSide) => void
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

