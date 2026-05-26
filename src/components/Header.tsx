"use client";

import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  headerNavItems as navItems,
  hiddenNavItems,
  dropdownItems,
  getVisibleDropdownItems,
  getNavLink,
} from '@/lib/site-nav';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const statsSection = document.getElementById('stats-section');
          const statsSectionTop = statsSection?.offsetTop || viewportHeight * 2;
          
          // Hide header when scrolling down in section 2, show when entering section 3
          if (currentScrollY >= statsSectionTop - 100) {
            // Entering or in section 3 - show header
            setHidden(false);
          } else if (currentScrollY > lastScrollY && currentScrollY > viewportHeight * 0.5) {
            // Scrolling down in section 2 - hide header
            setHidden(true);
          } else {
            // Scrolling up - show header
            setHidden(false);
          }
          
          setScrolled(currentScrollY > 50);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasDropdown = (item: string) => {
    return Object.keys(dropdownItems).includes(item);
  };

  const isSectionActive = (item: string) => {
    if (!hasDropdown(item)) return pathname === getNavLink(item);
    return dropdownItems[item]?.some(
      (sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)
    );
  };

  const navLabelClass = (item: string) =>
    `flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-default select-none pointer-events-none ${
      isSectionActive(item)
        ? 'text-white bg-white/10'
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    }`;

  const blockNavClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
      mounted && scrolled ? 'py-2' : 'py-4'
    } ${
      mounted && hidden ? '-translate-y-full' : 'translate-y-0'
    }`} style={{ willChange: 'transform' }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`relative flex items-center justify-between rounded-2xl transition-all duration-300 ${
          mounted && scrolled
            ? 'bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl py-3 px-6' 
            : 'bg-black/60 backdrop-blur-md border border-white/5 py-4 px-6'
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="text-2xl font-black bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TEELI
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.filter((item) => !hiddenNavItems.has(item)).map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => hasDropdown(item) && setOpenDropdown(item)}
                onMouseLeave={() => setOpenDropdown(null)}
                onClick={hasDropdown(item) ? blockNavClick : undefined}
                onMouseDown={hasDropdown(item) ? blockNavClick : undefined}
              >
                {hasDropdown(item) ? (
                  <div aria-haspopup="true" aria-expanded={openDropdown === item}>
                    <span className={navLabelClass(item)}>
                      {item}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === item ? 'rotate-180' : ''}`} />
                    </span>
                    
                    <AnimatePresence>
                      {openDropdown === item && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-1.5 shadow-xl"
                        >
                          {getVisibleDropdownItems(item).map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="flex items-center justify-between px-3 py-2.5 text-sm text-zinc-400 rounded-lg hover:text-white hover:bg-white/10 transition-all group"
                            >
                              <span>{subItem.label}</span>
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={getNavLink(item)}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      pathname === getNavLink(item)
                        ? 'text-white bg-white/10'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-0 right-0 w-80 h-screen bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-black bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    TEELI
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-1 mb-8">
                  {navItems.filter((item) => !hiddenNavItems.has(item)).map((item) => (
                    <div key={item}>
                      {hasDropdown(item) ? (
                        <div>
                          <span className={`${navLabelClass(item)} w-full justify-between`}>
                            {item}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </span>

                          <div className="pl-4 py-2 space-y-1">
                            {getVisibleDropdownItems(item).map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={toggleMenu}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                              >
                                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={getNavLink(item)}
                          onClick={toggleMenu}
                          className="block px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          {item}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
