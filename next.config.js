/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // For static export
  output: 'export',
  // Optional: Add a trailing slash to all paths
  trailingSlash: true,
  // Optional: Change the output directory
  distDir: 'build',
  // Add environment variables that should be available at build time
  env: {
    REACT_APP_TMDB_BEARER: process.env.REACT_APP_TMDB_BEARER,
  },
  // Enable static HTML export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // Add other routes as needed
    };
  },
};

module.exports = nextConfig;
