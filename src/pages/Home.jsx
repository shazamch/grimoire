import { Package, Sparkles, ArrowRight, Code2 } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Orbs - Subtle & Modern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse slow" />
        <div className="absolute top-10 -right-32 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-3000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-12 text-center">
        {/* Sparkle Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/20">
            <Sparkles size={56} className="text-yellow-400 drop-shadow-2xl" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-black mb-6 tracking-tight">
          <span className="bg-linear-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            @shazam-codes/grimoire
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Beautiful, accessible, and fully customizable<br className="hidden sm:inline" />
          React components crafted with Tailwind CSS & love.
        </p>

        {/* Install Command */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 sm:px-10 py-5 rounded-2xl border border-white/20 shadow-2xl">
            <Package size={32} className="text-purple-300" />
            <code className="text-base sm:text-lg md:text-xl font-mono text-white tracking-wide">
              npm install @shazam-codes/grimoire
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://www.npmjs.com/package/@shazam-codes/grimoire"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold text-lg border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-white/50"
          >
            <Package size={24} />
            View on npm
            <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
          </a>

          <a
            href="https://grimoire-snippets.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 ring-2 ring-purple-500/30"
          >
            <Code2 size={26} />
            Explore Live Snippets
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-3" />
          </a>
        </div>

        {/* Footer Credit */}
        <p className="absolute bottom-6 left-0 right-0 text-sm opacity-60 font-light tracking-wider">
          Crafted with <span className="text-red-400">❤️</span> by Shazam Razzaq
        </p>
      </div>

      {/* Custom Animation Delays (Tailwind doesn't have delay by default) */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .slow { animation: pulse 12s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
}

export default HomePage;