import type { GlobalConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  admin: {
    group: 'Sistema',
    description: 'Logo, redes sociais e contato usados no cabeçalho e no rodapé.',
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Geral',
          fields: [
            {
              name: 'logoHeader',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (cabeçalho e topo do hero)',
              admin: { description: 'SVG ou PNG com fundo transparente, versão para fundo escuro.' },
            },
            {
              name: 'footerMark',
              type: 'upload',
              relationTo: 'media',
              label: 'Marca circular (rodapé)',
            },
            {
              name: 'siteTitle',
              type: 'text',
              label: 'Título do site',
              defaultValue: 'Cereja Bloom',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Descrição do site (SEO)',
              defaultValue: 'Cereja Bloom — indie rock de Laguna, SC. Ouça, assista e conheça a banda.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de compartilhamento',
              admin: { description: 'Aparece como preview ao compartilhar o link. Tamanho ideal: 2200x1467px.' },
            },
          ],
        },
        {
          label: 'Redes e contato',
          fields: [
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram',
              defaultValue: 'https://www.instagram.com/cerejabloom',
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube',
              defaultValue: 'https://www.youtube.com/watch?v=rRrJDs-5y3A',
            },
            {
              name: 'spotifyUrl',
              type: 'text',
              label: 'Spotify (perfil do artista)',
              defaultValue: 'https://open.spotify.com/intl-pt/artist/3ncaDAia7CJQooNn4XasjY',
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp',
              defaultValue: 'https://wa.me/554888422670',
            },
            {
              name: 'email',
              type: 'email',
              label: 'E-mail de contato',
              defaultValue: 'cerejabloomers@gmail.com',
            },
          ],
        },
        {
          label: 'Rodapé',
          fields: [
            {
              name: 'footerNote',
              type: 'text',
              label: 'Texto do rodapé',
              defaultValue: 'Cereja Bloom © 2026 — Laguna, SC',
            },
          ],
        },
      ],
    },
  ],
}
