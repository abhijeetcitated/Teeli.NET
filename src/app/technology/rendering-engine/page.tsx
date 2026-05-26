"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Footer from '@/components/Footer';
import {
  Cpu,
  Zap,
  Layers,
  Eye,
  Sparkles,
  Box,
  ArrowRight,
  CheckCircle2,
  Monitor,
  Activity,
  Rocket,
  Timer,
  TrendingUp,
  Wrench,
  Upload,
} from 'lucide-react';
import Link from 'next/link';

export default function RenderingEnginePage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const renderingFeatures = [
    {
      id: 0,
      title: "Path Tracing",
      description: "Production stills and turntable outputs through headless Blender Cycles on AWS GPU infrastructure—not a custom real-time engine.",
      icon: Sparkles,
      specs: "Blender Cycles",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 1,
      title: "Browser Preview",
      description: "Orbit, zoom, and inspect repaired models in the browser with Babylon.js and WebGPU before you spend render credits.",
      icon: Eye,
      specs: "WebGPU",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      title: "Mesh Repair",
      description: "Assimp import plus Trimesh and LibIGL geometry checks reduce broken jobs before they reach the render queue.",
      icon: Wrench,
      specs: "Auto-heal",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      title: "GPU Rendering",
      description: "Cloud render jobs run on GPU-backed workers when queue capacity is available. Throughput depends on scene complexity and settings.",
      icon: Zap,
      specs: "AWS GPUs",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 4,
      title: "AI Denoising",
      description: "Assistive denoising helps you review lighting and materials with fewer samples. Final quality still depends on your render settings.",
      icon: Layers,
      specs: "Assistive AI",
      color: "from-violet-500 to-fuchsia-600"
    },
    {
      id: 5,
      title: "Export Outputs",
      description: "Download PNG, JPEG, MP4, or turntable previews plus diagnostics from your workspace after the job completes.",
      icon: Monitor,
      specs: "Up to 4K",
      color: "from-sky-500 to-cyan-600"
    }
  ];

  const performanceMetrics = [
    {
      title: "Render Engine",
      value: "Cycles",
      description: "Headless Blender path tracing for cloud jobs",
      icon: Rocket,
      trend: "up"
    },
    {
      title: "Browser Preview",
      value: "WebGPU",
      description: "Interactive 3D viewing without a desktop install",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Sample Control",
      value: "Configurable",
      description: "Adjust samples and resolution before queueing",
      icon: Timer,
      trend: "up"
    },
    {
      title: "Billing",
      value: "Credits",
      description: "Pay per diagnostic, repair, and render job",
      icon: Cpu,
      trend: "down"
    }
  ];

  const technicalSpecs = [
    {
      category: "Import Pipeline",
      items: ["Assimp conversion", "OBJ, FBX, GLTF, STL", "Browser upload"]
    },
    {
      category: "Geometry Processing",
      items: ["Trimesh repair", "LibIGL checks", "Non-manifold detection"]
    },
    {
      category: "Cloud Rendering",
      items: ["Blender Cycles", "AWS GPU workers", "Queue orchestration"]
    },
    {
      category: "Outputs",
      items: ["PNG / JPEG stills", "MP4 turntable", "Diagnostics & logs"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-black text-white overflow-hidden">

      {/* Unique Hero - Hexagonal Grid with Ray Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Background - Hexagonal Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z' fill='none' stroke='%236366f1' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Animated Ray Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const length = 800;
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-px h-1 bg-gradient-to-t from-blue-500 via-cyan-400 to-transparent"
                style={{
                  transformOrigin: '0 0',
                  transform: `rotate(${angle}rad)`,
                  height: `${length}px`,
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Teeli Render Pipeline</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Blender Cycles
            </span>
            <span className="block text-white mt-2">Cloud Rendering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Teeli wraps a practical browser workflow around proven tools—Assimp import, mesh repair, WebGPU preview, and headless Cycles renders on AWS GPUs.
          </motion.p>

          {/* Hexagonal Feature Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full max-w-5xl mx-auto mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {renderingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isSelected = selectedFeature === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    onClick={() => setSelectedFeature(feature.id)}
                    className="cursor-pointer group relative"
                  >
                    <div className="relative w-full aspect-square">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} ${
                          isSelected ? 'opacity-100 scale-110' : 'opacity-60'
                        } transition-all duration-300`}
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      />
                      <div
                        className={`absolute inset-[2px] bg-black ${
                          isSelected ? 'border-2 border-blue-400' : 'border border-blue-500/30'
                        } transition-all duration-300`}
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                        <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-3 ${
                          isSelected ? 'text-blue-400' : 'text-blue-300/70'
                        } transition-colors`} />
                        <h3 className={`text-sm md:text-base font-bold text-center mb-2 ${
                          isSelected ? 'text-white' : 'text-blue-200/80'
                        } transition-colors`}>
                          {feature.title}
                        </h3>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs text-blue-300 text-center"
                          >
                            {feature.specs}
                          </motion.div>
                        )}
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute -inset-1 border-2 border-blue-400 rounded-full opacity-50"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Selected Feature Details */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-950/60 to-black/60 backdrop-blur-xl p-8 text-center">
              <p className="text-lg text-blue-200/80 leading-relaxed">
                {renderingFeatures[selectedFeature]?.description}
              </p>
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
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Try Teeli Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/solutions/cloud-gpu">
              <button className="px-8 py-4 rounded-xl border-2 border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-lg hover:bg-blue-500/20 transition-all flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Cloud GPU Workflow
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics - Technical Dashboard */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-indigo-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Pipeline Highlights
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              What powers Teeli rendering today—without fabricated benchmark numbers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-400">{metric.value}</h3>
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-green-400 rotate-180" />
                      )}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{metric.title}</h4>
                    <p className="text-sm text-blue-200/70 leading-relaxed">{metric.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-sm text-blue-200/50 text-center mt-10 max-w-2xl mx-auto">
            Render time and quality vary by mesh complexity, sample count, resolution, and queue capacity. Review outputs before production use.
          </p>
        </div>
      </section>

      {/* Technical Specifications - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Technical Stack
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              Open-source rendering and repair tooling orchestrated through Teeli&apos;s browser workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-4">{spec.category}</h3>
                <div className="space-y-2">
                  {spec.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-blue-200/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rendering Pipeline - Flow Diagram */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-indigo-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Teeli Render Workflow
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              From upload to export in one browser session.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hidden md:block transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { title: "Import", icon: Upload, color: "from-blue-500 to-cyan-600" },
                { title: "Repair", icon: Wrench, color: "from-cyan-500 to-blue-600" },
                { title: "Preview", icon: Eye, color: "from-purple-500 to-pink-600" },
                { title: "Render", icon: Sparkles, color: "from-pink-500 to-purple-600" },
                { title: "Export", icon: Monitor, color: "from-indigo-500 to-blue-600" }
              ].map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-black"></div>
                    </div>

                    <div className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 text-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">{stage.title}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-indigo-950/40 via-blue-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <Cpu className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Test the Render Pipeline
              </h2>
              <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                Upload a model, preview it in the browser, and queue a Cycles render at app.teeli.net.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://app.teeli.net/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Open Teeli App
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
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
