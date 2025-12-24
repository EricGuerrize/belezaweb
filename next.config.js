/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Adicione aqui domínios específicos quando necessário
      // Exemplo:
      // {
      //   protocol: 'https',
      //   hostname: 'exemplo.com',
      // },
    ],
  },
}

module.exports = nextConfig

