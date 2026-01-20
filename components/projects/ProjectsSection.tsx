'use client'

import { useState, useRef, useEffect } from 'react'
import type { ProjectTheme } from '@/lib/projects'
import { ProjectTheme as ProjectThemeComponent } from './ProjectTheme'

interface ProjectsSectionProps {
  themes: ProjectTheme[]
}

export function ProjectsSection({ themes }: ProjectsSectionProps) {
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedThemes(new Set(themes.map(t => t.id)))
    }
    const handleCollapseAll = () => {
      setExpandedThemes(new Set())
    }

    window.addEventListener('projects-expand-all-items', handleExpandAll)
    window.addEventListener('projects-collapse-all-items', handleCollapseAll)

    return () => {
      window.removeEventListener('projects-expand-all-items', handleExpandAll)
      window.removeEventListener('projects-collapse-all-items', handleCollapseAll)
    }
  }, [themes])

  const expandAllThemes = () => {
    setExpandedThemes(new Set(themes.map(t => t.id)))
  }

  const collapseAllThemes = () => {
    setExpandedThemes(new Set())
  }

  const toggleTheme = (id: string) => {
    setExpandedThemes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  if (themes.length === 0) {
    return (
      <div className="text-center py-12 border border-border rounded-lg bg-bg-secondary">
        <p className="text-text-secondary mb-4">No projects listed yet.</p>
        <p className="text-text-secondary text-sm">
          Projects will appear here once added.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {themes.map((theme) => (
        <ProjectThemeComponent
          key={theme.id}
          theme={theme}
          isExpanded={expandedThemes.has(theme.id)}
          onToggle={() => toggleTheme(theme.id)}
        />
      ))}
    </div>
  )
}
