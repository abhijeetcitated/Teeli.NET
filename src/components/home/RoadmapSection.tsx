"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, BrainIcon, ShieldIcon, CubeIcon } from './Icons';

const stages = [
  {
    icon: RocketIcon,
    stage: "Stage 01",
    status: "Live in Studio",
    statusType: "live",
    title: "Intelligent Geometry Healer",
    description: "Automated topological healing solving non-manifold edges, T-junctions, boundary holes, and inverted normals into watertight 2-manifold models.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  {
    icon: BrainIcon,
    stage: "Stage 02",
    status: "Live in Studio",
    statusType: "live",
    title: "WebGPU Studio & Cycles Cloud GPU",
    description: "In-browser 60fps interactive 3D studio with real-time wireframe inspection paired with headless Blender Cycles 4K raytracing.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  {
    icon: ShieldIcon,
    stage: "Stage 03",
    status: "Active Rollout",
    statusType: "rollout",
    title: "Slicer Bridge & Certified 3MF",
    description: "Automated toolpath certification for Bambu Studio, OrcaSlicer, and Cura with verified watertight 3MF and multi-material packaging.",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  {
    icon: CubeIcon,
    stage: "Stage 04",
    status: "In Development",
    statusType: "future",
    title: "AI Material Shaders & Neural Twins",
    description: "Physically accurate neural PBR material synthesis, generative texture upscaling, and digital twin simulation workflows.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
];

export default function RoadmapSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            System Evolution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">Platform </span>
            <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Architecture</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/70 max-w-3xl mx-auto px-4 font-normal">
            From algorithmic mesh repair to cloud GPU rendering and direct slicer pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {stages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none rounded-3xl"></div>
                <div className={`absolute -inset-1 ${item.bloom} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10`}></div>
                
                <div className="flex items-start gap-6">
                  {/* Icon with Gradient Background */}
                  <div className={`shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${item.gradient} rounded-2xl border border-white/20 shadow-lg`}>
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-lg font-black text-starlight">{item.stage}</span>
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                        item.statusType === "live" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                          : item.statusType === "rollout"
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                          : "bg-white/5 text-starlight/50 border-white/10"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-starlight/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
