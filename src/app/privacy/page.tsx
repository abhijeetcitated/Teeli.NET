"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Shield, Eye, Lock, Database, FileText, UserCheck } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

type PrivacySection = {
  icon: LucideIcon;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const sectionIcons = [Database, Lock, Shield, UserCheck, Eye, FileText];

const privacySections: Omit<PrivacySection, 'icon'>[] = [
  {
    title: '2. Who We Are and Our Role',
    paragraphs: [
      'For most Service use, Teeli.NET acts as the data controller (or equivalent role under applicable law) for personal information we collect to operate accounts, billing, security, and the Service.',
      'If you use Teeli to process personal data contained in 3D files, project metadata, or customer materials on behalf of your organization, your organization is typically the controller and Teeli acts as a processor or service provider. A Data Processing Agreement (DPA) is available upon request at work@teeli.net.',
    ],
    bullets: [
      'Controller contact: work@teeli.net',
      'Registered address: Available upon request for enterprise, cloud marketplace, and compliance reviews.',
      'We do not knowingly sell or rent personal information for monetary consideration.',
    ],
  },
  {
    title: '3. Information We Collect',
    paragraphs: [
      'We collect information in three main ways: you provide it, it is generated through use of the Service, and we receive limited technical data automatically.',
    ],
    bullets: [
      'Account and profile data: name, email address, authentication identifiers, connected sign-in providers (such as Google OAuth where enabled), profile image URL when synced from an identity provider, and account preferences.',
      'Billing and subscription data: plan tier, transaction references, and payment status. Payment card details are processed by our payment providers; Teeli does not store full card numbers on our servers.',
      '3D workflow data: uploaded models, meshes, textures, scenes, project files, render settings, diagnostic reports, repair logs, rendered outputs, storage metadata, and collaboration artifacts you choose to store in the Service.',
      'Usage and product data: features used, render queue activity, credit consumption, error logs, support communications, and feedback you submit.',
      'Device and technical data: IP address, browser type, operating system, device identifiers, approximate location derived from IP, timestamps, and security logs.',
      'Cookies and similar technologies: as described in Section 15.',
    ],
  },
  {
    title: '4. How We Use Information',
    paragraphs: [
      'We use personal information to deliver Teeli\'s core workflow—helping you upload 3D assets, detect geometry issues, apply automated repairs, configure scenes, execute cloud renders, and export or share results.',
    ],
    bullets: [
      'Provide, operate, maintain, and improve the Service, including Babylon.js-based studio features and cloud rendering infrastructure.',
      'Authenticate users, secure accounts, prevent fraud and abuse, and enforce our Terms of Service.',
      'Process geometry diagnosis, mesh repair, rendering pipelines, and related automated workflows on your content.',
      'Manage subscriptions, Credits, billing, invoices, and customer support.',
      'Send service-related communications such as security alerts, product updates, and responses to your requests.',
      'Analyze aggregated or de-identified usage trends to improve performance, reliability, and product design.',
      'Comply with legal obligations and respond to lawful requests.',
    ],
  },
  {
    title: '5. Legal Bases for Processing',
    paragraphs: [
      'Where required by applicable law (including GDPR and UK GDPR), we rely on one or more of the following legal bases:',
    ],
    bullets: [
      'Contract: processing necessary to provide the Service you request, including account creation, rendering, and storage.',
      'Legitimate interests: securing the Service, improving features, preventing misuse, and operating our business, balanced against your rights.',
      'Consent: where required for optional cookies, marketing communications, or specific processing you can withdraw at any time.',
      'Legal obligation: where processing is required to comply with applicable law, regulation, or valid legal process.',
    ],
  },
  {
    title: '6. 3D Content and Automated Processing',
    paragraphs: [
      'Teeli processes 3D files and related metadata using automated software—including geometry analysis, repair heuristics, rendering engines, and queue orchestration—to generate diagnostics, repaired meshes, and rendered images.',
      'This processing is essential to the Service you choose to use. It does not involve automated decisions that produce legal or similarly significant effects about you as an individual without human involvement.',
      'You retain ownership of your 3D content subject to our Terms. We process content only to provide, secure, and improve the Service, not to train public third-party models with your proprietary files unless we obtain separate explicit consent for a specific program.',
      'Do not upload personal data inside 3D files unless you have a lawful basis and, where required, have provided notice to affected individuals.',
    ],
  },
  {
    title: '7. How We Share Information',
    paragraphs: [
      'We do not sell personal information. We share information only as described below:',
    ],
    bullets: [
      'Service providers and Sub-processors: trusted vendors that help us host, authenticate, store, render, analyze, bill, email, or support the Service, subject to contractual confidentiality and data-protection obligations.',
      'Identity providers: if you choose Google or other OAuth sign-in, necessary authentication data is exchanged with that provider under its privacy policy.',
      'Business transfers: in connection with a merger, acquisition, financing, or sale of assets, subject to continued protection consistent with this Policy.',
      'Legal and safety: when required by law, court order, or to protect rights, safety, and integrity of Teeli, our users, or the public.',
      'With your direction: when you share projects, exports, or integrations you explicitly enable.',
      'Aggregated or de-identified data: may be shared for analytics or product insights where it does not identify you.',
    ],
  },
  {
    title: '8. Sub-processors',
    paragraphs: [
      'We use Sub-processors to operate a modern cloud SaaS platform. Categories and representative providers include:',
    ],
    bullets: [
      'Authentication and database: Supabase (account authentication, session management, and application database).',
      'Cloud infrastructure and rendering: Amazon Web Services (AWS) or equivalent hosting partners for compute, storage, CDN, and render workloads.',
      'Identity: Google (OAuth sign-in where enabled).',
      'Payments: payment processors such as Stripe or equivalent providers when billing features are enabled.',
      'Email and support: transactional email and customer-support tooling as needed to operate the Service.',
      'We may update Sub-processors as our architecture evolves. Material changes will be reflected in this Policy. Business customers may request advance notice of new Sub-processors and a DPA at work@teeli.net.',
    ],
  },
  {
    title: '9. International Data Transfers',
    paragraphs: [
      'Teeli is operated from India and may process data in India and other countries where we or our Sub-processors maintain facilities, including the United States and the European Economic Area.',
      'Where personal data is transferred across borders, we implement appropriate safeguards as required by applicable law, such as Standard Contractual Clauses, UK International Data Transfer Addendum, contractual protections with Sub-processors, or other lawful transfer mechanisms.',
      'Under India\'s Digital Personal Data Protection Act, 2023 (DPDP Act), cross-border transfers may be subject to government notifications. We monitor regulatory developments and adjust practices as required.',
    ],
  },
  {
    title: '10. Data Retention',
    paragraphs: [
      'We retain personal information only as long as reasonably necessary for the purposes described in this Policy:',
    ],
    bullets: [
      'Account data: for the life of your account and a limited period afterward for backup, billing, fraud prevention, or legal compliance.',
      '3D content and renders: until you delete them, your account is closed, or your plan limits require removal, subject to backup retention cycles.',
      'Billing records: as required by tax, accounting, and payment regulations.',
      'Security and audit logs: for a limited period appropriate to investigation and compliance needs.',
      'When you delete your account or request deletion, we will delete or de-identify personal information within a reasonable period, except where retention is required by law or legitimate business needs such as dispute resolution.',
    ],
  },
  {
    title: '11. Security',
    paragraphs: [
      'We implement administrative, technical, and organizational measures designed to protect personal information appropriate to a cloud SaaS platform, including encryption in transit (TLS), access controls, authentication safeguards, and monitoring.',
      'No method of transmission or storage is completely secure. You are responsible for maintaining strong credentials and notifying us promptly at work@teeli.net if you suspect unauthorized access.',
      'If we become aware of a personal data breach affecting your information, we will notify you and relevant authorities as required by applicable law, including cooperation with business customers under DPAs.',
    ],
  },
  {
    title: '12. Your Privacy Rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing, and to receive a portable copy of personal data you provided.',
      'You can update profile information in account settings. For other requests, email work@teeli.net with enough detail for us to verify your identity. We aim to respond within 30 days, or the timeframe required by applicable law.',
      'You may withdraw consent where processing is consent-based without affecting the lawfulness of prior processing. You may lodge a complaint with a supervisory authority where applicable.',
    ],
  },
  {
    title: '13. California Residents (CCPA/CPRA)',
    paragraphs: [
      'If you are a California resident, you may have additional rights under the California Consumer Privacy Act and California Privacy Rights Act, including the right to know categories of personal information collected, sources, purposes, and disclosures; the right to delete; the right to correct; and the right to opt out of sale or sharing.',
    ],
    bullets: [
      'We do not sell personal information for monetary consideration.',
      'We do not share personal information for cross-context behavioral advertising as defined under CPRA.',
      'We will not discriminate against you for exercising privacy rights.',
      'Authorized agents may submit requests with proof of authorization as permitted by law.',
    ],
  },
  {
    title: '14. India — Digital Personal Data Protection Act',
    paragraphs: [
      'If you are in India, the DPDP Act, 2023 and related rules may apply. Teeli processes digital personal data for lawful purposes connected to providing the Service, with reasonable security safeguards and transparent notice.',
    ],
    bullets: [
      'Data principals may contact work@teeli.net to exercise applicable rights, including access, correction, erasure, and grievance redressal.',
      'We process data based on consent, contractual necessity, or other lawful grounds recognized under applicable Indian law.',
      'If you believe your rights have been violated, you may contact us first; you may also have the right to approach the Data Protection Board of India when operational.',
    ],
  },
  {
    title: '15. Cookies and Similar Technologies',
    paragraphs: [
      'We use cookies, local storage, and similar technologies to operate and improve the Service:',
    ],
    bullets: [
      'Strictly necessary: authentication sessions, security, load balancing, and core studio functionality.',
      'Functional: remembering preferences such as theme, locale, or UI settings.',
      'Analytics: understanding feature usage and performance in aggregated form.',
      'Marketing (if enabled): measuring campaign effectiveness; you can opt out where required by law.',
      'You can control cookies through browser settings. Disabling strictly necessary cookies may limit Service functionality. Where required, we will request consent before non-essential cookies.',
    ],
  },
  {
    title: '16. Children\'s Privacy',
    paragraphs: [
      'Teeli is a professional 3D workflow platform intended for users who are at least 18 years old, or the age of legal majority in their jurisdiction. We do not knowingly collect personal information from children.',
      'If you believe a child has provided personal information to Teeli, contact work@teeli.net and we will take appropriate steps to delete it.',
    ],
  },
  {
    title: '17. Business Customers and DPA',
    paragraphs: [
      'Organizations using Teeli to process personal data on behalf of their clients or employees may require a DPA covering processor obligations, Sub-processor management, security measures, breach notification, and deletion upon termination.',
      'Enterprise and business customers may request a DPA, security overview, or Sub-processor information at work@teeli.net. Signed enterprise agreements control over this Policy where they directly conflict.',
    ],
  },
  {
    title: '18. Third-Party Links and Services',
    paragraphs: [
      'The Service may link to third-party websites, identity providers, or integrations. Their privacy practices are governed by their own policies. We encourage you to review third-party policies before providing information to them.',
    ],
  },
  {
    title: '19. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy to reflect product, legal, or operational changes. Material updates will be posted on this page with a revised effective date and version number and, where appropriate, notified by email or in-product notice.',
      'Continued use after the effective date constitutes acknowledgment of the updated Policy. If you do not agree, you should stop using the Service and may delete your account.',
    ],
  },
  {
    title: '20. Contact Us',
    paragraphs: [
      'Teeli.NET — browser-based 3D SaaS',
      'Privacy inquiries: work@teeli.net',
      'Website: https://teeli.net',
      'Related documents: Terms of Service and Open-Source Licensing are published on our website.',
      'Registered address: Available upon request for enterprise, cloud marketplace, and compliance reviews.',
    ],
  },
];

