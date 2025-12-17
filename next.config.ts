import { routing } from './i18n/routing';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Add any other Next.js config options here
};

export default withNextIntl(nextConfig);
