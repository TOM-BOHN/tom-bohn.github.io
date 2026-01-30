import type { Metadata } from 'next'
import { getHubSections } from '@/lib/hub'
import { HubPageWrapper } from '@/components/hub/HubPageWrapper'

export const metadata: Metadata = {
  title: 'Hub',
}

export default async function Hub() {
  const sections = await getHubSections()

  return <HubPageWrapper sections={sections} />
}
