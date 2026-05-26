"use client";

import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

type TermsSection = {
  icon: LucideIcon;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const sectionIcons = [FileText, Scale, CheckCircle, Ban, Shield, AlertTriangle];

const sections: Omit<TermsSection, 'icon'>[] = [
  {
    title: '1. Agreement to These Terms',
    paragraphs: [
      'These Terms of Service ("Terms") constitute a binding legal agreement between you ("you", "User", or "Customer") and Teeli.NET ("Teeli", "we", "us", or "our") governing access to and use of the Teeli platform, website, APIs, cloud rendering infrastructure, and related services (collectively, the "Service").',
      'By creating an account, clicking to accept, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. This electronic acceptance has the same legal effect as a signed agreement to the extent permitted by applicable law.',
      'If you use the Service on behalf of a company or other legal entity, you represent that you have authority to bind that entity, and "you" refers to that entity.',
    ],
  },
  {
    title: '2. Definitions',
    bullets: [
      '"Account" means the registered profile used to access the Service.',
      '"User Content" means 3D models, meshes, textures, scenes, metadata, project files, renders, and other materials you upload, create, or store through the Service.',
      '"Output" means rendered images, exports, diagnostics, repair logs, and other results generated from User Content.',
      '"Credits" means usage units consumed for cloud rendering, storage, API calls, or other metered features.',
      '"Subscription" means a paid plan that provides enhanced limits, features, or support.',
      '"Beta Features" means features labeled alpha, beta, preview, or early access.',
      '"Sub-processors" means third-party service providers engaged by Teeli to host, process, or support the Service on our behalf.',
    ],
  },
  {
    title: '3. Eligibility and Accounts',
    paragraphs: [
      'You must be at least 18 years old, or the age of legal majority in your jurisdiction, to use the Service. The Service is intended for professional and business use in 3D design, visualization, product development, and related workflows.',
    ],
    bullets: [
      'Provide accurate, current registration information and keep it updated.',
      'Use a business email address matching your organization where applicable; this helps verify legitimate business use.',
      'Maintain the confidentiality of your credentials and all activity under your Account.',
      'Notify us immediately at work@teeli.net of any unauthorized access or security incident.',
      'Do not share Accounts or create accounts through automated means except via approved API keys.',
      'We may refuse registration, reclaim usernames, or suspend Accounts that violate these Terms or pose security or legal risk.',
    ],
  },
  {
    title: '4. About Teeli and Your Representations',
    paragraphs: [
      'Teeli.NET develops, owns, and operates Teeli as proprietary browser-based SaaS software. Teeli is a for-profit software product company—not a development agency, consultancy, reseller, or white-label shop.',
      'Our public website at https://teeli.net describes the Service, pricing, and legal policies. By using the Service, you represent that your use complies with applicable law and that information you provide is truthful.',
      'You will not misrepresent Teeli, impersonate our team, or imply an unauthorized partnership or endorsement.',
      'If you apply for Teeli on behalf of an organization, you confirm you are authorized to accept these Terms for that organization.',
    ],
  },
  {
    title: '5. Description of the Service',
    paragraphs: [
      'Teeli is a browser-based SaaS platform for 3D asset workflows, including upload, geometry diagnosis, automated mesh repair, scene configuration, cloud rendering, storage, collaboration, and export. Specific features vary by plan and release stage.',
      'We may add, modify, suspend, or discontinue features at any time. Material changes to paid features will be communicated in advance where reasonably practicable.',
    ],
    bullets: [
      'Geometry diagnosis and repair are assistive tools; results are not guaranteed to be error-free or suitable for production without your review.',
      'Cloud rendering depends on queue capacity, file complexity, and infrastructure availability.',
      'Preview, beta, and experimental features may be incomplete, change without notice, or be withdrawn.',
    ],
  },
  {
    title: '6. Acceptable Use Policy',
    paragraphs: [
      'You agree not to use the Service, directly or indirectly, to:',
    ],
    bullets: [
      'Violate applicable law, regulation, export control rules, sanctions, or third-party rights.',
      'Upload malware, corrupted payloads intended to disrupt systems, or content you lack rights to use.',
      'Infringe copyrights, trademarks, trade secrets, privacy, or publicity rights of others.',
      'Reverse engineer, scrape, probe, or attempt to bypass security, rate limits, or access controls except as permitted by law.',
      'Resell, sublicense, or provide unauthorized access to the Service without a written agreement with Teeli.',
      'Use the Service for cryptocurrency mining, denial-of-service activity, spam, or abusive automated traffic.',
      'Harass, threaten, defame, or distribute unlawful, obscene, or exploitative material.',
      'Misrepresent your identity or affiliation, or use the Service to develop competing datasets derived from unauthorized access to Teeli systems.',
    ],
  },
  {
    title: '7. User Content and Outputs',
    paragraphs: [
      'You retain ownership of User Content and Outputs, subject to the licenses below and rights of other parties whose materials you incorporate.',
      'You grant Teeli a worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, transmit, display, and create derivative technical copies of User Content solely to operate, secure, improve, and provide the Service—including geometry analysis, repair pipelines, rendering, backups, and support.',
      'You represent and warrant that you have all necessary rights, consents, and licenses for User Content and that its use through the Service does not violate law or third-party rights.',
      'You are solely responsible for reviewing diagnostics, repairs, and renders before relying on them in commercial, engineering, medical, safety-critical, or regulated contexts.',
    ],
  },
  {
    title: '8. Teeli Intellectual Property',
    paragraphs: [
      'The Service, including software, UI, branding, documentation, algorithms, and underlying technology, is owned by Teeli or its licensors and protected by intellectual property laws. Except for the limited rights expressly granted, no license is implied.',
      'Teeli names, logos, and product marks may not be used without prior written permission. Open-source components used in the Service remain subject to their respective licenses, as described on our Licensing page.',
    ],
  },
  {
    title: '9. Feedback',
    paragraphs: [
      'If you submit ideas, suggestions, or feedback, you grant Teeli a perpetual, irrevocable, worldwide, royalty-free license to use it without restriction or compensation. Do not send confidential or proprietary information unless covered by a separate signed agreement.',
    ],
  },
  {
    title: '10. Third-Party Services and Sub-processors',
    paragraphs: [
      'The Service relies on Sub-processors for authentication, hosting, database, analytics, payments, email, and cloud infrastructure. Your use of integrated identity providers (such as Google OAuth) may also be subject to their terms and privacy policies.',
      'Teeli is not responsible for third-party services outside our reasonable control. We select infrastructure providers for reliability, security, and compliance with applicable data-protection requirements.',
      'Current Sub-processors include, without limitation: Supabase (authentication and database), Google (OAuth sign-in where enabled), and major cloud infrastructure providers such as Amazon Web Services (AWS) or equivalent hosting partners used to operate the Service.',
      'We may update Sub-processors as our architecture evolves. Material additions will be reflected in our Privacy Policy or a published sub-processor list. Business customers may request prior notice and a Data Processing Agreement (DPA) at work@teeli.net.',
    ],
  },
  {
    title: '11. Automated and Algorithmic Processing',
    paragraphs: [
      'Parts of the Service use automated software—including geometry analysis, mesh repair heuristics, rendering pipelines, and queue orchestration—to process User Content and generate Outputs.',
      'These systems assist your workflow; they do not replace professional judgment. You remain responsible for validating results before production, manufacturing, safety, medical, legal, or regulated use.',
      'We may improve algorithms over time. Such improvements may change Output characteristics but will not transfer ownership of your User Content to Teeli.',
    ],
  },
  {
    title: '12. Subscriptions, Credits, Billing, and Cancellation',
    paragraphs: [
      'Paid plans, Credits, and usage-based charges are described at checkout or on our pricing pages. By subscribing or purchasing Credits, you authorize us and our payment processors to charge applicable fees, taxes, and renewals using your selected payment method.',
      'AUTO-RENEWAL: Unless stated otherwise at checkout, Subscriptions renew automatically for successive billing periods until you cancel. You may cancel renewal at any time before the next billing date through account settings or by emailing work@teeli.net. Cancellation stops future charges; access generally continues through the end of the current paid period unless otherwise stated.',
      'We will provide at least 30 days\' advance notice before increasing recurring Subscription prices for existing customers, where required by law or contract.',
      'Except where required by law, fees are non-refundable once a billing period has started. Chargebacks or payment failures may result in suspension.',
      'Free tiers and promotional Credits may include usage caps, rate limits, and fair-use restrictions.',
      'Enterprise or custom agreements, if any, supersede conflicting terms in a signed order form.',
    ],
  },
  {
    title: '13. Privacy, Data Protection, and International Users',
    paragraphs: [
      'Our Privacy Policy explains how we collect, use, store, disclose, and protect personal data. By using the Service, you acknowledge those practices.',
      'Where Teeli processes personal data on your behalf as a processor or service provider, a Data Processing Agreement (DPA) is available upon request at work@teeli.net for business and enterprise customers.',
      'If you are in the European Economic Area, United Kingdom, India, California, or other regions with data-protection laws, you may have additional rights regarding access, correction, deletion, portability, and objection as described in our Privacy Policy.',
      'You are responsible for providing required notices and obtaining consents from your end users if you upload personal data within User Content.',
    ],
  },
  {
    title: '14. Security and Incident Response',
    paragraphs: [
      'We implement administrative, technical, and organizational measures designed to protect the Service and Customer data, including encryption in transit, access controls, and monitoring appropriate to a cloud SaaS platform.',
      'No method of transmission or storage is completely secure. You are responsible for safeguarding your credentials and promptly reporting suspected unauthorized access to work@teeli.net.',
      'If we become aware of a confirmed security incident affecting personal data we process on your behalf, we will notify affected business customers without undue delay and, where required by law, within 72 hours of becoming aware, and will cooperate on reasonable remediation steps.',
    ],
  },
  {
    title: '15. Service Availability and Support',
    paragraphs: [
      'We strive for high availability but do not guarantee uninterrupted or error-free operation. Maintenance, upgrades, outages, and force majeure events may cause downtime.',
      'Unless a separate signed Service Level Agreement (SLA) applies, the Service is provided without uptime guarantees. Support channels and response targets depend on your plan.',
    ],
  },
  {
    title: '16. Suspension and Termination',
    paragraphs: [
      'We may suspend or terminate access immediately if you breach these Terms, create security or legal risk, fail to pay fees, or if required by law.',
      'You may stop using the Service and delete your Account at any time through account settings or by contacting work@teeli.net. Upon termination, your license to use the Service ends and we may delete User Content after a reasonable retention period, except where retention is required by law or backup cycles.',
      'Sections that by nature should survive termination—including payment obligations, intellectual property, disclaimers, limitation of liability, and dispute resolution—will survive.',
    ],
  },
  {
    title: '17. Export Controls and Copyright',
    paragraphs: [
      'You may not use the Service in embargoed countries or for prohibited end uses under applicable export control and sanctions laws, including U.S., EU, UK, and Indian regulations.',
      'We respect intellectual property rights. Copyright complaints may be sent to work@teeli.net with sufficient detail for identification of the work, infringing material, and your contact information. Repeat infringers may have Accounts terminated.',
    ],
  },
  {
    title: '18. Disclaimers',
    paragraphs: [
      'THE SERVICE AND ALL OUTPUTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
      'Teeli does not warrant that diagnostics, repairs, or renders will be accurate, complete, or fit for your intended use. You assume all risk for decisions made based on the Service.',
    ],
  },
  {
    title: '19. Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, Teeli and its affiliates, officers, employees, agents, and suppliers will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profits, revenue, data, goodwill, or business interruption, even if advised of the possibility.',
      'Teeli\'s total aggregate liability arising out of or relating to the Service or these Terms will not exceed the greater of (a) amounts you paid to Teeli in the twelve (12) months before the claim, or (b) one hundred U.S. dollars (USD $100) if you have not paid fees.',
      'Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted by law.',
    ],
  },
  {
    title: '20. Indemnification',
    paragraphs: [
      'You will defend, indemnify, and hold harmless Teeli and its affiliates, officers, employees, and agents from claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from your User Content, use of the Service, violation of these Terms, or violation of third-party rights.',
    ],
  },
  {
    title: '21. Governing Law and Disputes',
    paragraphs: [
      'These Terms are governed by the laws of India, without regard to conflict-of-law principles, except where mandatory consumer protection laws in your country of residence provide otherwise.',
      'Subject to applicable law, courts located in Mumbai, Maharashtra, India will have exclusive jurisdiction over disputes not resolved informally. Before filing a claim, you agree to contact work@teeli.net and attempt good-faith resolution for at least thirty (30) days.',
      'Nothing in this section limits either party\'s right to seek injunctive relief for intellectual property or unauthorized access.',
    ],
  },
  {
    title: '22. Changes to These Terms',
    paragraphs: [
      'We may update these Terms to reflect product, legal, or operational changes. Material updates will be posted on this page with a revised effective date and version number and, where appropriate, notified by email or in-product notice.',
      'Continued use after the effective date constitutes acceptance. If you do not agree, you must stop using the Service and may delete your Account.',
    ],
  },
  {
    title: '23. Miscellaneous',
    bullets: [
      'Order of Precedence: If you have a signed enterprise order form or DPA with Teeli, that document controls over these Terms to the extent of a direct conflict.',
      'Entire Agreement: These Terms, the Privacy Policy, and any signed order forms constitute the entire agreement regarding the Service.',
      'Severability: If any provision is unenforceable, the remainder remains in effect.',
      'Assignment: You may not assign these Terms without our consent. We may assign them in connection with a merger, acquisition, or asset sale.',
      'No Waiver: Failure to enforce a provision is not a waiver of future enforcement.',
      'Force Majeure: We are not liable for delays or failures caused by events beyond reasonable control.',
      'Language: The English version controls if translated versions conflict.',
    ],
  },
  {
    title: '24. Contact',
    paragraphs: [
      'Teeli.NET — browser-based 3D SaaS',
      'Email: work@teeli.net',
      'Website: https://teeli.net',
      'Legal documents: Terms of Service, Privacy Policy, and Open-Source Licensing are published on our website for customer, partner, and cloud-program review.',
      'Registered address: Available upon request for enterprise, cloud marketplace, and compliance reviews.',
    ],
  },
];

