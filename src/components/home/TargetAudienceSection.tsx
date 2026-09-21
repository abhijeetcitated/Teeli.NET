"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CubeIcon, BrainIcon, UsersIcon, TrendingUpIcon, CodeIcon } from './Icons';

const audiences = [
  { 
    name: "3D Print Makers & Engineers", 
    description: "Eliminate non-manifold warnings, holes, and slicing failures in Bambu Studio, Orca, and Cura.",
    icon: CubeIcon,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  { 
    name: "Game Asset Creators", 
    description: "Ensure watertight meshes, clean geometry, and pristine UV coordinates for Unreal Engine and Unity.",
    icon: BrainIcon,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  { 
    name: "Industrial & CAD Teams", 
    description: "Convert STEP, IGES, and SolidWorks files into clean, renderable 2-manifold models without lost facets.",
    icon: CodeIcon,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    bloom: "bg-yellow-500/20"
  },
  { 
    name: "3D Artists & Visualizers", 
    description: "Render complex scenes in Blender Cycles GPU cloud without locking up local workstations.",
    icon: TrendingUpIcon,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  { 
    name: "Web3D & eCommerce Brands", 
    description: "Generate lightweight, optimized GLB/GLTF models and 360° turntable animations for online stores.",
    icon: UsersIcon,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
];

export default function TargetAudienceSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            Built For Production
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-starlight mb-4">
            Who Is TEELI <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Built For?</span>
          </h2>
          <p className="text-lg text-starlight/70 max-w-2xl mx-auto">
            From desktop 3D printing enthusiasts to industrial CAD visualizers and Web3D developers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl bg-linear-to-br ${audience.gradient} shadow-lg mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{audience.name}</h3>
                  <p className="text-sm text-starlight/70 leading-relaxed">{audience.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
