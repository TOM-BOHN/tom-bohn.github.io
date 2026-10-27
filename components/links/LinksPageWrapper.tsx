'use client'

import { useState } from 'react'
import type { Link } from '@/lib/links'
import { LinksHeader } from './LinksHeader'
import { LinksSection } from './LinksSection'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

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
    <PageShell>
      <PageHeader
        title="LINKS"
        actions={<LinksHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />}
        description={
          <>
            A living directory of the apps, services, and docs I use to build, write, and ship - organized by
            workflow with quick jumps to logins, documentation, and downloads.
          </>
        }
      />

      {sections.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-xl fade-in-up fade-in-up-delay-1">
          <p className="text-text-secondary mb-4">No links organized yet.</p>
          <p className="text-text-secondary text-sm">Links will be organized by category here.</p>
        </div>
      ) : (
        <div>
          {sections.map((section, index) => (
            <ScrollReveal key={section.id} delayMs={Math.min(index, 4) * 80}>
              <LinksSection
                title={section.title}
                links={section.links}
                isExpanded={expandedSections.has(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </PageShell>
  )
}