const sectionsWithIcons = sections.map((section, index) => ({
  ...section,
  icon: sectionIcons[index % sectionIcons.length],
}));

export default function TermsPage() {
  return (
    <>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-6">
              <FileText className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-4">
              Teeli.NET — Terms of Service
            </p>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-4">
              Operated by Teeli.NET. Questions:{' '}
              <a href="mailto:work@teeli.net" className="text-orange-400 hover:text-orange-300 transition-colors">
                work@teeli.net
              </a>{' '}
              ·{' '}
              <a href="https://teeli.net" className="text-orange-400 hover:text-orange-300 transition-colors">
                teeli.net
              </a>
            </p>
            <p className="text-sm text-zinc-400">
              Last updated: May 26, 2026 | Effective as of May 26, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {sectionsWithIcons.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
                className="relative rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-black/60 via-red-950/20 to-black/60 backdrop-blur-xl p-8"
                style={{ boxShadow: '0 10px 30px rgba(249, 115, 22, 0.05)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex-shrink-0">
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">
                      {section.title}
                    </h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="text-zinc-400 leading-relaxed mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-2 mt-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                            <span className="text-orange-400 mt-1 flex-shrink-0">-</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="relative w-full bg-black py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-zinc-400 mb-4">Related Documents</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-orange-400 hover:text-orange-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-orange-400 hover:text-orange-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
