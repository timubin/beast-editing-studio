
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const Hero: React.FC = () => {
  const { hero } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 md:pt-32 overflow-hidden bg-black">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Network of Lines (Static but with subtle pulse) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {[...Array(25)].map((_, i) => (
            <line
              key={`line-${i}`}
              x1={`${Math.random() * 110 - 5}%`}
              y1={`${Math.random() * 110 - 5}%`}
              x2={`${Math.random() * 110 - 5}%`}
              y2={`${Math.random() * 110 - 5}%`}
              stroke="#3f3f46"
              strokeWidth="1.5"
              className="opacity-50"
            />
          ))}
        </svg>

        {/* Floating Geometric Squares (Left Side) */}
        <div className="absolute top-1/4 left-[-2%] space-y-[-60px] md:space-y-[-100px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={`square-${i}`}
              className="w-48 h-48 md:w-80 md:h-80 border border-red-600/30 bg-red-950/10 backdrop-blur-[2px] animate-float relative"
              style={{
                marginLeft: `${i * 30}px`,
                animationDelay: `${i * 1.2}s`,
                opacity: 0.6 - (i * 0.1)
              }}
            >
              {/* Grid pattern inside square */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:15px_15px]"></div>

              {/* Glow dot in corner of some squares */}
              {i % 2 === 0 && (
                <div className="absolute top-4 left-4 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Drifting Red Particles */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-red-600 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 12px #ef4444',
              opacity: Math.random() * 0.7 + 0.3
            }}
          ></div>
        ))}

        {/* Horizontal Light Flare (Scanning/Pulsing) */}
        <div className="absolute top-[55%] right-0 w-[70%] h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent animate-flare blur-[0.5px]"></div>
        <div className="absolute top-[55%] right-[15%] w-6 h-6 bg-red-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>

        {/* Extra Background Elements for Depth */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-zinc-800/20 rounded-full blur-[80px]"></div>

        {/* Technical Plus Signs */}
        <div className="absolute top-[40%] right-[25%] text-zinc-700 text-5xl font-extralight select-none">+</div>
        <div className="absolute bottom-[20%] left-[30%] text-zinc-800 text-3xl font-extralight select-none opacity-40">+</div>

        {/* Central Shadow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Main Title with Depth */}
        <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-black mb-6 tracking-tighter uppercase leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 relative">
          {hero.titleLine1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600">{hero.titleLine2}</span>
        </h1>

        {/* Sub-headline with Red Accent */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-black text-red-600 uppercase tracking-tighter leading-tight">
            {hero.subHeadlineLine1}
          </h2>
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight">
            {hero.subHeadlineLine2}
          </h2>
        </div>

        {/* Services List with Bullet Points */}
        <p className="text-zinc-500 text-sm md:text-xl font-bold tracking-[0.25em] mb-16 max-w-5xl mx-auto uppercase flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
          <span>3D Product Visualization</span>
          <span className="hidden md:block text-zinc-600 text-lg">|</span>
          <span>Motion Graphics</span>
          <span className="hidden md:block text-zinc-600 text-lg">|</span>
          <span>Commercial Animation</span>
        </p>

        {/* Action Button */}
        <div className="flex flex-col items-center">
          <a href="#portfolio" className="group relative bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] active:scale-95 overflow-hidden inline-block">
            <span className="relative z-10 flex items-center gap-3">
              View Our Work
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>

          {/* Scroll Indicator */}
          <div className="mt-12 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Video Section */}
          {hero.videoUrl && (
            <div className="mt-16 w-full max-w-4xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800 aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${(() => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                    const match = hero.videoUrl.match(regExp);
                    return (match && match[2].length === 11) ? match[2] : null;
                  })()}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
