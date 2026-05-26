"use client";

import { usePathname } from 'next/navigation';
import BlogFooter from '@/components/blog/BlogFooter';

export default function BlogLayoutClient() {
  const pathname = usePathname();
  
  // Force dark theme on specific pages
  const forceDarkPages = ['/blog/about'];
  const shouldForceDark = forceDarkPages.includes(pathname);
  
  return <BlogFooter forceDark={shouldForceDark} />;
}
