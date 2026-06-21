import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Industry Reports',
  description:
    'Reports and analysis on 3D rendering, cloud GPU workflows, and AI-assisted visualization from Teeli.',
  alternates: { canonical: '/insights/reports' },
  openGraph: {
    url: 'https://teeli.net/insights/reports',
    title: 'Industry Reports | TEELI.NET',
    description: 'Analysis on 3D rendering and cloud GPU workflows.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
