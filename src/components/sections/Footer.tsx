import { SocialLinks } from '@/components/IconSprite'
import type { Settings } from '@/lib/data'

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="site-footer">
      <div className="footer-mark">
        {settings.footerMark?.url && <img src={settings.footerMark.url} alt="" />}
      </div>
      <SocialLinks settings={settings} className="footer-socials" />
      <p className="footer-note">{settings.footerNote}</p>
    </footer>
  )
}
