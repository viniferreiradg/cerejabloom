// Popula o banco com o conteúdo atual do site (seed-assets/ tem as imagens
// originais do site estático). Rodar com `npm run seed`. Pode rodar de novo:
// cada bloco só cria o que ainda não existe, exceto os globals, que são
// sempre atualizados com os ids de mídia mais recentes.
import path from 'path'
import { getPayload } from 'payload'
import config from '../../payload.config'

const assets = (name: string) => path.resolve(process.cwd(), 'seed-assets', name)

async function findOrCreateMedia(payload: Awaited<ReturnType<typeof getPayload>>, filename: string, alt: string) {
  const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({ collection: 'media', data: { alt }, filePath: assets(filename) })
}

async function main() {
  const payload = await getPayload({ config })

  const [
    heroImage,
    logoHeader,
    footerMark,
    fotoVanessa,
    fotoMatheus,
    fotoFranciellen,
    fotoHyuri,
    fotoVinicios,
    galeriaVocal,
    galeriaEstufa,
    galeriaKeys,
    galeriaCarro,
    imprensaSubsolo,
    imprensaRifferama,
    imprensaRsc,
  ] = await Promise.all([
    findOrCreateMedia(payload, 'hero-band-carro.jpg', 'Cereja Bloom em ensaio noturno'),
    findOrCreateMedia(payload, 'logo-horizontal-fundo-escuro.svg', 'Cereja Bloom'),
    findOrCreateMedia(payload, 'cereja-circulo.svg', 'Cereja Bloom'),
    findOrCreateMedia(payload, 'integrante-vanessa.jpg', 'Vanessa'),
    findOrCreateMedia(payload, 'integrante-matheus.jpg', 'Matheus'),
    findOrCreateMedia(payload, 'integrante-franciellen.jpg', 'Franciellen'),
    findOrCreateMedia(payload, 'integrante-hyuri.jpg', 'Hyuri'),
    findOrCreateMedia(payload, 'integrante-vinicios.jpg', 'Vinicios'),
    findOrCreateMedia(payload, 'galeria-vocal-vermelho.jpg', 'Vocalista da Cereja Bloom'),
    findOrCreateMedia(payload, 'galeria-estufa.jpg', 'Cereja Bloom tocando ao vivo'),
    findOrCreateMedia(payload, 'galeria-keys-close.jpg', 'Detalhe do teclado da Cereja Bloom'),
    findOrCreateMedia(payload, 'galeria-carro-oculos.jpg', 'Vanessa no carro durante o ensaio'),
    findOrCreateMedia(payload, 'imprensa-subsolo.webp', 'O Subsolo'),
    findOrCreateMedia(payload, 'imprensa-rifferama.webp', 'Rifferama'),
    findOrCreateMedia(payload, 'imprensa-rsc.webp', 'RSC'),
  ])

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logoHeader: logoHeader.id,
      footerMark: footerMark.id,
      ogImage: heroImage.id,
    },
  })

  await payload.updateGlobal({
    slug: 'landing',
    data: {
      heroImage: heroImage.id,
      ctaPrimaryUrl: 'https://open.spotify.com/intl-pt/album/1ebdDEzSK9Np7iVtZJYgtn?si=LA-pCc0FTcGAcUqmJTtAgA',
      ctaSecondaryUrl: 'https://www.youtube.com/watch?v=fVKWRBF5thk',
    },
  })

  const integrantes = [
    { nome: 'chovvve', funcao: 'Vocal', foto: fotoVanessa.id, playlistUrl: 'https://open.spotify.com/playlist/3LdJ8OINhMbKCTslsMSjRJ?si=5d365b12bcf741cf' },
    { nome: 'Matheus', funcao: 'Guitarra e backing vocal', foto: fotoMatheus.id, playlistUrl: 'https://open.spotify.com/playlist/557u1Wqst47MLnEIIWBWid?si=b43d7cf772ed4e64' },
    { nome: 'Franciellen', funcao: 'Baixo e backing vocal', foto: fotoFranciellen.id, playlistUrl: 'https://open.spotify.com/playlist/2TLdqUU92E06L3cm47XBm6?si=3e97b341c5cd44cf' },
    { nome: 'Hyuri', funcao: 'Teclado e órgão', foto: fotoHyuri.id, playlistUrl: 'https://open.spotify.com/playlist/3p1xlcXChaJSFbQO2Ql4CE?si=1ba66af2cabf4b6c' },
    { nome: 'Vinicios', funcao: 'Bateria', foto: fotoVinicios.id, playlistUrl: 'https://open.spotify.com/playlist/4xjjg1loQ0enB4kyxEXjXJ?si=e4e99b0478354021' },
  ]
  for (const data of integrantes) {
    const existing = await payload.find({ collection: 'integrantes', where: { nome: { equals: data.nome } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'integrantes', data })
  }

  const musicas = [
    { titulo: 'Desaforo', linkUrl: 'https://ditto.fm/desaforo-cereja-bloom' },
    { titulo: 'Souvenir', linkUrl: 'https://ditto.fm/souvenir-cereja-bloom' },
    { titulo: 'Mar de Mármara', linkUrl: 'https://ditto.fm/mar-de-marmara' },
  ]
  for (const data of musicas) {
    const existing = await payload.find({ collection: 'musicas', where: { titulo: { equals: data.titulo } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'musicas', data })
  }

  const videos = [
    { titulo: 'Desaforo', subtitulo: 'Clipe oficial', youtubeEmbedUrl: 'https://www.youtube.com/embed/rRrJDs-5y3A' },
    { titulo: 'Souvenir', subtitulo: 'Clipe oficial', youtubeEmbedUrl: 'https://www.youtube.com/embed/fVKWRBF5thk' },
  ]
  for (const data of videos) {
    const existing = await payload.find({ collection: 'videos', where: { titulo: { equals: data.titulo } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'videos', data })
  }

  const fotos = [
    { imagem: heroImage.id, alt: 'Cereja Bloom em ensaio noturno' },
    { imagem: galeriaVocal.id, alt: 'Vocalista da Cereja Bloom' },
    { imagem: galeriaEstufa.id, alt: 'Cereja Bloom tocando ao vivo' },
    { imagem: galeriaKeys.id, alt: 'Detalhe do teclado da Cereja Bloom' },
    { imagem: galeriaCarro.id, alt: 'Vanessa no carro durante o ensaio' },
  ]
  const existingFotos = await payload.find({ collection: 'fotos', limit: 100 })
  if (!existingFotos.docs.length) {
    for (const data of fotos) await payload.create({ collection: 'fotos', data })
  }

  const imprensa = [
    { veiculo: 'O Subsolo', manchete: 'Cereja Bloom mistura indie e rock em estreia com o single "Desaforo"', linkUrl: 'https://osubsolo.com/cereja-bloom-mistura-indie-e-rock-em-estreia-com-o-single-desaforo/', thumb: imprensaSubsolo.id },
    { veiculo: 'Rifferama', manchete: 'Cereja Bloom estreia com indie psicodélico e planeja EP', linkUrl: 'https://rifferama.com/cereja-bloom-estreia-com-indie-psicodelico-e-planeja-ep/', thumb: imprensaRifferama.id },
    { veiculo: 'RSC', manchete: 'Cereja Bloom: banda lança primeiro single "Desaforo"', linkUrl: 'https://rscportal.com.br/entretenimento/cereja-bloom-banda-imbitubense-lanca-primeiro-single-desaforo.15451224', thumb: imprensaRsc.id },
  ]
  for (const data of imprensa) {
    const existing = await payload.find({ collection: 'imprensa', where: { veiculo: { equals: data.veiculo } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'imprensa', data })
  }

  console.log('Seed concluído.')
}

// `payload run` só espera o import() do módulo: sem top-level await, o
// processo é encerrado (process.exit(0)) antes do main() terminar.
await main()
