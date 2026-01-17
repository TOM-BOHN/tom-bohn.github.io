import { getLinks } from '@/lib/links'
import { LinksPageWrapper } from '@/components/links/LinksPageWrapper'

export default async function Links() {
  const links = await getLinks()
  const sections = Object.entries(links).map(([title, items]) => ({
    id: title,
    title,
    links: items,
  }))

  return <LinksPageWrapper sections={sections} />
}
