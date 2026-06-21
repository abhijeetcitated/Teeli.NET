import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Press & News',
  description:
    'News and announcements from Teeli — updates on the 3D model repair and cloud rendering platform.',
  alternates: { canonical: '/insights/press' },
  openGraph: {
    url: 'https://teeli.net/insights/press',
    title: 'Press & News | TEELI.NET',
    description: 'Announcements and updates from Teeli.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
