import { NextResponse } from 'next/server'
import { XMLParser } from 'fast-xml-parser'

type ShowDefinition = {
  id: string
  name: string
  feedUrl: string
  siteUrl?: string
}

const SHOWS: ShowDefinition[] = [
  {
    id: 'planet-money',
    name: 'Planet Money',
    feedUrl: 'https://feeds.npr.org/510289/podcast.xml',
    siteUrl: 'https://www.npr.org/podcasts/510289/planet-money',
  },
  {
    id: 'hard-fork',
    name: 'Hard Fork',
    feedUrl: 'https://feeds.simplecast.com/6HKOhNgS',
    siteUrl: 'https://www.nytimes.com/column/hard-fork',
  },
  {
    id: 'search-engine',
    name: 'Search Engine',
    feedUrl: 'https://feeds.megaphone.fm/search-engine',
    siteUrl: 'https://www.searchengine.show/',
  },
]

function toArray<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function firstString(v: unknown): string | undefined {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  return undefined
}

type LatestEpisode = {
  title?: string
  link?: string
  pubDate?: string
  audioUrl?: string
}

function parseLatestEpisodeFromRss(xml: string): LatestEpisode {
  const parser = new XMLParser({
    ignoreAttributes: false,
    // leave default attributeNamePrefix "@_"
    allowBooleanAttributes: true,
  })

  const parsed = parser.parse(xml) as any
  const channel =
    parsed?.rss?.channel ??
    parsed?.feed ??
    parsed?.['rdf:RDF']?.channel ??
    parsed?.channel

  // RSS 2.0: channel.item[]
  const items = toArray(channel?.item)
  const latest = items[0]
  if (!latest) return {}

  const title = firstString(latest.title)

  // Some feeds use <link>string</link>, others <link href="..."/>
  const link =
    firstString(latest.link) ??
    firstString(latest?.link?.['@_href']) ??
    firstString(latest?.guid)

  const pubDate =
    firstString(latest.pubDate) ??
    firstString(latest.published) ??
    firstString(latest?.['dc:date'])

  const audioUrl =
    firstString(latest?.enclosure?.['@_url']) ??
    firstString(latest?.enclosure?.url) ??
    firstString(latest?.['media:content']?.['@_url'])

  return { title, link, pubDate, audioUrl }
}

export async function GET() {
  const results = await Promise.all(
    SHOWS.map(async (show) => {
      try {
        const res = await fetch(show.feedUrl, {
          next: { revalidate: 1800 },
          headers: {
            // Some RSS providers block unknown user agents.
            'User-Agent': 'tom-bohn-site/1.0 (+https://thomaslbohn.com)',
            Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1',
          },
        })

        if (!res.ok) {
          return {
            ...show,
            error: `Feed request failed (${res.status})`,
          }
        }

        const xml = await res.text()
        const latest = parseLatestEpisodeFromRss(xml)

        return {
          ...show,
          latest,
        }
      } catch (e) {
        return {
          ...show,
          error: e instanceof Error ? e.message : 'Unknown error',
        }
      }
    })
  )

  return NextResponse.json(
    { shows: results, updatedAt: new Date().toISOString() },
    {
      headers: {
        'Cache-Control':
          'public, max-age=0, s-maxage=1800, stale-while-revalidate=7200',
      },
    }
  )
}

