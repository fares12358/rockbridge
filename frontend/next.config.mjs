/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Emits .next/standalone (a minimal server + only the deps it needs) so
  // the Docker image doesn't need to ship full node_modules.
  output: "standalone",
};

export default nextConfig;
