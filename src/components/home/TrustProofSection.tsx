"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, CheckCircleIcon } from './Icons';

const securityFeatures = [
  { 
    icon: ShieldIcon,
    title: "Encrypted Uploads",
    description: "All files secured end-to-end.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500"
  },
  { 
    icon: ShieldIcon,
    title: "Private Processing",
    description: "Your assets never shared or public.",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500"
  },
  { 
    icon: ShieldIcon,
    title: "No Local Hardware Risk",
    description: "Nothing runs on your machine.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
  },
  { 
    icon: CheckCircleIcon,
    title: "Reliable Render Pipeline",
    description: "98% first-time success rate.",
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
];

export default function TrustProofSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <ShieldIcon className="w-20 h-20 text-signal-teal" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight px-2">
            <span className="text-starlight">Trust & </span>
            <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Security</span>
          </h2>
          <p className="text-lg sm:text-xl text-starlight/70 px-4">
            Your files are safe, private, and secure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                <div className="flex items-start gap-6">
                  <div className={`shrink-0 p-4 bg-linear-to-br ${feature.gradient} rounded-2xl border border-white/20 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-starlight mb-2">{feature.title}</h3>
                    <p className="text-lg text-starlight/70">{feature.description}</p>
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
