import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance-optimized config */
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better error detection
  
  // Image optimization for performance
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF first (30% smaller than WebP)
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    disableStaticImages: false,
    minimumCacheTTL: 31536000, // 1 year for aggressive caching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'download.blender.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.unrealengine.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
      {
        protocol: 'https',
        hostname: 'www.chaos.com',
      },
      {
        protocol: 'https',
        hostname: 'corona-renderer.com',
      },
      {
        protocol: 'https',
        hostname: 'home.otoy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.adobe.com',
      },
      {
        protocol: 'https',
        hostname: 'pixologic.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    domains: [],
    // Performance: Custom quality settings for optimized images
    qualities: [50, 55, 60, 65], // Reduced: 50 (hero), 55, 60, 65
  },
  
  // Aggressive caching headers for static assets
  async headers() {
    return [
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/blog-images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/illustrations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Performance: Optimize package imports and code splitting
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion',
      'react',
      'react-dom',
      '@vercel/analytics'
    ],
    optimizeCss: true, // Optimize CSS during production build
    webpackBuildWorker: true, // Enable parallel webpack builds
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // 🎯 FIX #4: Modern browser target (removes polyfills)
  // Browserslist in package.json targets modern browsers (ES2020+)
  // Excludes: IE11, Safari < 14, Chrome < 87
  // Impact: -10-15KB bundle size, +2-5 performance points
  
  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    resolveAlias: {
      // Optimize Three.js imports for Turbopack
      'three': 'three/build/three.module.js',
    },
  },
  
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;
