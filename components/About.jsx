import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import a1 from '../images/aboutme1.jpg';
import a2 from '../images/aboutme2.jpg';
import a3 from '../images/aboutme3.jpg';
import a4 from '../images/aboutme4.jpg';
import a5 from '../images/aboutme5.jpg';
import a6 from '../images/aboutme6.jpg';

const About = () => {
  const imgs = [a1, a2, a3, a4, a5, a6];
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => setIndex((i) => (i + 1) % imgs.length), 3500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused]);

  const widthPx = () => (containerRef.current ? containerRef.current.clientWidth : 1);

  const onPointerDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    startXRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragDx(0);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const dx = x - startXRef.current;
    setDragDx(dx);
  };
  const endDrag = () => {
    if (!isDragging) return;
    const dx = dragDx;
    setIsDragging(false);
    setDragDx(0);
    const threshold = Math.min(60, widthPx() * 0.12); // easier swipe threshold for desktop
    if (dx > threshold) setIndex((i) => (i - 1 + imgs.length) % imgs.length);
    else if (dx < -threshold) setIndex((i) => (i + 1) % imgs.length);
    setTimeout(() => setIsPaused(false), 300);
  };

  return (
    <section id="about" className="py-20 relative bg-[#0b1220]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Passionate about technology and innovation, currently pursuing BSIT at University of San Carlos
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-300">
                <p>Currently a BSIT-2 student at University of San Carlos with a stellar GPA of 1.36, consistently making the Dean's List from 2023-2025.</p>
                <p>As Vice President of Internal Relations at USC CISCO Student Council, I lead internal operations and coordinate tech-related events, bridging communication between various student organizations.</p>
                <p>My passion lies in full-stack development, data analysis, and network infrastructure. I've completed certifications from DataCamp, Cisco, and participated in international programs in Vietnam and Thailand.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#0ea5e9]/20 rounded-full text-sm text-[#93c5fd]">Dean's List</span>
                <span className="px-3 py-1 bg-[#0ea5e9]/20 rounded-full text-sm text-[#93c5fd]">Student Leader</span>
                <span className="px-3 py-1 bg-[#0ea5e9]/20 rounded-full text-sm text-[#93c5fd]">Certified Developer</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="relative">
              <div
                ref={containerRef}
                className="relative w-full h-96 rounded-2xl overflow-hidden project-card select-none"
                onMouseDown={onPointerDown}
                onMouseMove={onPointerMove}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={onPointerDown}
                onTouchMove={onPointerMove}
                onTouchEnd={endDrag}
              >
                {/* Prev/Next arrows for desktop */}
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => { setIsPaused(true); setIndex((i) => (i - 1 + imgs.length) % imgs.length); setTimeout(() => setIsPaused(false), 300); }}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => { setIsPaused(true); setIndex((i) => (i + 1) % imgs.length); setTimeout(() => setIsPaused(false), 300); }}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white"
                >
                  ›
                </button>
                {imgs.map((src, i) => {
                  const offset = i - index;
                  const dragOffsetPct = (dragDx / Math.max(widthPx(), 1)) * 100;
                  return (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-transform duration-500 ease-out ${isDragging ? '!transition-none' : ''}`}
                      style={{ transform: `translateX(calc(${offset * 100}% + ${dragOffsetPct}%))` }}
                    >
                      <Image src={src} alt={`About image ${i + 1}`} fill className="object-cover" priority={i === index} />
                    </div>
                  );
                })}
                {/* Pagination dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => { setIsPaused(true); setIndex(i); setTimeout(() => setIsPaused(false), 400); }}
                      className={`w-2.5 h-2.5 rounded-full transition ${i === index ? 'bg-[#93c5fd]' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#0ea5e9]/20 rounded-full opacity-50 floating"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#93c5fd]/20 rounded-full opacity-50 floating" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 