/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      // MinIO storage - protocol and hostname determined by MINIO_USE_SSL and MINIO_ENDPOINT
      {
        protocol: 'https',
        hostname: '**', // Allow all hostnames for MinIO
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all hostnames for MinIO (development)
      },
    ],
  },
}

export default nextConfig
