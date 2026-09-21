"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, XCircleIcon, DollarIcon, TrendingUpIcon, UsersIcon } from './Icons';

const problems = [
  {
    icon: XCircleIcon,
    title: "Non-Manifold Edges",
    description: "Bambu Studio, Cura, & Orca throw slicing errors when 3+ faces share a single edge or boundary loops stay unclosed.",
  },
  {
    icon: AlertTriangleIcon,
    title: "Destroyed UVs & Distorted Meshes",
    description: "56% of users complain legacy repair tools (Netfabb/MakePrintable) destroy UV texture coordinates and collapse fine detail.",
  },
  {
    icon: TrendingUpIcon,
    title: "Hours of Manual Vertex Editing",
    description: "Fixing inverted normals, degenerate zero-area faces, and self-intersections in Blender wastes 4–8 hours per model.",
  },
  {
    icon: DollarIcon,
    title: "Local Hardware Overheat & Freezing",
    description: "Complex scenes choke local GPUs. Unchecked geometry crashes Blender Cycles and octane render engines mid-frame.",
  },
  {
    icon: UsersIcon,
    title: "Failed 3D Prints & Waste",
    description: "Un-watertight geometry leads to missing interior walls, toolpath holes, and failed 14-hour print runs.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-black/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertTriangleIcon className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight px-2">
            <span className="text-starlight">Slicers and Renders Fail Because </span>
            <span className="text-red-500">3D Geometry Is Broken.</span>
          </h2>
          <p className="text-lg sm:text-xl text-starlight/70 max-w-3xl mx-auto">
            CAD exporters and 3D marketplaces output meshes with holes, flipped normals, and non-manifold boundaries that crash downstream production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 sm:p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(239,68,68,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/30 group-hover:bg-red-500/20 transition-colors">
                    <problem.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{problem.title}</h3>
                </div>
                <p className="text-starlight/70 text-sm sm:text-base leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-red-500/5 border border-red-500/20 rounded-3xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-starlight mb-2">
            Creators don't fail—<span className="text-red-400">the underlying mesh topology does.</span>
          </h3>
          <p className="text-sm text-starlight/60">
            TEELI solves this at the mathematical geometry layer before any slicer or render engine is touched.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
