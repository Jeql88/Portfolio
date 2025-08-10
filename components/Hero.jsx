import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import heroImage from '../images/hero.jpg';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="floating absolute -top-16 -left-16 w-80 h-80 bg-[#0ea5e9]/25 rounded-full mix-blend-screen blur-2xl"></div>
        <div className="floating absolute top-24 -right-24 w-96 h-96 bg-[#60a5fa]/20 rounded-full mix-blend-screen blur-2xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          {/* Left: copy */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-gray-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]"></span>
              Josh Edward <span className="gradient-text">Lui</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 lg:mb-5">
              Building modern, reliable web apps
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl lg:max-w-2xl mb-7 lg:mb-8">
              BSIT student focused on full‑stack development. I enjoy turning ideas into
              accessible, performant products with clean code and thoughtful design.
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8 lg:mb-10">
              <span className="px-3 py-1 rounded-full glass text-xs">Full‑Stack Focus</span>
              <span className="px-3 py-1 rounded-full glass text-xs">Leadership • USC CISCO</span>
              <span className="px-3 py-1 rounded-full glass text-xs">Dean's List</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="px-6 py-3 rounded-full font-semibold bg-white text-[#0a0f1c] hover:bg-gray-100 transition-colors">
                View Projects
              </a>
              <a href="/Lui_Resume2.pdf" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors">
                Download Resume
              </a>
              <a href="#contact" className="px-6 py-3 rounded-full font-semibold bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition-colors">
                Contact
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5 text-gray-300">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.56.12-3.26 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.4s2.05.14 3.01.4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.7.24 2.95.12 3.26.77.84 1.24 1.91 1.24 3.23 0 4.64-2.8 5.66-5.48 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .5Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M20.451 20.452H16.9v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.36V9h3.4v1.561h.048c.474-.9 1.635-1.852 3.364-1.852 3.598 0 4.262 2.369 4.262 5.452v6.291ZM5.337 7.433a1.973 1.973 0 1 1 0-3.946 1.973 1.973 0 0 1 0 3.946ZM6.98 20.452H3.69V9h3.29v11.452Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: visual */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className={`group relative aspect-square max-w-[18rem] sm:max-w-[20rem] lg:max-w-[22rem] mx-auto rounded-3xl project-card overflow-hidden transition-transform duration-500 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} will-change-transform hover:scale-[1.03] hover:shadow-2xl`}>
              <Image
                src={heroImage}
                alt="Hero"
                fill
                priority
                className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-[#0ea5e9]/10 to-transparent" />
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#93c5fd]/20 blur-2xl" />
              <div className="absolute bottom-10 left-10 w-28 h-28 rounded-full bg-[#1e40af]/30 blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue - pinned to section bottom */}
      <div className="hidden md:flex absolute inset-x-0 bottom-4 justify-center items-center gap-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <span className="text-xs">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;