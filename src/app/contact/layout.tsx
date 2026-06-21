import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Teeli team for product support, partnerships, or questions about 3D model repair and cloud rendering.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: 'https://teeli.net/contact',
    title: 'Contact TEELI.NET',
    description: 'Support, partnerships, and questions about Teeli.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
