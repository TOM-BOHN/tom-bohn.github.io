import type { Metadata } from 'next'
import { getLearningData } from '@/lib/hub'
import { LearningSection } from '@/components/hub/LearningSection'
import { LearningPageHeader } from '@/components/hub/LearningPageHeader'
import { RoleTypewriter } from '@/components/RoleTypewriter'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Certifications',
}

export default async function Certifications() {
  const learningData = await getLearningData()

  return (
    <>
      {/* Animated background elements for dark mode */}
      <div className="stars-bg" aria-hidden="true" />
      <div className="nebula-bg" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in-up">
            <p className="text-sm text-accent mb-4 font-mono typewriter-cursor">
              <RoleTypewriter />
            </p>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-text-primary font-mono flex items-center gap-3">
                <span className="text-accent-orange">{'⟩'}</span>
                {'CERTIFICATIONS & LEARNING'}
              </h1>
              <LearningPageHeader />
            </div>
            <p className="text-text-secondary leading-relaxed">
              My journey of continuous learning and professional development
            </p>
          </div>

          <ScrollReveal>
            <LearningSection
              education={learningData.education}
              accomplished={learningData.accomplished}
              planning={learningData.planning}
            />
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}
