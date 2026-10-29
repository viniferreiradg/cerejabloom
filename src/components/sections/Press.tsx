import type { ImprensaDoc, Landing } from '@/lib/data'

export default function Press({ landing, imprensa }: { landing: Landing; imprensa: ImprensaDoc[] }) {
  if (!imprensa.length) return null

  return (
    <section id="imprensa" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.imprensaEyebrow}</span>
          <h2>{landing.imprensaTitle}</h2>
        </div>
        <div className="press-grid">
          {imprensa.map((p) => (
            <a className="press-card" href={p.linkUrl} target="_blank" rel="noopener" key={p.id}>
              <div className="press-thumb">
                {p.thumb?.url && <img src={p.thumb.url} alt="" loading="lazy" width={768} height={410} />}
              </div>
              <div className="press-card-body">
                <span>{p.veiculo}</span>
                <p>{p.manchete}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
