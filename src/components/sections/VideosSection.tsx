import type { Landing, VideoDoc } from '@/lib/data'

export default function VideosSection({ landing, videos }: { landing: Landing; videos: VideoDoc[] }) {
  if (!videos.length) return null

  return (
    <section id="videos" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.videosEyebrow}</span>
          <h2>{landing.videosTitle}</h2>
        </div>
        <div className="video-grid">
          {videos.map((v) => (
            <div className="video-card" key={v.id}>
              <div className="video-frame">
                <iframe
                  src={v.youtubeEmbedUrl}
                  title={`Cereja Bloom - ${v.titulo}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <h3>{v.titulo}</h3>
              <p>{v.subtitulo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
