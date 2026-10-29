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
    // Em produção, MEDIA_STATIC_DIR aponta pra uma pasta fora da pasta
    // versionada do build (que a Hostinger recria do zero a cada deploy),
    // pra imagens enviadas pelo admin sobreviverem a um novo `git push`.
    // Sem essa variável (dev local), cai na pasta do projeto como antes —
    // relativo a process.cwd(), e não a import.meta.url, porque o webpack
    // grava no build o caminho absoluto de onde compilou, e a Hostinger
    // compila numa pasta temporária e depois move o resultado.
    staticDir: process.env.MEDIA_STATIC_DIR || path.resolve(process.cwd(), 'public/media'),
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
