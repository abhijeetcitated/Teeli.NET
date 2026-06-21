import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How TEELI.NET uses cookies, local storage, analytics, and similar technologies.',
  alternates: { canonical: '/cookies' },
  openGraph: {
    url: 'https://teeli.net/cookies',
    title: 'Cookie Policy | TEELI.NET',
    description: 'How TEELI.NET uses cookies and similar technologies.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
