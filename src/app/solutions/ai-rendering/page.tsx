"use client";

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Layers, 
  Palette,
  Building2,
  Film,
  Gamepad2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Code,
  TrendingUp,
  Eye,
  Target,
  Rocket,
  Network,
  Infinity
} from 'lucide-react';
import Link from 'next/link';

export default function AIRenderingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Unique Hero - Side Split Design */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-purple-400 font-semibold uppercase tracking-wider text-sm">AI-Powered Rendering</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                AI-Assisted Rendering
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  In the Browser
                </span>
              </h1>
              
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Upload 3D assets, diagnose and repair geometry, configure scenes, and run cloud renders—all in one browser workflow. 
                AI-assisted denoising and mesh tools help you iterate faster without replacing proven ray-tracing pipelines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.teeli.net/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Try Teeli Free
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Visual Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "Browser", label: "Based workflow", icon: Zap, color: "from-purple-500 to-purple-700" },
                { value: "AI", label: "Mesh & denoise", icon: Target, color: "from-pink-500 to-pink-700" },
                { value: "24/7", label: "Cloud queues", icon: Brain, color: "from-purple-500 to-pink-500" },
                { value: "GPU", label: "On demand", icon: Infinity, color: "from-pink-500 to-purple-700" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`relative rounded-2xl p-6 bg-gradient-to-br ${stat.color} border border-white/10`}
                >
                  <stat.icon className="w-8 h-8 mb-3 text-white" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is AI Rendering - Timeline Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              How AI Assists Rendering
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Production rendering still relies on physically based light transport. AI helps by reducing noise, speeding previews, and automating geometry checks—not by replacing ray tracing entirely.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block"></div>

            {[
              {
                title: "Traditional Rendering",
                description: "Path-traced or ray-traced frames converge sample-by-sample. Final production quality often takes hours per frame at high resolution.",
                time: "Hours per frame",
                color: "border-red-500/30 bg-red-950/20"
              },
              {
                title: "AI-Assisted Previews",
                description: "Fewer samples plus AI denoising produce cleaner previews faster—useful for lighting and composition iteration before final renders.",
                time: "Minutes (preview)",
                color: "border-purple-500/30 bg-purple-950/20"
              },
              {
                title: "Hybrid Approach",
                description: "Combine cloud ray tracing with AI denoising and Teeli's mesh repair pipeline for a practical balance of quality and turnaround.",
                time: "Varies by scene",
                color: "border-pink-500/30 bg-pink-950/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-12 md:pl-20"
              >
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center hidden md:flex">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className={`rounded-2xl border-2 ${item.color} p-6 backdrop-blur-xl`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm text-purple-400 font-semibold">{item.time}</span>
                  </div>
                  <p className="text-zinc-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Network Features - Network Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              AI in the Teeli Pipeline
            </h2>
            <p className="text-lg text-zinc-400">
              Assistive automation across upload, diagnosis, repair, and render—not a black-box replacement for your DCC tools
            </p>
          </motion.div>

          {/* Network Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Scene Understanding",
                description: "Automated geometry analysis flags non-manifold meshes, holes, and other issues before they break your render queue.",
                connections: ["Geometry checks", "Issue detection", "Repair suggestions"]
              },
              {
                icon: Sparkles,
                title: "AI Denoising",
                description: "Industry-standard AI denoising reduces noise in low-sample previews so you can review lighting and materials sooner.",
                connections: ["Preview acceleration", "Noise reduction", "Iterative feedback"]
              },
              {
                icon: Layers,
                title: "Material Intelligence",
                description: "PBR-aware processing helps preserve material response through repair and export steps in your browser workflow.",
                connections: ["PBR materials", "Texture handling", "Export readiness"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 backdrop-blur-xl p-8 hover:border-pink-500/50 transition-all group"
              >
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-white mb-4 mt-4">{feature.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.connections.map((conn, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-zinc-400">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>{conn}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications - Card Stack Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-pink-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Industry Applications
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Architecture & Real Estate",
                description: "Generate photorealistic architectural visualizations for client presentations and marketing materials.",
                examples: [
                  { label: "Exterior renders", href: "/contact?service=exterior-renders" },
                  { label: "Interior design", href: "/contact?service=interior-design" },
                  { label: "Virtual tours", href: "/contact?service=virtual-tours" },
                  { label: "Marketing materials", href: "/contact?service=marketing-materials" }
                ],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                icon: Film,
                title: "Entertainment & Media",
                description: "Create stunning visual effects and pre-visualizations for film, TV, and digital content.",
                examples: [
                  { label: "VFX pre-vis", href: "/contact?service=vfx-previs" },
                  { label: "Concept art", href: "/contact?service=concept-art" },
                  { label: "Storyboarding", href: "/contact?service=storyboarding" },
                  { label: "Post-production", href: "/contact?service=post-production" }
                ],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Gamepad2,
                title: "Game Development",
                description: "Accelerate asset creation and environment design with AI-powered rendering workflows.",
                examples: [
                  { label: "Environment design", href: "/contact?service=env-design" },
                  { label: "Character concepts", href: "/contact?service=character-concepts" },
                  { label: "Prop creation", href: "/contact?service=prop-creation" },
                  { label: "Lightmap previews", href: "/contact?service=lightmap-previews" }
                ],
                gradient: "from-red-500/20 to-orange-500/20",
                borderColor: "border-red-500/30"
              },
              {
                icon: ShoppingBag,
                title: "E-commerce & Product",
                description: "Generate high-quality product renders for online catalogs and marketing campaigns.",
                examples: [
                  { label: "Product visualization", href: "/contact?service=product-viz" },
                  { label: "Catalog images", href: "/contact?service=catalog-images" },
                  { label: "Lifestyle shots", href: "/contact?service=lifestyle-shots" },
                  { label: "Packaging design", href: "/contact?service=packaging-design" }
                ],
                gradient: "from-green-500/20 to-emerald-500/20",
                borderColor: "border-green-500/30"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <useCase.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Link key={idx} href={example.href}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300 border border-white/20 hover:bg-white/20 hover:border-purple-400/50 hover:text-purple-300 transition-all cursor-pointer"
                      >
                        {example.label}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Teeli Rendering Workflow
            </h2>
          </motion.div>

          {/* Horizontal Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: "Upload Assets", 
                description: "Upload models, meshes, and scenes directly in the browser—no desktop install required.",
                icon: Network
              },
              { 
                step: "02", 
                title: "Diagnose & Repair", 
                description: "Automated geometry checks and repair heuristics surface issues before rendering starts.",
                icon: Brain
              },
              { 
                step: "03", 
                title: "Configure & Queue", 
                description: "Set render settings and submit jobs to cloud GPU infrastructure when you are ready.",
                icon: Zap
              },
              { 
                step: "04", 
                title: "Export Results", 
                description: "Download renders and diagnostics. Review outputs before using them in production workflows.",
                icon: Sparkles
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 backdrop-blur-xl p-6 text-center h-full">
                  <div className="text-5xl font-bold text-purple-500/20 mb-4">{item.step}</div>
                  <item.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Minimal Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Advanced Technology Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { name: "Cloud GPUs", icon: Brain },
              { name: "AI Denoising", icon: Network },
              { name: "Ray Tracing", icon: Eye },
              { name: "Mesh Repair", icon: Sparkles },
              { name: "PBR Materials", icon: Layers }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl p-6 text-center hover:border-pink-500/50 transition-all group"
              >
                <tech.icon className="w-10 h-10 text-purple-400 mx-auto mb-3 group-hover:text-pink-400 transition-colors" />
                <h3 className="text-sm font-semibold text-white">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Unique Split Design */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Experience
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  AI-Powered Rendering?
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                A browser-based 3D workflow with cloud rendering and AI-assisted tools. Faster iteration—not magic shortcuts.
              </p>
              <div className="space-y-4">
                {[
                  "Automated mesh diagnosis and repair",
                  "AI denoising for faster preview feedback",
                  "Cloud GPU rendering on demand",
                  "Browser-based—no desktop installs"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-pink-950/40 to-purple-950/40 backdrop-blur-xl p-10 text-center"
            >
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Start Your AI Rendering Journey
              </h3>
              <p className="text-zinc-300 mb-8">
                Start with a free account and test the full upload-to-render workflow at app.teeli.net.
              </p>
              <Link href="https://app.teeli.net/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
