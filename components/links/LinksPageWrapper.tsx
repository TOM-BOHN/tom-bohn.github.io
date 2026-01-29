'use client'

import { useState } from 'react'
import type { Link } from '@/lib/links'
import { LinksHeader } from './LinksHeader'
import { LinksSection } from './LinksSection'

interface LinkSectionData {
  id: string
  title: string
  links: Link[]
}

interface LinksPageWrapperProps {
  sections: LinkSectionData[]
}

export function LinksPageWrapper({ sections }: LinksPageWrapperProps) {
  const allSectionIds = new Set(sections.map((section) => section.id))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(allSectionIds)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedSections(new Set(sections.map((section) => section.id)))
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">PRODUCT MANAGER & SOFTWARE DESIGNER</p>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-semibold text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'LINKS'}
              </h1>
              <LinksHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />
            </div>
            <p className="text-text-secondary leading-relaxed mb-6">
              A living directory of the apps, services, and docs I use to build, write, and ship - organized by
              workflow with quick jumps to logins, documentation, and downloads.
            </p>
          </div>

          {sections.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-xl fade-in-up fade-in-up-delay-1">
              <p className="text-text-secondary mb-4">No links organized yet.</p>
              <p className="text-text-secondary text-sm">Links will be organized by category here.</p>
            </div>
          ) : (
            <div className="fade-in-up fade-in-up-delay-1">
              {sections.map((section) => (
                <LinksSection
                  key={section.id}
                  title={section.title}
                  links={section.links}
                  isExpanded={expandedSections.has(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
