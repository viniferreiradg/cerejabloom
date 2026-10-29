import type { Landing, MusicaDoc } from '@/lib/data'

export default function MusicSection({ landing, musicas }: { landing: Landing; musicas: MusicaDoc[] }) {
  return (
    <section id="musicas" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.musicasEyebrow}</span>
          <h2>{landing.musicasTitle}</h2>
        </div>

        <div className="music-feature">
          <div className="music-embed">
            {landing.spotifyEmbedUrl && (
              <iframe
                title="Cereja Bloom no Spotify"
                src={landing.spotifyEmbedUrl}
                height={352}
                loading="lazy"
                allow="encrypted-media"
              />
            )}
          </div>
          <div className="music-copy">
            <p>{landing.musicCopy}</p>
            <div className="music-links">
              {musicas.map((m) => (
                <div className="music-links-item" key={m.id}>
                  <strong>{m.titulo}</strong>
                  {m.linkUrl && (
                    <a href={m.linkUrl} target="_blank" rel="noopener">
                      Ouvir em todas as plataformas →
                    </a>
                  )}
                </div>
              ))}
            </div>
            {landing.musicNote && <p className="music-note">{landing.musicNote}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
