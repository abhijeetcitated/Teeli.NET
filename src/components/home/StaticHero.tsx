/**
 * StaticHero - Option A: Modern Split Hero (Linear / Vercel Developer Style)
 * Server-rendered layout with client-side interactive diagnostic widget
 */

import Link from 'next/link';
import HeroMeshInspector from './HeroMeshInspector';

export default function StaticHero() {
  return (
    <section className="min-h-[92vh] flex items-center justify-center relative overflow-hidden px-4 pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16c79e08_1px,transparent_1px),linear-gradient(to_bottom,#16c79e08_1px,transparent_1px)] bg-[length:4rem_4rem]" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-signal-teal/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-plasma-violet/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Positioning, Value Prop, CTAs */}
          <div className="lg:col-span-7 text-left">
            {/* Live Pipeline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-teal" />
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-starlight/80">
                Automated 3D Pipeline: Diagnose ➔ Repair ➔ Render ➔ Deliver
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-[1.08]">
              <span className="text-starlight">Fix Broken 3D Meshes.</span>
              <br />
              <span className="bg-gradient-to-r from-signal-teal via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Render Photoreal in Cloud.
              </span>
            </h1>

            {/* Subtitle addressing real creator pain points */}
            <p className="text-base sm:text-lg md:text-xl text-starlight/75 mb-8 max-w-2xl leading-relaxed font-normal">
              Stop Bambu Studio, Orca, and Cura slicer crashes. TEELI mathematically heals non-manifold geometry into 100% watertight 2-manifold models without destroying UV textures, previews in WebGPU, and renders with Blender Cycles on cloud GPUs.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://app.teeli.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-4 text-black font-extrabold text-base rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl shadow-signal-teal/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-signal-teal via-cyan-400 to-emerald-400" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Launch 3D Studio</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>

              <Link
                href="/tools"
                className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-white/15 backdrop-blur-md transition-all duration-300 hover:border-white/30"
              >
                Explore Public Tools Hub →
              </Link>
            </div>

            {/* 4 Trust Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-signal-teal font-bold text-sm">
                  <span>✓</span> 100% Watertight
                </div>
                <div className="text-xs text-starlight/60 mt-0.5">2-Manifold Guarantee</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-sm">
                  <span>✓</span> Texture Safe
                </div>
                <div className="text-xs text-starlight/60 mt-0.5">Zero UV Distortion</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-sm">
                  <span>✓</span> Cycles GPU
                </div>
                <div className="text-xs text-starlight/60 mt-0.5">4K Cloud Rendering</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                  <span>✓</span> Zero Install
                </div>
                <div className="text-xs text-starlight/60 mt-0.5">Runs in Browser</div>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive "Mesh Doctor" Live Dropzone */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroMeshInspector />
          </div>

        </div>
      </div>
    </section>
  );
}
