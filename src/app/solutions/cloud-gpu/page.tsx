"use client";

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { 
  Cloud, 
  Server, 
  Zap,
  DollarSign, 
  Globe,
  Building2,
  Film,
  Gamepad2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Network,
  Rocket,
  Shield,
  Database,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

export default function CloudGPURenderingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Unique Hero - Dashboard Style */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Cloud className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Managed Cloud Rendering</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Cloud GPU
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
                Rendering Infrastructure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Upload 3D assets in the browser, repair geometry, and submit render jobs to cloud GPU queues—without
              provisioning servers, managing licenses, or running your own render farm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="https://app.teeli.net/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Try Teeli Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Infrastructure Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[
              { 
                label: "Browser workflow", 
                value: "No install", 
                icon: Cloud, 
                trend: "Upload in browser",
                color: "from-cyan-500 to-cyan-700" 
              },
              { 
                label: "Render engine", 
                value: "Cycles", 
                icon: Server, 
                trend: "Headless Blender",
                color: "from-blue-500 to-blue-700" 
              },
              { 
                label: "Usage model", 
                value: "Credits", 
                icon: DollarSign, 
                trend: "Per render job",
                color: "from-green-500 to-green-700" 
              },
              { 
                label: "GPU access", 
                value: "On demand", 
                icon: Shield, 
                trend: "Queue-based",
                color: "from-purple-500 to-purple-700" 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className={`relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-xl`}
              >
                <stat.icon className="w-6 h-6 text-white/80 mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/70 mb-1">{stat.label}</div>
                <div className="text-xs text-white/60">{stat.trend}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Overview - Network Diagram Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              How Teeli Runs Cloud Renders
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              GPU compute, render orchestration, and storage work together behind a simple browser workflow—not a raw cloud VM you have to configure yourself.
            </p>
          </motion.div>

          {/* Infrastructure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "GPU Compute",
                count: "AWS",
                description: "Render jobs run on AWS cloud GPU infrastructure when queue capacity is available.",
                icon: Globe,
                color: "border-cyan-500/30 bg-cyan-950/20"
              },
              {
                title: "Render Engine",
                count: "Cycles",
                description: "Headless Blender Cycles handles path-traced stills and turntable outputs from your configured scenes.",
                icon: Server,
                color: "border-blue-500/30 bg-blue-950/20"
              },
              {
                title: "Job Queue",
                count: "24/7",
                description: "Upload, diagnose, repair, configure, and submit renders without managing servers or render managers.",
                icon: Database,
                color: "border-green-500/30 bg-green-950/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl border-2 ${item.color} p-8 backdrop-blur-xl text-center`}
              >
                <item.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-2">{item.count}</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Resource Cards */}
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
              Platform Features
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Managed rendering for creators and teams who want results—not infrastructure operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: "Managed Render Queue",
                description: "Submit jobs from the browser and let Teeli handle GPU allocation, rendering, and output delivery.",
                specs: ["No VM setup", "Queue orchestration", "Status tracking"]
              },
              {
                icon: Zap,
                title: "Ray-Traced Output",
                description: "Production-oriented stills and previews through Blender Cycles—not a generic GPU rental console.",
                specs: ["Path tracing", "AI denoising assist", "4K stills on paid plans"]
              },
              {
                icon: DollarSign,
                title: "Credit-Based Usage",
                description: "Rendering consumes plan credits so costs stay tied to actual jobs instead of idle GPU hours.",
                specs: ["Monthly credit pools", "Free tier to start", "Enterprise options"]
              },
              {
                icon: Wrench,
                title: "Mesh Repair First",
                description: "Automated geometry diagnosis and repair runs before rendering so broken meshes fail less often in the queue.",
                specs: ["Non-manifold checks", "Trimesh & LibIGL repair", "Review before render"]
              },
              {
                icon: Globe,
                title: "Cloud Storage & Export",
                description: "Keep projects, uploads, and rendered outputs in your Teeli workspace. Assimp imports and converts OBJ, FBX, GLTF, STL, and other supported formats.",
                specs: ["Assimp format pipeline", "OBJ, FBX, GLTF, STL", "PNG/JPEG/MP4 exports"]
              },
              {
                icon: Shield,
                title: "Secure by Default",
                description: "Authentication, encrypted transport, and isolated project workspaces—Enterprise adds SSO, audit logs, and SLA options.",
                specs: ["Encrypted transport", "Account isolation", "Enterprise governance"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Industry Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
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
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Practical cloud rendering for teams that need clean assets and dependable outputs—not a self-managed render farm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Architecture & Visualization",
                description: "Render stills and turntable previews for client reviews after geometry checks and mesh cleanup in the browser.",
                examples: [
                  { label: "Exterior stills", href: "/contact?service=architectural-renders" },
                  { label: "Interior previews", href: "/contact?service=arch-animations" },
                  { label: "Marketing frames", href: "/contact?service=marketing-cloud" },
                  { label: "Portfolio outputs", href: "/contact?service=vr-ar-cloud" }
                ],
                gradient: "from-cyan-500/20 to-green-500/20",
                borderColor: "border-cyan-500/30"
              },
              {
                icon: ShoppingBag,
                title: "E-commerce & Product",
                description: "Turn repaired product models into catalog stills and turntable renders without local GPU hardware.",
                examples: [
                  { label: "Product stills", href: "/contact?service=product-viz" },
                  { label: "Turntable previews", href: "/contact?service=catalog-images" },
                  { label: "Catalog frames", href: "/contact?service=lifestyle-shots" },
                  { label: "Launch assets", href: "/contact?service=packaging-design" }
                ],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                icon: Gamepad2,
                title: "Game Development",
                description: "Preview assets, generate marketing renders, and validate cleaned meshes before importing into your engine pipeline.",
                examples: [
                  { label: "Asset previews", href: "/contact?service=asset-processing-cloud" },
                  { label: "Prop stills", href: "/contact?service=texture-baking" },
                  { label: "Marketing renders", href: "/contact?service=cutscene-rendering" },
                  { label: "Mesh validation", href: "/contact?service=lightmap-baking" }
                ],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Film,
                title: "Media & Pre-Visualization",
                description: "Iterate on look development and frame previews in the cloud while keeping heavy final comp work in your existing DCC stack.",
                examples: [
                  { label: "Look-dev frames", href: "/contact?service=vfx-rendering" },
                  { label: "Concept previews", href: "/contact?service=animation-sequences" },
                  { label: "Story frames", href: "/contact?service=feature-film" },
                  { label: "Batch stills", href: "/contact?service=batch-processing" }
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
                className={`rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <useCase.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Link key={idx} href={example.href}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300 border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer"
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

      {/* Workflow - Process Steps */}
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
              Teeli Cloud Render Workflow
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Cloud rendering depends on queue capacity, file complexity, and infrastructure availability—review outputs before production use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: "Upload Assets", 
                description: "Import GLTF, OBJ, FBX, STL, and other supported formats. Assimp normalizes uploads before geometry processing.",
                icon: Cloud
              },
              { 
                step: "02", 
                title: "Diagnose & Repair", 
                description: "Automated geometry checks and mesh repair reduce failed jobs before they reach the GPU queue.",
                icon: Wrench
              },
              { 
                step: "03", 
                title: "Queue Render", 
                description: "Configure scene settings and submit the job to cloud GPU infrastructure when you are ready.",
                icon: Network
              },
              { 
                step: "04", 
                title: "Export Results", 
                description: "Download PNG, JPEG, MP4, or turntable outputs plus diagnostics from your workspace.",
                icon: Rocket
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
                <div className="rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 backdrop-blur-xl p-6 text-center h-full">
                  <div className="text-4xl font-bold text-cyan-500/20 mb-3">{item.step}</div>
                  <item.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-5 h-5 text-cyan-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Minimal List */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Infrastructure Stack
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Assimp import, Trimesh and LibIGL repair, Babylon.js preview, and Blender Cycles rendering—hosted on AWS GPU cloud infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Assimp", description: "Universally import and convert 3D formats—including OBJ, FBX, GLTF, and STL—before processing" },
              { name: "Trimesh & LibIGL", description: "Python backend libraries for geometry processing and auto-healing non-manifold edges" },
              { name: "Babylon.js & WebGPU", description: "Real-time, lightning-fast 3D preview directly in the browser" },
              { name: "Blender Cycles", description: "Final high-quality headless server-side path tracing for stills and turntable outputs" },
              { name: "AWS GPU Cloud", description: "Queued render workloads execute on AWS cloud GPU infrastructure" },
              { name: "Credit Metering", description: "Usage tracked through plan credits rather than raw GPU-hour billing" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-xl p-6"
              >
                <Cpu className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="font-heading text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-zinc-400">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Benefits Side */}
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
                Why Choose Teeli Cloud GPU?
              </h2>
              <div className="space-y-4">
                {[
                  "No local GPU hardware or render farm setup required",
                  "Repair-first workflow before jobs hit the render queue",
                  "Credit-based plans aligned to actual render usage",
                  "Browser upload, preview, queue, and export in one place",
                  "Enterprise options for teams, SSO, and SLA discussions",
                  "Review diagnostics and outputs before production use"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
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
              className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-blue-950/40 to-cyan-950/40 backdrop-blur-xl p-10 text-center"
            >
              <Cloud className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Ready to Render in the Cloud?
              </h3>
              <p className="text-zinc-300 mb-8">
                Start with a free account and test the full upload-to-render workflow at app.teeli.net.
              </p>
              <Link href="https://app.teeli.net/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Open Teeli App
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
