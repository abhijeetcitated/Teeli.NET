"use client";

import { motion } from 'framer-motion';

/**
 * LOGO PREVIEW - 3 Modern Brand Options
 * Compare side-by-side to choose the best one
 */

// ============================================
// OPTION 1: LIQUID MORPH (Unique Abstract)
// ============================================
export const LogoOption1 = () => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Liquid Morph Icon - Organic flowing shape */}
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            </filter>
          </defs>
          
          {/* Organic flowing blob shape */}
          <g filter="url(#goo)">
            <motion.path
              d="M50,15 Q70,25 75,45 T65,75 Q50,85 35,75 T25,45 Q30,25 50,15 Z"
              fill="url(#liquid-gradient)"
              animate={{
                d: [
                  "M50,15 Q70,25 75,45 T65,75 Q50,85 35,75 T25,45 Q30,25 50,15 Z",
                  "M50,10 Q75,20 80,50 T60,80 Q45,90 30,80 T20,50 Q25,20 50,10 Z",
                  "M50,15 Q70,25 75,45 T65,75 Q50,85 35,75 T25,45 Q30,25 50,15 Z",
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner highlight dot */}
            <motion.circle
              cx="50"
              cy="45"
              r="8"
              fill="white"
              opacity="0.3"
              animate={{
                cy: [45, 50, 45],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </g>
        </svg>
        {/* Multi-layer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-xl opacity-40" />
      </div>
      
      {/* Wordmark */}
      <div>
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          TEELI
        </span>
        <span className="text-2xl font-light text-zinc-400">.NET</span>
      </div>
    </motion.div>
  );
};

// ============================================
// OPTION 2: NEURAL NETWORK NODE (AI-Focused)
// ============================================
export const LogoOption2 = () => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Neural Network Visualization */}
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <radialGradient id="node-glow">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Connection lines */}
          <g stroke="url(#neural-gradient)" strokeWidth="2" opacity="0.4">
            {/* Layer 1 to Layer 2 */}
            <motion.line x1="25" y1="30" x2="50" y2="50" 
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.line x1="25" y1="70" x2="50" y2="50"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            {/* Layer 2 to Layer 3 */}
            <motion.line x1="50" y1="50" x2="75" y2="30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.line x1="50" y1="50" x2="75" y2="70"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
          </g>
          
          {/* Neural nodes (circles) */}
          {/* Layer 1 - Input */}
          <motion.circle cx="25" cy="30" r="6" fill="url(#neural-gradient)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle cx="25" cy="70" r="6" fill="url(#neural-gradient)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Layer 2 - Hidden (center, larger) */}
          <motion.circle cx="50" cy="50" r="8" fill="url(#neural-gradient)"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <circle cx="50" cy="50" r="4" fill="white" opacity="0.5" />
          
          {/* Layer 3 - Output */}
          <motion.circle cx="75" cy="30" r="6" fill="url(#neural-gradient)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          />
          <motion.circle cx="75" cy="70" r="6" fill="url(#neural-gradient)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          />
        </svg>
        {/* Glow */}
        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-40" />
      </div>
      
      {/* Wordmark */}
      <div>
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          TEELI
        </span>
        <span className="text-2xl font-light text-zinc-400">.NET</span>
      </div>
    </motion.div>
  );
};

