'use client'

import { useState, useEffect, useRef } from 'react'
import type { V2MeMeasure } from '@/lib/v2me'

interface MeasuresSectionProps {
  measures: V2MeMeasure[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (measures: V2MeMeasure[]) => void
}

export function MeasuresSection({ measures, isExpanded, onToggle, onUpdate }: MeasuresSectionProps) {
  const [localMeasures, setLocalMeasures] = useState(measures)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setLocalMeasures(measures)
  }, [measures])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localMeasures])

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const updateMeasure = (id: string, updates: Partial<V2MeMeasure>) => {
    const updated = localMeasures.map((m) => (m.id === id ? { ...m, ...updates } : m))
    setLocalMeasures(updated)
    onUpdate(updated)
  }

  const toggleCompleted = (id: string) => {
    const measure = localMeasures.find((m) => m.id === id)
    if (measure) {
      updateMeasure(id, { completed: !measure.completed })
    }
  }

  const addMeasure = () => {
    const newMeasure: V2MeMeasure = {
      id: `measure-${Date.now()}`,
      title: 'New measure',
      description: '',
      completed: false,
    }
    const updated = [...localMeasures, newMeasure]
    setLocalMeasures(updated)
    onUpdate(updated)
    setExpandedItems((prev) => new Set(prev).add(newMeasure.id))
  }

  const removeMeasure = (id: string) => {
    const updated = localMeasures.filter((m) => m.id !== id)
    setLocalMeasures(updated)
    onUpdate(updated)
    setExpandedItems((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const completedCount = localMeasures.filter((m) => m.completed).length
  const totalCount = localMeasures.length

  return (
    <div className="border border-border rounded-lg bg-bg-secondary overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
        aria-label={isExpanded ? 'Collapse Measures section' : 'Expand Measures section'}
      >
        {isExpanded ? (
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
        <h2 className="text-xl font-semibold text-text-primary">Measures</h2>
        <span className="text-xs text-text-secondary ml-auto">
          Measurable results you aim to achieve
        </span>
        {totalCount > 0 && (
          <span className="text-xs font-semibold text-accent ml-2">
            ({completedCount}/{totalCount})
          </span>
        )}
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`} style={{ maxHeight: isExpanded ? '9999px' : `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <div className="space-y-2">
            {localMeasures.map((measure) => {
              const isItemExpanded = expandedItems.has(measure.id)
              return (
                <div key={measure.id} className="border border-border rounded bg-bg-primary p-3 overflow-visible">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={measure.completed}
                      onChange={() => toggleCompleted(measure.id)}
                      className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent flex-shrink-0"
                    />
                    {isItemExpanded ? (
                      <div className="flex-1 space-y-2 min-w-0">
                        <input
                          type="text"
                          value={measure.title}
                          onChange={(e) => updateMeasure(measure.id, { title: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Measure title..."
                          className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                        />
                        <textarea
                          value={measure.description}
                          onChange={(e) => updateMeasure(measure.id, { description: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Measure description..."
                          className="w-full min-h-[60px] px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeMeasure(measure.id)
                            }}
                            className="text-xs text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleItem(measure.id)
                            }}
                            className="text-xs text-text-secondary hover:text-text-primary"
                          >
                            Collapse
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleItem(measure.id)}
                        className="flex-1 text-left"
                        aria-label="Expand measure"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm ${
                              measure.completed ? 'line-through text-text-secondary' : 'text-text-primary'
                            }`}
                          >
                            {measure.title || 'Untitled measure'}
                          </span>
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
            <button
              onClick={addMeasure}
              className="w-full px-3 py-2 border border-dashed border-border rounded bg-bg-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              + Add Measure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
