import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://i.imgur.com/**'),
      new URL('https://um8fyckwqv.ufs.sh/f/**'),
    ]
  }
};
export default nextConfig;
