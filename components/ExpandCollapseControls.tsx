'use client'

interface ExpandCollapseControlsProps {
  onExpandAll: () => void
  onCollapseAll: () => void
  expandLabel?: string
  collapseLabel?: string
}

export function ExpandCollapseControls({
  onExpandAll,
  onCollapseAll,
  expandLabel = 'Expand all',
  collapseLabel = 'Collapse all',
}: ExpandCollapseControlsProps) {
  return (
    <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
      <button
        onClick={onExpandAll}
        className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
        aria-label={expandLabel}
        title={expandLabel}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="sr-only">{expandLabel}</span>
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
          {expandLabel}
        </span>
      </button>
      <button
        onClick={onCollapseAll}
        className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
        aria-label={collapseLabel}
        title={collapseLabel}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="sr-only">{collapseLabel}</span>
        <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
          {collapseLabel}
        </span>
      </button>
    </div>
  )
}
