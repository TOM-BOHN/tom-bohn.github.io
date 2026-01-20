'use client'

import type { ProjectArtifact as ProjectArtifactType } from '@/lib/projects'

interface ProjectArtifactProps {
  artifact: ProjectArtifactType
}

const typeLabels: Record<ProjectArtifactType['type'], string> = {
  artifact: 'Artifact',
  deliverable: 'Deliverable',
  phase: 'Phase',
  example: 'Example',
}

const typeColors: Record<ProjectArtifactType['type'], string> = {
  artifact: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  deliverable: 'bg-green-500/10 text-green-500 border-green-500/20',
  phase: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  example: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
}

export function ProjectArtifact({ artifact }: ProjectArtifactProps) {
  const content = (
    <div className="border-2 border-border rounded-lg p-4 hover:border-accent hover:shadow-lg transition-all bg-bg-primary h-full flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-lg font-semibold text-text-primary flex-1">
          {artifact.title}
        </h4>
        <span
          className={`px-2 py-1 rounded text-xs font-medium border ${typeColors[artifact.type]}`}
        >
          {typeLabels[artifact.type]}
        </span>
      </div>
      {artifact.description && (
        <p className="text-text-secondary text-sm mb-3 flex-1">
          {artifact.description}
        </p>
      )}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        {artifact.date && (
          <span className="text-text-secondary text-xs">
            {new Date(artifact.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
        {artifact.url && (
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover underline text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            View →
          </a>
        )}
      </div>
    </div>
  )

  return content
}
