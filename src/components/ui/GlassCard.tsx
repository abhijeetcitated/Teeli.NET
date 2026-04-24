"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  spotlightEffect?: boolean;
  glowColor?: "teal" | "violet" | "sapphire";
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  spotlightEffect = false,
  glowColor = "teal",
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    teal: "rgba(22, 199, 158, 0.15)",
    violet: "rgba(137, 48, 232, 0.15)",
    sapphire: "rgba(19, 87, 110, 0.15)",
  };

  const borderGlowColors = {
    teal: "rgba(22, 199, 158, 0.5)",
    violet: "rgba(137, 48, 232, 0.5)",
    sapphire: "rgba(19, 87, 110, 0.5)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightEffect || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-[12px]",
        "border border-white/10",
        "transition-all duration-300 ease-out",
        hoverEffect && "hover:border-white/20 hover:bg-white/[0.07]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverEffect ? { 
        y: -4,
        boxShadow: `0 20px 40px -10px ${glowColors[glowColor]}`,
      } : undefined}
    >
      {/* Spotlight Effect */}
      {spotlightEffect && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 40%)`,
          }}
        />
      )}
      
      {/* Border Glow on Hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 0 1px ${borderGlowColors[glowColor]}`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlassCard;
