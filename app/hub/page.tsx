import { getHubSections } from '@/lib/hub'
import { HubSections } from '@/components/hub/HubSections'

export default async function Hub() {
  const sections = await getHubSections()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-accent mb-4 font-mono">{'>'} SOFTWARE ENGINEER</p>
          <h1 className="text-2xl font-semibold mb-4 text-text-primary font-mono">
            {'// HUB'}
          </h1>
          <p className="text-text-secondary leading-relaxed">
            All the places you can find me online
          </p>
        </div>

        <HubSections sections={sections} />
      </div>
    </div>
  )
}
