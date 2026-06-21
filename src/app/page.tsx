import type { Metadata } from 'next';
import { StaticHero } from '@/components/home';
import HomeSections from '@/components/home/HomeSections';

// Self-referencing canonical for the homepage (root metadata intentionally omits
// a global canonical to avoid every page claiming to be a duplicate of "/").
export const metadata: Metadata = {
  title: 'TEELI.NET — Fix & Render 3D Files Automatically',
  description:
    'Stop broken meshes and failed renders. Upload a 3D model to Teeli — it repairs geometry, previews in the browser, and renders in the cloud with Blender Cycles, automatically.',
  alternates: { canonical: '/' },
  openGraph: {
    url: 'https://teeli.net',
    title: 'TEELI.NET — Fix & Render 3D Files Automatically',
    description:
      'Upload a 3D model to Teeli — it repairs geometry, previews in the browser, and renders in the cloud with Blender Cycles, automatically.',
  },
};

// ============================================
// PERFORMANCE OPTIMIZED HOME PAGE
// ============================================
// Strategy:
// 1. StaticHero renders server-side for instant FCP (no "use client")
// 2. HomeSections is a client component that lazy loads everything else
// 3. Below-fold sections use IntersectionObserver for lazy loading
// 4. Footer only animates when visible
// ============================================

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-void text-starlight relative">
      {/* Hero - Server-rendered for instant display (FCP optimization) */}
      <StaticHero />
      
      {/* Client-side sections with lazy loading */}
      <HomeSections />
    </main>
  );
}

