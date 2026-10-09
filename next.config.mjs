/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Creative media is served from public; the project pages are generated at build time.
  outputFileTracingExcludes: {
    '/*': ['./public/media/creative/**/*']
  }
};

export default nextConfig;
