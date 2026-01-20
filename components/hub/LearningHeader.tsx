'use client'

interface LearningHeaderProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function LearningHeader({ onExpandAll, onCollapseAll }: LearningHeaderProps) {
  return (
    <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
      <button
        onClick={onExpandAll}
        className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
        aria-label="Expand all items"
        title="Expand all items"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
          Expand all
        </span>
      </button>
      <button
        onClick={onCollapseAll}
        className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
        aria-label="Collapse all items"
        title="Collapse all items"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
          Collapse all
        </span>
      </button>
    </div>
  )
}
