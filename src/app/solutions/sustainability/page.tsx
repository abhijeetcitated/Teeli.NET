"use client";

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Footer from '@/components/Footer';
import {
  Leaf,
  Zap,
  TrendingDown,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Activity,
  Target,
  Gauge,
  Earth,
  DollarSign,
  Wrench,
  Server,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pipelineSteps = [
    {
      id: 0,
      title: "Run Scan",
      description: "Geometry diagnostics run before rendering so you know what will be processed.",
      icon: Gauge,
      color: "from-emerald-500 to-green-600",
      metric: "Diagnostic"
    },
    {
      id: 1,
      title: "Auto-Heal",
      description: "Automated mesh repair reduces failed jobs and repeated GPU work.",
      icon: Wrench,
      color: "from-teal-500 to-cyan-600",
      metric: "AI-Repair"
    },
    {
      id: 2,
      title: "Cloud Render",
      description: "GPU-accelerated renders run on AWS cloud infrastructure when queue capacity is available.",
      icon: Server,
      color: "from-lime-500 to-emerald-600",
      metric: "GPU job"
    },
    {
      id: 3,
      title: "CO₂ Estimate",
      description: "Per-job gram-level CO₂ estimate with efficiency and green node type in your dashboard.",
      icon: Leaf,
      color: "from-green-600 to-teal-600",
      metric: "Eco card"
    },
    {
      id: 4,
      title: "Cost Estimate",
      description: "Line-item billing for diagnostic, repair, and render steps in credits and USD.",
      icon: DollarSign,
      color: "from-emerald-600 to-green-700",
      metric: "Pay-per-use"
    }
  ];

  const sustainabilityMetrics = [
    {
      title: "CO₂ Estimate",
      value: "Per job",
      description: "Gram-level emissions estimate shown alongside each render in the app",
      icon: Leaf,
      trend: "down",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Efficiency Score",
      value: "Node-based",
      description: "Efficiency rating tied to the green node profile assigned to your job",
      icon: Zap,
      trend: "up",
      color: "from-yellow-500 to-amber-600"
    },
    {
      title: "Green Node Type",
      value: "Labeled",
      description: "See which infrastructure profile processed your render before you commit credits",
      icon: Globe,
      trend: "up",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Cost Breakdown",
      value: "CR + USD",
      description: "Diagnostic, AI-repair, and GPU render costs summarized before you submit",
      icon: DollarSign,
      trend: "down",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-black text-white overflow-hidden">

      {/* Unique Hero - Circular Pipeline Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Background - Organic Flow Patterns */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/30 to-lime-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Cost & CO₂ Transparency</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              Render Cost &
            </span>
            <span className="block text-white mt-2">CO₂ Estimates</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-emerald-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            See diagnostic, repair, and GPU render costs in credits and USD—plus a per-job CO₂ estimate—directly in your Teeli dashboard before you queue a render.
          </motion.p>

          {/* Circular Pipeline Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full max-w-4xl mx-auto aspect-square mb-12"
          >
            {/* Outer Ring - Pipeline Flow */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 8px)"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 50}%`}
                  strokeDashoffset="0"
                  className="animate-spin-slow"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pipeline Steps in Circle */}
            <div className="absolute inset-0">
              {pipelineSteps.map((step, index) => {
                const angle = (index * 360) / pipelineSteps.length - 90;
                const radius = 42;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                const Icon = step.icon;
                const isSelected = selectedMetric === step.id;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedMetric(step.id)}
                    className="cursor-pointer group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${step.color} border-4 ${
                        isSelected ? 'border-white shadow-[0_0_30px_rgba(16,185,129,0.8)]' : 'border-emerald-900/50'
                      } flex items-center justify-center transition-all duration-300`}
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute -inset-2 rounded-full border-2 border-emerald-400"
                        />
                      )}
                    </motion.div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-32 md:w-40">
                      <p className={`text-xs md:text-sm font-bold text-center ${isSelected ? 'text-emerald-400' : 'text-emerald-300/70'}`}>
                        {step.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Center - Main Metric Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={selectedMetric !== null ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-emerald-900/80 to-green-950/80 backdrop-blur-xl border-4 border-emerald-500/30 flex flex-col items-center justify-center p-8"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2 text-center leading-tight">
                  {pipelineSteps[selectedMetric]?.metric || "Estimate"}
                </div>
                <div className="text-xs md:text-sm text-emerald-300/80 text-center font-semibold uppercase tracking-wider">
                  {pipelineSteps[selectedMetric]?.title || "Dashboard"}
                </div>
                <Leaf className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mt-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="https://app.teeli.net/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Try Teeli Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="https://app.teeli.net/">
              <button className="px-8 py-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-lg hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Open Dashboard
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Metrics Grid - Unique Card Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-emerald-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              In-App Estimate Cards
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              CO₂ and billing transparency built into the render panel—not a separate audit service or compliance portal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-all group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-emerald-400">{metric.value}</h3>
                      {metric.trend === "down" ? (
                        <TrendingDown className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-emerald-400 rotate-180" />
                      )}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{metric.title}</h4>
                    <p className="text-sm text-emerald-200/70 leading-relaxed">{metric.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-sm text-emerald-200/50 text-center mt-10 max-w-2xl mx-auto">
            CO₂ figures are indicative estimates based on job settings, node type, and infrastructure profile. They are not audited carbon accounting or regulatory compliance reports.
          </p>
        </div>
      </section>

      {/* Pipeline Process - Vertical Flow with Connection Lines */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              How Estimates Fit the Workflow
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              Scan, repair, render, and review cost plus CO₂ context in the same browser session.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 via-teal-600 to-green-600 transform md:-translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 via-teal-600 to-green-600 block md:hidden"></div>

            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 md:gap-12 mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black transform md:-translate-x-1/2 z-10"></div>

                  <div className={`ml-16 md:ml-0 flex-1 ${
                    isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: isEven ? 5 : -5 }}
                      className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 md:p-8"
                    >
                      <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br ${step.color} mb-4`}>
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm">Step {index + 1}</span>
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-emerald-200/80 leading-relaxed mb-4">{step.description}</p>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-semibold">{step.metric}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Grid - Organic Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-emerald-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Why It Matters
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              Practical transparency for creators and teams—not enterprise ESG theater.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Per-Job CO₂ Context",
                description: "Understand the estimated emissions footprint of an individual render before you spend credits.",
                icon: Leaf,
                color: "from-emerald-500 to-teal-600"
              },
              {
                title: "Line-Item Cost Clarity",
                description: "See diagnostic, AI-repair, and GPU render charges broken out in credits and USD.",
                icon: DollarSign,
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Repair Before GPU Spend",
                description: "Fix mesh issues upstream so you waste fewer credits on jobs that fail in the queue.",
                icon: Wrench,
                color: "from-teal-500 to-cyan-600"
              },
              {
                title: "Green Node Visibility",
                description: "Know which infrastructure profile handled your job, including efficiency labeling in the dashboard.",
                icon: Activity,
                color: "from-lime-500 to-green-600"
              },
              {
                title: "AWS Cloud Rendering",
                description: "GPU workloads run on AWS cloud infrastructure with queue-based orchestration.",
                icon: Server,
                color: "from-yellow-500 to-amber-600"
              },
              {
                title: "Review Before Production",
                description: "Use estimates to compare settings and outputs before relying on renders in client work.",
                icon: CheckCircle2,
                color: "from-emerald-600 to-green-700"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-emerald-200/70 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Earth Theme */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-green-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)`
              }}></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <Earth className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                See Estimates in the App
              </h2>
              <p className="text-xl text-emerald-200/80 mb-8 max-w-2xl mx-auto">
                Upload a model, review the CO₂ and cost cards beside Cloud Render, and queue jobs with clearer context at app.teeli.net.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://app.teeli.net/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Open Teeli App
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/solutions/cloud-gpu">
                  <button className="px-8 py-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-lg hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Cloud GPU Workflow
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
