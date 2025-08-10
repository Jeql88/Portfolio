import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const anchors = document.querySelectorAll('a[href^="#"]');
      const handler = function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            setOpen(false);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      };
      anchors.forEach(a => a.addEventListener('click', handler));
      const onKey = (ev) => { if (ev.key === 'Escape') setOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => {
        anchors.forEach(a => a.removeEventListener('click', handler));
        window.removeEventListener('keydown', onKey);
      };
    }
  }, []);

  const items = [
    { id: 'home', label: 'Home', sub: 'start here', index: '01' },
    { id: 'about', label: 'About', sub: 'who I am', index: '02' },
    { id: 'skills', label: 'Tech Stack', sub: 'tools & skills', index: '03' },
    { id: 'projects', label: 'Projects', sub: 'featured work', index: '04' },
    { id: 'experience', label: 'Experience', sub: 'leadership & roles', index: '05' },
    { id: 'certifications', label: 'Certifications', sub: 'achievements', index: '06' },
    { id: 'contact', label: 'Contact', sub: 'let’s talk', index: '07' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold gradient-text">JEL</div>
          </div>
          {!open && (
            <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="relative w-9 h-9">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[2px] w-7 bg-white -translate-y-2" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[2px] w-7 bg-white" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-[2px] w-7 bg-white translate-y-2" />
            </button>
          )}
        </div>
      </nav>

      {/* Overlay Menu */}
      <div className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* layered background animation */}
        <div
          className={`absolute inset-0 z-0 bg-[#0a0f1c] ${open ? 'opacity-95' : 'opacity-0'} transition-opacity duration-500`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 z-0 bg-gradient-to-b from-[#0b1c36] to-transparent transform ${open ? 'translate-y-0 scale-100' : '-translate-y-full scale-105'} transition-transform duration-700`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div className={`relative z-10 h-full w-full transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} role="dialog" aria-modal="true">
          {open && (
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute z-50 top-6 right-6 text-white/90 hover:text-white text-3xl">×</button>
          )}

          <div className="container mx-auto px-8 md:px-16 lg:px-24 pt-28 md:pt-40 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
              <aside className="hidden lg:flex lg:col-span-5 flex-col justify-between pb-12">
                <div>
                  <div className="text-4xl xl:text-5xl font-black gradient-text">Josh Edward Lui</div>
                  <div className="text-white/70 mt-2 text-xl">Full Stack Developer</div>
                  <div className="flex gap-4 mt-6">
                    <a href="#" className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"><i className="fab fa-github"></i></a>
                    <a href="#" className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
                <div className="text-white/40 text-sm">© {new Date().getFullYear()} Josh Edward Lui. All rights reserved.</div>
              </aside>

              <section className="lg:col-span-7 flex flex-col h-full overflow-y-auto no-scrollbar pb-24">
                <ul className="space-y-10 md:space-y-14 flex flex-col items-end">
                  {items.map((item, i) => (
                    <li
                      key={item.id}
                      style={{ transitionDelay: `${open ? i * 80 : 0}ms` }}
                      className={`transform-gpu transition-all duration-700 ${open ? 'opacity-100 translate-y-0 translate-x-0 rotate-0' : 'opacity-0 translate-y-8 translate-x-10 -rotate-3'}`}
                    >
                      <a href={`#${item.id}`} className="group block text-right">
                        <div className="flex items-end gap-6 md:gap-10 justify-end">
                          <div className="flex flex-col">
                            <div className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tight transform skew-x-[-8deg] transition-all duration-300 group-hover:skew-x-[-2deg] group-hover:scale-105 group-hover:text-[#93c5fd]">
                              {item.label}
                            </div>
                            <div className="text-white/50 text-xl md:text-2xl mr-1 md:mr-2">{item.sub}</div>
                          </div>
                          <span className="text-white/60 text-xl md:text-2xl font-semibold">{item.index}</span>
                        </div>
                        <div className="mt-3 h-[2px] w-0 ml-auto origin-right bg-gradient-to-l from-[#60a5fa] via-[#93c5fd] to-white transition-all duration-500 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {open && (
            <div className="pointer-events-none absolute bottom-6 inset-x-0 flex items-center justify-center text-white/60 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <span className="text-xs tracking-wide">Scroll</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
