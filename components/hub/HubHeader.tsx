'use client'

import { ExpandCollapseControls } from '@/components/ExpandCollapseControls'

interface HubHeaderProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function HubHeader({ onExpandAll, onCollapseAll }: HubHeaderProps) {
  return (
    <ExpandCollapseControls
      onExpandAll={onExpandAll}
      onCollapseAll={onCollapseAll}
      expandLabel="Expand all sections"
      collapseLabel="Collapse all sections"
    />
  )
}
