"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, WrenchIcon, CubeIcon, RocketIcon } from './Icons';

const steps = [
  {
    icon: UploadIcon,
    number: "01",
    title: "Upload",
    description: "Drag & drop your 3D file.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    icon: WrenchIcon,
    number: "02",
    title: "Auto-Heal",
    description: "System detects & repairs geometry errors.",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
  },
  {
    icon: CubeIcon,
    number: "03",
    title: "Preview",
    description: "Check the clean model in browser.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: RocketIcon,
    number: "04",
    title: "Render & Download",
    description: "Server renders and delivers the final output. Get Image (PNG/JPEG), Animation (MP4), or Turntable Preview.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-deep-void">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(to right, #e4e4e4 1px, transparent 1px),
          linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 tracking-tight leading-none px-2">
            <span className="text-starlight">How It </span>
            <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-starlight/60 font-light max-w-3xl mx-auto px-4">
            4 simple steps to perfect renders
          </p>
        </motion.div>

        {/* Process Flow - Enhanced Visual Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Connecting Line */}
          <div className="absolute left-0 right-0 top-32 h-[3px] hidden lg:block">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20"></div>
            <motion.div 
              className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-orange-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Glassmorphic Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full">
                  {/* Metallic Shine */}
                  <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div 
                      className={`relative w-14 h-14 rounded-full bg-linear-to-br ${step.gradient} p-[2px] shadow-lg`}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      <div className="w-full h-full rounded-full bg-deep-void flex items-center justify-center">
                        <span className={`text-xl font-black bg-linear-to-br ${step.gradient} bg-clip-text text-transparent`}>
                          {step.number}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Icon with Gradient Background */}
                  <div className="flex justify-center mb-6 mt-4">
                    <motion.div 
                      className={`relative p-5 bg-linear-to-br ${step.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}
                      whileInView={{ rotate: [0, 360] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    >
                      <step.icon className="w-12 h-12 text-white drop-shadow-lg" />
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-linear-to-br ${step.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10`}></div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-starlight tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base text-starlight/70 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                </div>

                {/* Animated Arrow Between Steps */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute top-32 -right-4 transform -translate-y-1/2 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 20H32M32 20L24 12M32 20L24 28" stroke="url(#arrow-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="arrow-gradient" x1="8" y1="20" x2="32" y2="20">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Simple Process Flow Text - Outside any box */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 text-lg md:text-xl font-semibold text-starlight/50">
            <span>Upload</span>
            <span className="text-starlight/30">→</span>
            <span>Auto-Heal</span>
            <span className="text-starlight/30">→</span>
            <span>Render</span>
            <span className="text-starlight/30">→</span>
            <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Done</span>
          </div>
          <p className="text-sm text-signal-teal/60 mt-4 font-semibold">
            ✓ Up to 10× faster vs local rendering (test data)
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a href="https://app.teeli.net/" className="group relative inline-flex px-14 py-5 text-white font-bold text-xl rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
            {/* Animated gradient background */}
            <span className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500" />
            {/* Pulsing glow effect */}
            <span className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            {/* Shine sweep effect */}
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {/* Border glow */}
            <span className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-lg">
              <span className="font-black">Start Free</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
