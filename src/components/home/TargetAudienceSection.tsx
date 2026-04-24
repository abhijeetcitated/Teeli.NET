"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CubeIcon, BrainIcon, UsersIcon, TrendingUpIcon, CodeIcon } from './Icons';

const audiences = [
  { 
    name: "Architects", 
    icon: CubeIcon,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bloom: "bg-orange-500/20"
  },
  { 
    name: "3D Artists", 
    icon: BrainIcon,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bloom: "bg-cyan-500/20"
  },
  { 
    name: "Studios & Agencies", 
    icon: UsersIcon,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bloom: "bg-emerald-500/20"
  },
  { 
    name: "Real Estate Developers", 
    icon: TrendingUpIcon,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    bloom: "bg-purple-500/20"
  },
  { 
    name: "Engineering Teams", 
    icon: CodeIcon,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    bloom: "bg-yellow-500/20"
  },
];

export default function TargetAudienceSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-starlight mb-8">
            Who Is It <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">For?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glassmorphic Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                  {/* Metallic Shine */}
                  <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                  
                  {/* Colored Bloom Background - Very Subtle */}
                  <div className={`absolute inset-0 ${audience.bloom} rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Icon Background with Unique Gradient */}
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${audience.gradient} rounded-2xl border border-white/20 shadow-lg mb-6 mx-auto`}>
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  
                  <p className="text-2xl font-bold text-starlight relative z-10">{audience.name}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Glassmorphic CTA Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            {/* Metallic Shine */}
            <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
            
            <p className="text-2xl md:text-3xl font-bold text-starlight mb-8 relative z-10">
              If you <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">render</span>,{" "}
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">simulate</span>, or{" "}
              <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">visualize</span>—
              <br />
              you need TEELI.NET.
            </p>
            <button className="relative z-10 px-12 py-5 bg-white/5 backdrop-blur-sm border border-white/20 text-starlight font-bold text-xl rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300">
              Start Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