// ============================================
// OPTION 3: DIMENSION PORTAL (Space/3D Gateway)
// ============================================
export const LogoOption3 = () => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Dimension Portal - Layered rings */}
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="portal-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="portal-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          
          {/* Outer rotating ring */}
          <motion.ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="12"
            fill="none"
            stroke="url(#portal-gradient-1)"
            strokeWidth="3"
            animate={{ rotateX: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          
          {/* Middle ring (opposite rotation) */}
          <motion.ellipse
            cx="50"
            cy="50"
            rx="25"
            ry="9"
            fill="none"
            stroke="url(#portal-gradient-2)"
            strokeWidth="2.5"
            opacity="0.8"
            animate={{ rotateX: [360, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          
          {/* Inner vertical ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="url(#portal-gradient-1)"
            strokeWidth="2"
            opacity="0.6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Center core (glowing) */}
          <motion.circle
            cx="50"
            cy="50"
            r="6"
            fill="url(#portal-gradient-2)"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="50" r="3" fill="white" opacity="0.7" />
          
          {/* Energy particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.circle
              key={i}
              cx={50 + 20 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 20 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="#06b6d4"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-40" />
      </div>
      
      {/* Wordmark */}
      <div>
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          TEELI
        </span>
        <span className="text-2xl font-light text-zinc-400">.NET</span>
      </div>
    </motion.div>
  );
};

// ============================================
// PREVIEW COMPONENT - Show All 3 Options
// ============================================
export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Choose Your Logo</h1>
        <p className="text-zinc-400 text-center mb-12">3 modern brand-level options</p>
        
        <div className="space-y-8">
          
          {/* Option 1 */}
          <div className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-cyan-400">Option 1: Liquid Morph</h2>
                <p className="text-sm text-zinc-500 mt-1">Organic, flowing, animated blob - completely unique</p>
              </div>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">UNIQUE</span>
            </div>
            <div className="flex items-center justify-center py-8 bg-black/30 rounded-xl">
              <LogoOption1 />
            </div>
            <div className="mt-4 text-xs text-zinc-600">
              ✓ Never seen before • ✓ Smooth animations • ✓ Fluid & modern
            </div>
          </div>

          {/* Option 2 */}
          <div className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-purple-400">Option 2: Neural Network</h2>
                <p className="text-sm text-zinc-500 mt-1">AI-focused with animated nodes & connections</p>
              </div>
            </div>
            <div className="flex items-center justify-center py-8 bg-black/30 rounded-xl">
              <LogoOption2 />
            </div>
            <div className="mt-4 text-xs text-zinc-600">
              ✓ AI/Tech vibe • ✓ Pulsing animation • ✓ Shows intelligence
            </div>
          </div>

          {/* Option 3 */}
          <div className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-blue-400">Option 3: Dimension Portal</h2>
                <p className="text-sm text-zinc-500 mt-1">3D gateway with rotating rings & energy particles</p>
              </div>
            </div>
            <div className="flex items-center justify-center py-8 bg-black/30 rounded-xl">
              <LogoOption3 />
            </div>
            <div className="mt-4 text-xs text-zinc-600">
              ✓ Sci-fi aesthetic • ✓ Multi-layer depth • ✓ Portal to 3D world
            </div>
          </div>

        </div>

        {/* Comparison on Dark & Light */}
        <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-center">All logos on different backgrounds:</h3>
          
          {/* Dark background */}
          <div className="mb-6 p-6 bg-gray-950 rounded-xl">
            <p className="text-xs text-zinc-600 mb-4">On Dark Background</p>
            <div className="flex flex-wrap gap-8 justify-center">
              <LogoOption1 />
              <LogoOption2 />
              <LogoOption3 />
            </div>
          </div>

          {/* Light background */}
          <div className="p-6 bg-white rounded-xl">
            <p className="text-xs text-zinc-400 mb-4">On Light Background</p>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="[&_*]:!text-gray-900 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span:first-child]:!bg-gradient-to-r [&_span:first-child]:!from-gray-900 [&_span:first-child]:!to-gray-700">
                <LogoOption1 />
              </div>
              <div className="[&_*]:!text-gray-900 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span:first-child]:!bg-gradient-to-r [&_span:first-child]:!from-gray-900 [&_span:first-child]:!to-gray-700">
                <LogoOption2 />
              </div>
              <div className="[&_*]:!text-gray-900 [&_span]:!bg-clip-text [&_span]:!text-transparent [&_span:first-child]:!bg-gradient-to-r [&_span:first-child]:!from-gray-900 [&_span:first-child]:!to-gray-700">
                <LogoOption3 />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
          <p className="text-sm text-cyan-300 text-center">
            💡 <strong>Scroll and compare:</strong> Dekho kaunsa sabse achcha lag raha hai dark/light background pe
          </p>
        </div>

      </div>
    </div>
  );
}
