"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, BrainIcon, ShieldIcon, CubeIcon } from './Icons';

const phases = [
  {
    icon: RocketIcon,
    phase: "Phase 1",
    status: "Now",
    title: "Auto-Repair + Render MVP",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  {
    icon: BrainIcon,
    phase: "Phase 2",
    status: "Coming Soon",
    title: "AI Optimization + Autoscaling + Materials",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  {
    icon: ShieldIcon,
    phase: "Phase 3",
    status: "Future",
    title: "Distributed Compute Clusters",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  {
    icon: CubeIcon,
    phase: "Phase 4",
    status: "Future",
    title: "Physics AI + Digital Twins + Simulation",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
];

export default function RoadmapSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">Product </span>
            <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/60 max-w-3xl mx-auto mb-4 px-4">
            High-level 4 phases
          </p>
          <p className="text-base sm:text-lg text-starlight/40 px-4">
            (Only Phase-1 features available today.)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                {/* Metallic Shine */}
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                {/* Colored Bloom Background */}
                <div className={`absolute -inset-2 ${phase.bloom} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                
                <div className="flex items-start gap-6">
                  {/* Icon with Gradient Background */}
                  <div className={`shrink-0 inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${phase.gradient} rounded-2xl border border-white/20 shadow-lg`}>
                    <phase.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-black text-starlight">{phase.phase}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        phase.status === "Now" 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                          : "bg-white/5 text-starlight/50 border border-white/10"
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-lg text-starlight/70 leading-relaxed">
                      {phase.title}
                    </p>
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
