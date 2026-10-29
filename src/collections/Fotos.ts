import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const Fotos: CollectionConfig = {
  slug: 'fotos',
  labels: { singular: 'Foto', plural: 'Fotos' },
  orderable: true,
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'alt',
    defaultColumns: ['imagem', 'alt'],
    description: 'Galeria de fotos da banda. A primeira foto aparece maior na grade.',
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
    },
  ],
}
