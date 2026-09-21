import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllComparisons } from '@/lib/compare';

export const metadata: Metadata = {
  title: '3D Format & Slicer Benchmarks (2026) | TEELI',
  description:
    'Independent technical comparisons of 3D file formats (STL, OBJ, 3MF, STEP, GLB) and slicer software (Bambu Studio, Cura, PrusaSlicer, Orca).',
  alternates: {
    canonical: 'https://teeli.net/compare',
  },
};

export default function CompareIndexPage() {
  const comparisons = getAllComparisons();

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
          <span className="text-zinc-200 font-medium">Compare</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            Format &amp; Slicer Benchmarks
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            3D Format &amp; Slicer Comparisons
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Side-by-side technical benchmarks evaluating file size, multi-color support, slicer repair reliability, and mesh topology integrity.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisons.map((item) => (
            <Link
              key={item.slug}
              href={`/compare/${item.slug}`}
              className="group p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Direct Benchmark
                  </span>
                  <span className="text-xs text-zinc-400">{item.updatedDate}</span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-zinc-300 text-sm line-clamp-3 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>View Complete Matrix &amp; Verdict</span>
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
