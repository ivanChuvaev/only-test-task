import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(import.meta.dirname, 'src/shared/styles')],
    additionalData: `@use "src/shared/styles/helpers" as *;`,
  },
};

export default nextConfig;
