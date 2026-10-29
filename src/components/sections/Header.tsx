import { SocialLinks } from '@/components/IconSprite'
import type { Settings } from '@/lib/data'

export default function Header({ settings }: { settings: Settings }) {
  return (
    <header className="site-header" id="siteHeader">
      <a href="#top" className="logo-link" aria-label="Cereja Bloom">
        {settings.logoHeader?.url ? (
          <img src={settings.logoHeader.url} alt="Cereja Bloom" width={170} height={33} />
        ) : (
          <span>Cereja Bloom</span>
        )}
      </a>
      <SocialLinks settings={settings} className="header-socials" />
    </header>
  )
}
