'use client'

import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { FaEdit } from 'react-icons/fa'

interface VisionSectionProps {
  vision: string
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (vision: string) => void
}

export function VisionSection({ vision, isExpanded, onToggle, onUpdate }: VisionSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editVision, setEditVision] = useState(vision)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setEditVision(vision)
  }, [vision])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, isEditing, editVision, vision])

  const handleSave = () => {
    onUpdate(editVision)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditVision(vision)
    setIsEditing(false)
  }

  return (
    <div className="border border-border rounded-lg bg-bg-secondary overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
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
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`} style={{ maxHeight: isExpanded ? '9999px' : `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5 pt-2">
          <div className="border border-border rounded bg-bg-primary p-3 overflow-visible">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editVision}
                  onChange={(e) => setEditVision(e.target.value)}
                  placeholder="Enter your vision (Markdown supported)..."
                  className="w-full min-h-[150px] px-3 py-2 border border-border rounded bg-bg-secondary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y font-mono text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="text-xs text-text-secondary hover:text-text-primary px-3 py-1.5 border border-border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-xs text-accent hover:text-accent-hover px-3 py-1.5 border border-accent rounded bg-accent/10"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="group relative text-accent hover:text-accent-hover p-1.5 rounded transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none text-text-primary">
                  <ReactMarkdown>{vision || '*No vision defined*'}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
