import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

export const Integrantes: CollectionConfig = {
  slug: 'integrantes',
  labels: { singular: 'Integrante', plural: 'Integrantes' },
  orderable: true,
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'nome',
    defaultColumns: ['foto', 'nome', 'funcao'],
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      label: 'Nome',
      required: true,
    },
    {
      name: 'funcao',
      type: 'text',
      label: 'Função na banda',
      admin: { description: 'Ex: Vocal, Guitarra e backing vocal.' },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'playlistUrl',
      type: 'text',
      label: 'Link da playlist (Spotify)',
    },
  ],
}
