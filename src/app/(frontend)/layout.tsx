import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { getSettings } from '@/lib/data'
import LivePreviewListener from '@/components/LivePreviewListener'
import RevealObserver from '@/components/RevealObserver'
import HeaderScroll from '@/components/HeaderScroll'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Astheric Bold: fonte de títulos da marca (public/fonts na versão estática).
const astheric = localFont({
  src: [
    { path: '../../fonts/astheric-bold-webfont.woff2', weight: '700', style: 'normal' },
    { path: '../../fonts/astheric-bold-webfont.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const viewport: Viewport = {
  themeColor: '#1c1b1a',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const title = settings.siteTitle || 'Cereja Bloom'
  const description = settings.siteDescription || 'Cereja Bloom — indie rock de Laguna, SC.'
  const ogImage = settings.ogImage?.url
    ? { url: settings.ogImage.url, width: settings.ogImage.width || 2200, height: settings.ogImage.height || 1467 }
    : undefined

  return {
    metadataBase: new URL(serverUrl),
    title,
    description,
    alternates: { canonical: '/' },
    icons: {
      icon: [
        { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      title,
      description,
      url: serverUrl,
      siteName: title,
      locale: 'pt_BR',
      type: 'website',
      ...(ogImage && { images: [{ ...ogImage, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  }
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${astheric.variable}`}>
      <body>
        {children}
        <LivePreviewListener />
        <RevealObserver />
        <HeaderScroll />
      </body>
    </html>
  )
}
