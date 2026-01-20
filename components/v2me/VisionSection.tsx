'use client'

import { useState, useEffect, useRef } from 'react'

interface VisionSectionProps {
  vision: string
  isExpanded: boolean
  onToggle: () => void
  onUpdate: (vision: string) => void
}

export function VisionSection({ vision, isExpanded, onToggle, onUpdate }: VisionSectionProps) {
  const [localVision, setLocalVision] = useState(vision)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setLocalVision(vision)
  }, [vision])

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, localVision])

  const handleBlur = () => {
    onUpdate(localVision)
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
          <textarea
            ref={textareaRef}
            value={localVision}
            onChange={(e) => setLocalVision(e.target.value)}
            onBlur={handleBlur}
            placeholder="Enter your vision..."
            className="w-full min-h-[100px] px-3 py-2 border border-border rounded bg-bg-primary text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y"
          />
        </div>
      </div>
    </div>
  )
}
