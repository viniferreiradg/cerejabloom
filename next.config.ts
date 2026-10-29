import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payload-config': path.resolve(process.cwd(), 'payload.config.ts'),
    }
    return config
  },
  // Links curtos que já estavam divulgados no site antigo (redes sociais,
  // bio do Spotify, etc.) — mantidos pra não quebrar o que já foi compartilhado.
  async redirects() {
    return [
      {
        source: '/mar-de-marmara',
        destination: 'https://ditto.fm/mar-de-marmara',
        permanent: false,
      },
      {
        source: '/presskit',
        destination:
          'https://drive.google.com/drive/folders/1YLFJCYAraAMsO8ciXwnYafeJr1R-mDuj?usp=drive_link',
        permanent: false,
      },
    ]
  },
}

export default withPayload(nextConfig)
