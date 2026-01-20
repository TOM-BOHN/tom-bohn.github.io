'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { FaEdit } from 'react-icons/fa'
import type { V2MeVision } from '@/lib/v2me'

interface VisionSectionProps {
  vision: V2MeVision
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (vision: V2MeVision) => void
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

export function VisionSection({ vision, isExpanded, onToggle, onUpdate }: VisionSectionProps) {
  const [isItemExpanded, setIsItemExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(vision.title)
  const [editDescription, setEditDescription] = useState(vision.description)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setEditTitle(vision.title)
    setEditDescription(vision.description)
  }, [vision.title, vision.description])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, isEditing, editTitle, editDescription, vision, isItemExpanded])

  useEffect(() => {
    const handleExpandAll = () => {
      setIsItemExpanded(true)
    }
    const handleCollapseAll = () => {
      setIsItemExpanded(false)
    }
    window.addEventListener('v2me-expand-all-items', handleExpandAll)
    window.addEventListener('v2me-collapse-all-items', handleCollapseAll)
    return () => {
      window.removeEventListener('v2me-expand-all-items', handleExpandAll)
      window.removeEventListener('v2me-collapse-all-items', handleCollapseAll)
    }
  }, [])

  const handleSave = () => {
    onUpdate({ id: vision.id, title: editTitle, description: editDescription })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(vision.title)
    setEditDescription(vision.description)
    setIsEditing(false)
  }

  return (
    <div className="border border-border rounded-lg bg-bg-secondary overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 hover:bg-bg-primary transition-colors text-left flex-1"
          aria-label={isExpanded ? 'Collapse Vision section' : 'Expand Vision section'}
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
          <h2 className="text-xl font-semibold text-text-primary">Vision</h2>
          <span className="text-xs text-text-secondary ml-auto">Defines what you want to do or achieve</span>
        </button>
        {isExpanded && (
          <div className="flex items-center gap-1 border border-border rounded-lg bg-bg-primary p-1">
            <button
              onClick={() => setIsItemExpanded(true)}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Expand item"
              title="Expand item"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
                Expand
              </span>
            </button>
            <button
              onClick={() => setIsItemExpanded(false)}
              className="relative group p-1.5 text-accent hover:bg-bg-secondary rounded transition-colors"
              aria-label="Collapse item"
              title="Collapse item"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-bg-primary px-2 py-1 text-xs text-text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-10">
                Collapse
              </span>
            </button>
          </div>
        )}
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`} style={{ maxHeight: isExpanded ? '9999px' : `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <div className="border border-border rounded bg-bg-primary p-3 overflow-visible">
            <div className="flex items-start gap-2">
              <div suppressHydrationWarning>
                <DragHandle />
              </div>
              {isItemExpanded ? (
                <div className="flex-1 space-y-2 min-w-0">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Vision title..."
                        className="w-full px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-medium"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Vision description (Markdown supported)..."
                        className="w-full min-h-[120px] px-2 py-1 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm font-mono"
                      />
                      <div className="flex items-center justify-end">
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
                        <h3 className="text-sm font-medium text-text-primary">{vision.title || 'Untitled vision'}</h3>
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
                        <ReactMarkdown>{vision.description || '*No description*'}</ReactMarkdown>
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsItemExpanded(false)
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
                  <button onClick={() => setIsItemExpanded(true)} className="flex-1 text-left" aria-label="Expand vision">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-primary">{vision.title || 'Untitled vision'}</span>
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsEditing(true)
                      setIsItemExpanded(true)
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
        </div>
      </div>
    </div>
  )
}
