import Link from 'next/link';
import { UploadCloud } from 'lucide-react';

// The six checks the real free check (app.teeli.net/check) reports. This card runs nothing itself.
const REPORTED_CHECKS = [
  { name: 'Watertight', meaning: 'open holes or non-manifold edges' },
  { name: 'Normals', meaning: 'faces pointing inward' },
  { name: 'Duplicate vertices', meaning: 'points a weld would merge' },
  { name: 'Degenerate triangles', meaning: 'zero-area faces' },
  { name: 'Self-intersections', meaning: 'faces crossing each other (skipped above 200k triangles and shown as "not checked")' },
  { name: 'Scale / units', meaning: 'model-size sanity' },
];

export default function HeroMeshInspector() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow Ambient behind card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-signal-teal/30 via-cyan-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative rounded-3xl bg-zinc-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl p-6 sm:p-7 overflow-hidden text-left">
        {/* Subtle top light sweep */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Panel Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-teal" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Instant Mesh Diagnostic
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-cyan-300">
            Free Zero-Install Audit
          </span>
        </div>

        {/* Dropzone = link to the real check in the app (this card cannot process files) */}
        <a
          href="https://app.teeli.net/check?source=embed:teeli.net-home"
          className="group block cursor-pointer relative border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 rounded-2xl p-5 text-center bg-cyan-500/[0.02] hover:bg-cyan-500/[0.06] transition-all duration-300 mb-5"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 mb-2.5">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-white mb-0.5">
              Check your 3D file free
            </p>
            <p className="text-xs text-starlight/60 mb-2">
              <span className="text-cyan-400 underline underline-offset-2">opens the TEELI checker</span> · STL · GLB · zipped OBJ
            </p>
            <div className="flex items-center gap-1.5 justify-center">
              {['.STL', '.GLB', '.OBJ (zip)'].map((ext) => (
                <span key={ext} className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-starlight/70">
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* What the real check reports (static: nothing on this page is simulated) */}
        <div className="rounded-2xl bg-black/60 border border-white/10 p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            What the free check reports
          </h2>
          <ul className="space-y-1.5 text-xs text-zinc-400">
            {REPORTED_CHECKS.map((check) => (
              <li key={check.name}>
                <span className="font-semibold text-white">{check.name}</span> — {check.meaning}
              </li>
            ))}
          </ul>
          <p className="mt-3 pt-3 border-t border-white/10 text-[11px] text-zinc-400">
            Every number in your report comes from your file — nothing is simulated.
          </p>
        </div>

        <Link
          href="/tools/repair-stl-online"
          className="mt-3 inline-block text-xs font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
        >
          Repair an STL file online →
        </Link>

        {/* Footer Guarantee */}
        <div className="mt-3.5 flex items-center justify-between text-[11px] text-starlight/50 px-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            STL · GLB · zipped OBJ · no account needed
          </span>
          <span>No credit card required</span>
        </div>
      </div>
    </div>
  );
}
