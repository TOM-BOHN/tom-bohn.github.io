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

function weatherCodeToLabel(code: number): string {
  if (code === 0) return 'Clear'
  if (code === 1) return 'Mostly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code === 45 || code === 48) return 'Fog'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code >= 85 && code <= 86) return 'Snow showers'
  if (code >= 95 && code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

export function ChicagoWeatherApplet() {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        const url =
          'https://api.open-meteo.com/v1/forecast' +
          '?latitude=41.8781' +
          '&longitude=-87.6298' +
          '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m' +
          '&temperature_unit=fahrenheit' +
          '&wind_speed_unit=mph' +
          '&timezone=America%2FChicago'

        const res = await fetch(url)
        if (!res.ok) throw new Error(`Weather failed (${res.status})`)
        const json = (await res.json()) as any

        const current = json?.current
        if (!current) throw new Error('Weather response missing current conditions')

        const mapped: WeatherResponse = {
          city: 'Chicago, IL',
          time: String(current.time),
          temperatureF: Number(current.temperature_2m),
          feelsLikeF: Number(current.apparent_temperature),
          windMph: Number(current.wind_speed_10m),
          condition: weatherCodeToLabel(Number(current.weather_code)),
        }

        if (!cancelled) setData(mapped)
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

