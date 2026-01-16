import { getHubSections } from '@/lib/hub'
import { HubPageWrapper } from '@/components/hub/HubPageWrapper'

export default async function Hub() {
  const sections = await getHubSections()

  return <HubPageWrapper sections={sections} />
}
