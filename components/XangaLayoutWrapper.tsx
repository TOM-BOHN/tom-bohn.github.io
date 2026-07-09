'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { XangaLayoutProvider, type SidebarSide, type VisibleSidebarSide } from '@/components/xanga/XangaLayoutContext'

export function XangaLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [sidebarSide, setSidebarSide] = useState<SidebarSide>('right')
  // Remembers which side the sidebar was last visible on, so "restore" can
  // put it back where the user left it instead of always defaulting to right.
  const [lastVisibleSide, setLastVisibleSide] = useState<VisibleSidebarSide>('right')

  const isXanga = theme === 'xanga'

  useEffect(() => {
    if (!isXanga) return
    const saved = localStorage.getItem('xangaSidebarSide')
    if (saved === 'left' || saved === 'right' || saved === 'hide') setSidebarSide(saved)
    const savedLastVisible = localStorage.getItem('xangaSidebarLastVisibleSide')
    if (savedLastVisible === 'left' || savedLastVisible === 'right') setLastVisibleSide(savedLastVisible)
  }, [isXanga])

  const persistSetSidebarSide = (side: SidebarSide) => {
    setSidebarSide(side)
    localStorage.setItem('xangaSidebarSide', side)
    if (side !== 'hide') {
      setLastVisibleSide(side)
      localStorage.setItem('xangaSidebarLastVisibleSide', side)
    }
  }

  const restoreSidebar = () => persistSetSidebarSide(lastVisibleSide)

  // Only provide context in Xanga mode, otherwise just render children
  if (!isXanga) {
    return <>{children}</>
  }

  return (
    <XangaLayoutProvider
      value={{ sidebarSide, setSidebarSide: persistSetSidebarSide, lastVisibleSide, restoreSidebar }}
    >
      {children}
    </XangaLayoutProvider>
  )
}
