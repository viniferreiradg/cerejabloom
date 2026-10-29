import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

// Leitura do CMS para o site. `cache` evita buscar o mesmo dado duas vezes na
// mesma renderização (layout + página). Qualquer falha (banco fora do ar,
// tabela ainda não criada) cai num objeto vazio, e o site não quebra.

export type MediaDoc = {
  id: number | string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export const getClient = cache(() => getPayload({ config }))

export const getLanding = cache(async () => {
  const payload = await getClient()
  const doc = (await payload.findGlobal({ slug: 'landing', depth: 1 }).catch(() => null)) as Record<string, unknown> | null
  return (doc || {}) as Landing
})

export const getSettings = cache(async () => {
  const payload = await getClient()
  const doc = (await payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)) as Record<string, unknown> | null
  return (doc || {}) as Settings
})

async function findAll<T>(collection: 'integrantes' | 'musicas' | 'videos' | 'fotos' | 'imprensa'): Promise<T[]> {
  const payload = await getClient()
  const res = await payload.find({ collection, sort: '_order', limit: 100, depth: 1 }).catch(() => null)
  return (res?.docs as T[]) || []
}

export async function getPageData() {
  const [integrantes, musicas, videos, fotos, imprensa] = await Promise.all([
    findAll<IntegranteDoc>('integrantes'),
    findAll<MusicaDoc>('musicas'),
    findAll<VideoDoc>('videos'),
    findAll<FotoDoc>('fotos'),
    findAll<ImprensaDoc>('imprensa'),
  ])
  return { integrantes, musicas, videos, fotos, imprensa }
}

export type BioMetaItem = { label: string; value: string }

export type Landing = {
  heroKicker?: string
  heroTagline?: string
  heroImage?: MediaDoc | null
  ctaPrimaryLabel?: string
  ctaPrimaryUrl?: string
  ctaSecondaryLabel?: string
  ctaSecondaryUrl?: string
  sobreEyebrow?: string
  bioShort?: string
  bioLong?: string
  bioMeta?: BioMetaItem[]
  integrantesEyebrow?: string
  integrantesTitle?: string
  musicasEyebrow?: string
  musicasTitle?: string
  spotifyEmbedUrl?: string
  musicCopy?: string
  musicNote?: string
  videosEyebrow?: string
  videosTitle?: string
  fotosEyebrow?: string
  fotosTitle?: string
  imprensaEyebrow?: string
  imprensaTitle?: string
  contatoEyebrow?: string
  contatoTitle?: string
  whatsappButtonLabel?: string
}

export type Settings = {
  logoHeader?: MediaDoc | null
  footerMark?: MediaDoc | null
  siteTitle?: string
  siteDescription?: string
  ogImage?: MediaDoc | null
  instagramUrl?: string
  youtubeUrl?: string
  spotifyUrl?: string
  whatsappUrl?: string
  email?: string
  footerNote?: string
}

export type IntegranteDoc = { id: number | string; nome: string; funcao?: string | null; foto?: MediaDoc | null; playlistUrl?: string | null }
export type MusicaDoc = { id: number | string; titulo: string; linkUrl?: string | null }
export type VideoDoc = { id: number | string; titulo: string; subtitulo?: string | null; youtubeEmbedUrl: string }
export type FotoDoc = { id: number | string; imagem?: MediaDoc | null; alt?: string | null }
export type ImprensaDoc = { id: number | string; veiculo: string; manchete: string; linkUrl: string; thumb?: MediaDoc | null }
