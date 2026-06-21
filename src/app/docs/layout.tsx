import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Technical Documentation',
  description:
    "Technical documentation for working with Teeli's 3D model repair and cloud rendering platform.",
  alternates: { canonical: '/docs' },
  openGraph: {
    url: 'https://teeli.net/docs',
    title: 'Technical Documentation | TEELI.NET',
    description: 'Docs for the Teeli 3D repair and cloud rendering platform.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
