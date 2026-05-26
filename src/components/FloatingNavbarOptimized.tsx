"use client";

import { useState, useEffect, useCallback, memo, type MouseEvent } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: "Solutions" },
  { label: "Technology" },
  { label: "Projects" },
  { label: "Insights" },
  { label: "Company" },
  { label: "GreenChain", href: "/solutions/sustainability" },
];

const hiddenNavItems = new Set(["Projects"]);

const hiddenDropdownHrefs: Record<string, Set<string>> = {
  Company: new Set(["/company/team", "/company/careers"]),
  Insights: new Set(["/insights/reports", "/insights/press"]),
};

const dropdownItems: Record<string, { label: string; href: string; description?: string }[]> = {
  "Solutions": [
    { label: "AI Rendering", href: "/solutions/ai-rendering", description: "Neural-powered render optimization" },
    { label: "Image → 3D", href: "/solutions/image-to-3d", description: "Convert photos to 3D models" },
    { label: "Cloud GPU", href: "/solutions/cloud-gpu", description: "Distributed GPU infrastructure" },
    { label: "Virtual Production", href: "/solutions/virtual-production", description: "Real-time visualization" },
    { label: "Sustainability", href: "/solutions/sustainability", description: "Carbon-neutral rendering" },
  ],
  "Technology": [
    { label: "Rendering Engine", href: "/technology/rendering-engine", description: "Core rendering pipeline" },
    { label: "AI & ML Stack", href: "/technology/ai-ml", description: "Machine learning infrastructure" },
    { label: "Multi-Cloud", href: "/technology/multi-cloud", description: "AWS, GCP, Azure integration" },
    { label: "Research", href: "/technology/research", description: "Innovation & R&D" },
  ],
  "Projects": [
    { label: "Case Studies", href: "/projects/case-studies", description: "Client success stories" },
    { label: "Showreel", href: "/projects/showreel", description: "Portfolio gallery" },
    { label: "Interactive Viewer", href: "/projects/viewer", description: "3D model explorer" },
  ],
  "Insights": [
    { label: "Blog", href: "/blog", description: "Latest articles & tutorials" },
    { label: "Industry Reports", href: "/insights/reports", description: "Research & analysis" },
    { label: "Press & News", href: "/insights/press", description: "Media coverage" },
  ],
  "Company": [
    { label: "About Us", href: "/company/about", description: "Our story & mission" },
    { label: "Team", href: "/company/team", description: "Meet the team" },
    { label: "Careers", href: "/company/careers", description: "Join us" },
    { label: "Contact", href: "/contact", description: "Get in touch" },
  ],
};

const getVisibleDropdownItems = (section: string) =>
  dropdownItems[section]?.filter((sub) => !hiddenDropdownHrefs[section]?.has(sub.href)) ?? [];

// Static Logo - No animation overhead
const StaticLogo = memo(function StaticLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 pl-4 pr-3 py-1 group">
      <div className="relative flex items-center gap-3">
        {/* Simple CSS-animated logo instead of Framer Motion */}
        <div className="relative w-10 h-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <ellipse
              cx="50" cy="50" rx="35" ry="12"
              fill="none"
              stroke="url(#nav-gradient)"
              strokeWidth="3"
              className="animate-spin-slow origin-center"
            />
            <circle cx="50" cy="50" r="6" fill="url(#nav-gradient)" />
            <circle cx="50" cy="50" r="3" fill="white" opacity="0.8" />
          </svg>
        </div>
        
        {/* Text Logo */}
        <div className="relative hidden sm:block">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-50 to-blue-100 bg-clip-text text-transparent">
            TEELI
          </span>
          <span className="text-xl font-light bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">.NET</span>
        </div>
      </div>
    </Link>
  );
});

