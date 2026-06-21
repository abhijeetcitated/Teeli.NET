import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Teeli.NET is the software company behind Teeli — a browser app for repairing, previewing, and cloud-rendering 3D models. What Teeli is, how it's built, and the limits we're honest about.",
  alternates: { canonical: '/company/about' },
  openGraph: {
    url: 'https://teeli.net/company/about',
    title: 'About TEELI.NET',
    description:
      'The software company behind Teeli — a browser app for repairing, previewing, and cloud-rendering 3D models.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
