"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function TrustBarSection() {
  return (
    <section className="py-16 px-4 border-y border-starlight/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Caption */}
          <p className="text-sm text-starlight/40 font-light">
            Powered by open infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
