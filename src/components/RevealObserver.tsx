'use client'

import { useEffect } from 'react'

// Efeito de "ir aparecendo" ao rolar: marca com a classe is-visible cada
// elemento com data-reveal, quando ele entra na tela (ver globals.css).
// Sem JavaScript ou sem IntersectionObserver, tudo aparece normal.
export default function RevealObserver() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || !revealEls.length) {
      revealEls.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    revealEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
