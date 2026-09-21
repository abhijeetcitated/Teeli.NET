"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ToolIcon, UploadIcon, CubeIcon, RocketIcon, CommandIcon, CreditCardIcon } from './Icons';

const features = [
  {
    icon: ToolIcon,
    title: "Automated 2-Manifold Mesh Healer",
    points: [
      "Solves non-manifold edges & T-junctions",
      "Closes boundary holes & seals surfaces",
      "Reorients inverted & flipped normals",
      "Guarantees 100% watertight topology"
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  {
    icon: UploadIcon,
    title: "UV & Texture Preservation",
    points: [
      "Zero texture distortion or stretching",
      "Preserves MTL, PBR maps & vertex colors",
      "Maintains original UV coordinate islands",
      "Eliminates the #1 complaint of legacy tools"
    ],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  {
    icon: CubeIcon,
    title: "WebGPU Real-Time 3D Studio",
    points: [
      "Instant 60fps browser inspection",
      "Wireframe & topology diagnostic view",
      "Orbit, pan, zoom, and inspect normals",
      "Zero software download or setup required"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
  {
    icon: RocketIcon,
    title: "Headless Cloud Cycles GPU Farm",
    points: [
      "High-sample Blender Cycles raytracing",
      "Studio HDRI environments & materials",
      "4K/8K stills & 360° turntable animations",
      "Zero GPU heat or workstation slowdown"
    ],
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  {
    icon: CommandIcon,
    title: "Universal 3D & Slicer Formats",
    points: [
      "Full support for STL, OBJ, GLB/GLTF, 3MF, BLEND",
      "Direct export for Bambu Studio, Orca, & Cura",
      "Certified 3MF print-ready packages",
      "Clean asset conversion for Web3D & AR"
    ],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    bloom: "bg-yellow-500/20"
  },
  {
    icon: CreditCardIcon,
    title: "Instant Geometry Health Audit",
    points: [
      "Live vertex, edge, and face counts",
      "Boundary loop & degenerate face counter",
      "Exact bounding box & volumetric measurement",
      "Automated printability & render readiness score"
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    bloom: "bg-indigo-500/20"
  },
];

export default function HeroFeaturesSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-signal-teal/10 border border-signal-teal/30 text-signal-teal text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            Production-Ready Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">Core Platform </span>
            <span className="bg-gradient-to-r from-signal-teal via-cyan-400 to-blue-500 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/70 max-w-3xl mx-auto font-normal px-4">
            Everything you need to diagnose, heal, preview, and render 3D meshes with zero manual clean-up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none rounded-3xl"></div>
                <div className={`absolute inset-0 ${feature.bloom} rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div>
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${feature.gradient} rounded-2xl border border-white/20 shadow-lg mb-6`}>
                    <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-starlight mb-4">{feature.title}</h3>
                  
                  <ul className="space-y-2.5">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-starlight/75 text-sm sm:text-base">
                        <span className="text-signal-teal font-bold mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
