"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon } from './Icons';

const techStack = [
  "Blender Cycles (Headless)",
  "Trimesh Auto-Repair",
  "WebGPU + Babylon.js",
  "RunPod / io.net GPU Grid",
  "High-Performance Edge GPUs",
];

export default function TechStackSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <CodeIcon className="w-20 h-20 text-plasma-violet" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-starlight mb-6">
            Tech Behind the <span className="text-plasma-violet">Magic</span>
          </h2>
          <p className="text-xl text-starlight/70 mb-12">
            Powered by cutting-edge open source technologies
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-starlight/5 backdrop-blur-sm border border-starlight/10 rounded-2xl p-6 hover:border-plasma-violet/50 transition-all duration-300 group"
            >
              <p className="text-lg font-bold text-starlight group-hover:text-plasma-violet transition-colors duration-300">
                {tech}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-linear-to-r from-plasma-violet/10 to-signal-teal/10 backdrop-blur-sm border border-plasma-violet/30 rounded-3xl p-8"
        >
          <p className="text-2xl font-bold text-starlight">
            All <span className="text-signal-teal">Open Source</span>. No licenses.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
