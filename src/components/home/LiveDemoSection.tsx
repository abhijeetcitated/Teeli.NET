"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function LiveDemoSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight">
            <span className="text-starlight">See </span>
            <span className="bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">TEELI.NET</span>
            <span className="text-starlight"> in Action</span>
          </h2>
        </motion.div>

        {/* Video/Demo Embed Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group"
        >
          {/* Glassmorphic Frame */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 hover:border-white/20 transition-all duration-500">
            {/* Video Placeholder */}
            <div className="aspect-video bg-deep-void/80 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                  linear-gradient(to right, #e4e4e4 1px, transparent 1px),
                  linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>
              
              {/* Play Button */}
              <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer group-hover:border-white/40">
                <svg className="w-8 h-8 text-starlight ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>

              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30">
                <span className="text-sm font-semibold text-purple-300">Demo Video</span>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-10 py-4 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105">
            Watch Demo →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
