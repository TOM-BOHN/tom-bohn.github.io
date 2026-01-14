'use client'

import { useTheme } from '@/components/ThemeProvider'
import { XangaSidebar } from '@/components/xanga/XangaSidebar'

export function XangaShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  if (theme !== 'xanga') return <>{children}</>

  return (
    <div className="xanga-shell mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className="min-w-0 xanga-main-content">{children}</div>
        <aside className="xanga-sidebar lg:sticky lg:top-24 space-y-6">
          <XangaSidebar />
        </aside>
      </div>
    </div>
  )
}

