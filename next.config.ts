import type { NextConfig } from "next";
// @ts-expect-error: No declaration file for module
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://i.imgur.com/**'),
      new URL('https://um8fyckwqv.ufs.sh/f/**'),
    ]
  },
  webpack: (config, { isServer }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    if (isServer) config.plugins = [...config.plugins, new PrismaPlugin()]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },
};
export default nextConfig;
