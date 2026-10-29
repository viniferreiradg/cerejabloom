import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídias' },
  admin: {
    group: 'Sistema',
  },
  access: {
    read: () => true,
  },
  upload: {
    // Relativo à pasta do projeto em execução, e não a import.meta.url: o
    // webpack grava no build o caminho absoluto de onde compilou, e a
    // Hostinger compila numa pasta temporária e depois move o resultado
    staticDir: path.resolve(process.cwd(), 'public/media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 2200, height: 1467, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: { quality: 92 },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      admin: {
        description: 'Descreve a imagem para leitores de tela e buscadores.',
      },
    },
  ],
}
