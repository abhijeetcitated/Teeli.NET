import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Utility page — useful to users but not search/AI index targets.
export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Teeli account.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login' },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
