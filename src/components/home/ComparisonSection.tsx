"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from './Icons';

const comparisonData = [
  { feature: "Geometry Repair", traditional: false, teeli: true },
  { feature: "Rendering Cost", traditional: "High", teeli: "10X Cheaper" },
  { feature: "Compute", traditional: "Local", teeli: "Hybrid + DePIN" },
  { feature: "Sustainability", traditional: "Not verifiable", teeli: "On-chain proof" },
  { feature: "Collaboration", traditional: "Local", teeli: "Real-time web" },
  { feature: "VR/4D Ready", traditional: false, teeli: true },
];

export default function ComparisonSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-signal-teal/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            <span className="text-starlight">Why </span>
            <span className="bg-linear-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">TEELI.NET</span>
            <span className="text-starlight"> Wins</span>
          </h2>
          <p className="text-xl md:text-2xl text-starlight/60 font-light">
            See the difference for yourself
          </p>
        </motion.div>

        {/* Modern Card Grid - Figma/Apple Style */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {comparisonData.map((row, index) => (
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
                <div className="absolute inset-0 bg-radial-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                {/* Feature Name */}
                <h3 className="text-2xl font-black text-starlight mb-8 tracking-tight">{row.feature}</h3>
                
                {/* Comparison Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Traditional Column */}
                  <div className="text-center space-y-3">
                    <p className="text-lg font-black text-starlight uppercase tracking-wider">Traditional</p>
                    {typeof row.traditional === 'boolean' ? (
                      row.traditional ? (
                        <div className="inline-flex items-center justify-center">
                          <CheckCircleIcon className="w-10 h-10 text-green-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center">
                          <XCircleIcon className="w-10 h-10 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                        </div>
                      )
                    ) : (
                      <p className="text-base text-starlight/60 font-medium">{row.traditional}</p>
                    )}
                  </div>
                  
                  {/* TEELI Column */}
                  <div className="text-center space-y-3 relative">
                    <div className="absolute -left-3 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-signal-teal/30 to-transparent"></div>
                    <p className="text-lg font-black text-signal-teal uppercase tracking-wider">TEELI.NET</p>
                    {typeof row.teeli === 'boolean' ? (
                      row.teeli ? (
                        <div className="inline-flex items-center justify-center">
                          <CheckCircleIcon className="w-10 h-10 text-green-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center">
                          <XCircleIcon className="w-10 h-10 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                        </div>
                      )
                    ) : (
                      <p className="text-base text-signal-teal font-bold">{row.teeli}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button className="px-12 py-5 bg-linear-to-r from-signal-teal via-cyan-500 to-blue-500 text-white font-bold text-xl rounded-full hover:shadow-[0_0_50px_rgba(22,199,158,0.5)] transition-all duration-300 hover:scale-105">
            Switch to TEELI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
