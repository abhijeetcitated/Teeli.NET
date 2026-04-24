"use client";

/**
 * MODERN VILLA 3D MODEL - REALISTIC VERSION
 * Clean 2-story modern house - architectural render style
 * NO POOL - just the building with glass windows
 */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export default function FuturisticHouse(props: React.JSX.IntrinsicElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);

  // Realistic materials with proper PBR properties
  const concreteMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e8e4dc",
    roughness: 0.85,
    metalness: 0.05,
  }), []);

  const darkConcrete = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#d5d0c8",
    roughness: 0.9,
    metalness: 0.02,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#7cb5d4",
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.95,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  }), []);

  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1c1c1c",
    roughness: 0.2,
    metalness: 0.9,
  }), []);

  const woodMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#8b6914",
    roughness: 0.7,
    metalness: 0.1,
  }), []);

  const stoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#a09080",
    roughness: 0.95,
    metalness: 0,
  }), []);

  // Slow rotation for showcase effect
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      
      {/* ============ GROUND FLOOR ============ */}
      
      {/* Main Ground Floor Box - Left Section */}
      <mesh position={[-2, 1.5, 0]}>
        <boxGeometry args={[4.5, 3, 5]} />
        <primitive attach="material" object={concreteMaterial} />
        <Edges color="#b5b0a5" threshold={15} />
      </mesh>

      {/* Stone accent wall on left side */}
      <mesh position={[-4.26, 1.5, 0]}>
        <boxGeometry args={[0.15, 3, 4.5]} />
        <primitive attach="material" object={stoneMaterial} />
      </mesh>

      {/* Main Ground Floor Box - Right Section (extends forward) */}
      <mesh position={[2, 1.5, 1.5]}>
        <boxGeometry args={[4.5, 3, 7]} />
        <primitive attach="material" object={concreteMaterial} />
        <Edges color="#b5b0a5" threshold={15} />
      </mesh>

      {/* Wood cladding accent - Right section */}
      <mesh position={[4.26, 1.5, 2]}>
        <boxGeometry args={[0.1, 2.8, 3]} />
        <primitive attach="material" object={woodMaterial} />
      </mesh>

      {/* Ground Floor - Large Glass Window Front Left */}
      <mesh position={[-2, 1.5, 2.52]}>
        <boxGeometry args={[3.5, 2.4, 0.08]} />
        <primitive attach="material" object={glassMaterial} />
      </mesh>
      
      {/* Ground Floor - Glass Window Frame Left (proper frame structure) */}
      {/* Top frame */}
      <mesh position={[-2, 2.75, 2.55]}>
        <boxGeometry args={[3.7, 0.08, 0.06]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Bottom frame */}
      <mesh position={[-2, 0.25, 2.55]}>
        <boxGeometry args={[3.7, 0.08, 0.06]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Left frame */}
      <mesh position={[-3.81, 1.5, 2.55]}>
        <boxGeometry args={[0.08, 2.5, 0.06]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Right frame */}
      <mesh position={[-0.19, 1.5, 2.55]}>
        <boxGeometry args={[0.08, 2.5, 0.06]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Center mullion */}
      <mesh position={[-2, 1.5, 2.55]}>
        <boxGeometry args={[0.04, 2.5, 0.06]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>

      {/* Ground Floor - Large Glass Windows Front Right (4 panels with frames) */}
      {[0, 1.2, 2.4, 3.6].map((x, i) => (
        <group key={i}>
          {/* Glass panel */}
          <mesh position={[x, 1.5, 5.02]}>
            <boxGeometry args={[1.1, 2.4, 0.08]} />
            <primitive attach="material" object={glassMaterial} />
          </mesh>
          {/* Vertical mullion */}
          <mesh position={[x + 0.58, 1.5, 5.05]}>
            <boxGeometry args={[0.04, 2.5, 0.04]} />
            <primitive attach="material" object={frameMaterial} />
          </mesh>
        </group>
      ))}
      {/* Window horizontal frames */}
      <mesh position={[1.8, 2.75, 5.05]}>
        <boxGeometry args={[5, 0.06, 0.04]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      <mesh position={[1.8, 0.25, 5.05]}>
        <boxGeometry args={[5, 0.06, 0.04]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>

      {/* Interior glow visible through ground floor windows */}
      <mesh position={[2, 0.8, 3.5]}>
        <boxGeometry args={[3.8, 0.05, 5.5]} />
        <meshStandardMaterial 
          color="#2a1f10"
          emissive="#ff8833" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Interior furniture silhouette */}
      <mesh position={[1.5, 0.5, 4]}>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#2a2520" />
      </mesh>

      {/* ============ FIRST FLOOR ============ */}
      
      {/* First Floor Slab (extends outward as canopy) */}
      <mesh position={[0, 3.1, 1.5]}>
        <boxGeometry args={[10, 0.25, 9]} />
        <primitive attach="material" object={darkConcrete} />
        <Edges color="#a5a095" threshold={15} />
      </mesh>
      
      {/* Slab bottom shadow line */}
      <mesh position={[0, 2.96, 5.5]}>
        <boxGeometry args={[10, 0.02, 0.02]} />
        <meshBasicMaterial color="#888888" />
      </mesh>

      {/* First Floor Main Box */}
      <mesh position={[-0.5, 4.55, 0]}>
        <boxGeometry args={[8, 2.6, 5.5]} />
        <primitive attach="material" object={concreteMaterial} />
        <Edges color="#b5b0a5" threshold={15} />
      </mesh>

      {/* Wood accent wall - first floor */}
      <mesh position={[-4.51, 4.55, -0.5]}>
        <boxGeometry args={[0.1, 2.4, 4]} />
        <primitive attach="material" object={woodMaterial} />
      </mesh>

      {/* First Floor - Large Panoramic Window (6 panels with proper frames) */}
      {[-3.4, -2.1, -0.8, 0.5, 1.8, 3.1].map((x, i) => (
        <group key={i}>
          {/* Glass panel */}
          <mesh position={[x - 0.5, 4.55, 2.77]}>
            <boxGeometry args={[1.2, 2.1, 0.08]} />
            <primitive attach="material" object={glassMaterial} />
          </mesh>
          {/* Vertical mullion */}
          <mesh position={[x - 0.5 + 0.62, 4.55, 2.8]}>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive attach="material" object={frameMaterial} />
          </mesh>
        </group>
      ))}
      
      {/* First Floor Window Horizontal Frames */}
      <mesh position={[-0.5, 5.7, 2.8]}>
        <boxGeometry args={[7.8, 0.06, 0.04]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      <mesh position={[-0.5, 3.4, 2.8]}>
        <boxGeometry args={[7.8, 0.06, 0.04]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>

      {/* Interior glow visible through first floor windows */}
      <mesh position={[-0.5, 4.1, 0.5]}>
        <boxGeometry args={[6.5, 0.05, 4.5]} />
        <meshStandardMaterial 
          color="#2a1f10"
          emissive="#ffaa44" 
          emissiveIntensity={0.4} 
        />
      </mesh>

      {/* Interior curtain/furniture hint */}
      <mesh position={[-2.5, 4.55, 2.3]}>
        <boxGeometry args={[0.8, 2, 0.05]} />
        <meshStandardMaterial color="#e8e0d0" transparent opacity={0.3} />
      </mesh>

      {/* Balcony with glass railing */}
      {/* Balcony floor extension */}
      <mesh position={[3.5, 3.05, 4]}>
        <boxGeometry args={[2.8, 0.15, 2.5]} />
        <primitive attach="material" object={darkConcrete} />
      </mesh>
      
      {/* Glass Railing - front */}
      <mesh position={[3.5, 3.6, 5.2]}>
        <boxGeometry args={[2.6, 0.9, 0.06]} />
        <primitive attach="material" object={glassMaterial} />
      </mesh>
      {/* Glass railing - side */}
      <mesh position={[4.85, 3.6, 4]}>
        <boxGeometry args={[0.06, 0.9, 2.4]} />
        <primitive attach="material" object={glassMaterial} />
      </mesh>
      
      {/* Railing top bar - front */}
      <mesh position={[3.5, 4.1, 5.2]}>
        <boxGeometry args={[2.8, 0.04, 0.08]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Railing top bar - side */}
      <mesh position={[4.85, 4.1, 4]}>
        <boxGeometry args={[0.08, 0.04, 2.5]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>

      {/* ============ ROOF ============ */}
      
      {/* Main Roof with large overhang */}
      <mesh position={[-0.5, 5.95, 0.5]}>
        <boxGeometry args={[9.5, 0.2, 7.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.2} />
        <Edges color="#1a1a1a" threshold={15} />
      </mesh>

      {/* Roof parapet edge */}
      <mesh position={[-0.5, 6.1, 4.2]}>
        <boxGeometry args={[9.5, 0.1, 0.15]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
      </mesh>

      {/* LED strip under roof overhang (warm white) */}
      <mesh position={[-0.5, 5.83, 4.2]}>
        <boxGeometry args={[8.5, 0.02, 0.02]} />
        <meshBasicMaterial color="#fff5e0" toneMapped={false} />
      </mesh>

      {/* ============ ENTRANCE / DOOR ============ */}
      
      {/* Main entrance door */}
      <mesh position={[-0.3, 1.3, 2.53]}>
        <boxGeometry args={[1.2, 2.5, 0.1]} />
        <primitive attach="material" object={woodMaterial} />
      </mesh>
      {/* Door frame */}
      <mesh position={[-0.3, 1.3, 2.55]}>
        <boxGeometry args={[1.35, 2.65, 0.02]} />
        <primitive attach="material" object={frameMaterial} />
      </mesh>
      {/* Door handle */}
      <mesh position={[0.2, 1.3, 2.6]}>
        <boxGeometry args={[0.04, 0.15, 0.08]} />
        <meshStandardMaterial color="#c0a070" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ============ OUTDOOR FURNITURE - REALISTIC ============ */}
      
      {/* Modern outdoor sofa - Left */}
      <group position={[-3.2, 0.35, 4.5]}>
        {/* Base/cushion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.35, 0.8]} />
          <meshStandardMaterial color="#4a4540" roughness={0.8} />
        </mesh>
        {/* Back cushion */}
        <mesh position={[0, 0.35, -0.3]}>
          <boxGeometry args={[1.6, 0.45, 0.25]} />
          <meshStandardMaterial color="#4a4540" roughness={0.8} />
        </mesh>
        {/* Legs */}
        {[[-0.65, -0.25, 0.25], [0.65, -0.25, 0.25], [-0.65, -0.25, -0.25], [0.65, -0.25, -0.25]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.06, 0.18, 0.06]} />
            <meshStandardMaterial color="#2a2520" roughness={0.3} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Coffee table */}
      <group position={[-3.2, 0.3, 5.5]}>
        {/* Table top */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.9, 0.06, 0.5]} />
          <meshStandardMaterial color="#3a3530" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Table legs */}
        {[[-0.35, 0, 0.15], [0.35, 0, 0.15], [-0.35, 0, -0.15], [0.35, 0, -0.15]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#2a2520" roughness={0.3} metalness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ============ LANDSCAPING - REALISTIC ============ */}
      
      {/* Large planter with bush - right side */}
      <group position={[4.8, 0.3, 4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.6, 0.7]} />
          <meshStandardMaterial color="#505050" roughness={0.8} />
        </mesh>
        {/* Bush/shrub */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.5, 12, 8]} />
          <meshStandardMaterial color="#2d4a25" roughness={0.95} />
        </mesh>
        <mesh position={[0.2, 0.5, 0.2]}>
          <sphereGeometry args={[0.35, 10, 6]} />
          <meshStandardMaterial color="#3a5a30" roughness={0.95} />
        </mesh>
      </group>

      {/* Tall grass/ornamental plant - left front */}
      <group position={[-4.8, 0.5, 3.5]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 0.5, 8]} />
          <meshStandardMaterial color="#454545" roughness={0.8} />
        </mesh>
        {/* Grass blades (simplified) */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle * Math.PI / 180) * 0.15, 0.6, Math.sin(angle * Math.PI / 180) * 0.15]} rotation={[0.3, angle * Math.PI / 180, 0.1]}>
            <boxGeometry args={[0.03, 0.8, 0.01]} />
            <meshStandardMaterial color="#4a6a40" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Small ground plants */}
      <mesh position={[4.5, 0.15, 2]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#3a5530" roughness={0.95} />
      </mesh>
      <mesh position={[4.8, 0.12, 2.5]}>
        <sphereGeometry args={[0.18, 8, 6]} />
        <meshStandardMaterial color="#4a6540" roughness={0.95} />
      </mesh>

      {/* ============ GROUND / TERRACE ============ */}
      
      {/* Main terrace - stone tiles */}
      <mesh position={[0, -0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#c5baa8" roughness={0.75} />
      </mesh>

      {/* Tile grid lines */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={`vline-${i}`} position={[x, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 8]} />
          <meshStandardMaterial color="#a09080" />
        </mesh>
      ))}
      {[0, 2, 4, 6].map((z, i) => (
        <mesh key={`hline-${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 0.02]} />
          <meshStandardMaterial color="#a09080" />
        </mesh>
      ))}

      {/* Grass area around */}
      <mesh position={[0, -0.05, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.95} />
      </mesh>

      {/* Driveway / path */}
      <mesh position={[-5.5, -0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 6]} />
        <meshStandardMaterial color="#888580" roughness={0.8} />
      </mesh>

      {/* ============ LIGHTING ACCENTS ============ */}
      
      {/* Ground path lights */}
      {[-4, -2, 0, 2].map((x, i) => (
        <group key={i} position={[x, 0.2, 6.5]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.4, 8]} />
            <meshStandardMaterial color="#303030" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#fff5e0" toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Wall sconce lights */}
      <mesh position={[-3.8, 2.2, 2.56]}>
        <boxGeometry args={[0.15, 0.25, 0.08]} />
        <meshBasicMaterial color="#fff8e8" toneMapped={false} />
      </mesh>
      <mesh position={[0.85, 2.2, 2.56]}>
        <boxGeometry args={[0.15, 0.25, 0.08]} />
        <meshBasicMaterial color="#fff8e8" toneMapped={false} />
      </mesh>

      {/* Subtle ambient glow on ground */}
      <mesh position={[0, 0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 32]} />
        <meshBasicMaterial color="#ffaa44" transparent opacity={0.03} />
      </mesh>

    </group>
  );
}
