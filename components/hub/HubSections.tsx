'use client'

import { useState, useEffect } from 'react'
import { HubSection } from './HubSection'
import { HubSectionData } from '@/lib/hub'

interface HubSectionsProps {
  sections: HubSectionData[]
  expandAll: () => void
  collapseAll: () => void
}

export function HubSections({ sections, expandAll, collapseAll }: HubSectionsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [allExpanded, setAllExpanded] = useState(false)

  // Initialize all sections as collapsed
  useEffect(() => {
    setExpandedSections(new Set())
    setAllExpanded(false)
  }, [])

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

  // Sync with parent expand/collapse functions
  useEffect(() => {
    const handleExpandAll = () => {
      const allIds = new Set(sections.map((s) => s.id))
      setExpandedSections(allIds)
      setAllExpanded(true)
    }
    const handleCollapseAll = () => {
      setExpandedSections(new Set())
      setAllExpanded(false)
    }

    // Store handlers for parent access
    ;(window as any).__hubExpandAll = handleExpandAll
    ;(window as any).__hubCollapseAll = handleCollapseAll

    return () => {
      delete (window as any).__hubExpandAll
      delete (window as any).__hubCollapseAll
    }
  }, [sections])

  return (
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
  )
}
