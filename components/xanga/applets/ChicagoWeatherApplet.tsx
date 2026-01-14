'use client'

import { useEffect, useState } from 'react'

type WeatherResponse = {
  city: string
  time: string
  temperatureF: number
  feelsLikeF: number
  windMph: number
  condition: string
}

export function ChicagoWeatherApplet() {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        const res = await fetch('/api/weather')
        if (!res.ok) throw new Error(`Weather failed (${res.status})`)
        const json = (await res.json()) as WeatherResponse
        if (!cancelled) setData(json)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Weather failed')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="text-sm text-text-secondary">
        <p className="font-bold text-text-primary">Chicago</p>
        <p>Weather unavailable: {error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-sm text-text-secondary">
        <p className="font-bold text-text-primary">Chicago</p>
        <p>Loading current conditions…</p>
      </div>
    )
  }

  return (
    <div className="text-sm text-text-secondary space-y-1">
      <p className="font-bold text-text-primary">{data.city}</p>
      <p>
        <span className="text-text-primary font-bold">
          {Math.round(data.temperatureF)}°F
        </span>{' '}
        <span>({data.condition})</span>
      </p>
      <p className="text-xs">
        Feels like {Math.round(data.feelsLikeF)}°F • Wind {Math.round(data.windMph)} mph
      </p>
    </div>
  )
}

