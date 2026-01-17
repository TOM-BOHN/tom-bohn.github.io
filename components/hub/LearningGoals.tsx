'use client'

import { useState, useRef, useEffect } from 'react'

export interface LearningGoal {
  id: string
  title: string
  description?: string
  completed: boolean
  targetDate?: string
  notes?: string
}

interface LearningGoalItemProps {
  goal: LearningGoal
  onToggle: (id: string) => void
  isExpanded?: boolean
  onToggleExpanded?: () => void
}

function LearningGoalItem({ goal, onToggle, isExpanded: controlledExpanded, onToggleExpanded }: LearningGoalItemProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  const goalContentRef = useRef<HTMLDivElement>(null)
  const [goalHeight, setGoalHeight] = useState<number | 'auto'>('auto')

  const handleToggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded()
    } else {
      setInternalExpanded(!internalExpanded)
    }
  }

  useEffect(() => {
    if (goalContentRef.current) {
      setGoalHeight(isExpanded ? goalContentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, goal.description, goal.notes])

  return (
    <div
      className={`border-2 rounded-lg overflow-hidden transition-all ${
        goal.completed
          ? 'border-accent bg-bg-secondary opacity-75'
          : 'border-border bg-bg-primary'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={handleToggleExpanded}
          className="flex items-start gap-3 hover:bg-bg-secondary transition-colors text-left flex-1 rounded -ml-1 pl-1 pr-2 py-1"
        >
          <div className="flex items-center h-6 pt-1.5">
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
            <h4
              className={`text-lg font-semibold mb-1 ${
                goal.completed
                  ? 'line-through text-text-secondary'
                  : 'text-text-primary'
              }`}
            >
              {goal.title}
            </h4>
            {goal.targetDate && (
              <p className="text-text-secondary text-xs">
                Target: {goal.targetDate}
              </p>
            )}
          </div>
        </button>
        <div className="flex items-center h-6 pt-0.5">
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={(e) => {
              onToggle(goal.id)
            }}
            className="w-5 h-5 text-accent border-border rounded focus:ring-accent focus:ring-2 cursor-pointer flex-shrink-0"
            aria-label={`Mark "${goal.title}" as ${goal.completed ? 'incomplete' : 'complete'}`}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: typeof goalHeight === 'number' ? `${goalHeight}px` : 'none' }}
      >
        <div ref={goalContentRef} className="px-4 pb-4">
          {goal.description && (
            <p className="text-text-secondary text-sm mb-2 pl-8">
              {goal.description}
            </p>
          )}
          {goal.notes && (
            <p className="text-text-secondary text-sm mt-2 italic pl-8">
              {goal.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface LearningGoalsProps {
  goals: LearningGoal[]
  onToggle?: (id: string) => void
  expandedGoals?: Set<string>
  onToggleExpanded?: (id: string) => void
}

export function LearningGoals({ goals, onToggle, expandedGoals, onToggleExpanded }: LearningGoalsProps) {
  const [localGoals, setLocalGoals] = useState<LearningGoal[]>(goals)

  const handleToggle = (id: string) => {
    setLocalGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    )
    onToggle?.(id)
  }

  const completedCount = localGoals.filter((g) => g.completed).length
  const totalCount = localGoals.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="border-2 border-border rounded-lg p-6 bg-bg-primary">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-accent">Progress</h3>
          <span className="text-text-secondary">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <div className="w-full bg-bg-secondary rounded-full h-3 overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {localGoals.map((goal) => (
          <LearningGoalItem
            key={goal.id}
            goal={goal}
            onToggle={handleToggle}
            isExpanded={expandedGoals?.has(goal.id)}
            onToggleExpanded={() => onToggleExpanded?.(goal.id)}
          />
        ))}
      </div>
    </div>
  )
}
