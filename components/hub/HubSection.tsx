'use client'

import { useState, useRef, useEffect } from 'react'
import { HubLink } from '@/lib/hub'
import { 
  FaGithub, 
  FaLinkedin, 
  FaMedium,
} from 'react-icons/fa'
import { 
  SiCredly,
  SiSalesforce,
} from 'react-icons/si'

interface HubSectionProps {
  title: string
  links: HubLink[]
  defaultExpanded?: boolean
  isExpanded: boolean
  onToggle: () => void
}

function getBrandIcon(linkId: string, linkTitle: string) {
  const id = linkId.toLowerCase()
  const title = linkTitle.toLowerCase()
  
  // Check for specific brands with their brand colors
  if (id.includes('github') || title.includes('github')) {
    return { 
      icon: <FaGithub className="w-8 h-8" />, 
      color: '#181717',
      bgColor: '#f6f8fa'
    }
  }
  if (id.includes('linkedin') || title.includes('linkedin')) {
    return { 
      icon: <FaLinkedin className="w-8 h-8" />, 
      color: '#0077b5',
      bgColor: '#e7f3ff'
    }
  }
  if (id.includes('medium') || title.includes('medium')) {
    return { 
      icon: <FaMedium className="w-8 h-8" />, 
      color: '#000000',
      bgColor: '#f5f5f5'
    }
  }
  if (id.includes('credly') || title.includes('credly')) {
    return { 
      icon: <SiCredly className="w-8 h-8" />, 
      color: '#FF6B35',
      bgColor: '#fff4f0'
    }
  }
  if (id.includes('credential') || title.includes('credential')) {
    return { 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ), 
      color: '#0066cc',
      bgColor: '#e6f2ff'
    }
  }
  if (id.includes('trailhead') || title.includes('trailhead') || title.includes('salesforce')) {
    return { 
      icon: <SiSalesforce className="w-8 h-8" />, 
      color: '#00A1E0',
      bgColor: '#e6f7ff'
    }
  }
  
  // Fallback to first letter
  return { 
    icon: (
      <span className="text-2xl font-bold">
        {linkTitle.charAt(0).toUpperCase()}
      </span>
    ), 
    color: '#ffffff',
    bgColor: undefined // Will use accent color
  }
}

export function HubSection({
  title,
  links,
  isExpanded,
  onToggle,
}: HubSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, links])

  return (
    <div className="border-2 border-border rounded-lg bg-bg-secondary mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
      >
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
        <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {links.map((link) => {
              const brand = getBrandIcon(link.id, link.title)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all bg-bg-primary text-center group"
                >
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                      !brand.bgColor ? 'bg-accent' : ''
                    }`}
                    style={{
                      ...(brand.bgColor && { backgroundColor: brand.bgColor }),
                      color: brand.color
                    }}
                  >
                    {brand.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">{link.title}</h3>
                  {link.description && (
                    <p className="text-text-secondary text-sm">{link.description}</p>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
