'use client'

export function MusicPlayerApplet() {
  // SoundCloud station (Explosions In The Sky)
  const stationUrl = 'https://soundcloud.com/discover/sets/artist-stations:3460819'
  const embedUrl =
    'https://w.soundcloud.com/player/?' +
    new URLSearchParams({
      url: stationUrl,
      color: '#f97316',
      auto_play: 'false',
      hide_related: 'false',
      show_comments: 'false',
      show_user: 'true',
      show_reposts: 'false',
      show_teaser: 'true',
      visual: 'false',
    }).toString()

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary">
        Vibe Tunes. Station: Explosions In The Sky.
      </p>
      <div className="border-4 border-border bg-black">
        <iframe
          style={{ borderRadius: 0 }}
          src={embedUrl}
          width="100%"
          height="166"
          allow="autoplay"
          loading="lazy"
          title="Vibe Tunes (SoundCloud station)"
        />
      </div>
      <p className="text-[11px] text-text-secondary">
        If embeds are blocked, open on SoundCloud:{' '}
        <a href={stationUrl} target="_blank" rel="noopener noreferrer">
          Explosions In The Sky station
        </a>
      </p>
    </div>
  )
}

