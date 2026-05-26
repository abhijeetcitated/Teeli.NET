"use client";

import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

// Inline SVGs for brand icons (removed from lucide-react v1+)
const Twitter = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
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
            <div className={`font-semibold mb-4 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Follow Us</div>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                effectiveTheme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-cyan-500 hover:bg-cyan-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-cyan-500 hover:bg-cyan-50'
              }`}>
                <Twitter className={`w-5 h-5 transition-colors ${
                  effectiveTheme === 'dark' ? 'text-zinc-300 group-hover:text-cyan-400' : 'text-gray-600 group-hover:text-cyan-600'
                }`} />
              </a>
              <a href="#" aria-label="LinkedIn" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                effectiveTheme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-blue-500 hover:bg-blue-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-blue-500 hover:bg-blue-50'
              }`}>
                <Linkedin className={`w-5 h-5 transition-colors ${
                  effectiveTheme === 'dark' ? 'text-zinc-300 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
                }`} />
              </a>
              <a href="#" aria-label="Instagram" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                effectiveTheme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-pink-500 hover:bg-pink-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-pink-500 hover:bg-pink-50'
              }`}>
                <Instagram className={`w-5 h-5 transition-colors ${
                  effectiveTheme === 'dark' ? 'text-zinc-300 group-hover:text-pink-400' : 'text-gray-600 group-hover:text-pink-600'
                }`} />
              </a>
              <a href="#" aria-label="GitHub" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                effectiveTheme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-purple-500 hover:bg-purple-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-purple-500 hover:bg-purple-50'
              }`}>
                <Github className={`w-5 h-5 transition-colors ${
                  effectiveTheme === 'dark' ? 'text-zinc-300 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'
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
