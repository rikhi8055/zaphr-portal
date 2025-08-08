import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  webpack: (config) => {
    // Force @ alias to project root so imports like "@/components/ui" work in build
    config.resolve.alias['@'] = path.resolve(process.cwd())
    return config
  },
}

export default nextConfig
