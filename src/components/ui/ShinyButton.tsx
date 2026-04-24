"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function ShinyButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
}: ShinyButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: cn(
      "bg-gradient-to-r from-signal-teal to-sapphire",
      "text-deep-void font-bold",
      "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-2px_4px_0_rgba(0,0,0,0.2)]",
      "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_0_30px_rgba(22,199,158,0.4)]"
    ),
    secondary: cn(
      "bg-gradient-to-r from-plasma-violet to-future-dusk",
      "text-white font-bold",
      "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-2px_4px_0_rgba(0,0,0,0.2)]",
      "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_0_30px_rgba(137,48,232,0.4)]"
    ),
    outline: cn(
      "bg-transparent border-2 border-signal-teal",
      "text-signal-teal font-semibold",
      "hover:bg-signal-teal/10",
      "hover:shadow-[0_0_20px_rgba(22,199,158,0.3)]"
    ),
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "font-sans tracking-tight",
        "transition-all duration-300 ease-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Shimmer Effect */}
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />
      
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export default ShinyButton;
