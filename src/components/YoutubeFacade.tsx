'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { extractYoutubeId, toYoutubeEmbedUrl } from '@/lib/youtube'

// Mostra só a thumbnail do vídeo com um botão de play por cima; ao clicar,
// abre o vídeo num modal com o fundo escurecido. Fechar o modal remove o
// iframe do DOM, o que para a reprodução.
export default function YoutubeFacade({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false)
  const id = extractYoutubeId(url)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="video-facade"
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
        aria-label={`Assistir: ${title}`}
        onClick={() => setOpen(true)}
        disabled={!id}
      >
        <span className="video-facade-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M8 5v14l11-7Z" />
          </svg>
        </span>
      </button>

      {open &&
        id &&
        createPortal(
          <div className="video-modal-backdrop" onClick={() => setOpen(false)}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="video-modal-close"
                aria-label="Fechar vídeo"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <div className="video-frame">
                <iframe
                  src={`${toYoutubeEmbedUrl(url)}?autoplay=1`}
                  title={title}
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
