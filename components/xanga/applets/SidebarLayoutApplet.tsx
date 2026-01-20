'use client'

import { useXangaLayout } from '@/components/xanga/XangaLayoutContext'

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}
function HideIcon() {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function SidebarLayoutApplet() {
  const { sidebarSide, setSidebarSide } = useXangaLayout()

  const options = [
    { side: 'left' as const, icon: ArrowLeftIcon, label: 'Sidebar left', tooltip: 'Sidebar left' },
    { side: 'hide' as const, icon: HideIcon, label: 'Hide sidebar', tooltip: 'Hide sidebar' },
    { side: 'right' as const, icon: ArrowRightIcon, label: 'Sidebar right', tooltip: 'Sidebar right' },

  ]

  return (
    <div className="flex items-center justify-center gap-2">
      {options.map((option) => {
        const Icon = option.icon
        const isActive = sidebarSide === option.side
        const isHide = option.side === 'hide'
        return (
          <button
            key={option.side}
            type="button"
            onClick={() => setSidebarSide(option.side)}
            className={`relative group flex items-center justify-center w-10 h-10 border-2 border-border bg-bg-secondary text-text-primary hover:bg-accent hover:text-white transition-colors rounded overflow-hidden ${
              isActive ? 'bg-accent text-white' : ''
            } ${isHide ? 'p-5' : 'p-0'}`}
            aria-label={option.label}
            title={option.tooltip}
          >
            <Icon />
            <span className="sr-only">{option.label}</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-[11px] text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
              {option.tooltip}
            </span>
          </button>
        )
      })}
    </div>
  )
}

