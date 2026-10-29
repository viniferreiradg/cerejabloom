'use client'

import { useEffect } from 'react'

// Dá fundo opaco ao header depois de rolar 40px (ver globals.css .is-scrolled).
export default function HeaderScroll() {
  useEffect(() => {
    const header = document.getElementById('siteHeader')
    if (!header) return
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
