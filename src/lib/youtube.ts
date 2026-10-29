// Aceita qualquer link comum do YouTube (assistir, compartilhar, shorts ou já
// embed) e devolve o ID do vídeo. Links de "assistir" normais são bloqueados
// pelo YouTube dentro de um iframe, por isso a necessidade de extrair o ID.
export function extractYoutubeId(url: string): string {
  if (!url) return ''

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return ''
  }

  const host = parsed.hostname.replace(/^www\.|^m\.|^music\./, '')
  let id = ''

  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1)
  } else if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v') || ''
    } else if (parsed.pathname.startsWith('/embed/')) {
      id = parsed.pathname.slice('/embed/'.length)
    } else if (parsed.pathname.startsWith('/shorts/')) {
      id = parsed.pathname.slice('/shorts/'.length)
    }
  }

  return id.split('/')[0]
}

export function toYoutubeEmbedUrl(url: string): string {
  const id = extractYoutubeId(url)
  return id ? `https://www.youtube.com/embed/${id}` : url
}
