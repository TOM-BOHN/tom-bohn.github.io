import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
}

/**
 * Shared page chrome: animated dark-mode backgrounds + centered content column.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </>
  )
}
