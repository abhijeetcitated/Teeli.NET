"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Box,
  BriefcaseBusiness,
  Cloud,
  Database,
  FileCode2,
  Gauge,
  Headphones,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CreditCardIcon } from './Icons';

type Plan = {
  name: string;
  label: string;
  description: string;
  price: string;
  period: string;
  creditsLabel: string;
  creditsAmount: string;
  creditsNote: string;
  cta: string;
  ctaLink: string;
  icon: LucideIcon;
  highlighted?: boolean;
  badge?: string;
  features: Array<{
    icon: LucideIcon;
    text: string;
  }>;
};

const plans: Plan[] = [
  {
    name: "Starter",
    label: "For exploration",
    description: "Create a zero-credit account and test the 3D workflow.",
    price: "$0",
    period: "/ month",
    creditsLabel: "Signup Credits",
    creditsAmount: "0 CR",
    creditsNote: "Included signup credits",
    cta: "Start Free",
    ctaLink: "https://app.teeli.net/",
    icon: Rocket,
    features: [
      { icon: BriefcaseBusiness, text: "1 project" },
      { icon: Cloud, text: "5 GB cloud storage" },
      { icon: UploadCloud, text: "250 MB max model upload" },
      { icon: Gauge, text: "10 geometry diagnoses/month" },
      { icon: Sparkles, text: "Babylon Studio" },
      { icon: FileCode2, text: "GLTF, OBJ, STL imports" },
      { icon: Headphones, text: "Community support" },
    ],
  },
  {
    name: "Professional",
    label: "For creators",
    description: "A margin-safe solo plan for frequent product, game, and portfolio work.",
    price: "$29",
    period: "/ month",
    creditsLabel: "Monthly Credits",
    creditsAmount: "2,500 CR",
    creditsNote: "Renews monthly",
    cta: "Upgrade to Professional",
    ctaLink: "https://app.teeli.net/",
    icon: Box,
    highlighted: true,
    badge: "Popular",
    features: [
      { icon: BadgeCheck, text: "Unlimited projects within storage" },
      { icon: Cloud, text: "50 GB cloud storage" },
      { icon: Database, text: "1 GB max model upload" },
      { icon: Gauge, text: "Full diagnosis and repair" },
      { icon: Sparkles, text: "4K HDR still renders" },
      { icon: LockKeyhole, text: "Private projects, no watermark" },
      { icon: Headphones, text: "Priority queue and email support" },
    ],
  },
  {
    name: "Enterprise",
    label: "For teams",
    description: "Pooled credits, governance, and support for production teams.",
    price: "From $249",
    period: "/ month",
    creditsLabel: "Monthly Credits",
    creditsAmount: "25,000 CR",
    creditsNote: "Pooled workspace credits",
    cta: "Start Enterprise",
    ctaLink: "https://app.teeli.net/",
    icon: UsersRound,
    features: [
      { icon: Star, text: "Everything in Professional" },
      { icon: Cloud, text: "500 GB cloud storage" },
      { icon: UsersRound, text: "5 seats included" },
      { icon: ShieldCheck, text: "Roles, audit logs, SSO/SAML" },
      { icon: Sparkles, text: "8K stills and quoted video renders" },
      { icon: LockKeyhole, text: "Viewer/API access and private links" },
      { icon: Headphones, text: "SLA, onboarding, account manager" },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center lg:mb-24"
        >
          <div className="mb-6 flex justify-center">
            <CreditCardIcon className="h-16 w-16 text-signal-teal sm:h-20 sm:w-20" />
          </div>
          <h2 className="mb-4 text-4xl font-black leading-tight text-starlight sm:text-5xl md:text-6xl lg:text-7xl">
            Simple <span className="text-signal-teal">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-starlight/70 sm:text-xl">
            Plans for exploration, solo creators, and production teams.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const PlanIcon = plan.icon;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`relative flex h-full flex-col rounded-lg border bg-slate-50 p-6 text-slate-950 shadow-2xl shadow-black/25 transition-transform duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'border-cyan-400 shadow-cyan-500/20'
                    : 'border-slate-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <span className="inline-flex rounded-md bg-sky-500 px-4 py-1 text-xs font-black uppercase text-white shadow-lg shadow-sky-500/25">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6 flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg shadow-lg ${
                    plan.highlighted
                      ? 'bg-sky-500 text-white shadow-sky-500/30'
                      : 'bg-white text-slate-600 shadow-slate-200'
                  }`}>
                    <PlanIcon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{plan.label}</p>
                  </div>
                </div>

                <p className="min-h-14 text-base leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-black text-slate-950">{plan.price}</span>
                  <span className="pb-1 text-base text-slate-600">{plan.period}</span>
                </div>

                <div className="mt-5 rounded-md border border-amber-300 bg-amber-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-orange-700">{plan.creditsLabel}</span>
                    <span className="text-base font-black text-slate-950">{plan.creditsAmount}</span>
                  </div>
                  <p className="mt-2 text-xs text-orange-700/80">{plan.creditsNote}</p>
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => {
                    const FeatureIcon = feature.icon;

                    return (
                      <li key={feature.text} className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm">
                          <FeatureIcon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <motion.a
                  href={plan.ctaLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border px-5 py-3 text-center text-sm font-black transition-colors ${
                    plan.highlighted
                      ? 'border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700'
                      : 'border-slate-300 bg-white text-slate-950 hover:border-cyan-500 hover:text-cyan-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </motion.a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
