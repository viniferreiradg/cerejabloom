import type { FotoDoc, Landing } from '@/lib/data'

export default function Gallery({ landing, fotos }: { landing: Landing; fotos: FotoDoc[] }) {
  if (!fotos.length) return null

  return (
    <section id="fotos" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.fotosEyebrow}</span>
          <h2>{landing.fotosTitle}</h2>
        </div>
        <div className="gallery-grid">
          {fotos.map((f) =>
            f.imagem?.url ? (
              <a href={f.imagem.url} target="_blank" rel="noopener" key={f.id}>
                <img
                  src={f.imagem.url}
                  alt={f.alt || ''}
                  loading="lazy"
                  width={f.imagem.width || 1600}
                  height={f.imagem.height || 1600}
                />
              </a>
            ) : null,
          )}
        </div>
      </div>
    </section>
  )
}
