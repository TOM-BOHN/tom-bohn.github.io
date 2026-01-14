'use client'

export function MusicPlayerApplet() {
  // SoundCloud playlist embed (album)
  const artistUrl = 'https://soundcloud.com/explosionsinthesky'
  const albumUrl =
    'https://soundcloud.com/explosionsinthesky/sets/the-earth-is-not-a-cold-dead-1'

  // SoundCloud-provided API playlist URL (from embed code)
  const playlistApiUrl =
    'https://api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A771565368'

  const embedUrl =
    'https://w.soundcloud.com/player/?' +
    new URLSearchParams({
      url: playlistApiUrl,
      color: '#e1dfde',
      auto_play: 'false',
      hide_related: 'false',
      show_comments: 'true',
      show_user: 'true',
      show_reposts: 'false',
      show_teaser: 'true',
      visual: 'true',
    }).toString()

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary">
        Vibe Tunes: Explosions In The Sky — <span className="italic">The Earth Is Not a Cold Dead Place</span>
      </p>
      <div className="border-4 border-border bg-black">
        <iframe
          style={{ borderRadius: 0 }}
          src={embedUrl}
          width="100%"
          height="300"
          allow="autoplay"
          loading="lazy"
          title="Vibe Tunes (SoundCloud album playlist)"
        />
      </div>
      <p className="text-[11px] text-text-secondary">
        <a href={artistUrl} target="_blank" rel="noopener noreferrer">
          Explosions In The Sky
        </a>{' '}
        {'·'}{' '}
        <a href={albumUrl} target="_blank" rel="noopener noreferrer">
          The Earth Is Not a Cold Dead Place (Anniversary Edition)
        </a>
      </p>
    </div>
  )
}

