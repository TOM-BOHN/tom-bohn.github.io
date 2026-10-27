import type { Metadata } from 'next'
import { getLearningData } from '@/lib/hub'
import { LearningPageWrapper } from '@/components/hub/LearningPageWrapper'

export const metadata: Metadata = {
  title: 'Certifications',
}

export default async function Certifications() {
  const learningData = await getLearningData()

  return (
    <LearningPageWrapper
      education={learningData.education}
      accomplished={learningData.accomplished}
      planning={learningData.planning}
    />
  )
}
