'use client'

import { useState } from 'react'
import type { CertificationGroupData, EducationEntry, LearningGoal } from '@/lib/hub'
import { LearningSection } from './LearningSection'
import { LearningHeader } from './LearningHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

interface LearningPageWrapperProps {
  education?: EducationEntry[]
  accomplished: CertificationGroupData[]
  planning: LearningGoal[]
}

export function LearningPageWrapper({
  education,
  accomplished,
  planning,
}: LearningPageWrapperProps) {
  const [expandToken, setExpandToken] = useState(0)
  const [collapseToken, setCollapseToken] = useState(0)

  return (
    <PageShell>
      <PageHeader
        title="CERTIFICATIONS & LEARNING"
        actions={
          <LearningHeader
            onExpandAll={() => setExpandToken((t) => t + 1)}
            onCollapseAll={() => setCollapseToken((t) => t + 1)}
          />
        }
        description="My journey of continuous learning and professional development"
      />

      <ScrollReveal>
        <LearningSection
          education={education}
          accomplished={accomplished}
          planning={planning}
          expandToken={expandToken}
          collapseToken={collapseToken}
        />
      </ScrollReveal>
    </PageShell>
  )
}