const sectionsWithIcons: PrivacySection[] = privacySections.map((section, index) => ({
  ...section,
  icon: sectionIcons[index % sectionIcons.length],
}));

export default function PrivacyPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-6">
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Teeli.NET — Privacy Policy
            </p>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-4">
              Operated by Teeli.NET. Questions:{' '}
              <a href="mailto:work@teeli.net" className="text-purple-400 hover:text-purple-300 transition-colors">
                work@teeli.net
              </a>{' '}
              ·{' '}
              <a href="https://teeli.net" className="text-purple-400 hover:text-purple-300 transition-colors">
                teeli.net
              </a>
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: May 26, 2026 | Effective as of May 26, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/20 to-black py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none text-center"
          >
            <h2 className="font-heading text-2xl font-bold text-white mb-6">1. Introduction</h2>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              Teeli.NET (&quot;Teeli&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information when you visit https://teeli.net, create an account, upload 3D assets, use our geometry diagnosis and repair tools, run cloud renders, or otherwise interact with the Teeli platform (the &quot;Service&quot;).
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              This Policy applies together with our Terms of Service. By using the Service, you acknowledge this Policy. If you do not agree, please do not use the Service.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Teeli&apos;s mission is to unify the fragmented 3D workflow—upload, diagnose, repair, configure, render, and share—inside the browser so professionals can move from model to result faster, without desktop installs or manual file handoffs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {sectionsWithIcons.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
                className="relative rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-black/60 via-purple-950/20 to-black/60 backdrop-blur-xl p-8"
                style={{ boxShadow: '0 10px 30px rgba(147, 51, 234, 0.05)' }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  {section.title}
                </h3>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-zinc-400 leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 mt-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-400">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 backdrop-blur-xl p-12"
            style={{ boxShadow: '0 20px 60px rgba(147, 51, 234, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full"></div>
            <div className="relative text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Contact us at{' '}
                <a href="mailto:work@teeli.net" className="text-purple-400 hover:text-purple-300 transition-colors">
                  work@teeli.net
                </a>
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Contact Privacy Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4 border-y border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-purple-400 hover:text-purple-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
