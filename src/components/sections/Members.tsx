import type { IntegranteDoc, Landing } from '@/lib/data'

export default function Members({ landing, integrantes }: { landing: Landing; integrantes: IntegranteDoc[] }) {
  if (!integrantes.length) return null

  return (
    <section id="integrantes" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.integrantesEyebrow}</span>
          <h2>{landing.integrantesTitle}</h2>
        </div>
        <div className="members-grid">
          {integrantes.map((m) => (
            <div className="member-card" key={m.id}>
              <div className="member-photo">
                {m.foto?.url && <img src={m.foto.url} alt={m.nome} loading="lazy" width={800} height={800} />}
              </div>
              <h3>{m.nome}</h3>
              <p>{m.funcao}</p>
              {m.playlistUrl && (
                <a href={m.playlistUrl} target="_blank" rel="noopener">
                  playlist de {m.nome} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
