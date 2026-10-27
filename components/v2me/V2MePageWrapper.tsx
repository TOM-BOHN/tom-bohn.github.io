'use client'

import { useState, useRef } from 'react'
import type { V2MeData } from '@/lib/v2me'
import { LearnMoreSection } from './LearnMoreSection'
import { VisionSection } from './VisionSection'
import { ValuesSection } from './ValuesSection'
import { MethodsSection } from './MethodsSection'
import { ObstaclesSection } from './ObstaclesSection'
import { MeasuresSection } from './MeasuresSection'
import { ProgressBar } from './ProgressBar'
import { DownloadUploadControls } from './DownloadUploadControls'
import { V2MeHeader } from './V2MeHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

interface V2MePageWrapperProps {
  initialData: V2MeData
}

export function V2MePageWrapper({ initialData }: V2MePageWrapperProps) {
  const [data, setData] = useState<V2MeData>(initialData)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['vision', 'values', 'methods', 'obstacles', 'measures'])
  )
  const [showLearnMore, setShowLearnMore] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const updateVision = (vision: typeof data.vision) => {
    setData((prev) => ({ ...prev, vision }))
  }

  const updateValues = (values: typeof data.values) => {
    setData((prev) => ({ ...prev, values }))
  }

  const updateMethods = (methods: typeof data.methods) => {
    setData((prev) => ({ ...prev, methods }))
  }

  const updateObstacles = (obstacles: typeof data.obstacles) => {
    setData((prev) => ({ ...prev, obstacles }))
  }

  const updateMeasures = (measures: typeof data.measures) => {
    setData((prev) => ({ ...prev, measures }))
  }

  const calculateProgress = () => {
    const totalItems = data.methods.length + data.measures.length
    if (totalItems === 0) return 0

    const completedItems =
      data.methods.filter((m) => m.completed).length +
      data.measures.filter((m) => m.completed).length

    return Math.round((completedItems / totalItems) * 100)
  }

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'v2me.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string) as V2MeData & {
          vision?: V2MeData['vision'] | string
        }
        // Validate structure (vision may be the current object shape or a legacy string)
        const visionOk =
          typeof jsonData.vision === 'string' ||
          (jsonData.vision &&
            typeof jsonData.vision === 'object' &&
            typeof jsonData.vision.description === 'string')
        if (
          visionOk &&
          Array.isArray(jsonData.values) &&
          Array.isArray(jsonData.methods) &&
          Array.isArray(jsonData.obstacles) &&
          Array.isArray(jsonData.measures)
        ) {
          const normalized: V2MeData = {
            ...jsonData,
            vision:
              typeof jsonData.vision === 'string'
                ? {
                    id: 'vision-1',
                    title: 'Vision',
                    description: jsonData.vision,
                  }
                : jsonData.vision,
          }
          setData(normalized)
          // Expand all sections after upload
          setExpandedSections(
            new Set(['vision', 'values', 'methods', 'obstacles', 'measures'])
          )
          window.dispatchEvent(new CustomEvent('v2me-expand-all-items'))
        } else {
          alert('Invalid V2Me JSON structure. Please check the file format.')
        }
      } catch (error) {
        alert('Error parsing JSON file. Please ensure it is valid JSON.')
      }
    }
    reader.readAsText(file)
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const progress = calculateProgress()

  return (
    <PageShell>
      <PageHeader
        title="V2ME"
        spacing="compact"
        actions={
          <div className="flex items-center gap-2">
            <DownloadUploadControls
              onDownload={handleDownload}
              onUpload={handleUpload}
            />
            <V2MeHeader
              onExpandAll={() => {
                setExpandedSections(
                  new Set(['vision', 'values', 'methods', 'obstacles', 'measures'])
                )
                window.dispatchEvent(new CustomEvent('v2me-expand-all-items'))
              }}
              onCollapseAll={() => {
                setExpandedSections(new Set())
                window.dispatchEvent(new CustomEvent('v2me-collapse-all-items'))
              }}
            />
          </div>
        }
        description="A personal version of the V2MOM framework for planning and strategy on a yearly basis. Vision, Values, Methods, Obstacles, and Measures."
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <ScrollReveal>
        <LearnMoreSection
          isExpanded={showLearnMore}
          onToggle={() => setShowLearnMore(!showLearnMore)}
        />

        <ProgressBar progress={progress} />

        <div className="space-y-4">
          <VisionSection
            vision={data.vision}
            isExpanded={expandedSections.has('vision')}
            onToggle={() => toggleSection('vision')}
            onUpdate={updateVision}
          />

          <ValuesSection
            values={data.values}
            isExpanded={expandedSections.has('values')}
            onToggle={() => toggleSection('values')}
            onUpdate={updateValues}
          />

          <MethodsSection
            methods={data.methods}
            isExpanded={expandedSections.has('methods')}
            onToggle={() => toggleSection('methods')}
            onUpdate={updateMethods}
          />

          <ObstaclesSection
            obstacles={data.obstacles}
            isExpanded={expandedSections.has('obstacles')}
            onToggle={() => toggleSection('obstacles')}
            onUpdate={updateObstacles}
          />

          <MeasuresSection
            measures={data.measures}
            isExpanded={expandedSections.has('measures')}
            onToggle={() => toggleSection('measures')}
            onUpdate={updateMeasures}
          />
        </div>
      </ScrollReveal>
    </PageShell>
  )
}
