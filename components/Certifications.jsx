import React from 'react';

const Certifications = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 gradient-text">Certifications & Achievements</h2>
        <p className="text-xl text-gray-400">Continuous learning and professional development</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Certification 1 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-chart-bar text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">Data Analyst Associate</h3>
          <p className="text-blue-400 mb-2">DataCamp</p>
          <p className="text-gray-400 text-sm mb-3">May 2024 - May 2026</p>
          <p className="text-gray-500 text-sm">Data cleaning, visualization, and statistical analysis using Python and SQL</p>
        </div>
        {/* Certification 2 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-network-wired text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">CCNAv7: Switching, Routing, and Wireless</h3>
          <p className="text-blue-400 mb-2">Cisco Networking Academy</p>
          <p className="text-gray-400 text-sm mb-3">January 2025</p>
          <p className="text-gray-500 text-sm">LAN/WAN, routing protocols, VLANs, wireless technologies</p>
        </div>
        {/* Certification 3 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
            <i className="fab fa-python text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">Python and AWS Elective</h3>
          <p className="text-blue-400 mb-2">Zuitt</p>
          <p className="text-gray-400 text-sm mb-3">May 2025</p>
          <p className="text-gray-500 text-sm">Python scripting and cloud computing fundamentals</p>
        </div>
        {/* Achievement 1 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-trophy text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">Global Business Summer Camp</h3>
          <p className="text-blue-400 mb-2">Saigon Business School, Vietnam</p>
          <p className="text-gray-400 text-sm mb-3">3rd Place Winner • April 2025</p>
          <p className="text-gray-500 text-sm">Innovation challenge for mobile learning ecosystem</p>
        </div>
        {/* Program 1 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-globe-asia text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">Summer School Program</h3>
          <p className="text-blue-400 mb-2">Asian Institute of Technology, Thailand</p>
          <p className="text-gray-400 text-sm mb-3">August 2024</p>
          <p className="text-gray-500 text-sm">Innovation, sustainability, and digital transformation</p>
        </div>
        {/* Certification 4 */}
        <div className="glass p-6 rounded-2xl card-hover">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-globe text-2xl text-white"></i>
          </div>
          <h3 className="text-lg font-bold mb-2">Understanding the Internet</h3>
          <p className="text-blue-400 mb-2">Keio University & APIE</p>
          <p className="text-gray-400 text-sm mb-3">April 2024</p>
          <p className="text-gray-500 text-sm">Internet architecture, infrastructure, and governance</p>
        </div>
      </div>
    </div>
  </section>
);

export default Certifications; 