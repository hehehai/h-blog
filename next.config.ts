import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'user-images.githubusercontent.com',
      },
    ],
  },
};

export default withContentCollections(nextConfig);
