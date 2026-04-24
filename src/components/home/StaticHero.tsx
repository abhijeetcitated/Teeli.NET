/**
 * StaticHero - Server-rendered hero for instant FCP
 * No "use client" - this renders immediately without waiting for JS
 */

export default function StaticHero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Static Background - CSS only, no JS needed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16c79e08_1px,transparent_1px),linear-gradient(to_bottom,#16c79e08_1px,transparent_1px)] bg-[length:4rem_4rem]" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-signal-teal/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-plasma-violet/20 rounded-full blur-[120px]" />
      </div>

      {/* Content - Immediately visible */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
            <span className="text-starlight">The Fastest Way to </span>
            <span className="bg-gradient-to-r from-signal-teal via-cyan-400 to-blue-500 bg-clip-text text-transparent">Fix & Render</span>
            <br />
            <span className="text-starlight">3D Files. </span>
            <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Automatically.</span>
          </h1>
        </div>

        <p className="animate-fade-in-up animation-delay-100 text-lg sm:text-xl md:text-2xl text-starlight/70 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          Stop broken meshes, failed renders, and wasted hours. Upload once—TEELI repairs, renders, and delivers your output automatically.
        </p>

        <div className="animate-fade-in-up animation-delay-200 flex flex-wrap items-center justify-center gap-6 mb-16">
          <a href="https://app.teeli.net/" className="group relative px-12 py-5 text-white font-bold text-xl rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
            {/* Animated gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-signal-teal via-cyan-500 to-blue-500" />
            {/* Pulsing glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-signal-teal via-cyan-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            {/* Shine sweep effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {/* Border glow */}
            <span className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 drop-shadow-lg">
              <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent font-black">Start Free</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
          <button className="px-12 py-5 bg-white/5 backdrop-blur-sm border border-white/20 text-starlight font-bold text-xl rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300">
            See Demo
          </button>
        </div>

        {/* Micro-Stats */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-signal-teal mb-1">98%</div>
            <div className="text-sm md:text-base text-starlight/60">First-time render success</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-1">10×</div>
            <div className="text-sm md:text-base text-starlight/60">Faster workflow</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1">90%</div>
            <div className="text-sm md:text-base text-starlight/60">Less manual fixing</div>
          </div>
        </div>
      </div>
    </section>
  );
}
