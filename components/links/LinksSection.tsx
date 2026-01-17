'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Link } from '@/lib/links'
import {
  FaCode,
  FaDocker,
  FaGithub,
  FaLaptopCode,
  FaPenNib,
  FaRobot,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa'
import {
  SiAmazon,
  SiCloudflare,
  SiNextdotjs,
  SiOpenai,
  SiPypi,
  SiPython,
  SiSnyk,
  SiTailwindcss,
} from 'react-icons/si'

interface LinksSectionProps {
  title: string
  links: Link[]
  isExpanded: boolean
  onToggle: () => void
}

interface BrandIcon {
  icon: ReactNode
  color: string
  bgColor?: string
}

const iconMap: Array<{ match: string[]; icon: ReactNode; color: string; bgColor: string }> = [
  { match: ['github'], icon: <FaGithub className="w-5 h-5" />, color: '#181717', bgColor: '#f6f8fa' },
  { match: ['cursor'], icon: <FaCode className="w-5 h-5" />, color: '#ffffff', bgColor: '#111827' },
  { match: ['chatgpt', 'openai'], icon: <SiOpenai className="w-5 h-5" />, color: '#ffffff', bgColor: '#0f172a' },
  { match: ['claude', 'anthropic'], icon: <FaRobot className="w-5 h-5" />, color: '#ffffff', bgColor: '#1f2937' },
  { match: ['grammarly'], icon: <FaPenNib className="w-5 h-5" />, color: '#ffffff', bgColor: '#16a34a' },
  { match: ['perplexity'], icon: <FaSearch className="w-5 h-5" />, color: '#0f172a', bgColor: '#e2e8f0' },
  { match: ['docker'], icon: <FaDocker className="w-5 h-5" />, color: '#0db7ed', bgColor: '#e6f7ff' },
  { match: ['visual studio code', 'vs code', 'vscode'], icon: <FaLaptopCode className="w-5 h-5" />, color: '#2563eb', bgColor: '#dbeafe' },
  { match: ['crowdstrike', 'falcon'], icon: <FaShieldAlt className="w-5 h-5" />, color: '#b91c1c', bgColor: '#fee2e2' },
  { match: ['amazon', 'aws'], icon: <SiAmazon className="w-5 h-5" />, color: '#ff9900', bgColor: '#fff5e6' },
  { match: ['cloudflare'], icon: <SiCloudflare className="w-5 h-5" />, color: '#f38020', bgColor: '#fff1e6' },
  { match: ['snyk'], icon: <SiSnyk className="w-5 h-5" />, color: '#4c4a73', bgColor: '#efeff6' },
  { match: ['next.js', 'nextjs'], icon: <SiNextdotjs className="w-5 h-5" />, color: '#000000', bgColor: '#f5f5f5' },
  { match: ['tailwind'], icon: <SiTailwindcss className="w-5 h-5" />, color: '#38bdf8', bgColor: '#e0f2fe' },
  { match: ['pypi'], icon: <SiPypi className="w-5 h-5" />, color: '#3775a9', bgColor: '#e6f0fa' },
  { match: ['uv', 'python'], icon: <SiPython className="w-5 h-5" />, color: '#3776ab', bgColor: '#e6f0fa' },
]

function getBrandIcon(linkId: string, linkTitle: string): BrandIcon {
  const normalized = `${linkId} ${linkTitle}`.toLowerCase()
  const matched = iconMap.find((entry) => entry.match.some((keyword) => normalized.includes(keyword)))

  if (matched) {
    return matched
  }

  return {
    icon: <span className="text-xs font-semibold">{linkTitle.charAt(0).toUpperCase()}</span>,
    color: '#ffffff',
  }
}

export function LinksSection({ title, links, isExpanded, onToggle }: LinksSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, links])

  return (
    <div className="border border-border rounded-lg bg-bg-secondary mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-primary transition-colors text-left"
        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
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
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: `${height}px` }}>
        <div ref={contentRef} className="px-5 pb-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
            {links.map((link) => {
              const brand = getBrandIcon(link.id, link.title)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 border border-border rounded-lg p-4 hover:border-accent hover:shadow-md transition-all bg-bg-primary"
                >
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${
                      !brand.bgColor ? 'bg-accent' : ''
                    }`}
                    style={{
                      ...(brand.bgColor && { backgroundColor: brand.bgColor }),
                      color: brand.color,
                    }}
                  >
                    {brand.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary leading-snug">{link.title}</h3>
                    {link.description && (
                      <p className="text-xs text-text-secondary mt-1 leading-snug">{link.description}</p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
