"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
  gradient?: "teal" | "violet" | "space" | "white";
  glow?: boolean;
  animate?: boolean;
}

export function GlowText({
  children,
  as: Tag = "h1",
  className,
  gradient = "white",
  glow = true,
  animate = false,
}: GlowTextProps) {
  const gradientClasses = {
    teal: "bg-gradient-to-r from-signal-teal via-sapphire to-signal-teal",
    violet: "bg-gradient-to-r from-plasma-violet via-future-dusk to-plasma-violet",
    space: "bg-gradient-to-r from-signal-teal via-plasma-violet to-sapphire",
    white: "bg-gradient-to-b from-white to-white/60",
  };

  const glowShadows = {
    teal: "0 0 40px rgba(22, 199, 158, 0.3), 0 0 80px rgba(22, 199, 158, 0.1)",
    violet: "0 0 40px rgba(137, 48, 232, 0.3), 0 0 80px rgba(137, 48, 232, 0.1)",
    space: "0 0 40px rgba(22, 199, 158, 0.2), 0 0 60px rgba(137, 48, 232, 0.15)",
    white: "0 0 30px rgba(255, 255, 255, 0.1)",
  };

  const textContent = (
    <Tag
      className={cn(
        "bg-clip-text text-transparent",
        "tracking-tight",
        gradientClasses[gradient],
        gradient === "space" && "bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]",
        className
      )}
      style={glow ? { 
        textShadow: glowShadows[gradient],
        filter: "drop-shadow(0 0 2px rgba(255,255,255,0.1))",
      } : undefined}
    >
      {children}
    </Tag>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {textContent}
      </motion.div>
    );
  }

  return textContent;
}

export default GlowText;
