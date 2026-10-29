import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Integrantes } from './src/collections/Integrantes'
import { Musicas } from './src/collections/Musicas'
import { Videos } from './src/collections/Videos'
import { Fotos } from './src/collections/Fotos'
import { Imprensa } from './src/collections/Imprensa'
import { Landing } from './src/globals/Landing'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Produção usa Postgres (igual ao portfolio/joycombo). Sem DATABASE_URI de
// Postgres, cai num arquivo SQLite local, para rodar o projeto sem instalar banco.
const databaseUri = process.env.DATABASE_URI || ''
const db = databaseUri.startsWith('postgres')
  ? postgresAdapter({ pool: { connectionString: databaseUri } })
  : sqliteAdapter({ client: { url: databaseUri || 'file:./cerejabloom.db' } })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Cereja Bloom',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon/favicon.svg' }],
    },
    // Site ao lado do formulário, recarregado a cada "Salvar"
    livePreview: {
      globals: ['landing'],
      url: () => process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminLogo#AdminIcon',
      },
    },
  },
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  // A ordem aqui define a ordem dos grupos no menu do admin
  collections: [Integrantes, Musicas, Videos, Fotos, Imprensa, Media, Users],
  globals: [Landing, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'cerejabloom-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
})
