"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, CreditCardIcon } from './Icons';

const plans = [
  {
    name: "Free Tier",
    price: "$0",
    period: "forever",
    features: [
      "1 Repair / Day",
      "1 Preview",
      "Low-res render",
      "Basic support",
    ],
    cta: "Start Free",
    ctaLink: "https://app.teeli.net/",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: [
      "Unlimited repairs",
      "Full-res 4K renders",
      "Priority queue",
    ],
    cta: "Get Pro",
    ctaLink: "https://app.teeli.net/",
    highlighted: true,
  },
  {
    name: "Pay-Per-Render",
    price: "$1–$5",
    period: "per render",
    features: [
      "Scene size based pricing",
      "No subscription",
      "Pay only when you render",
    ],
    cta: "Learn More",
    ctaLink: "https://app.teeli.net/",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <CreditCardIcon className="w-20 h-20 text-signal-teal" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-starlight mb-4 leading-tight">
            Simple <span className="text-signal-teal">Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-starlight/70">
            No contracts. No hidden fees. No hardware needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group w-full"
            >
              {/* Premium Glassmorphic Card */}
              <div className={`relative bg-white/5 backdrop-blur-xl border rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 h-full flex flex-col ${
                plan.highlighted
                  ? 'border-signal-teal/60 md:scale-105 lg:scale-110 shadow-[0_40px_100px_rgba(22,199,158,0.4)]'
                  : 'border-white/10 hover:border-signal-teal/40 hover:scale-105 hover:shadow-[0_30px_80px_rgba(22,199,158,0.2)]'
              }`}>
                {/* Metallic Shine Overlay */}
                <div className="absolute inset-0 bg-radial-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-3xl"></div>
                
                {/* Gradient Glow Effect for Highlighted */}
                {plan.highlighted && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-br from-signal-teal/20 via-plasma-violet/10 to-transparent rounded-3xl"></div>
                    <div className="absolute -inset-1 bg-linear-to-r from-signal-teal via-plasma-violet to-signal-teal rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                  </>
                )}

                {/* Premium Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20 w-auto whitespace-nowrap">
                    <div className="relative">
                      {/* Glassmorphic Badge */}
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/20 rounded-lg sm:rounded-xl"></div>
                        {/* Top Shine */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        
                        <span className="relative text-white font-bold text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center gap-1.5 sm:gap-2">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent font-black">
                            Most Popular
                          </span>
                        </span>
                      </div>
                      {/* Bottom Glow */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-amber-400/20 blur-xl rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-6 sm:mb-8 mt-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-starlight mb-4 sm:mb-6 tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="flex items-end justify-center gap-1.5 sm:gap-2 mb-2">
                      <span className={`text-4xl sm:text-5xl md:text-6xl font-black ${
                        plan.highlighted 
                          ? 'text-white drop-shadow-[0_0_30px_rgba(22,199,158,0.8)]' 
                          : 'bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'
                      }`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className={`text-base sm:text-lg mb-2 sm:mb-3 font-semibold ${
                          plan.highlighted ? 'text-starlight/80' : 'text-starlight/60'
                        }`}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="relative shrink-0 mt-0.5">
                          <CheckCircleIcon className={`w-6 h-6 ${
                            plan.highlighted ? 'text-red-500' : 'text-cyan-400'
                          }`} />
                          {/* Icon Glow */}
                          <div className={`absolute inset-0 ${
                            plan.highlighted ? 'bg-red-500' : 'bg-cyan-400'
                          } rounded-full blur-md opacity-50`}></div>
                        </div>
                        <span className="text-starlight/90 text-base leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button - Premium Design */}
                  <motion.a
                    href={plan.ctaLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative block w-full py-5 font-black text-lg rounded-2xl transition-all duration-500 overflow-hidden text-center ${
                      plan.highlighted
                        ? 'text-white'
                        : 'text-signal-teal hover:text-white'
                    }`}
                  >
                    {/* Background */}
                    <span className={`absolute inset-0 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-signal-teal via-cyan-500 to-blue-500'
                        : 'bg-white/10 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-purple-500 group-hover:to-pink-500'
                    } transition-all duration-500`} />
                    {/* Glow effect */}
                    <span className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-signal-teal via-cyan-500 to-blue-500'
                        : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'
                    }`} />
                    {/* Shine sweep effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {/* Border */}
                    <span className={`absolute inset-0 rounded-2xl border-2 ${
                      plan.highlighted
                        ? 'border-white/30 group-hover:border-white/50'
                        : 'border-signal-teal/40 group-hover:border-transparent'
                    } transition-colors`} />
                    {/* Content */}
                    <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-lg">
                      {plan.cta}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
