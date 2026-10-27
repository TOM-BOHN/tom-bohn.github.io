'use client'

import { ExpandCollapseControls } from '@/components/ExpandCollapseControls'

interface V2MeHeaderProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function V2MeHeader({ onExpandAll, onCollapseAll }: V2MeHeaderProps) {
  return (
    <ExpandCollapseControls
      onExpandAll={onExpandAll}
      onCollapseAll={onCollapseAll}
      expandLabel="Expand all sections"
      collapseLabel="Collapse all sections"
    />
  )
}
