import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
      return () => {
        anchors.forEach(anchor => {
          anchor.removeEventListener('click', () => {});
        });
      };
    }
  }, []);

  const handleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleMobileLink = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text">JEL</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="nav-link hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="nav-link hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="nav-link hover:text-blue-400 transition-colors">Projects</a>
              <a href="#experience" className="nav-link hover:text-blue-400 transition-colors">Experience</a>
              <a href="#contact" className="nav-link hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <div className="md:hidden">
              <button id="mobile-menu-btn" className="text-white" onClick={handleMobileMenu}>
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div id="mobile-menu" className={`fixed inset-0 z-40 glass ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="#home" className="text-2xl hover:text-blue-400 transition-colors mobile-nav-link" onClick={handleMobileLink}>Home</a>
          <a href="#about" className="text-2xl hover:text-blue-400 transition-colors mobile-nav-link" onClick={handleMobileLink}>About</a>
          <a href="#projects" className="text-2xl hover:text-blue-400 transition-colors mobile-nav-link" onClick={handleMobileLink}>Projects</a>
          <a href="#experience" className="text-2xl hover:text-blue-400 transition-colors mobile-nav-link" onClick={handleMobileLink}>Experience</a>
          <a href="#contact" className="text-2xl hover:text-blue-400 transition-colors mobile-nav-link" onClick={handleMobileLink}>Contact</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;