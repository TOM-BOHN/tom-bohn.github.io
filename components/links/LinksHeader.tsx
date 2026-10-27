'use client'

import { ExpandCollapseControls } from '@/components/ExpandCollapseControls'

interface LinksHeaderProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function LinksHeader({ onExpandAll, onCollapseAll }: LinksHeaderProps) {
  return (
    <ExpandCollapseControls
      onExpandAll={onExpandAll}
      onCollapseAll={onCollapseAll}
      expandLabel="Expand all sections"
      collapseLabel="Collapse all sections"
    />
  )
}
