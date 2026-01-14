'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { XangaSidebar } from '@/components/xanga/XangaSidebar'

export function XangaShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [sidebarSide, setSidebarSide] = useState<'left' | 'right'>('right')

  const isXanga = theme === 'xanga'

  useEffect(() => {
    if (!isXanga) return
    const saved = localStorage.getItem('xangaSidebarSide')
    if (saved === 'left' || saved === 'right') setSidebarSide(saved)
  }, [isXanga])

  const toggleSidebarSide = () => {
    setSidebarSide((prev) => {
      const next = prev === 'right' ? 'left' : 'right'
      localStorage.setItem('xangaSidebarSide', next)
      return next
    })
  }

  if (!isXanga) return <>{children}</>

  return (
    <div className="xanga-shell mx-auto max-w-7xl px-4 py-8">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={toggleSidebarSide}
          className="px-3 py-2 bg-bg-secondary text-text-primary border-4 border-border hover:bg-accent hover:text-white transition-colors text-xs font-bold tracking-widest uppercase"
          aria-label="Toggle sidebar side"
        >
          Sidebar: {sidebarSide}
        </button>
      </div>

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
    </div>
  )
}

