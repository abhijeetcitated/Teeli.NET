import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Utility page — useful to users but not search/AI index targets.
export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a Teeli account and start repairing and rendering 3D models.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/signup' },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