// Optimized FloatingNavbar - Reduced animations, passive scroll listener
export default function FloatingNavbarOptimized() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsAtTop(currentScrollY < 50);
        
        // Only hide/show based on scroll direction when not at top
        if (currentScrollY > 100) {
          setIsHidden(currentScrollY > lastScrollY);
        } else {
          setIsHidden(false);
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasDropdown = useCallback((label: string) => Object.keys(dropdownItems).includes(label), []);

  const isSectionActive = useCallback((label: string) => {
    if (!hasDropdown(label)) {
      const item = navItems.find((nav) => nav.label === label);
      return item?.href ? pathname?.startsWith(item.href) : false;
    }
    return dropdownItems[label]?.some(
      (sub) => pathname === sub.href || pathname?.startsWith(`${sub.href}/`)
    );
  }, [hasDropdown, pathname]);

  const navLabelClass = (label: string) =>
    `relative px-3 py-2 text-sm font-medium rounded-full flex items-center gap-1 cursor-default select-none pointer-events-none transition-colors duration-200 ${
      isSectionActive(label)
        ? 'text-white bg-white/10'
        : 'text-white/70 hover:text-white hover:bg-white/5'
    }`;

  const blockNavClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      {/* Desktop Floating Navbar - CSS transitions instead of Framer Motion springs */}
      <header
        className={`
          fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:block
          transition-transform duration-300 ease-out
          ${isHidden ? '-translate-y-24' : 'translate-y-0'}
        `}
      >
        <nav
          className={`
            relative flex items-center gap-1 px-2 py-2 rounded-full
            transition-all duration-300 ease-out
            ${isAtTop 
              ? 'bg-white/5 border border-white/10 backdrop-blur-md shadow-lg' 
              : 'bg-black/70 border border-white/20 backdrop-blur-xl shadow-2xl'
            }
          `}
        >
          {/* Subtle glow - reduced blur for performance */}
          <div className="absolute inset-0 rounded-full opacity-40 blur-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 -z-10" />

          {/* Text Logo - No animated icon */}
          <Link href="/" className="pl-4 pr-3 py-1">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-50 to-blue-100 bg-clip-text text-transparent">TEELI</span>
            <span className="text-xl font-light bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">.NET</span>
          </Link>

          {/* Separator */}
          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {navItems.filter((item) => !hiddenNavItems.has(item.label)).map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown(item.label) && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                onClick={hasDropdown(item.label) ? blockNavClick : undefined}
                onMouseDown={hasDropdown(item.label) ? blockNavClick : undefined}
              >
                {hasDropdown(item.label) ? (
                  <span className={navLabelClass(item.label)} aria-hidden="true">
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </span>
                ) : (
                  <Link
                    href={item.href!}
                    className={`
                      relative px-3 py-2 text-sm font-medium rounded-full flex items-center gap-1
                      transition-colors duration-200
                      ${pathname?.startsWith(item.href!)
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown - CSS transition */}
                {hasDropdown(item.label) && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[240px] shadow-2xl">
                      {getVisibleDropdownItems(item.label).map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <div className="text-sm font-medium text-white">{subItem.label}</div>
                          {subItem.description && (
                            <div className="text-xs text-white/50 mt-0.5">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Navbar - Simplified */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-lg border-b border-white/10">
          {/* Text Logo - No animated icon */}
          <Link href="/" className="py-1">
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-cyan-50 to-blue-100 bg-clip-text text-transparent">TEELI</span>
            <span className="text-lg font-light bg-gradient-to-r from-zinc-400 to-zinc-500 bg-clip-text text-transparent">.NET</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-black/95 backdrop-blur-xl border-b border-white/10 animate-fade-in">
            <nav className="px-4 py-4 space-y-2">
              {navItems.filter((item) => !hiddenNavItems.has(item.label)).map((item) => (
                <div key={item.label}>
                  {hasDropdown(item.label) ? (
                    <>
                      <span className={`${navLabelClass(item.label)} w-full text-base px-4 py-3 rounded-lg`}>
                        {item.label}
                      </span>
                      <div className="pl-4 py-1 space-y-1">
                        {getVisibleDropdownItems(item.label).map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg text-base font-medium
                        ${pathname?.startsWith(item.href!)
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
