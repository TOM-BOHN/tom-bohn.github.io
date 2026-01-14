'use client'

import { useEffect, useState } from 'react'

type CountApiResponse = {
  value: number
}

function padCounter(n: number, digits = 7): string {
  const s = String(Math.max(0, Math.floor(n)))
  return s.length >= digits ? s : '0'.repeat(digits - s.length) + s
}

export function HitCounterApplet() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        setError(null)

        const namespace = 'thomaslbohn.com'
        const key = 'site-hits'

        const sessionKey = `xanga-hit:${namespace}:${key}`
        const shouldIncrement =
          typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)

        const url = shouldIncrement
          ? `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`
          : `https://api.countapi.xyz/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`

        const res = await fetch(url)
        if (!res.ok) throw new Error(`Counter failed (${res.status})`)
        const json = (await res.json()) as CountApiResponse

        if (shouldIncrement) {
          sessionStorage.setItem(sessionKey, '1')
        }

        if (!cancelled) setCount(json.value)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Counter failed')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-2">
      <div className="border-4 border-border bg-black px-3 py-2">
        <p className="font-mono text-lg tracking-widest text-[#39ff14]">
          {count === null ? '-------' : padCounter(count)}
        </p>
      </div>
      <p className="text-[11px] text-text-secondary">
        {error ? `Counter error: ${error}` : 'Real hits (per session).'}
      </p>
    </div>
  )
}

