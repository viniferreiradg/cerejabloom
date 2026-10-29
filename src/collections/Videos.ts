import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: { singular: 'Vídeo', plural: 'Vídeos' },
  orderable: true,
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'subtitulo'],
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'subtitulo',
      type: 'text',
      label: 'Subtítulo',
      defaultValue: 'Clipe oficial',
    },
    {
      name: 'youtubeEmbedUrl',
      type: 'text',
      label: 'Link do YouTube',
      admin: { description: 'Cole o link do vídeo no YouTube (de assistir, compartilhar ou embed) — qualquer formato funciona.' },
      required: true,
    },
  ],
}
