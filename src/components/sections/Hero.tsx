import type { Landing, Settings } from '@/lib/data'

export default function Hero({ landing, settings }: { landing: Landing; settings: Settings }) {
  return (
    <section className="hero">
      <div className="hero-media">
        {landing.heroImage?.url && (
          <img
            src={landing.heroImage.url}
            alt="Cereja Bloom em ensaio noturno"
            width={landing.heroImage.width || 2200}
            height={landing.heroImage.height || 1467}
            fetchPriority="high"
          />
        )}
      </div>
      <div className="hero-content">
        <span className="hero-kicker">{landing.heroKicker}</span>
        <div className="hero-title">
          {settings.logoHeader?.url ? (
            <img src={settings.logoHeader.url} alt="Cereja Bloom" />
          ) : (
            <h1>Cereja Bloom</h1>
          )}
        </div>
        <p className="hero-tagline">{landing.heroTagline}</p>
        <div className="hero-actions">
          {landing.ctaPrimaryUrl && (
            <a className="btn btn-solid" href={landing.ctaPrimaryUrl} target="_blank" rel="noopener">
              {landing.ctaPrimaryLabel}
            </a>
          )}
          {landing.ctaSecondaryUrl && (
            <a className="btn" href={landing.ctaSecondaryUrl} target="_blank" rel="noopener">
              {landing.ctaSecondaryLabel}
            </a>
          )}
        </div>
      </div>
      <span className="scroll-cue">role</span>
    </section>
  )
}
