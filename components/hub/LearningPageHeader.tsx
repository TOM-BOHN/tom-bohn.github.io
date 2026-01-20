'use client'

import { LearningHeader } from './LearningHeader'

export function LearningPageHeader() {
  return (
    <LearningHeader
      onExpandAll={() => {
        window.dispatchEvent(new CustomEvent('learning-expand-all-items'))
      }}
      onCollapseAll={() => {
        window.dispatchEvent(new CustomEvent('learning-collapse-all-items'))
      }}
    />
  )
}
