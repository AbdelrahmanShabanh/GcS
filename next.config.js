/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Use an alternative build directory to avoid OneDrive sync locks on .next
  distDir: "build",
};

module.exports = nextConfig;
