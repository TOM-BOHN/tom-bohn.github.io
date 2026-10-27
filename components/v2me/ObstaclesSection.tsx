'use client'

import type { V2MeObstacle } from '@/lib/v2me'
import { SortableMarkdownListSection } from './SortableMarkdownListSection'

interface ObstaclesSectionProps {
  obstacles: V2MeObstacle[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (obstacles: V2MeObstacle[]) => void
  expandItemsToken?: number
  collapseItemsToken?: number
}

export function ObstaclesSection({
  obstacles,
  isExpanded,
  onToggle,
  onUpdate,
  expandItemsToken,
  collapseItemsToken,
}: ObstaclesSectionProps) {
  return (
    <SortableMarkdownListSection
      title="Obstacles"
      subtitle="Challenges, problems, issues you have to overcome"
      items={obstacles}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onUpdate={onUpdate}
      itemNoun="Obstacle"
      idPrefix="obstacle"
      showCompletedCheckbox={false}
      expandItemsToken={expandItemsToken}
      collapseItemsToken={collapseItemsToken}
    />
  )
}
