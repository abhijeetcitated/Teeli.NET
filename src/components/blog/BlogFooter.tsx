"use client";

import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { LINKEDIN_COMPANY_URL } from '@/lib/social-links';

// Inline SVGs for brand icons (removed from lucide-react v1+)
const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function BlogFooter({ forceDark = false }: { forceDark?: boolean }) {
  const { theme } = useBlogTheme();
  const effectiveTheme = forceDark ? 'dark' : theme;

  return (
    <footer className={`relative w-full border-t overflow-hidden transition-colors duration-300 ${
      effectiveTheme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-200'
    }`}>
      {/* Fine Line Grid Background */}
      <div className={`absolute inset-0 ${effectiveTheme === 'dark' ? 'opacity-10' : 'opacity-5'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: effectiveTheme === 'dark'
            ? 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-heading text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              TEELI.NET
            </div>
            <p className={`text-sm text-center md:text-left ${effectiveTheme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Redefining 3D rendering with AI + Quantum Intelligence
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className={`font-semibold mb-4 text-center md:text-left ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Links</div>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
              <Link href="/company/about" className={`transition-colors text-sm ${
                effectiveTheme === 'dark' ? 'text-zinc-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
              }`}>About</Link>
              <Link href="/blog/about" className={`transition-colors text-sm ${
                effectiveTheme === 'dark' ? 'text-zinc-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
              }`}>Blog About</Link>
              <Link href="/privacy" className={`transition-colors text-sm ${
                effectiveTheme === 'dark' ? 'text-zinc-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
              }`}>Privacy</Link>
              <Link href="/contact" className={`transition-colors text-sm ${
                effectiveTheme === 'dark' ? 'text-zinc-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'
              }`}>Contact</Link>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className={`font-semibold mb-4 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Meet Us</div>
            <div className="flex gap-4">
              <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                effectiveTheme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-blue-500 hover:bg-blue-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-blue-500 hover:bg-blue-50'
              }`}>
                <Linkedin className={`w-5 h-5 transition-colors ${
                  effectiveTheme === 'dark' ? 'text-zinc-300 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
                }`} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 ${effectiveTheme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className={`text-xs ${effectiveTheme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              © 2026 TEELI.NET. All rights reserved.
            </div>
            <div className={`flex gap-6 text-xs ${effectiveTheme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              <Link href="/terms" className={`transition-colors ${effectiveTheme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-cyan-600'}`}>Terms of Service</Link>
              <Link href="/cookies" className={`transition-colors ${effectiveTheme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-cyan-600'}`}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
