"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContentHubsSection() {
  const hubs = [
    {
      title: "Interactive 3D Tools",
      tag: "/tools",
      badge: "Free Utility",
      description:
        "Browser-based mesh repair and diagnosis. Seal open holes, fix non-manifold edges, and check print-readiness in seconds.",
      href: "/tools",
      cta: "Explore Tools",
      items: [
        { label: "Fix Non-Manifold STL", href: "/tools/fix-non-manifold-stl" },
        { label: "Repair OBJ Mesh Online", href: "/tools/fix-non-manifold-stl" },
        { label: "Check Print-Ready Solid", href: "/tools/fix-non-manifold-stl" },
      ],
      gradient: "from-emerald-500/20 via-zinc-900 to-zinc-950",
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
    },
    {
      title: "3D Geometry Glossary",
      tag: "/glossary",
      badge: "Defined Terms",
      description:
        "Standardized technical definitions for 3D printing defects, slicer warnings (Bambu, Cura, PrusaSlicer), and topology rules.",
      href: "/glossary",
      cta: "Browse Glossary",
      items: [
        { label: "Non-Manifold Edges", href: "/glossary/non-manifold-edges" },
        { label: "Watertight Mesh Solid", href: "/glossary/non-manifold-edges" },
        { label: "Inverted Surface Normals", href: "/glossary/non-manifold-edges" },
      ],
      gradient: "from-cyan-500/20 via-zinc-900 to-zinc-950",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
    },
    {
      title: "Format & Slicer Benchmarks",
      tag: "/compare",
      badge: "High-Intent Comparison",
      description:
        "Side-by-side matrices comparing 3D file formats (STL, OBJ, 3MF) and modern slicer software repair reliability.",
      href: "/compare",
      cta: "View Comparisons",
      items: [
        { label: "STL vs OBJ vs 3MF Benchmark", href: "/compare/stl-vs-obj-vs-3mf" },
        { label: "Bambu Studio vs Cura Repair", href: "/compare/stl-vs-obj-vs-3mf" },
        { label: "PrusaSlicer vs Cloud Healing", href: "/compare/stl-vs-obj-vs-3mf" },
      ],
      gradient: "from-purple-500/20 via-zinc-900 to-zinc-950",
      border: "border-purple-500/30",
      accent: "text-purple-400",
    },
    {
      title: "Engineering Blog & Guides",
      tag: "/blog",
      badge: "In-Depth Research",
      description:
        "Technical troubleshooting, step-by-step Blender fixes, multi-material slicer profiles, and cloud rendering optimizations.",
      href: "/blog",
      cta: "Read Technical Blog",
      items: [
        { label: "Bambu Studio Error Troubleshooting", href: "/blog" },
        { label: "Blender 3D-Print Toolbox Guide", href: "/blog" },
        { label: "Neural & Cloud Cycles Workflows", href: "/blog" },
      ],
      gradient: "from-amber-500/20 via-zinc-900 to-zinc-950",
      border: "border-amber-500/30",
      accent: "text-amber-400",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black/60 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            The 3D Engineering Knowledge &amp; Utility Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything You Need to Fix &amp; Master 3D Geometry
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Whether you need an instant automated mesh repair, an authoritative geometric definition, or a technical slicer comparison — we built the complete resource hub.
          </p>
        </div>

        {/* 4 Content Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {hubs.map((hub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${hub.gradient} border ${hub.border} flex flex-col justify-between hover:scale-[1.01] transition-all shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-zinc-400 tracking-wider bg-black/40 px-2.5 py-1 rounded-md border border-zinc-800">
                    {hub.tag}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${hub.accent}`}>
                    {hub.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {hub.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {hub.description}
                </p>

                {/* Sub items / Quick links */}
                <div className="space-y-2 mb-8">
                  {hub.items.map((item, iIdx) => (
                    <Link
                      key={iIdx}
                      href={item.href}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-zinc-800/60 border border-zinc-800/80 text-xs text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className={`${hub.accent}`}>→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={hub.href}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{hub.cta}</span>
                <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* AthenaHQ Quality Moat Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              The AthenaHQ Quality Moat
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Why 56% of Users Are Dissatisfied with Existing Mesh Repair Tools
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              AthenaHQ benchmarks measured a 56% negative satisfaction rate across legacy repair tools (Netfabb, MakePrintable, MeshMixer). Most tools destroy UV texture coordinates, strip vertex colors, or distort thin walls. TEELI uses a non-destructive topology ladder that preserves original appearance while enforcing strict watertightness.
            </p>
          </div>
          <a
            href="https://app.teeli.net/?utm_source=teeli.net&utm_medium=home&utm_campaign=moat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-500/20 whitespace-nowrap flex-shrink-0"
          >
            Launch Free Diagnostic Studio →
          </a>
        </div>
      </div>
    </section>
  );
}
