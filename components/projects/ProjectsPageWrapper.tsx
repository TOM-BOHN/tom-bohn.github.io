'use client'

import { useState } from 'react'
import type { ProjectTheme } from '@/lib/projects'
import { ProjectsSection } from './ProjectsSection'
import { LearningHeader } from '@/components/hub/LearningHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

interface ProjectsPageWrapperProps {
  themes: ProjectTheme[]
}

export function ProjectsPageWrapper({ themes }: ProjectsPageWrapperProps) {
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set())

  const toggleTheme = (id: string) => {
    setExpandedThemes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedThemes(new Set(themes.map((t) => t.id)))
  }

  const collapseAll = () => {
    setExpandedThemes(new Set())
  }

  return (
    <PageShell>
      <PageHeader
        title="PROJECTS"
        actions={
          <LearningHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />
        }
        description="A collection of projects organized by theme, showcasing artifacts, deliverables, and project phases"
      />

      <ScrollReveal>
        <ProjectsSection
          themes={themes}
          expandedThemes={expandedThemes}
          onToggleTheme={toggleTheme}
        />
      </ScrollReveal>
    </PageShell>
  )
}
