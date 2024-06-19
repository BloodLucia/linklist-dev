/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qussdqrgqitbluymkdvi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/uploads/**',
      },
    ],
  },
}

export default withPlaiceholder(nextConfig)
