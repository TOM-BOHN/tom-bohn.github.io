'use client'

import { useState, useEffect } from 'react'
import { HubSection } from './HubSection'
import { HubSectionData } from '@/lib/hub'
import { HubHeader } from './HubHeader'

interface HubPageWrapperProps {
  sections: HubSectionData[]
}

export function HubPageWrapper({ sections }: HubPageWrapperProps) {
  // Initialize all sections as expanded
  const allSectionIds = new Set(sections.map((s) => s.id))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(allSectionIds)
  const [allExpanded, setAllExpanded] = useState(true)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      setAllExpanded(newSet.size === sections.length)
      return newSet
    })
  }

  const expandAll = () => {
    const allIds = new Set(sections.map((s) => s.id))
    setExpandedSections(allIds)
    setAllExpanded(true)
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
    setAllExpanded(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold text-text-primary font-mono">
              {'// HUB'}
            </h1>
            <HubHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />
          </div>
          <p className="text-text-secondary leading-relaxed mb-6">
            A curated collection of my professional presence across platforms—from code repositories and technical writing to credentials and community engagement.
          </p>
        </div>

        <div>
          {sections.map((section) => (
            <HubSection
              key={section.id}
              title={section.title}
              links={section.links}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
