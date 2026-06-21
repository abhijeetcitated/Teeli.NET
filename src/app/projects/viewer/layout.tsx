import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '3D Viewer',
  description:
    "Preview and inspect 3D models in the browser with Teeli's interactive WebGPU viewer.",
  alternates: { canonical: '/projects/viewer' },
  openGraph: {
    url: 'https://teeli.net/projects/viewer',
    title: '3D Viewer | TEELI.NET',
    description: 'Interactive in-browser WebGPU preview of 3D models.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
