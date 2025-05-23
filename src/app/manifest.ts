import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hehehai - Blog',
    short_name: 'Hehehai',
    description:
      'Hehehai @一块木头 - 全栈开发，专注于前端应用程序和和用户界面设计.',
    icons: [
      {
        src: '/icons/icon_x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icons/icon_x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icons/icon_x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#000000',
    background_color: '#FFFFFF',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
  };
}
