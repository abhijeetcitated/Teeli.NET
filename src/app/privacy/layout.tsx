import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Teeli.NET collects, uses, and protects your data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    url: 'https://teeli.net/privacy',
    title: 'Privacy Policy | TEELI.NET',
    description: 'How Teeli.NET handles your data.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
