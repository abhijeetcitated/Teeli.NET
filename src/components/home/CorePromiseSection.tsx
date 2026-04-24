"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ToolIcon, RocketIcon, ZapIcon, LeafCheckIcon } from './Icons';

const promises = [
  { 
    icon: ToolIcon,
    title: "Auto-Repair Engine", 
    description: "Fixes broken geometry instantly—no manual cleanup.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  { 
    icon: RocketIcon,
    title: "Headless Rendering", 
    description: "Server-side rendering with zero hardware required.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  { 
    icon: ZapIcon,
    title: "Web Preview", 
    description: "Check the file in browser before rendering.",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  { 
    icon: LeafCheckIcon,
    title: "Guaranteed Output", 
    description: "If the repair succeeds, the render succeeds.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
];

export default function CorePromiseSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 tracking-tighter leading-tight px-2">
            <span className="bg-linear-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.5)]">
              Upload. Auto-Heal.
            </span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              Render. Done.
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-starlight font-bold max-w-3xl mx-auto px-4">
            No plugins. No errors. No manual fixing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {promises.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                {/* Colored Bloom Background */}
                <div className={`absolute -inset-2 ${item.bloom} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}></div>
                
                <div className="flex flex-col gap-6">
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${item.gradient} rounded-2xl border border-white/20 shadow-lg`}>
                    <item.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-starlight mb-3">{item.title}</h3>
                    <p className="text-lg text-starlight/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple Flow Text - No Box, No Motion */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-2xl md:text-3xl font-semibold text-starlight/60">
            <span>Upload</span>
            <span className="text-starlight/30">→</span>
            <span>Auto-Heal</span>
            <span className="text-starlight/30">→</span>
            <span>Render</span>
            <span className="text-starlight/30">→</span>
            <span className="bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Done ✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
