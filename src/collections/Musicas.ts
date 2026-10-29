import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const Musicas: CollectionConfig = {
  slug: 'musicas',
  labels: { singular: 'Música', plural: 'Músicas' },
  orderable: true,
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'linkUrl'],
    description: 'Os singles listados ao lado do player do Spotify.',
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título da música',
      required: true,
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link "Ouvir em todas as plataformas"',
      admin: { description: 'Ex: link do Ditto.fm ou similar.' },
    },
  ],
}
