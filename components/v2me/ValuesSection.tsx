'use client'

import { useState, useEffect, useRef } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ReactMarkdown from 'react-markdown'
import { FaEdit } from 'react-icons/fa'
import type { V2MeValue } from '@/lib/v2me'

interface ValuesSectionProps {
  values: V2MeValue[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (values: V2MeValue[]) => void
}

function DragHandle() {
  return (
    <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-text-secondary hover:text-text-primary transition-colors p-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
      </svg>
    </div>
  )
}

interface SortableValueItemProps {
  value: V2MeValue
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<V2MeValue>) => void
  onRemove: () => void
  initialEditMode?: boolean
  onEditModeChange?: (editing: boolean) => void
}

function SortableValueItem({ value, isExpanded, onToggle, onUpdate, onRemove, initialEditMode = false, onEditModeChange }: SortableValueItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: value.id,
  })
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [editTitle, setEditTitle] = useState(value.title)
  const [editDescription, setEditDescription] = useState(value.description)

  useEffect(() => {
    setEditTitle(value.title)
    setEditDescription(value.description)
  }, [value.title, value.description])

  useEffect(() => {
    if (initialEditMode) {
      setIsEditing(true)
    }
  }, [initialEditMode])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleSave = () => {
    onUpdate({ title: editTitle, description: editDescription })
    setIsEditing(false)
    onEditModeChange?.(false)
  }

  const handleCancel = () => {
    setEditTitle(value.title)
    setEditDescription(value.description)
    setIsEditing(false)
    onEditModeChange?.(false)
  }

  return (
    <div ref={setNodeRef} style={style} className="border border-border rounded bg-bg-primary p-3 overflow-visible">
      <div className="flex items-start gap-2">
        <div {...attributes} {...listeners} suppressHydrationWarning>
          <DragHandle />
        </div>
        {isExpanded ? (
          <div className="flex-1 space-y-2 min-w-0">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Value title..."
                  className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Value description (Markdown supported)..."
                  className="w-full min-h-[120px] px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm font-mono"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove()
                    }}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCancel()
                      }}
                      className="text-xs text-text-secondary hover:text-text-primary px-2 py-1 border border-border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSave()
                      }}
                      className="text-xs text-accent hover:text-accent-hover px-2 py-1 border border-accent rounded bg-accent/10"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-primary">{value.title || 'Untitled value'}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsEditing(true)
                    }}
                    className="group relative text-accent hover:text-accent-hover p-1.5 rounded transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-text-primary text-sm">
                  <ReactMarkdown>{value.description || '*No description*'}</ReactMarkdown>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggle()
                    }}
                    className="text-xs text-text-secondary hover:text-text-primary"
                  >
                    Collapse
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <button onClick={onToggle} className="flex-1 text-left" aria-label="Expand value">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-primary">{value.title || 'Untitled value'}</span>
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
                onToggle()
              }}
              className="group relative text-accent hover:text-accent-hover p-1.5 rounded transition-colors flex-shrink-0"
              title="Edit"
            >
              <FaEdit className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function ValuesSection({ values, isExpanded, onToggle, onUpdate }: ValuesSectionProps) {
  const [localValues, setLocalValues] = useState(values)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [editingItems, setEditingItems] = useState<Set<string>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setLocalValues(values)
  }, [values])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localValues])

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedItems(new Set(localValues.map((v) => v.id)))
    }
    const handleCollapseAll = () => {
      setExpandedItems(new Set())
    }
    window.addEventListener('v2me-expand-all-items', handleExpandAll)
    window.addEventListener('v2me-collapse-all-items', handleCollapseAll)
    return () => {
      window.removeEventListener('v2me-expand-all-items', handleExpandAll)
      window.removeEventListener('v2me-collapse-all-items', handleCollapseAll)
    }
  }, [localValues])

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = localValues.findIndex((v) => v.id === active.id)
      const newIndex = localValues.findIndex((v) => v.id === over.id)
      const reordered = arrayMove(localValues, oldIndex, newIndex)
      setLocalValues(reordered)
      onUpdate(reordered)
    }
  }

  const updateValue = (id: string, updates: Partial<V2MeValue>) => {
    const updated = localValues.map((v) => (v.id === id ? { ...v, ...updates } : v))
    setLocalValues(updated)
    onUpdate(updated)
  }

  const addValue = () => {
    const newValue: V2MeValue = {
      id: `value-${Date.now()}`,
      title: 'New value',
      description: '',
    }
    const updated = [...localValues, newValue]
    setLocalValues(updated)
    onUpdate(updated)
    setExpandedItems((prev) => new Set(prev).add(newValue.id))
    setEditingItems((prev) => new Set(prev).add(newValue.id))
  }

  const removeValue = (id: string) => {
    const updated = localValues.filter((v) => v.id !== id)
    setLocalValues(updated)
    onUpdate(updated)
    setExpandedItems((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <div className="border border-border rounded-lg bg-bg-secondary overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 hover:bg-bg-primary transition-colors text-left flex-1"
          aria-label={isExpanded ? 'Collapse Values section' : 'Expand Values section'}
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
          <h2 className="text-xl font-semibold text-text-primary">Values</h2>
          <span className="text-xs text-text-secondary ml-auto">
            Principles and beliefs that help you pursue the vision
          </span>
        </button>
        {isExpanded && localValues.length > 0 && (
          <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
            <button
              onClick={() => setExpandedItems(new Set(localValues.map((v) => v.id)))}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Expand all items"
              title="Expand all items"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
                Expand all
              </span>
            </button>
            <button
              onClick={() => setExpandedItems(new Set())}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Collapse all items"
              title="Collapse all items"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
                Collapse all
              </span>
            </button>
          </div>
        )}
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`} style={{ maxHeight: isExpanded ? '9999px' : `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={localValues.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {localValues.map((value) => {
                  const isItemExpanded = expandedItems.has(value.id)
                  const shouldEdit = editingItems.has(value.id)
                  return (
                    <SortableValueItem
                      key={value.id}
                      value={value}
                      isExpanded={isItemExpanded}
                      onToggle={() => toggleItem(value.id)}
                      onUpdate={(updates) => updateValue(value.id, updates)}
                      onRemove={() => removeValue(value.id)}
                      initialEditMode={shouldEdit}
                      onEditModeChange={(editing) => {
                        if (!editing) {
                          setEditingItems((prev) => {
                            const next = new Set(prev)
                            next.delete(value.id)
                            return next
                          })
                        }
                      }}
                    />
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>
          <button
            onClick={addValue}
            className="w-full mt-2 px-3 py-2 border border-dashed border-border rounded bg-bg-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            + Add Value
          </button>
        </div>
      </div>
    </div>
  )
}
