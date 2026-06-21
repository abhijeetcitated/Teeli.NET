import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Render Cost & CO₂ Estimates',
  description:
    'Teeli shows render cost and CO₂ estimate cards directly in the render panel — billing and footprint transparency built into the workflow, not a separate audit service.',
  alternates: { canonical: '/solutions/sustainability' },
  openGraph: {
    url: 'https://teeli.net/solutions/sustainability',
    title: 'Render Cost & CO₂ Estimates | TEELI.NET',
    description: 'Cost and CO₂ transparency built into the Teeli render panel.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
