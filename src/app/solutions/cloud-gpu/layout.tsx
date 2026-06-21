import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cloud GPU Rendering',
  description:
    'Queue-based GPU rendering with headless Blender Cycles on cloud workers. Render 3D scenes without building or managing your own render farm.',
  alternates: { canonical: '/solutions/cloud-gpu' },
  openGraph: {
    url: 'https://teeli.net/solutions/cloud-gpu',
    title: 'Cloud GPU Rendering | TEELI.NET',
    description: 'Headless Blender Cycles rendering on cloud GPUs — no render farm to manage.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
