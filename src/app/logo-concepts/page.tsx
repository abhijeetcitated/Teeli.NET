'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LogoConceptsPage() {
  const concepts = [
    {
      id: 1,
      name: "3D Render Portal",
      description: "Gateway to 3D space - depth, perspective, transformation 🏆 SURPRISE!",
      component: <RenderPortal />
    },
    {
      id: 2,
      name: "Infinite Cube Stack",
      description: "Layered architecture - building blocks of creativity",
      component: <InfiniteCubeStack />
    },
    {
      id: 3,
      name: "Light Ray Prism",
      description: "Light breaking into spectrum - rendering light & color",
      component: <LightPrism />
    },
    {
      id: 4,
      name: "Geometric Bloom",
      description: "Unfolding geometric flower - creativity expanding",
      component: <GeometricBloom />
    },
    {
      id: 5,
      name: "Perspective Grid",
      description: "Vanishing point grid - 3D space and depth",
      component: <PerspectiveGrid />
    },
    {
      id: 6,
      name: "Crystalline T",
      description: "Letter T as crystal structure - brand identity",
      component: <CrystallineT />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          SURPRISE Logo Concepts 🎨
        </h1>
        <p className="text-xl text-zinc-400 mb-4">
          Clean, Meaningful, Professional - Made with purpose
        </p>
        <p className="text-sm text-cyan-500 mb-16 flex items-center gap-2">
          <span className="text-2xl">🏆</span> 
          <span>#1 3D Render Portal is THE ONE - Gateway to creative dimension</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-zinc-900/70 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-center h-56 mb-5 bg-black/50 rounded-xl relative overflow-hidden">
                {concept.component}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">
                  {concept.id}. {concept.name}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {concept.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 1. 3D RENDER PORTAL - The Gateway (SURPRISE WINNER!)
function RenderPortal() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="portal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="portal-glow">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Portal glow */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#portal-glow)"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Outer portal ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="url(#portal-grad)"
        strokeWidth="3"
        opacity="0.8"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Middle dimensional ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke="url(#portal-grad)"
        strokeWidth="2.5"
        opacity="0.7"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Inner portal core */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="url(#portal-grad)"
        opacity="0.3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Depth perspective lines (8 rays) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.line
            key={`ray-${i}`}
            x1={50 + 15 * Math.cos(rad)}
            y1={50 + 15 * Math.sin(rad)}
            x2={50 + 35 * Math.cos(rad)}
            y2={50 + 35 * Math.sin(rad)}
            stroke="url(#portal-grad)"
            strokeWidth="2"
            opacity="0.6"
            strokeLinecap="round"
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
          />
        );
      })}
      
      {/* Energy particles spiraling in */}
      {[0, 120, 240].map((angle, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx="50"
          cy="50"
          r="2"
          fill="#06b6d4"
          animate={{
            cx: [
              50 + 35 * Math.cos((angle * Math.PI) / 180),
              50 + 25 * Math.cos((angle * Math.PI) / 180),
              50 + 15 * Math.cos((angle * Math.PI) / 180),
              50
            ],
            cy: [
              50 + 35 * Math.sin((angle * Math.PI) / 180),
              50 + 25 * Math.sin((angle * Math.PI) / 180),
              50 + 15 * Math.sin((angle * Math.PI) / 180),
              50
            ],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
      
      {/* Center portal eye */}
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="#3b82f6"
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx="50" cy="50" r="2" fill="#e0f2fe" opacity="0.9" />
    </svg>
  );
}

// 2. Infinite Cube Stack
function InfiniteCubeStack() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="cube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      
      {/* Back cubes (fading) */}
      {[0, 1, 2, 3].map((i) => {
        const offset = i * 8;
        const scale = 1 - i * 0.15;
        const opacity = 0.8 - i * 0.15;
        return (
          <motion.g key={`cube-${i}`} opacity={opacity}>
            {/* Top face */}
            <motion.path
              d={`M${50 - 12 * scale + offset},${35 + offset} L${50 + offset},${30 + offset} L${50 + 12 * scale + offset},${35 + offset} L${50 + offset},${40 + offset} Z`}
              fill="url(#cube-grad)"
              animate={{ opacity: [opacity, opacity + 0.2, opacity] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            {/* Left face */}
            <motion.path
              d={`M${50 - 12 * scale + offset},${35 + offset} L${50 + offset},${40 + offset} L${50 + offset},${55 + offset} L${50 - 12 * scale + offset},${50 + offset} Z`}
              fill="url(#cube-grad)"
              opacity="0.7"
            />
            {/* Right face */}
            <motion.path
              d={`M${50 + 12 * scale + offset},${35 + offset} L${50 + offset},${40 + offset} L${50 + offset},${55 + offset} L${50 + 12 * scale + offset},${50 + offset} Z`}
              fill="url(#cube-grad)"
              opacity="0.5"
            />
          </motion.g>
        );
      })}
      
      {/* Center glowing line */}
      <motion.line
        x1="50"
        y1="25"
        x2="50"
        y2="75"
        stroke="#06b6d4"
        strokeWidth="2"
        opacity="0.6"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

// 3. Light Ray Prism
function LightPrism() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="prism-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="33%" stopColor="#eab308" />
          <stop offset="66%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      
      {/* Prism triangle */}
      <motion.path
        d="M50,35 L65,60 L35,60 Z"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="2.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Light ray entering */}
      <motion.line
        x1="20"
        y1="47"
        x2="35"
        y2="47"
        stroke="#ffffff"
        strokeWidth="3"
        opacity="0.8"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Spectrum rays exiting */}
      {[
        { y: 45, color: "#ef4444", delay: 0 },
        { y: 50, color: "#eab308", delay: 0.1 },
        { y: 55, color: "#10b981", delay: 0.2 },
        { y: 60, color: "#3b82f6", delay: 0.3 }
      ].map((ray, i) => (
        <motion.line
          key={`ray-${i}`}
          x1="65"
          y1={ray.y}
          x2="85"
          y2={ray.y + (i - 1.5) * 3}
          stroke={ray.color}
          strokeWidth="2.5"
          opacity="0.8"
          strokeLinecap="round"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: ray.delay }}
        />
      ))}
    </svg>
  );
}

