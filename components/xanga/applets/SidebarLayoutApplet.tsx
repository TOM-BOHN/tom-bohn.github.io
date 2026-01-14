'use client'

import { useXangaLayout } from '@/components/xanga/XangaLayoutContext'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="block">
      <path
        fill="currentColor"
        d="M14.7 5.3a1 1 0 0 1 0 1.4L10.41 11H20a1 1 0 1 1 0 2h-9.59l4.29 4.29a1 1 0 1 1-1.4 1.42l-6-6a1 1 0 0 1 0-1.42l6-6a1 1 0 0 1 1.4 0Z"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="block">
      <path
        fill="currentColor"
        d="M9.3 18.7a1 1 0 0 1 0-1.4L13.59 13H4a1 1 0 1 1 0-2h9.59L9.3 6.71A1 1 0 1 1 10.7 5.3l6 6a1 1 0 0 1 0 1.42l-6 6a1 1 0 0 1-1.4 0Z"
      />
    </svg>
  )
}

export function SidebarLayoutApplet() {
  const { sidebarSide, setSidebarSide } = useXangaLayout()

  return (
    <button
      type="button"
      onClick={() => setSidebarSide(sidebarSide === 'left' ? 'right' : 'left')}
      className="w-full h-10 px-3 border-4 border-border bg-bg-secondary text-text-primary hover:bg-accent hover:text-white transition-colors text-xs font-bold tracking-widest uppercase flex items-center justify-between"
      aria-label="Toggle sidebar side"
      title="Toggle sidebar side"
    >
      <span className="flex items-center gap-2">
        {sidebarSide === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        <span className="text-[11px]">Sidebar</span>
      </span>
      <span className="text-[11px]">{sidebarSide}</span>
    </button>
  )
}

