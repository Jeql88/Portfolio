import React from 'react';

const About = () => (
  <section id="about" className="py-20 relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 gradient-text">About Me</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              <span className="px-3 py-1 bg-blue-600 bg-opacity-20 rounded-full text-sm">Dean's List</span>
              <span className="px-3 py-1 bg-purple-600 bg-opacity-20 rounded-full text-sm">Student Leader</span>
              <span className="px-3 py-1 bg-green-600 bg-opacity-20 rounded-full text-sm">Certified Developer</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="relative">
            <div className="w-full h-96 glass rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                  <i className="fas fa-user text-3xl"></i>
                </div>
                <p className="text-gray-400">Professional Photo Placeholder</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-50 floating"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-50 floating" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About; 