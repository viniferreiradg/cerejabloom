import type { Landing } from '@/lib/data'

export default function Bio({ landing }: { landing: Landing }) {
  const paragraphs = (landing.bioLong || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <section id="sobre" data-reveal>
      <div className="container">
        <div className="bio-grid">
          <div>
            <span className="eyebrow">{landing.sobreEyebrow}</span>
            <p className="bio-short">{landing.bioShort}</p>
            <div className="bio-meta">
              {(landing.bioMeta || []).map((item, i) => (
                <div key={i}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="bio-long">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
