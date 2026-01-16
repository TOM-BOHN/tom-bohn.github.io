'use client'

import { useState, useEffect } from 'react'
import { HubSection } from './HubSection'
import { HubSectionData } from '@/lib/hub'

interface HubSectionsProps {
  sections: HubSectionData[]
}

export function HubSections({ sections }: HubSectionsProps) {
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
    <div>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
          <button
            onClick={expandAll}
            className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
            aria-label="Expand all sections"
            title="Expand all sections"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="sr-only">Expand all</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
              Expand all
            </span>
          </button>
          <button
            onClick={collapseAll}
            className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
            aria-label="Collapse all sections"
            title="Collapse all sections"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span className="sr-only">Collapse all</span>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
              Collapse all
            </span>
          </button>
        </div>
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
  )
}
