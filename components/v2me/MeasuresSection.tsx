'use client'

import type { V2MeMeasure } from '@/lib/v2me'
import { SortableMarkdownListSection } from './SortableMarkdownListSection'

interface MeasuresSectionProps {
  measures: V2MeMeasure[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (measures: V2MeMeasure[]) => void
  expandItemsToken?: number
  collapseItemsToken?: number
}

export function MeasuresSection({
  measures,
  isExpanded,
  onToggle,
  onUpdate,
  expandItemsToken,
  collapseItemsToken,
}: MeasuresSectionProps) {
  return (
    <SortableMarkdownListSection
      title="Measures"
      subtitle="Measurable results you aim to achieve"
      items={measures}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onUpdate={onUpdate}
      itemNoun="Measure"
      idPrefix="measure"
      showCompletedCheckbox
      expandItemsToken={expandItemsToken}
      collapseItemsToken={collapseItemsToken}
    />
  )
}
