'use client'

export function MusicPlayerApplet() {
  // Spotify embed for a 90s playlist (plays previews and/or full tracks for logged-in users).
  const playlistUrl =
    'https://open.spotify.com/embed/playlist/37i9dQZF1DXbTxeAdrVG2l?utm_source=generator'

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary">
        90s mode: ON. Press play and pretend you’re updating your profile.
      </p>
      <div className="border-4 border-border bg-black">
        <iframe
          style={{ borderRadius: 0 }}
          src={playlistUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="90s playlist"
        />
      </div>
      <p className="text-[11px] text-text-secondary">
        If embeds are blocked, open on Spotify:{' '}
        <a
          href="https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l"
          target="_blank"
          rel="noopener noreferrer"
        >
          All Out 90s
        </a>
      </p>
    </div>
  )
}

