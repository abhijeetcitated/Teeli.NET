import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rendering Engine',
  description:
    "Inside Teeli's rendering pipeline: 3D import with Assimp, geometry repair (Trimesh, LibIGL), WebGPU preview, and headless Blender Cycles rendering on cloud GPUs.",
  alternates: { canonical: '/technology/rendering-engine' },
  openGraph: {
    url: 'https://teeli.net/technology/rendering-engine',
    title: 'Rendering Engine | TEELI.NET',
    description: 'The Blender Cycles–based pipeline behind Teeli — import, repair, preview, render.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
