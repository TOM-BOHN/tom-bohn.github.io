'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Link } from '@/lib/links'
import {
  FaCode,
  FaDocker,
  FaFileAlt,
  FaGithub,
  FaLaptopCode,
  FaPenNib,
  FaRobot,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa'
import {
  SiAmazon,
  SiApacheairflow,
  SiApachespark,
  SiCloudflare,
  SiConfluence,
  SiDbt,
  SiGoogle,
  SiGooglesheets,
  SiJira,
  SiJenkins,
  SiJupyter,
  SiKeras,
  SiLucid,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPypi,
  SiPython,
  SiPytorch,
  SiR,
  SiSalesforce,
  SiScikitlearn,
  SiScipy,
  SiSelenium,
  SiSlack,
  SiSnowflake,
  SiSnyk,
  SiSubstack,
  SiTableau,
  SiTailwindcss,
  SiTensorflow,
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

interface IconConfig {
  match: string[]
  IconComponent: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}

const iconMap: IconConfig[] = [
  // AI & Writing
  { match: ['github'], IconComponent: FaGithub, color: '#181717', bgColor: '#f6f8fa' },
  { match: ['cursor'], IconComponent: FaCode, color: '#ffffff', bgColor: '#111827' },
  { match: ['chatgpt', 'openai'], IconComponent: SiOpenai, color: '#ffffff', bgColor: '#0f172a' },
  { match: ['claude', 'anthropic'], IconComponent: FaRobot, color: '#ffffff', bgColor: '#1f2937' },
  { match: ['grammarly'], IconComponent: FaPenNib, color: '#ffffff', bgColor: '#16a34a' },
  { match: ['perplexity'], IconComponent: FaSearch, color: '#0f172a', bgColor: '#e2e8f0' },
  { match: ['substack'], IconComponent: SiSubstack, color: '#ff6719', bgColor: '#fff5e6' },
  
  // Development Apps
  { match: ['docker'], IconComponent: FaDocker, color: '#0db7ed', bgColor: '#e6f7ff' },
  { match: ['visual studio code', 'vs code', 'vscode'], IconComponent: FaLaptopCode, color: '#2563eb', bgColor: '#dbeafe' },
  
  // Cloud & Security
  { match: ['crowdstrike', 'falcon'], IconComponent: FaShieldAlt, color: '#b91c1c', bgColor: '#fee2e2' },
  { match: ['amazon', 'aws', 'sagemaker', 's3'], IconComponent: SiAmazon, color: '#ff9900', bgColor: '#fff5e6' },
  { match: ['cloudflare'], IconComponent: SiCloudflare, color: '#f38020', bgColor: '#fff1e6' },
  { match: ['snyk'], IconComponent: SiSnyk, color: '#4c4a73', bgColor: '#efeff6' },
  
  // Docs & Packages
  { match: ['next.js', 'nextjs'], IconComponent: SiNextdotjs, color: '#000000', bgColor: '#f5f5f5' },
  { match: ['tailwind'], IconComponent: SiTailwindcss, color: '#38bdf8', bgColor: '#e0f2fe' },
  { match: ['pypi'], IconComponent: SiPypi, color: '#3775a9', bgColor: '#e6f0fa' },
  { match: ['uv', 'python'], IconComponent: SiPython, color: '#3776ab', bgColor: '#e6f0fa' },
  
  // Languages & Frameworks - Put specific matches first
  { match: ['salesforce'], IconComponent: SiSalesforce, color: '#00a1e0', bgColor: '#e6f5fc' },
  { match: ['sql'], IconComponent: FaCode, color: '#336791', bgColor: '#e6f0fa' },
  { match: ['bash'], IconComponent: FaCode, color: '#4eaa25', bgColor: '#e6f7e6' },
  { match: ['r-project', 'r ', 'r'], IconComponent: SiR, color: '#276dc3', bgColor: '#e6f0fa' },
  
  // Data Science & AI - Put specific matches first
  { match: ['tensorflow'], IconComponent: SiTensorflow, color: '#ff6f00', bgColor: '#fff5e6' },
  { match: ['pytorch'], IconComponent: SiPytorch, color: '#ee4c2c', bgColor: '#fee2e2' },
  { match: ['keras'], IconComponent: SiKeras, color: '#d00000', bgColor: '#fee2e2' },
  { match: ['pandas'], IconComponent: SiPandas, color: '#150458', bgColor: '#f0e6ff' },
  { match: ['numpy'], IconComponent: SiNumpy, color: '#013243', bgColor: '#e6f0f5' },
  { match: ['scikit-learn', 'scikit', 'sklearn'], IconComponent: SiScikitlearn, color: '#f7931e', bgColor: '#fff5e6' },
  { match: ['scipy'], IconComponent: SiScipy, color: '#8cacee', bgColor: '#e6f0fa' },
  { match: ['nltk'], IconComponent: FaCode, color: '#4b8bbe', bgColor: '#e6f0fa' },
  
  // Data Storage & Databases - Put specific matches first
  { match: ['postgresql', 'postgres'], IconComponent: SiPostgresql, color: '#4169e1', bgColor: '#e6f0fa' },
  { match: ['mysql'], IconComponent: SiMysql, color: '#4479a1', bgColor: '#e6f0fa' },
  { match: ['apache spark', 'spark'], IconComponent: SiApachespark, color: '#e25a1c', bgColor: '#fff5e6' },
  { match: ['snowflake'], IconComponent: SiSnowflake, color: '#29b5e8', bgColor: '#e6f5fc' },
  
  // Data Engineering & ETL
  { match: ['apache airflow', 'airflow'], IconComponent: SiApacheairflow, color: '#017cee', bgColor: '#e6f5fc' },
  { match: ['dbt'], IconComponent: SiDbt, color: '#ff694b', bgColor: '#ffe6e6' },
  
  // Data Visualization & BI
  { match: ['tableau'], IconComponent: SiTableau, color: '#e97627', bgColor: '#fff5e6' },
  
  // Development & DevOps
  { match: ['git'], IconComponent: FaGithub, color: '#f05032', bgColor: '#fee2e2' },
  { match: ['jenkins'], IconComponent: SiJenkins, color: '#d24939', bgColor: '#fee2e2' },
  { match: ['selenium'], IconComponent: SiSelenium, color: '#43b02a', bgColor: '#e6f7e6' },
  
  // Development Environment
  { match: ['jupyter'], IconComponent: SiJupyter, color: '#f37626', bgColor: '#fff5e6' },
  { match: ['r markdown', 'rmarkdown'], IconComponent: FaFileAlt, color: '#276dc3', bgColor: '#e6f0fa' },
  { match: ['conda'], IconComponent: FaCode, color: '#44a833', bgColor: '#e6f7e6' },
  { match: ['google sheets', 'sheets'], IconComponent: SiGooglesheets, color: '#34a853', bgColor: '#e6f7e6' },
  
  // Work Management
  { match: ['jira'], IconComponent: SiJira, color: '#0052cc', bgColor: '#e6f0fa' },
  { match: ['confluence'], IconComponent: SiConfluence, color: '#172b4d', bgColor: '#e6f0f5' },
  { match: ['slack'], IconComponent: SiSlack, color: '#4a154b', bgColor: '#f0e6f5' },
  { match: ['google-workspace', 'google workspace'], IconComponent: SiGoogle, color: '#4285f4', bgColor: '#e6f0fa' },
  { match: ['lucidchart'], IconComponent: SiLucid, color: '#f59e0b', bgColor: '#fff5e6' },
]

function getBrandIcon(linkId: string, linkTitle: string): BrandIcon {
  const normalized = `${linkId} ${linkTitle}`.toLowerCase()
  
  // Sort matches by specificity (longer keywords first) to ensure more specific matches are found first
  const sortedIconMap = [...iconMap].sort((a, b) => {
    const aMaxLength = Math.max(...a.match.map(k => k.length))
    const bMaxLength = Math.max(...b.match.map(k => k.length))
    return bMaxLength - aMaxLength
  })
  
  const matched = sortedIconMap.find((entry) => {
    return entry.match.some((keyword) => {
      // Handle special case: 'r ' (r with space) - match when normalized is "r r" or starts with "r "
      if (keyword === 'r ') {
        return normalized === 'r r' || normalized.startsWith('r ') || normalized === 'r'
      }
      // For single character keywords like 'r', match when:
      // 1. Normalized is exactly the keyword (e.g., "r")
      // 2. Normalized is keyword repeated (e.g., "r r" for id="r" title="R")
      // 3. Keyword appears as a whole word with word boundaries
      if (keyword.length === 1) {
        // Exact matches first
        if (normalized === keyword || normalized === `${keyword} ${keyword}`) {
          return true
        }
        // Then check word boundaries - but be careful not to match 'r' inside other words
        const wordBoundaryRegex = new RegExp(`\\b${keyword}\\b`, 'i')
        if (wordBoundaryRegex.test(normalized)) {
          // Additional validation: ensure it's truly a standalone word
          // Check if it's surrounded by spaces or at start/end
          const matchPositions: number[] = []
          let searchIndex = 0
          while (true) {
            const pos = normalized.indexOf(keyword, searchIndex)
            if (pos === -1) break
            matchPositions.push(pos)
            searchIndex = pos + 1
          }
          // Verify at least one match is a standalone word
          return matchPositions.some(pos => {
            const charBefore = pos > 0 ? normalized[pos - 1] : ' '
            const charAfter = pos < normalized.length - 1 ? normalized[pos + 1] : ' '
            return /\s/.test(charBefore) && /\s/.test(charAfter)
          })
        }
        return false
      }
      // For longer keywords, escape special regex characters and match as whole words
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i')
      return regex.test(normalized) || normalized === keyword
    })
  })

  if (matched) {
    const { IconComponent, color, bgColor } = matched
    return {
      icon: <IconComponent className="w-5 h-5" />,
      color,
      bgColor,
    }
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
