"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';

interface OptimizedSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  id?: string;
}

/**
 * OptimizedSection - Lazy loads sections when they're about to enter viewport
 * This dramatically reduces initial JavaScript execution and improves LCP/FCP
 */
export default function OptimizedSection({
  children,
  fallback = <SectionSkeleton />,
  rootMargin = '300px',
  id
}: OptimizedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} id={id}>
      {isVisible ? children : fallback}
    </div>
  );
}

// Lightweight skeleton placeholder
function SectionSkeleton() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 w-2/3 mx-auto bg-white/5 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-1/2 mx-auto bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
