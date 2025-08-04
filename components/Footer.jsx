import React from 'react';

const Footer = () => (
  <footer className="py-12 bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center">
        <div className="text-3xl font-bold gradient-text mb-4">Josh Edward Lui</div>
        <p className="text-gray-400 mb-6">Full Stack Developer & Innovation Leader</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © 2025 Josh Edward Lui. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 