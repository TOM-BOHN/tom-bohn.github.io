'use client'

import { useTheme } from '@/components/ThemeProvider'
import { XangaSidebar } from '@/components/xanga/XangaSidebar'
import { useXangaLayoutOptional } from '@/components/xanga/XangaLayoutContext'

export function XangaShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const layout = useXangaLayoutOptional()

  const isXanga = theme === 'xanga'

  if (!isXanga) return <>{children}</>

  // If we're in Xanga mode but context isn't available, just render children
  // This shouldn't happen, but provides a fallback
  if (!layout) return <>{children}</>

  const { sidebarSide } = layout

  return (
    <div className="xanga-shell mx-auto max-w-7xl px-4 py-8">
      {sidebarSide === 'hide' ? (
        <div className="min-w-0 xanga-main-content">{children}</div>
      ) : sidebarSide === 'left' ? (
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

