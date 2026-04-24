import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TEELI Deep Space Color Palette
        'deep-void': '#000421',          // Primary background (cosmic black)
        'cetacean-blue': '#000F2B',      // Secondary background (deep ocean blue)
        'nebula-blue': '#042c62',        // Tertiary surface (nebula hue)
        'future-dusk': '#340732',        // Accent background (purple dusk)
        'signal-teal': '#16c79e',        // Primary CTA color (conversion focus)
        'plasma-violet': '#8930e8',      // Secondary accent (energy/power)
        'starlight': '#e4e4e4',          // Primary text color (high contrast)
        'sapphire': '#13576E',           // Tertiary accent (data highlights)
        
        // Semantic aliases for easier usage
        background: {
          primary: '#000421',
          secondary: '#000F2B',
          tertiary: '#042c62',
        },
        accent: {
          primary: '#16c79e',            // Signal Teal - for CTAs
          secondary: '#8930e8',          // Plasma Violet - for highlights
          tertiary: '#13576E',           // Sapphire - for data
        },
      },
      fontFamily: {
        // Technical/Data Font (Monospace)
        mono: ["'JetBrains Mono'", "'Fira Code'", "'Courier New'", "monospace"],
        // Body/UI Font (Sans-serif)
        sans: ["'Inter'", "'Geist'", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        // Heading Font (Bold Sans)
        heading: ["'Inter'", "'Geist'", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Custom responsive type scale
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'mono-data': ['0.875rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      animation: {
        // Existing animations
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        
        // TEELI Micro-interactions
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        // Existing keyframes
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        
        // TEELI Custom Keyframes
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(22, 199, 158, 0.3), 0 0 40px rgba(22, 199, 158, 0.1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(22, 199, 158, 0.6), 0 0 60px rgba(22, 199, 158, 0.3)',
          },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        glass: '12px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 212, 255, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(0, 212, 255, 0.2)',
        'eco-glow': '0 0 20px rgba(0, 255, 136, 0.4)',
        'electric-glow': '0 0 20px rgba(0, 212, 255, 0.4)',
        'neon-glow': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
