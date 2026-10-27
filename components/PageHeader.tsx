import type { ReactNode } from 'react'
import { RoleTypewriter } from '@/components/RoleTypewriter'

interface PageHeaderProps {
  title: string
  description?: ReactNode
  actions?: ReactNode
  /** Extra bottom margin; content pages use mb-12, hub-style pages use mb-8. */
  spacing?: 'default' | 'compact'
  /** When false, skip the monospace RoleTypewriter line (rare). */
  showRoleTypewriter?: boolean
  children?: ReactNode
}

/**
 * Shared page title block: role typewriter, monospace ⟩ TITLE, optional
 * description and action controls (e.g. expand/collapse).
 */
export function PageHeader({
  title,
  description,
  actions,
  spacing = 'default',
  showRoleTypewriter = true,
  children,
}: PageHeaderProps) {
  const marginClass = spacing === 'compact' ? 'mb-8' : 'mb-12'

  return (
    <div className={`${marginClass} fade-in-up`}>
      {showRoleTypewriter && (
        <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">
          <RoleTypewriter />
        </p>
      )}
      <div
        className={`flex items-center ${actions ? 'justify-between mb-3' : 'mb-4'}`}
      >
        <h1 className="text-2xl font-semibold text-text-primary font-mono flex items-center gap-3">
          <span className="text-accent-orange">{'⟩'}</span>
          {title}
        </h1>
        {actions}
      </div>
      {description && (
        <div className="text-text-secondary leading-relaxed">{description}</div>
      )}
      {children}
    </div>
  )
}
