"use client";

import { motion } from 'framer-motion';
import { Cookie, Settings, Palette, AlertCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Cookie,
      type: 'Essential Cookies & Storage',
      color: 'from-cyan-500 to-blue-600',
      necessary: true,
      description: 'Required to deliver the website and platform securely.',
      retention: 'Session to 12 months, depending on purpose',
      examples: [
        'Authentication and session handling on TEELI platform pages',
        'Security, abuse prevention, and request integrity',
        'Load balancing, caching, and reliable page delivery',
        'Remembering cookie or privacy choices where a consent control is shown',
      ],
    },
    {
      icon: BarChart3,
      type: 'Analytics & Performance',
      color: 'from-purple-500 to-pink-600',
      necessary: false,
      description: 'Used to understand site usage and improve performance.',
      retention: 'Vercel: aggregated/short-lived; GA4: up to 2 years by default',
      examples: [
        'Vercel Web Analytics page views and referrer trends without cookies',
        'Vercel Speed Insights Core Web Vitals and device/browser performance',
        'Google Analytics 4 page views and events when GA4 is enabled',
        'Google Tag Manager may load measurement tags configured by TEELI.NET',
      ],
    },
    {
      icon: Palette,
      type: 'Preference Storage',
      color: 'from-green-500 to-emerald-600',
      necessary: false,
      description: 'Remembers choices you make while using TEELI.NET.',
      retention: 'Until you clear browser storage or change the setting',
      examples: [
        'Theme preferences such as dark or light mode',
        'Saved blog bookmarks, likes, shares, and local view history',
        'Interface preferences that make repeat visits easier',
        'Local browser settings that are not used for advertising',
      ],
    },
    {
      icon: Settings,
      type: 'Functional Storage',
      color: 'from-orange-500 to-red-600',
      necessary: false,
      description: 'Supports optional features that improve product workflows.',
      retention: 'Feature-specific; usually until cleared or changed',
      examples: [
        'Video or interactive viewer preferences when those tools are used',
        'Saved rendering presets or dashboard preferences on app.teeli.net',
        'Support or contact form state used to complete a request',
        'Notification or communication preferences if you opt in',
      ],
    },
  ];

  return (
    <>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 mb-6">
              <Cookie className="w-10 h-10 text-yellow-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              How TEELI.NET uses cookies, local storage, analytics, and similar technologies.
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: May 26, 2026 | Effective as of May 26, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative w-full bg-gradient-to-b from-black via-yellow-950/20 to-black py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none text-center"
          >
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              This Cookie Policy applies to teeli.net and TEELI-operated platform pages that link to it.
              Cookies are small files stored in your browser. Similar technologies include localStorage,
              scripts, pixels, and performance beacons. We use them only for site delivery, security,
              product preferences, analytics, and performance monitoring. We do not use this website to
              sell cookie data or run third-party advertising cookies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-black/60 via-amber-950/20 to-black/60 backdrop-blur-xl p-8"
                style={{ boxShadow: '0 10px 30px rgba(234, 179, 8, 0.05)' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${cookie.color} flex-shrink-0`}>
                    <cookie.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {cookie.type}
                      </h3>
                      {cookie.necessary && (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">
                      {cookie.description}
                    </p>
                    <p className="text-xs text-yellow-300/80 mb-4">
                      Retention: {cookie.retention}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {cookie.examples.map((example) => (
                    <li key={example} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <span className="text-yellow-400 mt-1">-</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-black/80 via-amber-950/30 to-black/80 backdrop-blur-xl p-12"
            style={{ boxShadow: '0 20px 60px rgba(234, 179, 8, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 mb-6">
                <Settings className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-white mb-6">
                Managing Your Cookies
              </h2>

              <div className="space-y-6 text-zinc-300">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Browser Settings
                  </h3>
                  <p className="leading-relaxed">
                    Most browsers allow you to block cookies, accept only first-party cookies,
                    delete existing cookies, and clear localStorage for a specific site. Blocking
                    essential cookies can prevent login, security checks, file upload flows, or
                    other platform features from working correctly.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Analytics Choices
                  </h3>
                  <p className="leading-relaxed">
                    TEELI.NET uses Vercel Analytics and Speed Insights for privacy-conscious,
                    aggregated measurement. Google Analytics and Google Tag Manager are configured
                    separately and may set analytics cookies when enabled. If a consent banner or
                    preference control is displayed, use it to manage non-essential analytics choices.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Local Storage Controls
                  </h3>
                  <p className="leading-relaxed">
                    Some preferences and interactions are saved in your browser's localStorage.
                    You can clear these records from browser site-data settings. Clearing local
                    storage may reset theme choices, bookmarks, likes, local view counts, and
                    saved UI state.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Third-Party Technologies */}
      <section className="relative w-full bg-black py-24 px-4 border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-8 rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-black/60 via-amber-950/20 to-black/60"
          >
            <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Third-Party Technologies
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                TEELI.NET currently uses Vercel for hosting, analytics, and performance insights.
                The website is also configured for Google Analytics 4 and Google Tag Manager.
                GA4 JavaScript tags use first-party cookies such as _ga and _ga_[id] to distinguish
                users and sessions. We do not intentionally use third-party advertising cookies on
                teeli.net. If advertising, remarketing, payment, chat, or embedded media tools are
                added later, this page must be updated with the provider, purpose, and retention details.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
