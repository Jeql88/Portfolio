import React, { useEffect } from 'react';

const Projects = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.card-hover').forEach(card => {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-xl text-gray-400">Innovative solutions and technical achievements</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-paint-brush text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Collaborative Drawing Web App</h3>
            <p className="text-gray-400 mb-4">Real-time collaborative whiteboard using HTML5 Canvas API, React.js, and Socket.IO with MongoDB for session persistence.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">React.js</span>
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 rounded text-xs">Socket.IO</span>
              <span className="px-2 py-1 bg-yellow-600 bg-opacity-20 rounded text-xs">MongoDB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">May - June 2025</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          {/* Project 2 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-hotel text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Hotel Management System</h3>
            <p className="text-gray-400 mb-4">Scalable microservices-based hotel booking platform using Docker, Hasura, Go, and PostgreSQL with JWT authentication.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">Go</span>
              <span className="px-2 py-1 bg-purple-600 bg-opacity-20 rounded text-xs">Docker</span>
              <span className="px-2 py-1 bg-pink-600 bg-opacity-20 rounded text-xs">GraphQL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">March - May 2025</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          {/* Project 3 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-red-500 to-yellow-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-chart-line text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">LAPD Crime Analysis</h3>
            <p className="text-gray-400 mb-4">Crime trend analysis platform using SQL Server and SSIS for ETL processes with interactive dashboards.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">SQL Server</span>
              <span className="px-2 py-1 bg-orange-600 bg-opacity-20 rounded text-xs">SSIS</span>
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 rounded text-xs">Data Analytics</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Sept - Dec 2024</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          {/* Project 4 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-gamepad text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">2D Roguelike Game</h3>
            <p className="text-gray-400 mb-4">Procedurally generated 2D roguelike game in C# and Unity with infinite dungeon layouts and class-based combat.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-purple-600 bg-opacity-20 rounded text-xs">C#</span>
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">Unity</span>
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 rounded text-xs">Game Dev</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Jan - Feb 2025</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          {/* Project 5 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-network-wired text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">IP Telephony System</h3>
            <p className="text-gray-400 mb-4">Multi-branch VoIP communication network using Cisco Packet Tracer with HSRP configurations.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">Cisco</span>
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 rounded text-xs">VoIP</span>
              <span className="px-2 py-1 bg-red-600 bg-opacity-20 rounded text-xs">HSRP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Nov - Dec 2024</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          {/* Project 6 */}
          <div className="project-card rounded-2xl p-6 card-hover">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl mb-6 flex items-center justify-center">
              <i className="fas fa-shopping-cart text-6xl text-white opacity-50"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">University Marketplace System</h3>
            <p className="text-gray-400 mb-4">University-focused e-commerce site with real-time chat using WebSockets and secure authentication.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-yellow-600 bg-opacity-20 rounded text-xs">PHP</span>
              <span className="px-2 py-1 bg-blue-600 bg-opacity-20 rounded text-xs">MySQL</span>
              <span className="px-2 py-1 bg-green-600 bg-opacity-20 rounded text-xs">WebSockets</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Jul - Aug 2024</span>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-blue-400 hover:text-blue-300"><i className="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="#" className="inline-block px-8 py-3 glass rounded-full font-semibold hover:scale-105 transition-transform">
            View All Projects <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 