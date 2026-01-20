import type { Metadata } from 'next'
import { getV2Me } from '@/lib/v2me'
import { V2MePageWrapper } from '@/components/v2me/V2MePageWrapper'

export const metadata: Metadata = {
  title: 'V2ME | Thomas Bohn',
}

export default async function V2Me() {
  const v2meData = await getV2Me()

  return <V2MePageWrapper initialData={v2meData} />
}
