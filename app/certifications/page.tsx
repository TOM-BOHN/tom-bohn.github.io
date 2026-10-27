import type { Metadata } from 'next'
import { getLearningData } from '@/lib/hub'
import { LearningSection } from '@/components/hub/LearningSection'
import { LearningPageHeader } from '@/components/hub/LearningPageHeader'
import { PageShell } from '@/components/PageShell'
import { PageHeader } from '@/components/PageHeader'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Certifications',
}

export default async function Certifications() {
  const learningData = await getLearningData()

  return (
    <PageShell>
      <PageHeader
        title="CERTIFICATIONS & LEARNING"
        actions={<LearningPageHeader />}
        description="My journey of continuous learning and professional development"
      />

      <ScrollReveal>
        <LearningSection
          education={learningData.education}
          accomplished={learningData.accomplished}
          planning={learningData.planning}
        />
      </ScrollReveal>
    </PageShell>
  )
}
