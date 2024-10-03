/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'images.unsplash.com' }, { hostname: 'cdni.iconscout.com' }]
  },
};

export default nextConfig;
