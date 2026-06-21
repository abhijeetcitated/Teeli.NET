import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Examples of 3D model repair and cloud rendering workflows run through Teeli.',
  alternates: { canonical: '/projects/case-studies' },
  openGraph: {
    url: 'https://teeli.net/projects/case-studies',
    title: 'Case Studies | TEELI.NET',
    description: 'How teams repair and render 3D models with Teeli.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
