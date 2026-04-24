"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, XCircleIcon, DollarIcon, TrendingUpIcon, UsersIcon } from './Icons';

const problems = [
  { icon: XCircleIcon, text: "Non-manifold geometry breaks the render" },
  { icon: AlertTriangleIcon, text: "Holes and flipped normals crash the pipeline" },
  { icon: TrendingUpIcon, text: "Manual mesh fixing wastes hours" },
  { icon: DollarIcon, text: "Local machines can't handle heavy scenes" },
  { icon: UsersIcon, text: "Failed renders = lost time + lost money" },
];

function ShieldIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export default function ProblemSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <AlertTriangleIcon className="w-20 h-20 text-red-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight px-2">
            <span className="text-starlight">Rendering Fails Because </span>
            <span className="text-red-500">3D Files Are Broken.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-starlight/5 backdrop-blur-xl border border-red-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-red-500/60 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(239,68,68,0.2)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/30 group-hover:bg-red-500/20 transition-colors duration-300">
                  <problem.icon className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-lg text-starlight font-medium leading-relaxed">{problem.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-starlight mb-4 px-2">
            Creators don't fail—<span className="text-red-500">the files do.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
