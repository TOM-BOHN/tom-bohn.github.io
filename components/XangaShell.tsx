'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { XangaSidebar } from '@/components/xanga/XangaSidebar'
import { XangaLayoutProvider } from '@/components/xanga/XangaLayoutContext'

export function XangaShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [sidebarSide, setSidebarSide] = useState<'left' | 'right'>('right')

  const isXanga = theme === 'xanga'

  useEffect(() => {
    if (!isXanga) return
    const saved = localStorage.getItem('xangaSidebarSide')
    if (saved === 'left' || saved === 'right') setSidebarSide(saved)
  }, [isXanga])

  const persistSetSidebarSide = (side: 'left' | 'right') => {
    setSidebarSide(side)
    localStorage.setItem('xangaSidebarSide', side)
  }

  if (!isXanga) return <>{children}</>

  return (
    <div className="xanga-shell mx-auto max-w-7xl px-4 py-8">
      <XangaLayoutProvider value={{ sidebarSide, setSidebarSide: persistSetSidebarSide }}>
        {sidebarSide === 'left' ? (
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
            <aside className="xanga-sidebar lg:sticky lg:top-24 space-y-6">
              <XangaSidebar />
            </aside>
            <div className="min-w-0 xanga-main-content">{children}</div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="min-w-0 xanga-main-content">{children}</div>
            <aside className="xanga-sidebar lg:sticky lg:top-24 space-y-6">
              <XangaSidebar />
            </aside>
          </div>
        )}
      </XangaLayoutProvider>
    </div>
  )
}

