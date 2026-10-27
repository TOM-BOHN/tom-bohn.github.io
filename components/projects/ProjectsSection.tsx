'use client'

import type { ProjectTheme } from '@/lib/projects'
import { ProjectTheme as ProjectThemeComponent } from './ProjectTheme'

interface ProjectsSectionProps {
  themes: ProjectTheme[]
  expandedThemes: Set<string>
  onToggleTheme: (id: string) => void
}

export function ProjectsSection({
  themes,
  expandedThemes,
  onToggleTheme,
}: ProjectsSectionProps) {
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
          onToggle={() => onToggleTheme(theme.id)}
        />
      ))}
    </div>
  )
}
