'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { EducationEntry } from '@/lib/hub'

interface EducationProps {
  education: EducationEntry[]
  isExpanded?: boolean
  onToggle?: () => void
}

function EducationCard({ 
  entry, 
  isExpanded, 
  onToggle 
}: { 
  entry: EducationEntry
  isExpanded: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, entry])

  return (
    <div className="border-2 border-border rounded-lg bg-bg-primary mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start gap-3 hover:bg-bg-secondary transition-colors text-left"
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
        <div className="flex items-start gap-4 flex-1">
          {entry.logo && (
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={entry.logo}
                alt={`${entry.institution} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-text-primary mb-1">
              {entry.institution}
            </h4>
            <p className="text-text-secondary mb-2">{entry.degree}</p>
            <p className="text-text-secondary text-sm">
              {entry.startDate} - {entry.endDate}
            </p>
          </div>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: typeof height === 'number' ? `${height}px` : 'none' }}
      >
        <div ref={contentRef} className="pr-6 pb-6 pl-[56px]">
          {entry.courses && entry.courses.length > 0 && (
            <div>
              <p className="text-text-secondary text-sm font-medium mb-1">
                University Courses:
              </p>
              <p className="text-text-secondary text-sm">
                {entry.courses.join(', ')}
                {entry.courses.length > 8 && '...see more'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Education({ education, isExpanded: controlledExpanded, onToggle }: EducationProps) {
  const [internalExpanded, setInternalExpanded] = useState(true)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set())
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
  }, [isExpanded, education])

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedEntries(new Set(education?.map(e => e.id) || []))
    }
    const handleCollapseAll = () => {
      setExpandedEntries(new Set())
    }

    window.addEventListener('learning-expand-all-items', handleExpandAll)
    window.addEventListener('learning-collapse-all-items', handleCollapseAll)

    return () => {
      window.removeEventListener('learning-expand-all-items', handleExpandAll)
      window.removeEventListener('learning-collapse-all-items', handleCollapseAll)
    }
  }, [education])

  const expandAllEntries = () => {
    setExpandedEntries(new Set(education?.map(e => e.id) || []))
  }

  const collapseAllEntries = () => {
    setExpandedEntries(new Set())
  }

  if (!education || education.length === 0) {
    return null
  }

  const handleHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className="border-2 border-border rounded-lg bg-bg-secondary overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleHeaderKeyDown}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-bg-primary transition-colors text-left cursor-pointer"
        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <svg
              className="w-5 h-5 text-accent"
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
              className="w-5 h-5 text-accent"
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
          <h3 className="text-2xl font-bold text-accent">Education</h3>
        </div>
        {isExpanded && education.length > 0 && (
          <div 
            className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                expandAllEntries()
              }}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Expand all education entries"
              title="Expand all education entries"
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
              onClick={(e) => {
                e.stopPropagation()
                collapseAllEntries()
              }}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Collapse all education entries"
              title="Collapse all education entries"
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
        )}
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: typeof height === 'number' ? `${height}px` : 'none' }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          {education.length > 0 ? (
            <div>
              {education.map((entry) => (
                <EducationCard 
                  key={entry.id} 
                  entry={entry}
                  isExpanded={expandedEntries.has(entry.id)}
                  onToggle={() => {
                    setExpandedEntries((prev) => {
                      const newSet = new Set(prev)
                      if (newSet.has(entry.id)) {
                        newSet.delete(entry.id)
                      } else {
                        newSet.add(entry.id)
                      }
                      return newSet
                    })
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary italic">No education entries to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}
