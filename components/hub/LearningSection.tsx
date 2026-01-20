'use client'

import { useState, useRef, useEffect } from 'react'
import { CertificationGroup, CertificationGroupData } from './CertificationGroup'
import { LearningGoals, LearningGoal } from './LearningGoals'
import { Education } from './Education'
import { EducationEntry } from '@/lib/hub'

interface LearningSectionProps {
  education?: EducationEntry[]
  accomplished: CertificationGroupData[]
  planning: LearningGoal[]
  onGoalToggle?: (id: string) => void
}

export function LearningSection({
  education,
  accomplished,
  planning,
  onGoalToggle,
}: LearningSectionProps) {
  const [isAccomplishedExpanded, setIsAccomplishedExpanded] = useState(true)
  const [isPlanningExpanded, setIsPlanningExpanded] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set())
  const accomplishedContentRef = useRef<HTMLDivElement>(null)
  const planningContentRef = useRef<HTMLDivElement>(null)
  const [accomplishedHeight, setAccomplishedHeight] = useState<number | 'auto'>('auto')
  const [planningHeight, setPlanningHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (accomplishedContentRef.current) {
      setAccomplishedHeight(
        isAccomplishedExpanded ? accomplishedContentRef.current.scrollHeight : 0
      )
    }
  }, [isAccomplishedExpanded, accomplished])

  useEffect(() => {
    if (planningContentRef.current) {
      setPlanningHeight(
        isPlanningExpanded ? planningContentRef.current.scrollHeight : 0
      )
    }
  }, [isPlanningExpanded, planning])

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedGroups(new Set(accomplished.map(g => g.id)))
      setExpandedGoals(new Set(planning.map(g => g.id)))
    }
    const handleCollapseAll = () => {
      setExpandedGroups(new Set())
      setExpandedGoals(new Set())
    }

    window.addEventListener('learning-expand-all-items', handleExpandAll)
    window.addEventListener('learning-collapse-all-items', handleCollapseAll)

    return () => {
      window.removeEventListener('learning-expand-all-items', handleExpandAll)
      window.removeEventListener('learning-collapse-all-items', handleCollapseAll)
    }
  }, [accomplished, planning])

  const expandAllGroups = () => {
    setExpandedGroups(new Set(accomplished.map(g => g.id)))
  }

  const collapseAllGroups = () => {
    setExpandedGroups(new Set())
  }

  const expandAllGoals = () => {
    setExpandedGoals(new Set(planning.map(g => g.id)))
  }

  const collapseAllGoals = () => {
    setExpandedGoals(new Set())
  }

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleGoal = (id: string) => {
    setExpandedGoals((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-8">
      {/* Education */}
      {education && education.length > 0 && (
        <Education education={education} />
      )}

      {/* What I've Accomplished */}
      <div className="border-2 border-border rounded-lg bg-bg-secondary overflow-hidden">
        <button
          onClick={() => setIsAccomplishedExpanded(!isAccomplishedExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-bg-primary transition-colors text-left"
          aria-label={isAccomplishedExpanded ? 'Collapse section' : 'Expand section'}
        >
          <div className="flex items-center gap-3">
            {isAccomplishedExpanded ? (
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
            <h3 className="text-2xl font-bold text-accent">What I&apos;ve Accomplished</h3>
          </div>
          {isAccomplishedExpanded && accomplished.length > 0 && (
            <div 
              className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  expandAllGroups()
                }}
                className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
                aria-label="Expand all certification groups"
                title="Expand all certification groups"
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
                  collapseAllGroups()
                }}
                className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
                aria-label="Collapse all certification groups"
                title="Collapse all certification groups"
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
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: typeof accomplishedHeight === 'number' ? `${accomplishedHeight}px` : 'none' }}
        >
          <div ref={accomplishedContentRef} className="px-6 pb-6">
            {accomplished.length > 0 ? (
              <div>
                {accomplished.map((group) => (
                  <CertificationGroup
                    key={group.id}
                    group={group}
                    isExpanded={expandedGroups.has(group.id)}
                    onToggle={() => toggleGroup(group.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary italic">No accomplishments to display yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* What I'm Planning This Year */}
      <div className="border-2 border-border rounded-lg bg-bg-secondary overflow-hidden">
        <button
          onClick={() => setIsPlanningExpanded(!isPlanningExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-bg-primary transition-colors text-left"
          aria-label={isPlanningExpanded ? 'Collapse section' : 'Expand section'}
        >
          <div className="flex items-center gap-3">
            {isPlanningExpanded ? (
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
            <h3 className="text-2xl font-bold text-accent">What I&apos;m Planning This Year</h3>
          </div>
          {isPlanningExpanded && planning.length > 0 && (
            <div 
              className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  expandAllGoals()
                }}
                className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
                aria-label="Expand all learning goals"
                title="Expand all learning goals"
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
                  collapseAllGoals()
                }}
                className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
                aria-label="Collapse all learning goals"
                title="Collapse all learning goals"
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
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: typeof planningHeight === 'number' ? `${planningHeight}px` : 'none' }}
        >
          <div ref={planningContentRef} className="px-6 pb-6">
            {planning.length > 0 ? (
              <LearningGoals
                goals={planning}
                onToggle={onGoalToggle}
                expandedGoals={expandedGoals}
                onToggleExpanded={toggleGoal}
              />
            ) : (
              <p className="text-text-secondary italic">No learning goals set yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
