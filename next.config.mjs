/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'res.cloudinary.com', port: ''},
      {protocol: 'https', hostname: 'lh3.googleusercontent.com', port: ''}
    ]
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  }
};

export default nextConfig;
