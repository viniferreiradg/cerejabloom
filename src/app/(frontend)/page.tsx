import { getLanding, getPageData, getSettings } from '@/lib/data'
import IconSprite from '@/components/IconSprite'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import Bio from '@/components/sections/Bio'
import Members from '@/components/sections/Members'
import MusicSection from '@/components/sections/MusicSection'
import VideosSection from '@/components/sections/VideosSection'
import Gallery from '@/components/sections/Gallery'
import Press from '@/components/sections/Press'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

// Revalida a cada 60s em segundo plano; cada "Salvar" no admin também
// revalida na hora (rota /revalidate)
export const revalidate = 60

export default async function Home() {
  const [landing, settings, data] = await Promise.all([getLanding(), getSettings(), getPageData()])
  const { integrantes, musicas, videos, fotos, imprensa } = data

  return (
    <>
      <IconSprite />
      <Header settings={settings} />
      <main id="top">
        <Hero landing={landing} settings={settings} />
        <Bio landing={landing} />
        <Members landing={landing} integrantes={integrantes} />
        <MusicSection landing={landing} musicas={musicas} />
        <VideosSection landing={landing} videos={videos} />
        <Gallery landing={landing} fotos={fotos} />
        <Press landing={landing} imprensa={imprensa} />
        <Contact landing={landing} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
