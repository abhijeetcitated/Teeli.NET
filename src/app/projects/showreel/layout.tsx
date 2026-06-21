import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Showreel & Gallery',
  description:
    "A gallery of 3D renders and visualizations produced with Teeli's repair and cloud rendering workflow.",
  alternates: { canonical: '/projects/showreel' },
  openGraph: {
    url: 'https://teeli.net/projects/showreel',
    title: 'Showreel & Gallery | TEELI.NET',
    description: '3D renders and visualizations made with Teeli.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
