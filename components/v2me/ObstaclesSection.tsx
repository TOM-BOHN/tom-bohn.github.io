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
import type { V2MeObstacle } from '@/lib/v2me'

interface ObstaclesSectionProps {
  obstacles: V2MeObstacle[]
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (obstacles: V2MeObstacle[]) => void
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

interface SortableObstacleItemProps {
  obstacle: V2MeObstacle
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (updates: Partial<V2MeObstacle>) => void
  onRemove: () => void
  initialEditMode?: boolean
  onEditModeChange?: (editing: boolean) => void
}

function SortableObstacleItem({
  obstacle,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  initialEditMode = false,
  onEditModeChange,
}: SortableObstacleItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: obstacle.id,
  })
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [editTitle, setEditTitle] = useState(obstacle.title)
  const [editDescription, setEditDescription] = useState(obstacle.description)

  useEffect(() => {
    setEditTitle(obstacle.title)
    setEditDescription(obstacle.description)
  }, [obstacle.title, obstacle.description])

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
    setEditTitle(obstacle.title)
    setEditDescription(obstacle.description)
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
                  placeholder="Obstacle title..."
                  className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Obstacle description (Markdown supported)..."
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
                  <h3 className="text-sm font-medium text-text-primary">{obstacle.title || 'Untitled obstacle'}</h3>
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
                  <ReactMarkdown>{obstacle.description || '*No description*'}</ReactMarkdown>
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
            <button onClick={onToggle} className="flex-1 text-left" aria-label="Expand obstacle">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-primary">{obstacle.title || 'Untitled obstacle'}</span>
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

export function ObstaclesSection({
  obstacles,
  isExpanded,
  onToggle,
  onUpdate,
}: ObstaclesSectionProps) {
  const [localObstacles, setLocalObstacles] = useState(obstacles)
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
    setLocalObstacles(obstacles)
  }, [obstacles])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localObstacles])

  useEffect(() => {
    const handleExpandAll = () => {
      setExpandedItems(new Set(localObstacles.map((o) => o.id)))
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
  }, [localObstacles])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = localObstacles.findIndex((o) => o.id === active.id)
      const newIndex = localObstacles.findIndex((o) => o.id === over.id)
      const reordered = arrayMove(localObstacles, oldIndex, newIndex)
      setLocalObstacles(reordered)
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

  const updateObstacle = (id: string, updates: Partial<V2MeObstacle>) => {
    const updated = localObstacles.map((o) => (o.id === id ? { ...o, ...updates } : o))
    setLocalObstacles(updated)
    onUpdate(updated)
  }

  const addObstacle = () => {
    const newObstacle: V2MeObstacle = {
      id: `obstacle-${Date.now()}`,
      title: 'New obstacle',
      description: '',
    }
    const updated = [...localObstacles, newObstacle]
    setLocalObstacles(updated)
    onUpdate(updated)
    setExpandedItems((prev) => new Set(prev).add(newObstacle.id))
    setEditingItems((prev) => new Set(prev).add(newObstacle.id))
  }

  const removeObstacle = (id: string) => {
    const updated = localObstacles.filter((o) => o.id !== id)
    setLocalObstacles(updated)
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
          aria-label={isExpanded ? 'Collapse Obstacles section' : 'Expand Obstacles section'}
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
          <h2 className="text-xl font-semibold text-text-primary">Obstacles</h2>
          <span className="text-xs text-text-secondary ml-auto">
            Challenges, problems, issues you have to overcome
          </span>
        </button>
        {isExpanded && localObstacles.length > 0 && (
          <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
            <button
              onClick={() => setExpandedItems(new Set(localObstacles.map((o) => o.id)))}
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
            <SortableContext items={localObstacles.map((o) => o.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {localObstacles.map((obstacle) => {
                  const isItemExpanded = expandedItems.has(obstacle.id)
                  const shouldEdit = editingItems.has(obstacle.id)
                  return (
                    <SortableObstacleItem
                      key={obstacle.id}
                      obstacle={obstacle}
                      isExpanded={isItemExpanded}
                      onToggle={() => toggleItem(obstacle.id)}
                      onUpdate={(updates) => updateObstacle(obstacle.id, updates)}
                      onRemove={() => removeObstacle(obstacle.id)}
                      initialEditMode={shouldEdit}
                      onEditModeChange={(editing) => {
                        if (!editing) {
                          setEditingItems((prev) => {
                            const next = new Set(prev)
                            next.delete(obstacle.id)
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
            onClick={addObstacle}
            className="w-full mt-2 px-3 py-2 border border-dashed border-border rounded bg-bg-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            + Add Obstacle
          </button>
        </div>
      </div>
    </div>
  )
}
