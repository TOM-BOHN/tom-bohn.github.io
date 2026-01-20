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
}

function SortableValueItem({ value, isExpanded, onToggle, onUpdate, onRemove }: SortableValueItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: value.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="border border-border rounded bg-bg-primary p-3 overflow-visible">
      <div className="flex items-start gap-2">
        <div {...attributes} {...listeners}>
          <DragHandle />
        </div>
        {isExpanded ? (
          <div className="flex-1 space-y-2 min-w-0">
            <input
              type="text"
              value={value.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Value title..."
              className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
            />
            <textarea
              value={value.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Value description..."
              className="w-full min-h-[60px] px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm"
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
          </div>
        ) : (
          <button onClick={onToggle} className="flex-1 text-left" aria-label="Expand value">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-primary">{value.title || 'Untitled value'}</span>
              <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export function ValuesSection({ values, isExpanded, onToggle, onUpdate }: ValuesSectionProps) {
  const [localValues, setLocalValues] = useState(values)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
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
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
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
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`} style={{ maxHeight: isExpanded ? '9999px' : `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={localValues.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {localValues.map((value) => {
                  const isItemExpanded = expandedItems.has(value.id)
                  return (
                    <SortableValueItem
                      key={value.id}
                      value={value}
                      isExpanded={isItemExpanded}
                      onToggle={() => toggleItem(value.id)}
                      onUpdate={(updates) => updateValue(value.id, updates)}
                      onRemove={() => removeValue(value.id)}
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
