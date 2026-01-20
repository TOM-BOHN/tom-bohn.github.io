'use client'

import { LearningHeader } from '@/components/hub/LearningHeader'

export function ProjectsPageHeader() {
  return (
    <LearningHeader
      onExpandAll={() => {
        window.dispatchEvent(new CustomEvent('projects-expand-all-items'))
      }}
      onCollapseAll={() => {
        window.dispatchEvent(new CustomEvent('projects-collapse-all-items'))
      }}
    />
  )
}
