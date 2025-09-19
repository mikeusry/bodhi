// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Production site URL
  site: 'https://highlands-rental.com',

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize for production
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Optimize chunk splitting
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  },

  // Technical SEO optimizations
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    // Generate sitemap
    sitemap: true
  },


  // Image optimization
  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },

  // SEO-friendly URL structure
  trailingSlash: 'never',

  // Production optimizations
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});