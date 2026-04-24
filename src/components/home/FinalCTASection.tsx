"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon } from './Icons';

export default function FinalCTASection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16c79e15_1px,transparent_1px),linear-gradient(to_bottom,#16c79e15_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <RocketIcon className="w-24 h-24 text-signal-teal mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight px-2">
            <span className="bg-linear-to-r from-signal-teal via-cyan-400 to-blue-500 bg-clip-text text-transparent">Create Better. </span>
            <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Render Faster. </span>
            <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Stress Less.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-starlight/70 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Fix broken files, stop failed renders, and deliver output in minutes—not hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a href="https://app.teeli.net/" className="group relative px-16 py-6 text-white font-bold text-2xl rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
            {/* Animated gradient background */}
            <span className="absolute inset-0 bg-linear-to-r from-signal-teal via-cyan-500 to-blue-500" />
            {/* Pulsing glow effect */}
            <span className="absolute inset-0 bg-linear-to-r from-signal-teal via-cyan-500 to-blue-500 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Shine sweep effect */}
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {/* Animated border */}
            <span className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors" />
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 drop-shadow-lg">
              <span className="font-black">Start Free</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          <button className="px-16 py-6 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-starlight font-bold text-2xl rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
            Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
