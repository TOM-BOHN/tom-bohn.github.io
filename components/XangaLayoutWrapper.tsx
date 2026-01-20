'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { XangaLayoutProvider } from '@/components/xanga/XangaLayoutContext'

export function XangaLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [sidebarSide, setSidebarSide] = useState<'left' | 'right' | 'hide'>('right')

  const isXanga = theme === 'xanga'

  useEffect(() => {
    if (!isXanga) return
    const saved = localStorage.getItem('xangaSidebarSide')
    if (saved === 'left' || saved === 'right' || saved === 'hide') setSidebarSide(saved)
  }, [isXanga])

  const persistSetSidebarSide = (side: 'left' | 'right' | 'hide') => {
    setSidebarSide(side)
    localStorage.setItem('xangaSidebarSide', side)
  }

  // Only provide context in Xanga mode, otherwise just render children
  if (!isXanga) {
    return <>{children}</>
  }

  return (
    <XangaLayoutProvider value={{ sidebarSide, setSidebarSide: persistSetSidebarSide }}>
      {children}
    </XangaLayoutProvider>
  )
}
