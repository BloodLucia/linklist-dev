/** @type {import('next').NextConfig} */
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

export default nextConfig
