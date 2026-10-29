import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const Imprensa: CollectionConfig = {
  slug: 'imprensa',
  labels: { singular: 'Matéria de imprensa', plural: 'Imprensa' },
  orderable: true,
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'manchete',
    defaultColumns: ['thumb', 'veiculo', 'manchete'],
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'veiculo',
      type: 'text',
      label: 'Veículo',
      required: true,
      admin: { description: 'Ex: O Subsolo, Rifferama, RSC.' },
    },
    {
      name: 'manchete',
      type: 'text',
      label: 'Manchete / título da matéria',
      required: true,
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link da matéria',
      required: true,
    },
    {
      name: 'thumb',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de capa',
    },
  ],
}
