import React, { useEffect } from 'react';

const Experience = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="experience" className="py-20 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Experience & Leadership</h2>
          <p className="text-xl text-gray-400">Building the future through education and innovation</p>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            {/* Experience Item 1 */}
            <div className="timeline-item relative pl-20 pb-12">
              <div className="glass p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">Vice President of Internal Relations</h3>
                    <p className="text-gray-300">USC CISCO Student Council</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-700 px-3 py-1 rounded-full">2025 - Current</span>
                </div>
                <ul className="text-gray-400 space-y-2">
                  <li>• Oversee coordination and execution of internal council operations and school events</li>
                  <li>• Lead internal communication strategies with clear documentation for student-teacher issues</li>
                  <li>• Coordinate tech-related events and initiatives</li>
                </ul>
              </div>
            </div>
            {/* Experience Item 2 */}
            <div className="timeline-item relative pl-20 pb-12">
              <div className="glass p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-400">Internal Relations Officer</h3>
                    <p className="text-gray-300">USC CISCO Student Council</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-700 px-3 py-1 rounded-full">2024 - 2025</span>
                </div>
                <ul className="text-gray-400 space-y-2">
                  <li>• Organized and facilitated internal communication between council members</li>
                  <li>• Coordinated with various student organizations</li>
                  <li>• Managed tech-related events and activities</li>
                </ul>
              </div>
            </div>
            {/* Education Item */}
            <div className="timeline-item relative pl-20 pb-12">
              <div className="glass p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-400">BSIT Student - Dean's List</h3>
                    <p className="text-gray-300">University of San Carlos</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-700 px-3 py-1 rounded-full">2023 - Current</span>
                </div>
                <div className="text-gray-400">
                  <p className="mb-2">GPA: 1.36 • Dean's List: 2023-2025</p>
                  <p>Pursuing Bachelor of Science in Information Technology with focus on full-stack development, data analysis, and network infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 