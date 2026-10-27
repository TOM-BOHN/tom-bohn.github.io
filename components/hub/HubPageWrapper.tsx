'use client'

import { useState } from 'react'
import { HubSection } from './HubSection'
import { HubSectionData } from '@/lib/hub'
import { HubHeader } from './HubHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

interface HubPageWrapperProps {
  sections: HubSectionData[]
}

export function HubPageWrapper({ sections }: HubPageWrapperProps) {
  const allSectionIds = new Set(sections.map((s) => s.id))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(allSectionIds)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const expandAll = () => {
    setExpandedSections(new Set(sections.map((s) => s.id)))
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  return (
    <PageShell>
      <PageHeader
        title="HUB"
        spacing="compact"
        actions={<HubHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />}
        description="A curated collection of my professional presence across platforms—from code repositories and technical writing to credentials and community engagement."
      />

      <div>
        {sections.map((section, index) => (
          <ScrollReveal key={section.id} delayMs={Math.min(index, 4) * 80}>
            <HubSection
              title={section.title}
              links={section.links}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          </ScrollReveal>
        ))}
      </div>
    </PageShell>
  )
}
