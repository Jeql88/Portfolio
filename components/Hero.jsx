import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      // Hero animations
      gsap.timeline()
        .from('.hero-title', { duration: 1, y: 100, opacity: 0, ease: 'power2.out' })
        .from('.hero-subtitle', { duration: 0.8, y: 50, opacity: 0, ease: 'power2.out' }, '-=0.5')
        .from('.hero-tags > *', { duration: 0.6, y: 30, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
        .from('.hero-cta > *', { duration: 0.6, y: 30, opacity: 0, stagger: 0.2, ease: 'power2.out' }, '-=0.2');
      // Parallax effect for hero section
      gsap.to('.hero-bg', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-bg',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="floating absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="floating absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="floating absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="hero-content">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 hero-title">
            Josh Edward <span className="gradient-text">Lui</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto hero-subtitle">
            Full Stack Developer & Innovation Leader crafting digital experiences with cutting-edge technology
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12 hero-tags">
            <span className="px-4 py-2 glass rounded-full text-sm">BSIT Student</span>
            <span className="px-4 py-2 glass rounded-full text-sm">Vice President USC CISCO</span>
            <span className="px-4 py-2 glass rounded-full text-sm">Dean's List</span>
            <span className="px-4 py-2 glass rounded-full text-sm">DataCamp Certified</span>
          </div>
          <div className="flex justify-center space-x-6 hero-cta">
            <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-4 glass rounded-full font-semibold hover:scale-105 transition-transform">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;