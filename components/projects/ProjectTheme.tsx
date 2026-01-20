'use client'

import { useState, useRef, useEffect } from 'react'
import type { ProjectTheme as ProjectThemeType } from '@/lib/projects'
import { ProjectArtifact } from './ProjectArtifact'

interface ProjectThemeProps {
  theme: ProjectThemeType
  isExpanded?: boolean
  onToggle?: () => void
}

export function ProjectTheme({ theme, isExpanded: controlledExpanded, onToggle }: ProjectThemeProps) {
  const [internalExpanded, setInternalExpanded] = useState(true)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalExpanded(!internalExpanded)
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, theme.artifacts, theme.description])

  return (
    <div className="border-2 border-border rounded-lg bg-bg-secondary overflow-hidden mb-6">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 flex items-start gap-3 hover:bg-bg-primary transition-colors text-left"
      >
        <div className="flex items-center h-7 pt-1">
          {isExpanded ? (
            <svg
              className="w-5 h-5 text-accent flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-accent flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-text-primary mb-2">{theme.title}</h3>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: typeof height === 'number' ? `${height}px` : 'none' }}
      >
        <div ref={contentRef} className="pr-6 pb-6 pl-[56px]">
          {theme.description && (
            <p className="text-text-secondary mb-6 leading-relaxed">{theme.description}</p>
          )}
          {theme.artifacts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {theme.artifacts.map((artifact) => (
                <ProjectArtifact key={artifact.id} artifact={artifact} />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary italic text-sm">
              No artifacts available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
