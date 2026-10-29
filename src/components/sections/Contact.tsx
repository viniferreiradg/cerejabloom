import type { Landing, Settings } from '@/lib/data'

export default function Contact({ landing, settings }: { landing: Landing; settings: Settings }) {
  return (
    <section id="contato" className="contact" data-reveal>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{landing.contatoEyebrow}</span>
          <h2>{landing.contatoTitle}</h2>
        </div>
        {settings.email && (
          <a className="contact-email" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
        )}
        <div className="contact-sub">
          {settings.whatsappUrl && (
            <a className="btn" href={settings.whatsappUrl} target="_blank" rel="noopener">
              {landing.whatsappButtonLabel}
            </a>
          )}
          {settings.instagramUrl && (
            <a className="btn" href={settings.instagramUrl} target="_blank" rel="noopener">
              Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
