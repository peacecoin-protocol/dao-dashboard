/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'nftmedia.parallelnft.com',
      'avatars.githubusercontent.com',
      'api.github.com',
      'kite.mypinata.cloud',
      'peacecoin-dao.mypinata.cloud',
      'ipfs-dao-studio.peace-coin.org',
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      '@react-native-async-storage/async-storage': false,
    }

    config.externals.push('pino-pretty', 'lokijs', 'encoding')

    return config
  },
}

module.exports = nextConfig