// 4. Geometric Bloom
function GeometricBloom() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="bloom-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Center hexagon */}
      <motion.polygon
        points="50,42 56,46 56,54 50,58 44,54 44,46"
        fill="url(#bloom-grad)"
        opacity="0.6"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      
      {/* Petals unfolding */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.path
            key={`petal-${i}`}
            d={`M50,50 L${50 + 20 * Math.cos(rad)},${50 + 20 * Math.sin(rad)} L${50 + 25 * Math.cos(rad + 0.3)},${50 + 25 * Math.sin(rad + 0.3)} Z`}
            fill="url(#bloom-grad)"
            opacity="0.5"
            animate={{ 
              scale: [0, 1],
              opacity: [0, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.15 }}
            style={{ transformOrigin: "50px 50px" }}
          />
        );
      })}
    </svg>
  );
}

// 5. Perspective Grid
function PerspectiveGrid() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      
      {/* Vanishing point */}
      <circle cx="50" cy="35" r="2" fill="#06b6d4" opacity="0.8" />
      
      {/* Perspective lines to vanishing point */}
      {[20, 30, 40, 60, 70, 80].map((x, i) => (
        <motion.line
          key={`persp-${i}`}
          x1={x}
          y1="70"
          x2="50"
          y2="35"
          stroke="url(#grid-grad)"
          strokeWidth="1.5"
          opacity="0.6"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
        />
      ))}
      
      {/* Horizontal grid lines */}
      {[50, 55, 60, 65, 70].map((y, i) => (
        <motion.line
          key={`horiz-${i}`}
          x1="20"
          y1={y}
          x2="80"
          y2={y}
          stroke="url(#grid-grad)"
          strokeWidth="1.5"
          opacity={0.7 - i * 0.1}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.08 }}
        />
      ))}
    </svg>
  );
}

// 6. Crystalline T
function CrystallineT() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="crystal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* T shape with crystalline facets */}
      {/* Top horizontal bar */}
      <motion.path
        d="M30,35 L70,35 L68,40 L32,40 Z"
        fill="url(#crystal-grad)"
        opacity="0.8"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Vertical stem */}
      <motion.path
        d="M45,35 L55,35 L55,70 L45,70 Z"
        fill="url(#crystal-grad)"
        opacity="0.7"
      />
      
      {/* Crystal facets */}
      <motion.path
        d="M50,30 L45,35 L55,35 Z"
        fill="#06b6d4"
        opacity="0.6"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      
      {/* Side facets */}
      <motion.path
        d="M45,50 L40,55 L45,60 Z"
        fill="#3b82f6"
        opacity="0.5"
      />
      <motion.path
        d="M55,50 L60,55 L55,60 Z"
        fill="#3b82f6"
        opacity="0.5"
      />
      
      {/* Glow lines */}
      {[40, 50, 60].map((y, i) => (
        <motion.line
          key={`glow-${i}`}
          x1="45"
          y1={y}
          x2="55"
          y2={y}
          stroke="#06b6d4"
          strokeWidth="1"
          opacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}
