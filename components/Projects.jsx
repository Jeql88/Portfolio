import React, { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  { id: 'p6', title: 'Collaborative Drawing Web App', date: '2025-06', tags: ['React.js', 'Socket.IO', 'MongoDB'], icon: 'fas fa-paint-brush', summary: 'A realtime whiteboard with collaborative drawing, session persistence, and replayable strokes.' },
  { id: 'p5', title: 'Hotel Management System', date: '2025-05', tags: ['Go', 'Docker', 'GraphQL'], icon: 'fas fa-hotel', summary: 'Microservices booking, containerized services, role-based access, and JWT auth.' },
  { id: 'p4', title: '2D Roguelike Game', date: '2025-02', tags: ['C#', 'Unity', 'Game Dev'], icon: 'fas fa-gamepad', summary: 'Procedural generation, itemization, and a satisfying combat loop with bosses.' },
  { id: 'p3', title: 'LAPD Crime Analysis', date: '2024-12', tags: ['SQL Server', 'SSIS', 'Analytics'], icon: 'fas fa-chart-line', summary: 'ETL pipelines with SSIS, star-schema warehouse, and storytelling dashboards.' },
  { id: 'p2', title: 'IP Telephony System', date: '2024-12', tags: ['Cisco', 'VoIP', 'HSRP'], icon: 'fas fa-network-wired', summary: 'Multi-branch VoIP with HSRP, QoS, dial plans, and resilient network edges.' },
  { id: 'p1', title: 'University Marketplace System', date: '2024-08', tags: ['PHP', 'MySQL', 'WebSockets'], icon: 'fas fa-shopping-cart', summary: 'Campus e-commerce with real-time chat, escrow-like orders, and admin tools.' },
].sort((a,b) => (a.date < b.date ? 1 : -1));

const MAX_SLIDES = 5; // placeholder count per project

const Projects = () => {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [slideIdx, setSlideIdx] = useState(0);
  const detailRef = useRef(null);
  const swipeRef = useRef({ x: 0, y: 0 });
  const autoRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-project-id]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-project-id');
          setActiveId(id);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 });

    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Reset slide and animate panel when project changes
    setSlideIdx(0);
    if (typeof window !== 'undefined' && window.gsap && detailRef.current) {
      const gsap = window.gsap;
      gsap.fromTo(detailRef.current, { y: 16, opacity: 0.9 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
    // Auto-advance
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setSlideIdx(i => (i + 1) % MAX_SLIDES), 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [activeId]);

  const active = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    swipeRef.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - swipeRef.current.x;
    const dy = t.clientY - swipeRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      setSlideIdx((i) => (dx < 0 ? (i + 1) % MAX_SLIDES : (i - 1 + MAX_SLIDES) % MAX_SLIDES));
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Projects</h2>
          <p className="text-xl text-gray-400">Newest to oldest. Scroll to explore.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left scroll list smaller */}
          <div className="lg:col-span-5 space-y-24">
            {PROJECTS.map((p) => (
              <article key={p.id} data-project-id={p.id} className="min-h-screen flex items-center">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <i className={`${p.icon} text-3xl text-[#93c5fd]`}></i>
                    <span className="px-2 py-1 text-xs rounded bg-[#60a5fa]/20 text-[#93c5fd]">{p.date}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-4">{p.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-sm">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="px-5 py-3 rounded-lg bg-white text-[#0a0f1c] font-semibold">Repository</a>
                    <a href="#" className="px-5 py-3 rounded-lg bg-[#0ea5e9] text-white font-semibold">Live Preview</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right sticky slideshow larger, lowered */}
          <div className="lg:col-span-7">
            <div ref={detailRef} className="sticky top-28 md:top-32">
              <div className="relative rounded-2xl overflow-hidden glass select-none">
                {/* Main screenshot surface (placeholder) */}
                <div
                  className="w-full aspect-[16/9] md:aspect-[16/9] lg:aspect-[16/9] bg-white/5"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                />
                {/* Pagination dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {Array.from({ length: MAX_SLIDES }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setSlideIdx(i)}
                      className={`w-3 h-3 rounded-full transition ${i === slideIdx ? 'bg-[#93c5fd]' : 'bg-white/30 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 