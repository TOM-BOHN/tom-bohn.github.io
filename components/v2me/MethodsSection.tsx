'use client'

import type { V2MeMethod } from '@/lib/v2me'
import { SortableMarkdownListSection } from './SortableMarkdownListSection'

interface MethodsSectionProps {
  methods: V2MeMethod[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (methods: V2MeMethod[]) => void
}

export function MethodsSection({ methods, isExpanded, onToggle, onUpdate }: MethodsSectionProps) {
  return (
    <SortableMarkdownListSection
      title="Methods"
      subtitle="Actions and steps to take to get the job done"
      items={methods}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onUpdate={onUpdate}
      itemNoun="Method"
      idPrefix="method"
      showCompletedCheckbox
    />
  )
}
