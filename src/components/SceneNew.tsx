"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import NeuralLines from "./NeuralLines";
import FuturisticHouse from "./FuturisticHouse";

// Star-like particles component (optimized)
function Particles({ count = 2500, scrollProgress = 0 }: { count?: number, scrollProgress?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const baseX = useRef(0);
  
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 30;
    }
    return array;
  }, [count]);
  
  useFrame((state, delta) => {
    if (ref.current) {
      // Normal rotation
      ref.current.rotation.y += delta * 0.03;
      // Move right based on scroll progress (offset from base)
      ref.current.position.x = baseX.current + scrollProgress * 5;
    }
  });
  
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#00f5ff" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  );
}

// Animated floating house with glow
function ResponsiveHouse({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  const isMobile = viewport.width / viewport.height < 1;
  
  // Position and scale for the modern villa
  let basePosition: [number, number, number], baseScale: number;
  if (isMobile) {
    basePosition = [0, -1, -2];
    baseScale = 0.28;
  } else {
    basePosition = [0, -1.5, 0];  // Villa centered
    baseScale = 0.42;
  }
  
  // FLOATING ANIMATION - slow up-down bobbing
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating effect
      const floatY = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      
      groupRef.current.position.y = basePosition[1] + floatY;
    }
  });
  
  // Move building backward and scale down on scroll (disappear into space effect)
  const scrollZ = basePosition[2] - scrollProgress * 15;
  const scrollScale = baseScale * (1 - scrollProgress * 0.7);
  
  return (
    <group ref={groupRef} position={[basePosition[0], basePosition[1], scrollZ]} scale={scrollScale}>
      <FuturisticHouse />
      
      {/* GLOW EFFECT - Point lights around the villa */}
      {/* REALISTIC LIGHTING - warm sunset feel for villa */}
      <pointLight position={[0, 3, 6]} color="#ffcc88" intensity={4} distance={12} decay={2} />
      <pointLight position={[-4, 5, 2]} color="#ffa555" intensity={2.5} distance={10} decay={2} />
      <pointLight position={[4, 5, 2]} color="#ffa555" intensity={2.5} distance={10} decay={2} />
      {/* Ground bounce light */}
      <pointLight position={[0, 0.5, 5]} color="#ffe0b0" intensity={1.5} distance={8} decay={2} />
      {/* Subtle blue fill from back */}
      <pointLight position={[0, 4, -5]} color="#aaccff" intensity={1} distance={12} decay={2} />
    </group>
  );
}

export default function SceneNew({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas camera={{ position: [10, 5, 14], fov: 40 }}>
      {/* REALISTIC LIGHTING - golden hour / evening */}
      <ambientLight intensity={0.35} color="#fff8f0" />
      
      {/* Main sun light (warm) */}
      <directionalLight position={[15, 12, 10]} intensity={2} color="#fff0dd" castShadow />
      
      {/* Fill light from opposite side (cooler) */}
      <directionalLight position={[-10, 8, -5]} intensity={0.6} color="#d0e8ff" />
      
      {/* Sky/environment light */}
      <hemisphereLight args={["#87ceeb", "#f5e6d3", 0.5]} />
      
      {/* Sunset backlight */}
      <spotLight 
        position={[0, 20, -25]} 
        angle={0.5} 
        penumbra={1} 
        intensity={1.2} 
        color="#ff8855" 
        target-position={[0, 0, 0]}
      />
      
      <Suspense fallback={null}>
        <ResponsiveHouse scrollProgress={scrollProgress} />
      </Suspense>
      
      <NeuralLines />
      <Particles scrollProgress={scrollProgress} />

      {/* SUBTLE BLOOM for realistic glow */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.8} 
          height={350} 
          intensity={1.8}
          mipmapBlur={true}
        />
      </EffectComposer>
    </Canvas>
  );
}
