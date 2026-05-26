'use client';

import { usePathname } from 'next/navigation';
import FloatingNavbarOptimized from '@/components/FloatingNavbarOptimized';

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname?.startsWith('/blog')) {
    return null;
  }

  return <FloatingNavbarOptimized />;
}
