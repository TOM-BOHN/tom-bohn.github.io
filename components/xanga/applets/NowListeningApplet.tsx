'use client'

import { useEffect, useMemo, useState } from 'react'

type PodcastApiShow = {
  id: string
  name: string
  feedUrl: string
  siteUrl?: string
  latest?: {
    title?: string
    link?: string
    pubDate?: string
    audioUrl?: string
  }
  error?: string
}

type PodcastApiResponse = {
  shows: PodcastApiShow[]
  updatedAt: string
}

function formatDateMaybe(s: string | undefined): string | undefined {
  if (!s) return undefined
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function NowListeningApplet() {
  const [data, setData] = useState<PodcastApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        const res = await fetch('/api/podcasts')
        if (!res.ok) throw new Error(`Podcasts failed (${res.status})`)
        const json = (await res.json()) as PodcastApiResponse
        if (!cancelled) setData(json)
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
        const link = show.latest?.link ?? show.siteUrl ?? show.feedUrl
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
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
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

