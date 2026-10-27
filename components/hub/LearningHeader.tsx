'use client'

import { ExpandCollapseControls } from '@/components/ExpandCollapseControls'

interface LearningHeaderProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function LearningHeader({ onExpandAll, onCollapseAll }: LearningHeaderProps) {
  return (
    <ExpandCollapseControls
      onExpandAll={onExpandAll}
      onCollapseAll={onCollapseAll}
      expandLabel="Expand all items"
      collapseLabel="Collapse all items"
    />
  )
}
