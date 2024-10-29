/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.output.assetModuleFilename = 'static/[hash][ext]'
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })
    return config
  },
  async headers() {
    return [
      {
        source: '/unity/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig