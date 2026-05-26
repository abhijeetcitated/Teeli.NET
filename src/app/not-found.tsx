import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './not-found.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="nf-page">

        {/* ═══════════════════════════════════════════
            LAYER 1: Ambient Background Glow
            — Subtle, cinematic light that breathes
            ═══════════════════════════════════════════ */}
        <div className="nf-ambient">
          <div className="nf-glow-1" />
          <div className="nf-glow-2" />
          <div className="nf-glow-3" />
        </div>

        {/* Noise texture for depth */}
        <div className="nf-noise" />

        {/* Figma-style grid lines (barely visible) */}
        <div className="nf-grid" />

        {/* Floating particles — very subtle */}
        <div className="nf-particles">
          <div className="nf-particle nf-p1" />
          <div className="nf-particle nf-p2" />
          <div className="nf-particle nf-p3" />
          <div className="nf-particle nf-p4" />
          <div className="nf-particle nf-p5" />
        </div>

        {/* ═══════════════════════════════════════════
            LAYER 2: Main Content — Apple-style centered
            ═══════════════════════════════════════════ */}
        <div className="nf-main">

          {/* Hero Visual — Midjourney-quality centerpiece */}
          <div className="nf-visual">
            <div className="nf-visual-flare" />
            <Image
              src="/illustrations/404-void-sculpture.png"
              alt="An ethereal crystalline sculpture dissolving into light — you've found the void"
              width={420}
              height={420}
              sizes="(max-width: 480px) 260px, (max-width: 640px) 320px, (max-width: 768px) 380px, 420px"
              className="nf-visual-img"
              priority
            />
            <div className="nf-visual-ring" />
          </div>

          {/* Error Code Badge */}
          <div className="nf-code">
            <div className="nf-code-dot" />
            <span className="nf-code-text">404 — Page not found</span>
          </div>

          {/* Heading */}
          <h1 className="nf-heading">
            Nothing <span className="nf-heading-gradient">here</span>.
          </h1>

          {/* Description */}
          <p className="nf-desc">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* CTA Buttons */}
          <div className="nf-actions">
            <Link href="/">
              <button className="nf-btn-primary" type="button">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Go Home
                </span>
              </button>
            </Link>

            <Link href="/blog">
              <button className="nf-btn-secondary" type="button">
                Read Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Subtle divider */}
          <div className="nf-divider" />

          {/* Quick nav links */}
          <nav className="nf-nav">
            <Link href="/solutions/ai-rendering" className="nf-nav-link">Solutions</Link>
            <div className="nf-nav-sep" />
            <Link href="/technology/rendering-engine" className="nf-nav-link">Technology</Link>
            <div className="nf-nav-sep" />
            <Link href="/contact" className="nf-nav-link">Contact</Link>
          </nav>

        </div>
      </main>
      <Footer />
    </>
  );
}
