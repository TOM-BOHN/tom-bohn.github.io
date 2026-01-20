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
import type { V2MeMethod } from '@/lib/v2me'

interface MethodsSectionProps {
  methods: V2MeMethod[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (methods: V2MeMethod[]) => void
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

interface SortableMethodItemProps {
  method: V2MeMethod
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<V2MeMethod>) => void
  onToggleCompleted: () => void
  onRemove: () => void
  initialEditMode?: boolean
  onEditModeChange?: (editing: boolean) => void
}

function SortableMethodItem({
  method,
  isExpanded,
  onToggle,
  onUpdate,
  onToggleCompleted,
  onRemove,
  initialEditMode = false,
  onEditModeChange,
}: SortableMethodItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: method.id,
  })
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [editTitle, setEditTitle] = useState(method.title)
  const [editDescription, setEditDescription] = useState(method.description)

  useEffect(() => {
    setEditTitle(method.title)
    setEditDescription(method.description)
  }, [method.title, method.description])

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
  }

  const handleCancel = () => {
    setEditTitle(method.title)
    setEditDescription(method.description)
    setIsEditing(false)
  }

  return (
    <div ref={setNodeRef} style={style} className="border border-border rounded bg-bg-primary p-3 overflow-visible">
      <div className="flex items-start gap-2">
        <div {...attributes} {...listeners} suppressHydrationWarning>
          <DragHandle />
        </div>
        <input
          type="checkbox"
          checked={method.completed}
          onChange={onToggleCompleted}
          className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent flex-shrink-0"
        />
        {isExpanded ? (
          <div className="flex-1 space-y-2 min-w-0">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Method title..."
                  className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Method description (Markdown supported)..."
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
                  <h3 className={`text-sm font-medium ${method.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                    {method.title || 'Untitled method'}
                  </h3>
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
                  <ReactMarkdown>{method.description || '*No description*'}</ReactMarkdown>
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
            <button onClick={onToggle} className="flex-1 text-left" aria-label="Expand method">
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

export function MethodsSection({ methods, isExpanded, onToggle, onUpdate }: MethodsSectionProps) {
  const [localMethods, setLocalMethods] = useState(methods)
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
    setLocalMethods(methods)
  }, [methods])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localMethods])

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedItems(new Set(localMethods.map((m) => m.id)))
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
  }, [localMethods])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = localMethods.findIndex((m) => m.id === active.id)
      const newIndex = localMethods.findIndex((m) => m.id === over.id)
      const reordered = arrayMove(localMethods, oldIndex, newIndex)
      setLocalMethods(reordered)
      onUpdate(reordered)
    }
  }

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
    setEditingItems((prev) => new Set(prev).add(newMethod.id))
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
      <div className="flex items-center gap-2 px-5 py-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 hover:bg-bg-primary transition-colors text-left flex-1"
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
        {isExpanded && localMethods.length > 0 && (
          <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
            <button
              onClick={() => setExpandedItems(new Set(localMethods.map((m) => m.id)))}
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
            <SortableContext items={localMethods.map((m) => m.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {localMethods.map((method) => {
                  const isItemExpanded = expandedItems.has(method.id)
                  const shouldEdit = editingItems.has(method.id)
                  return (
                    <SortableMethodItem
                      key={method.id}
                      method={method}
                      isExpanded={isItemExpanded}
                      onToggle={() => toggleItem(method.id)}
                      onUpdate={(updates) => updateMethod(method.id, updates)}
                      onToggleCompleted={() => toggleCompleted(method.id)}
                      onRemove={() => removeMethod(method.id)}
                      initialEditMode={shouldEdit}
                      onEditModeChange={(editing) => {
                        if (!editing) {
                          setEditingItems((prev) => {
                            const next = new Set(prev)
                            next.delete(method.id)
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
            onClick={addMethod}
            className="w-full mt-2 px-3 py-2 border border-dashed border-border rounded bg-bg-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            + Add Method
          </button>
        </div>
      </div>
    </div>
  )
}
