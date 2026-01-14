import { NextResponse } from 'next/server'

type OpenMeteoCurrent = {
  time: string
  temperature_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
}

function weatherCodeToLabel(code: number): string {
  // https://open-meteo.com/en/docs#weather_variable_weather_code
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

export async function GET() {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=41.8781' +
    '&longitude=-87.6298' +
    '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m' +
    '&temperature_unit=fahrenheit' +
    '&wind_speed_unit=mph' +
    '&timezone=America%2FChicago'

  const res = await fetch(url, { next: { revalidate: 900 } })

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 502 }
    )
  }

  const data = (await res.json()) as { current?: OpenMeteoCurrent }
  if (!data.current) {
    return NextResponse.json(
      { error: 'Weather response missing current conditions' },
      { status: 502 }
    )
  }

  const current = data.current
  return NextResponse.json(
    {
      city: 'Chicago, IL',
      time: current.time,
      temperatureF: current.temperature_2m,
      feelsLikeF: current.apparent_temperature,
      windMph: current.wind_speed_10m,
      weatherCode: current.weather_code,
      condition: weatherCodeToLabel(current.weather_code),
    },
    {
      headers: {
        // Helps downstream caches/CDNs; Next will still respect fetch revalidate above.
        'Cache-Control': 'public, max-age=0, s-maxage=900, stale-while-revalidate=3600',
      },
    }
  )
}

