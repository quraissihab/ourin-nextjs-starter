/**
 * Site Configuration
 * Central configuration for the application
 */

export const siteConfig = {
  name: 'Ourin',
  description: 'Next.js 15 Boilerplate with Tailwind CSS 4 and shadcn/ui',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  
  // Links
  links: {
    github: 'https://github.com/LuckyArch/ourin-nextjs-starter',
    twitter: 'https://twitter.com/LuckyArch',
    docs: '/docs',
  },
  
  // Creator info
  creator: {
    name: 'Fauzan Adyatma P',
    username: 'LuckyArch',
    url: 'https://github.com/LuckyArch',
  },
  
  // SEO defaults
  seo: {
    titleTemplate: '%s | Ourin',
    defaultTitle: 'Ourin - Next.js Boilerplate',
    defaultDescription:
      'A modern Next.js 15 boilerplate with Tailwind CSS 4, shadcn/ui, and comprehensive utilities.',
    keywords: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'shadcn/ui',
      'TypeScript',
      'Boilerplate',
    ],
  },
  
  // Theme configuration
  theme: {
    defaultTheme: 'system' as const,
    themes: ['light', 'dark', 'system'] as const,
  },
  
  // Localization
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
} as const;

export type SiteConfig = typeof siteConfig;

