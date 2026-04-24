import React from 'react';

// All SVG icons for TEELI.NET sections

export const FireIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill="url(#fire-gradient-1)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14C12 14 9 16 9 18.5C9 20.4 10.6 22 12.5 22C14.4 22 16 20.4 16 18.5C16 16 12 14 12 14Z" fill="url(#fire-gradient-2)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 10C12 10 10 11 10 12.5C10 13.3 10.7 14 11.5 14C12.3 14 13 13.3 13 12.5C13 11 12 10 12 10Z" fill="url(#fire-gradient-3)"/>
    <defs>
      <linearGradient id="fire-gradient-1" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24"/>
        <stop offset="1" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="fire-gradient-2" x1="12.5" y1="14" x2="12.5" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b"/>
        <stop offset="1" stopColor="#ef4444"/>
      </linearGradient>
      <linearGradient id="fire-gradient-3" x1="11.5" y1="10" x2="11.5" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef3c7"/>
        <stop offset="1" stopColor="#fbbf24"/>
      </linearGradient>
    </defs>
  </svg>
);

export const BrainIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.5 2 6 4.5 6 7C6 8.5 7 9.5 8 10C7 10.5 6 11.5 6 13C6 14.5 7 15.5 8 16C7 16.5 6 17.5 6 19C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 19C18 17.5 17 16.5 16 16C17 15.5 18 14.5 18 13C18 11.5 17 10.5 16 10C17 9.5 18 8.5 18 7C18 4.5 15.5 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="9" cy="8" r="1" fill="currentColor"/>
    <circle cx="15" cy="8" r="1" fill="currentColor"/>
    <path d="M12 12C12 12 10 14 12 16C14 14 12 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const LightningIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const LeafIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 3L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CubeIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C21 7.4 20.7 6.8 20.2 6.5L13 2.2C12.4 1.9 11.6 1.9 11 2.2L3.8 6.5C3.3 6.8 3 7.4 3 8V16C3 16.6 3.3 17.2 3.8 17.5L11 21.8C11.6 22.1 12.4 22.1 13 21.8L20.2 17.5C20.7 17.2 21 16.6 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M3.3 7L12 12L20.7 7M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CommandIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M7 9L12 14L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const XCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const UploadIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M17 8L12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WrenchIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L14.1 4.3C13.7 3.9 13.1 3.9 12.7 4.3L4.3 12.7C3.9 13.1 3.9 13.7 4.3 14.1L4.9 14.7C5.3 15.1 5.9 15.1 6.3 14.7L14.7 6.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M19 10L21 8C21.6 7.4 22 6.5 22 5.5C22 3.6 20.4 2 18.5 2C17.5 2 16.6 2.4 16 3L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const SparklesIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
    <circle cx="19" cy="5" r="2" fill="currentColor"/>
    <circle cx="5" cy="19" r="2" fill="currentColor"/>
  </svg>
);

export const UsersIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M3 21V19C3 16.8 4.8 15 7 15H11C13.2 15 15 16.8 15 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 11C17.7 11 19 9.7 19 8C19 6.3 17.7 5 16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 21V19C21 17.3 19.7 16 18 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const RocketIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 20 4 20 12C20 16 18 18 16 19L15 21L12 19L9 21L8 19C6 18 4 16 4 12C4 4 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const AlertTriangleIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const DollarIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M17 5H9.5C7.6 5 6 6.6 6 8.5C6 10.4 7.6 12 9.5 12H14.5C16.4 12 18 13.6 18 15.5C18 17.4 16.4 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShieldIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CodeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CreditCardIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const TrendingUpIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloudUploadIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10C19.7 10 21.4 11 22 13C23 14.5 22.5 17 20.5 18.5C19.5 19.2 18.2 19.5 17 19.5H7C5.5 19.5 4 19 3 18C1.5 16.5 1 14.5 1.5 12.5C2 10.5 3.5 9 5.5 8.5C6 6.5 7.5 5 9.5 4.5C12 4 14.5 5 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 12V19M12 12L9 15M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MagicWandIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 4L17 8L21 10L17 12L15 16L13 12L9 10L13 8L15 4Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20L20 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="5" cy="5" r="2" fill="currentColor"/>
    <circle cx="19" cy="19" r="2" fill="currentColor"/>
  </svg>
);

export const RocketLaunchIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L9 21L10 16L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 15L15 21L14 16L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 15C15 15 18 12 18 9C18 6 20 4 20 4C20 4 18 2 15 2C12 2 9 5 9 8C9 11 12 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="8" r="2" fill="currentColor"/>
  </svg>
);

export const ToolIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="currentColor"/>
  </svg>
);

export const ZapIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeafCheckIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="8.5" r="1.5" fill="currentColor"/>
    <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor"/>
  </svg>
);
