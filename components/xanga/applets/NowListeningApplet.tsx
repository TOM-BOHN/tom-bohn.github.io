'use client'

import { useEffect, useMemo, useState } from 'react'

type NowListeningShow = {
  id: string
  name: string
  siteUrl?: string
  latest?: { title?: string; link?: string; pubDate?: string }
  error?: string
}

type ItunesLookupEpisode = {
  wrapperType?: string
  kind?: string
  trackName?: string
  releaseDate?: string
  episodeUrl?: string
  trackViewUrl?: string
}

function jsonp<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_cb_${Math.random().toString(36).slice(2)}`
    const sep = url.includes('?') ? '&' : '?'
    const script = document.createElement('script')
    const timeout = window.setTimeout(() => {
      cleanup()
      reject(new Error('JSONP timed out'))
    }, 10000)

    function cleanup() {
      window.clearTimeout(timeout)
      // @ts-expect-error - dynamic cleanup
      delete window[callbackName]
      script.remove()
    }

    // @ts-expect-error - JSONP callback
    window[callbackName] = (data: T) => {
      cleanup()
      resolve(data)
    }

    script.src = `${url}${sep}callback=${encodeURIComponent(callbackName)}`
    script.onerror = () => {
      cleanup()
      reject(new Error('JSONP failed to load'))
    }
    document.body.appendChild(script)
  })
}

function formatDateMaybe(s: string | undefined): string | undefined {
  if (!s) return undefined
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const SHOWS: Array<{
  id: string
  name: string
  collectionId: number
  siteUrl?: string
}> = [
  { id: 'planet-money', name: 'Planet Money', collectionId: 290783428, siteUrl: 'https://www.npr.org/podcasts/510289/planet-money' },
  { id: 'hard-fork', name: 'Hard Fork', collectionId: 1528594034, siteUrl: 'https://www.nytimes.com/column/hard-fork' },
  { id: 'search-engine', name: 'Search Engine', collectionId: 1614253637, siteUrl: 'https://www.searchengine.show/' },
]

export function NowListeningApplet() {
  const [data, setData] = useState<{ shows: NowListeningShow[]; updatedAt: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        const shows = await Promise.all(
          SHOWS.map(async (show) => {
            try {
              const url = `https://itunes.apple.com/lookup?id=${show.collectionId}&entity=podcastEpisode&limit=1`
              const json = (await jsonp<any>(url)) as any
              const results = Array.isArray(json?.results) ? (json.results as ItunesLookupEpisode[]) : []
              const episode = results.find((r) => r.wrapperType === 'podcastEpisode' || r.kind === 'podcast-episode')

              return {
                id: show.id,
                name: show.name,
                siteUrl: show.siteUrl,
                latest: episode
                  ? {
                      title: episode.trackName,
                      link: episode.episodeUrl ?? episode.trackViewUrl ?? show.siteUrl,
                      pubDate: episode.releaseDate,
                    }
                  : undefined,
              } satisfies NowListeningShow
            } catch (e) {
              return {
                id: show.id,
                name: show.name,
                siteUrl: show.siteUrl,
                error: e instanceof Error ? e.message : 'Unknown error',
              } satisfies NowListeningShow
            }
          })
        )

        if (!cancelled) setData({ shows, updatedAt: new Date().toISOString() })
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Podcasts failed')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const shows = useMemo(() => data?.shows ?? [], [data])

  if (error) {
    return <p className="text-sm text-text-secondary">Couldn’t load podcasts: {error}</p>
  }

  if (!data) {
    return <p className="text-sm text-text-secondary">Loading latest episodes…</p>
  }

  return (
    <div className="space-y-3">
      {shows.map((show) => {
        const title = show.latest?.title ?? 'Latest episode'
        const link = show.latest?.link ?? show.siteUrl ?? '#'
        const date = formatDateMaybe(show.latest?.pubDate)

        return (
          <div key={show.id} className="space-y-1">
            <p className="text-xs font-bold tracking-widest uppercase text-text-primary">
              {show.name}
            </p>
            {show.error ? (
              <p className="text-sm text-text-secondary">Feed error: {show.error}</p>
            ) : (
              <p className="text-sm text-text-secondary">
                {link === '#' ? (
                  <span>{title}</span>
                ) : (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                )}
                {date ? <span className="text-xs"> {' — '} {date}</span> : null}
              </p>
            )}
          </div>
        )
      })}
      <p className="text-[11px] text-text-secondary">
        Updated: {formatDateMaybe(data.updatedAt) ?? 'just now'}
      </p>
    </div>
  )
}

