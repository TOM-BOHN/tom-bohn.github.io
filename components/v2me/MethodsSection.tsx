'use client'

import { useState, useEffect, useRef } from 'react'
import type { V2MeMethod } from '@/lib/v2me'

interface MethodsSectionProps {
  methods: V2MeMethod[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (methods: V2MeMethod[]) => void
}

export function MethodsSection({ methods, isExpanded, onToggle, onUpdate }: MethodsSectionProps) {
  const [localMethods, setLocalMethods] = useState(methods)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setLocalMethods(methods)
  }, [methods])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localMethods])

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

  const updateMethod = (id: string, updates: Partial<V2MeMethod>) => {
    const updated = localMethods.map((m) => (m.id === id ? { ...m, ...updates } : m))
    setLocalMethods(updated)
    onUpdate(updated)
  }

  const toggleCompleted = (id: string) => {
    const method = localMethods.find((m) => m.id === id)
    if (method) {
      updateMethod(id, { completed: !method.completed })
    }
  }

  const addMethod = () => {
    const newMethod: V2MeMethod = {
      id: `method-${Date.now()}`,
      title: 'New method',
      description: '',
      completed: false,
    }
    const updated = [...localMethods, newMethod]
    setLocalMethods(updated)
    onUpdate(updated)
    setExpandedItems((prev) => new Set(prev).add(newMethod.id))
  }

  const removeMethod = (id: string) => {
    const updated = localMethods.filter((m) => m.id !== id)
    setLocalMethods(updated)
    onUpdate(updated)
    setExpandedItems((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const completedCount = localMethods.filter((m) => m.completed).length
  const totalCount = localMethods.length

  return (
    <div className="border border-border rounded-lg bg-bg-secondary overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
        aria-label={isExpanded ? 'Collapse Methods section' : 'Expand Methods section'}
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
        <h2 className="text-xl font-semibold text-text-primary">Methods</h2>
        <span className="text-xs text-text-secondary ml-auto">
          Actions and steps to take to get the job done
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
            {localMethods.map((method) => {
              const isItemExpanded = expandedItems.has(method.id)
              return (
                <div key={method.id} className="border border-border rounded bg-bg-primary p-3 overflow-visible">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={method.completed}
                      onChange={() => toggleCompleted(method.id)}
                      className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent flex-shrink-0"
                    />
                    {isItemExpanded ? (
                      <div className="flex-1 space-y-2 min-w-0">
                        <input
                          type="text"
                          value={method.title}
                          onChange={(e) => updateMethod(method.id, { title: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Method title..."
                          className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                        />
                        <textarea
                          value={method.description}
                          onChange={(e) => updateMethod(method.id, { description: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Method description..."
                          className="w-full min-h-[60px] px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeMethod(method.id)
                            }}
                            className="text-xs text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleItem(method.id)
                            }}
                            className="text-xs text-text-secondary hover:text-text-primary"
                          >
                            Collapse
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleItem(method.id)}
                        className="flex-1 text-left"
                        aria-label="Expand method"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm ${
                              method.completed ? 'line-through text-text-secondary' : 'text-text-primary'
                            }`}
                          >
                            {method.title || 'Untitled method'}
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
              onClick={addMethod}
              className="w-full px-3 py-2 border border-dashed border-border rounded bg-bg-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              + Add Method
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
