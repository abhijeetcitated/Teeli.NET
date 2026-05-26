'use client';

import { memo } from 'react';
import Link from 'next/link';
import { LINKEDIN_COMPANY_URL } from '@/lib/social-links';

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Footer = memo(function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black transition-colors duration-300">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-heading mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
              TEELI.NET
            </div>
            <p className="text-center text-sm text-zinc-400 md:text-left">
              Redefining 3D rendering with AI + Quantum Intelligence
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 text-center font-semibold text-white md:text-left">Quick Links</div>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-6">
              <Link href="/company/about" className="text-sm text-zinc-400 transition-colors hover:text-cyan-400">About</Link>
              <Link href="/blog/about" className="text-sm text-zinc-400 transition-colors hover:text-purple-400">Blog About</Link>
              <Link href="/privacy" className="text-sm text-zinc-400 transition-colors hover:text-purple-400">Privacy</Link>
              <Link href="/contact" className="text-sm text-zinc-400 transition-colors hover:text-pink-400">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="mb-4 font-semibold text-white">Meet Us</div>
            <div className="flex gap-4">
              <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-blue-500 hover:bg-blue-500/10">
                <Linkedin className="h-5 w-5 text-zinc-300 transition-colors group-hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="text-xs text-zinc-500">
              &copy; 2026 TEELI.NET. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-zinc-500">
              <Link href="/terms" className="transition-colors hover:text-cyan-400">Terms of Service</Link>
              <Link href="/cookies" className="transition-colors hover:text-cyan-400">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
