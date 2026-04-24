"use client";

import dynamic from 'next/dynamic';
import { OptimizedSection } from '@/components/home';

// ============================================
// CLIENT-SIDE SECTIONS LOADER
// ============================================
// This component handles all the dynamic imports with ssr: false
// Since page.tsx is now a Server Component, we need this wrapper
// ============================================

// Navbar - Optimized version with CSS animations instead of Framer Motion
const FloatingNavbar = dynamic(() => import('@/components/FloatingNavbarOptimized'), {
  ssr: false,
  loading: () => null
});

// Lazy load sections - only load JS when section is about to be visible
const ProblemSection = dynamic(() => import('@/components/home/ProblemSection'), {
  ssr: false
});

const CorePromiseSection = dynamic(() => import('@/components/home/CorePromiseSection'), {
  ssr: false
});

const HeroFeaturesSection = dynamic(() => import('@/components/home/HeroFeaturesSection'), {
  ssr: false
});

const TechEnginesSection = dynamic(() => import('@/components/home/TechEnginesSection'), {
  ssr: false
});

const HowItWorksSection = dynamic(() => import('@/components/home/HowItWorksSection'), {
  ssr: false
});

const PricingSection = dynamic(() => import('@/components/home/PricingSection'), {
  ssr: false
});

const TrustProofSection = dynamic(() => import('@/components/home/TrustProofSection'), {
  ssr: false
});

const RoadmapSection = dynamic(() => import('@/components/home/RoadmapSection'), {
  ssr: false
});

const FinalCTASection = dynamic(() => import('@/components/home/FinalCTASection'), {
  ssr: false
});

// Footer with optimized interval
const Footer = dynamic(() => import('@/components/FooterOptimized'), {
  ssr: false
});

export default function HomeSections() {
  return (
    <>
      {/* Navbar - client-side for interactions */}
      <FloatingNavbar />
      
      {/* Below-fold content - Lazy loaded with intersection observer */}
      <OptimizedSection id="problem">
        <ProblemSection />
      </OptimizedSection>
      
      <OptimizedSection id="promise">
        <CorePromiseSection />
      </OptimizedSection>
      
      <OptimizedSection id="features">
        <HeroFeaturesSection />
      </OptimizedSection>
      
      <OptimizedSection id="tech">
        <TechEnginesSection />
      </OptimizedSection>
      
      <OptimizedSection id="how-it-works">
        <HowItWorksSection />
      </OptimizedSection>
      
      <OptimizedSection id="pricing">
        <PricingSection />
      </OptimizedSection>
      
      <OptimizedSection id="trust">
        <TrustProofSection />
      </OptimizedSection>
      
      <OptimizedSection id="roadmap">
        <RoadmapSection />
      </OptimizedSection>
      
      <OptimizedSection id="cta">
        <FinalCTASection />
      </OptimizedSection>
      
      <Footer />
    </>
  );
}
