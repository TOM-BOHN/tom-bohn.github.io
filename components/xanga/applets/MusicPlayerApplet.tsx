'use client'

export function MusicPlayerApplet() {
  // SoundCloud playlist embed (album)
  const artistUrl = 'https://soundcloud.com/explosionsinthesky'
  const albumUrl =
    'https://soundcloud.com/explosionsinthesky/sets/the-earth-is-not-a-cold-dead-1'

  // Use SoundCloud-provided embed src with compact settings
  const embedUrl =
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A771565368&color=%23e1dfde&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false'

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary">
        <a href={artistUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange">
          Explosions In The Sky
        </a>{' '}
        {'·'}{' '}
        <a href={albumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange">
          <span className="italic">The Earth Is Not a Cold Dead Place</span>
        </a>
      </p>
      <div className="border-2 border-border bg-black">
        <iframe
          style={{ borderRadius: 0 }}
          src={embedUrl}
          width="100%"
          height="152"
          allow="autoplay"
          loading="lazy"
          title="Vibe Tunes (SoundCloud album playlist)"
        />
      </div>
    </div>
  )
}

