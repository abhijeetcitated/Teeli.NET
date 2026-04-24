import { StaticHero } from '@/components/home';
import HomeSections from '@/components/home/HomeSections';

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

