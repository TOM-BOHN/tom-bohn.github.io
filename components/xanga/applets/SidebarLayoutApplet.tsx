'use client'

import { useXangaLayout } from '@/components/xanga/XangaLayoutContext'

export function SidebarLayoutApplet() {
  const { sidebarSide, setSidebarSide } = useXangaLayout()

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary">Put the sidebar on the left or right.</p>
      <button
        type="button"
        onClick={() => setSidebarSide(sidebarSide === 'left' ? 'right' : 'left')}
        className="w-full px-3 py-2 bg-bg-secondary text-text-primary border-4 border-border hover:bg-accent hover:text-white transition-colors text-xs font-bold tracking-widest uppercase"
      >
        Sidebar: {sidebarSide}
      </button>
    </div>
  )
}

