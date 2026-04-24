"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { siBlender, siBabylondotjs } from 'simple-icons';

// Real SVG Logos from Simple Icons
const BlenderLogo = () => (
  <svg viewBox="0 0 24 24" fill="#EA7600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d={siBlender.path} />
  </svg>
);

const TrimeshLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M24 8L8 18V30L24 40L40 30V18L24 8Z" stroke="#10B981" strokeWidth="3" fill="none"/>
    <path d="M24 8V40M8 18L40 30M40 18L8 30" stroke="#10B981" strokeWidth="2"/>
    <circle cx="24" cy="8" r="2" fill="#10B981"/>
    <circle cx="8" cy="18" r="2" fill="#10B981"/>
    <circle cx="40" cy="18" r="2" fill="#10B981"/>
    <circle cx="8" cy="30" r="2" fill="#10B981"/>
    <circle cx="40" cy="30" r="2" fill="#10B981"/>
    <circle cx="24" cy="40" r="2" fill="#10B981"/>
  </svg>
);

const LibIGLLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="8" y="8" width="32" height="32" rx="4" stroke="#A855F7" strokeWidth="3" fill="none"/>
    <path d="M14 24L24 14L34 24L24 34L14 24Z" fill="#A855F7"/>
    <circle cx="24" cy="24" r="4" fill="white"/>
  </svg>
);

const AssimpLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M24 6L6 14V34L24 42L42 34V14L24 6Z" fill="#3B82F6"/>
    <path d="M24 6L24 42M6 14L42 34M42 14L6 34" stroke="white" strokeWidth="2"/>
    <text x="24" y="28" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">A</text>
  </svg>
);

const BabylonLogo = () => (
  <svg viewBox="0 0 24 24" fill="#BB464B" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d={siBabylondotjs.path} />
  </svg>
);

const engines = [
  {
    name: "Blender",
    description: "Industry-standard 3D creation suite",
    logo: BlenderLogo,
    gradient: "from-orange-500 via-blue-500 to-orange-400",
  },
  {
    name: "Trimesh",
    description: "Python mesh processing library",
    logo: TrimeshLogo,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    name: "LibIGL",
    description: "Geometry processing library",
    logo: LibIGLLogo,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
  },
  {
    name: "Assimp",
    description: "Universal 3D file importer",
    logo: AssimpLogo,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    name: "Babylon.js + WebGPU",
    description: "Real-time 3D web rendering",
    logo: BabylonLogo,
    gradient: "from-red-500 via-orange-500 to-yellow-500",
  },
];

export default function TechEnginesSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">Powered By </span>
            <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Proven Engines</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/60 font-light max-w-3xl mx-auto px-4">
            Battle-tested open-source technology powering your repairs and renders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {engines.map((engine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col items-center text-center">
                {/* Metallic Shine */}
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                {/* Real Logo */}
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <engine.logo />
                </div>
                
                <h3 className="text-xl font-black text-starlight mb-2 relative z-10">{engine.name}</h3>
                <p className="text-sm text-starlight/60 relative z-10 leading-relaxed">
                  {engine.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-starlight/50 font-semibold">
            Built on rock-solid foundations trusted by millions of creators worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
