import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of Teeli.NET and the Teeli app.',
  alternates: { canonical: '/terms' },
  openGraph: {
    url: 'https://teeli.net/terms',
    title: 'Terms of Service | TEELI.NET',
    description: 'Terms governing use of Teeli.NET and the Teeli app.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
