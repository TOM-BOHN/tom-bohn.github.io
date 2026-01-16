'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export interface BadgeImage {
  src: string
  alt: string
  url?: string
}

export interface CertificationGroupData {
  id: string
  title: string
  description?: string
  badgeImages: BadgeImage[]
  learnMoreUrl?: string
  viewCertsUrl?: string
  metadata?: {
    label: string
    value: string
  }[]
}

interface BadgeImageProps {
  badge: BadgeImage
}

function BadgeImage({ badge }: BadgeImageProps) {
  const [imageError, setImageError] = useState(false)

  const content = (
    <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-border hover:border-accent transition-all group bg-bg-secondary">
      {imageError ? (
        <div className="flex items-center justify-center h-full text-text-secondary text-xs text-center p-2">
          {badge.alt}
        </div>
      ) : (
        <Image
          src={badge.src}
          alt={badge.alt}
          fill
          className="object-contain p-2 group-hover:scale-110 transition-transform"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  )

  if (badge.url) {
    return (
      <a
        href={badge.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}

interface CertificationGroupProps {
  group: CertificationGroupData
  isExpanded?: boolean
  onToggle?: () => void
}

export function CertificationGroup({ group, isExpanded: controlledExpanded, onToggle }: CertificationGroupProps) {
  const [internalExpanded, setInternalExpanded] = useState(true)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalExpanded(!internalExpanded)
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, group.badgeImages, group.description])

  return (
    <div className="border-2 border-border rounded-lg bg-bg-primary mb-6 overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 flex items-start gap-3 hover:bg-bg-secondary transition-colors text-left"
      >
        <div className="flex items-center h-7 pt-1">
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
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-text-primary mb-2">{group.title}</h3>
          {group.metadata && group.metadata.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {group.metadata.map((meta, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-text-secondary font-medium">{meta.label}:</span>
                  <span className="text-accent font-semibold">{meta.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 md:items-end ml-4">
          {group.learnMoreUrl && (
            <a
              href={group.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More →
            </a>
          )}
          {group.viewCertsUrl && (
            <a
              href={group.viewCertsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              View Certifications →
            </a>
          )}
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: typeof height === 'number' ? `${height}px` : 'none' }}
      >
        <div ref={contentRef} className="pr-6 pb-6 pl-[56px]">
          {group.description && (
            <p className="text-text-secondary mb-4">{group.description}</p>
          )}
          {group.badgeImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...group.badgeImages]
                .sort((a, b) => {
                  const certificationKeywords = ['CERTIFIED', 'CERTIFICATE', 'SPECIALIST', 'ARCHITECT', 'CONSULTANT', 'ASSOCIATE', 'CERTIFICATION']
                  const aUpper = a.alt.toUpperCase()
                  const bUpper = b.alt.toUpperCase()
                  const aIsCertified = certificationKeywords.some(keyword => aUpper.includes(keyword))
                  const bIsCertified = certificationKeywords.some(keyword => bUpper.includes(keyword))
                  if (aIsCertified && !bIsCertified) return -1
                  if (!aIsCertified && bIsCertified) return 1
                  return 0
                })
                .map((badge, idx) => (
                  <BadgeImage key={idx} badge={badge} />
                ))}
            </div>
          ) : (
            <p className="text-text-secondary italic text-sm">
              Badge images will be displayed here once added.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
