'use client'

import type { V2MeValue } from '@/lib/v2me'
import { SortableMarkdownListSection } from './SortableMarkdownListSection'

interface ValuesSectionProps {
  values: V2MeValue[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (values: V2MeValue[]) => void
  expandItemsToken?: number
  collapseItemsToken?: number
}

export function ValuesSection({
  values,
  isExpanded,
  onToggle,
  onUpdate,
  expandItemsToken,
  collapseItemsToken,
}: ValuesSectionProps) {
  return (
    <SortableMarkdownListSection
      title="Values"
      subtitle="Principles and beliefs that help you pursue the vision"
      items={values}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onUpdate={onUpdate}
      itemNoun="Value"
      idPrefix="value"
      showCompletedCheckbox={false}
      expandItemsToken={expandItemsToken}
      collapseItemsToken={collapseItemsToken}
    />
  )
}
