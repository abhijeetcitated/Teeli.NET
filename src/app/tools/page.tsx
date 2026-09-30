import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Free 3D Mesh Repair & Slicer Verification Tools',
  description:
    'Web-based utilities to fix non-manifold edges, seal boundary holes, verify watertight 3D models, and prepare files for 3D printing without manual cleanup.',
  alternates: {
    canonical: 'https://teeli.net/tools',
  },
};

export default function ToolsIndexPage() {
  const tools = getAllTools();

  return (
    <main className="min-h-screen bg-black text-zinc-100 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 mb-8"
        >
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-200 font-medium">Tools</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            Online Utilities &amp; Diagnostics
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Free 3D Mesh Repair Tools
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Fix broken 3D models directly in your browser. Eliminate non-manifold edges, inverted normals, and unprintable defects before slicing.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    {tool.format.toUpperCase()} Tool
                  </span>
                  <span className="text-xs text-zinc-400">Browser Check</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {tool.name}
                </h2>
                <p className="text-zinc-300 text-sm line-clamp-3 leading-relaxed mb-4">
                  {tool.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Launch Tool</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
