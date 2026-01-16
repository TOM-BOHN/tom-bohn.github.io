import { getLearningData } from '@/lib/hub'
import { LearningSection } from '@/components/hub/LearningSection'

export default async function Certifications() {
  const learningData = await getLearningData()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
          <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
            {'// CERTIFICATIONS & LEARNING'}
          </h1>
          <p className="text-text-secondary leading-relaxed">
            My journey of continuous learning and professional development
          </p>
        </div>

        <LearningSection
          accomplished={learningData.accomplished}
          planning={learningData.planning}
        />
      </div>
    </div>
  )
}
