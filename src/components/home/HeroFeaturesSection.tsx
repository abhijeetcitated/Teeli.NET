"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ToolIcon, UploadIcon, CubeIcon, RocketIcon, CommandIcon, CreditCardIcon } from './Icons';

const features = [
  {
    icon: ToolIcon,
    title: "Auto-Repair Engine",
    points: [
      "Detects mesh errors instantly",
      "Fixes holes, flipped normals, non-manifold edges",
      "100% automated pipeline",
      "Zero 3D expertise required"
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  {
    icon: UploadIcon,
    title: "Universal File Support",
    points: [
      ".blend, .obj, .fbx, .stl, .ply",
      "Auto-convert to a clean render-ready format"
    ],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  {
    icon: CubeIcon,
    title: "Web Viewer (WebGPU)",
    points: [
      "Orbit / Zoom / Pan",
      "No app install",
      "Works in browser"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
  {
    icon: RocketIcon,
    title: "Headless Rendering (Cycles)",
    points: [
      "High-quality server-side render",
      "4K output support",
      "Download ready files"
    ],
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  {
    icon: CommandIcon,
    title: "Simple Dashboard",
    points: [
      "Upload history",
      "Render status",
      "Download files anytime"
    ],
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    bloom: "bg-yellow-500/20"
  },
  {
    icon: CreditCardIcon,
    title: "Pay-Per-Render",
    points: [
      "No subscriptions",
      "No hardware cost",
      "Only pay when you render"
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    bloom: "bg-indigo-500/20"
  },
];

export default function HeroFeaturesSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">Core Features </span>
            <span className="text-starlight/40">(Phase-1 Only)</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/60 font-light px-4">
            Everything you need to fix, preview, and render 3D files—automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphic Card with Premium Metallic Effect */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                {/* Metallic Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                {/* Colored Bloom Background - Very Subtle */}
                <div className={`absolute inset-0 ${feature.bloom} rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon with Full Gradient Background */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-2xl border border-white/20 shadow-lg mb-6`}>
                  <feature.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                
                <h3 className="text-2xl font-black text-starlight mb-4 relative z-10">{feature.title}</h3>
                
                <ul className="space-y-2 relative z-10">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-starlight/70">
                      <span className="text-signal-teal mt-1">✓</span>
                      <span className="text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supported Formats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6">
            <p className="text-sm font-bold text-starlight/60 mb-3 uppercase tracking-wider">Supported Formats</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="px-4 py-2 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl text-starlight font-bold text-sm">.blend</span>
              <span className="px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl text-starlight font-bold text-sm">.fbx</span>
              <span className="px-4 py-2 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl text-starlight font-bold text-sm">.obj</span>
              <span className="px-4 py-2 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl text-starlight font-bold text-sm">.stl</span>
              <span className="px-4 py-2 bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl text-starlight font-bold text-sm">.gltf / .glb</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
