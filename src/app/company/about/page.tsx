"use client";

import { motion } from 'framer-motion';
import {
  Target,
  Award,
  Globe,
  Code2,
  Cloud,
  Wrench,
  Cpu,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { TEELI_APP_URL } from '@/lib/social-links';

export default function AboutPage() {
  const productHighlights = [
    {
      value: 'Browser',
      label: 'SaaS workflow',
      detail: 'Upload, repair, preview, and queue renders without installing Blender or running your own farm.',
      icon: Cloud,
    },
    {
      value: 'Repair',
      label: 'Before you render',
      detail: 'Assimp import plus Trimesh and LibIGL checks catch non-manifold geometry before jobs fail in the queue.',
      icon: Wrench,
    },
    {
      value: 'Cycles',
      label: 'Cloud rendering',
      detail: 'Headless Blender Cycles on AWS GPU workers when queue capacity is available—not a proprietary real-time engine.',
      icon: Cpu,
    },
    {
      value: 'Credits',
      label: 'Simple billing',
      detail: 'Pay with credits for diagnostics, repairs, and render jobs. No raw GPU-hour console to manage yourself.',
      icon: DollarSign,
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'One Product, One Workflow',
      description:
        'Teeli is a focused browser app—not an agency, consultancy, or white-label shop. We build software you can sign up for and use the same day.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Globe,
      title: 'Honest About Limits',
      description:
        'Repair and render outputs are assistive. Queue time, sample count, and scene complexity affect results. You review before production use.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code2,
      title: 'Built on Proven Tools',
      description:
        'We orchestrate open-source tooling you already trust—Assimp, Trimesh, LibIGL, Babylon.js, WebGPU preview, and Blender Cycles.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Quality You Verify',
      description:
        'Diagnostics, repair logs, previews, and final stills or turntable exports stay in your workspace until you are ready to ship them.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              About TEELI.NET
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-8">
              We build <span className="text-cyan-400">Teeli</span>—a browser-based app for people who upload 3D models and need them{' '}
              <span className="text-purple-400">repaired</span>, <span className="text-pink-400">previewed</span>, and{' '}
              <span className="text-cyan-400">rendered in the cloud</span>.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Teeli.NET is a software product company. We are not a render-farm reseller, development agency, or enterprise
              services shop. You work at{' '}
              <a href={TEELI_APP_URL} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                app.teeli.net
              </a>
              , upload assets, review geometry diagnostics, and submit cloud render jobs from one workspace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/20 to-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-cyan-950/20 to-black/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-6">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-lg text-zinc-300 leading-relaxed mb-4">
                  Make cloud 3D rendering practical for everyday work—not something that requires a local render farm,
                  a dedicated IT team, or a maze of desktop tools.
                </p>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Teeli helps visualization teams, product designers, and creators upload models in the browser, catch mesh
                  problems early, preview scenes with WebGPU, and export PNG, JPEG, MP4, or turntable outputs after a Cycles
                  job completes.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/20 to-black/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-6">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-lg text-zinc-300 leading-relaxed mb-4">
                  One tab where import, repair, preview, render, and export live together—so you spend less time fighting broken
                  geometry and more time reviewing finished frames.
                </p>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  AI assists with denoising and geometry checks; it does not replace your scene setup or professional judgment.
                  We want Teeli to feel like a calm, dependable SaaS workspace—not a hype deck about the future of computing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Highlights — replaces fake stats */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">What Teeli Actually Is</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Real product facts—not vanity metrics. Render time and quality still depend on your scene, settings, and queue
              capacity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productHighlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-6 text-left group hover:border-cyan-500/60 transition-all"
                style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.05)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all rounded-2xl"></div>
                <div className="relative">
                  <item.icon className="w-10 h-10 mb-4 text-cyan-400" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-sm font-semibold text-cyan-300/90 mb-3">{item.label}</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">How We Build</h2>
            <p className="text-xl text-zinc-400">Principles that keep Teeli honest and useful</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-zinc-900/40 backdrop-blur-sm p-6 md:p-8 group hover:border-white/30 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} mb-4`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/30 to-black py-32 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 backdrop-blur-xl p-12 md:p-16"
            style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
            <div className="relative">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Try the App Yourself
              </h2>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Upload a model at app.teeli.net, run diagnostics, preview in the browser, and queue a render with credits—no
                sales call required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={TEELI_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Open Teeli App
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 bg-black/50 text-white font-semibold text-lg hover:border-cyan-500 transition-all"
                >
                  Explore Our Blog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
