import React, { useEffect } from 'react';

const Skills = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      // Card hover scroll animations
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
      // Skill bars animation
      gsap.utils.toArray('.skill-bar').forEach(bar => {
        gsap.fromTo(bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
      // Tech stack hover effects
      document.querySelectorAll('.tech-stack-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
          gsap.to(this, { duration: 0.3, scale: 1.2, rotationY: 180 });
        });
        item.addEventListener('mouseleave', function () {
          gsap.to(this, { duration: 0.3, scale: 1, rotationY: 0 });
        });
      });
    }
  }, []);

  return (
    <section className="py-20 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Technical Arsenal</h2>
          <p className="text-xl text-gray-400">Technologies and tools I work with</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Programming */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-blue-400">Programming</h3>
            <div className="space-y-4">
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>Python</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>JavaScript</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>C#</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Web Development */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-purple-400">Web Development</h3>
            <div className="space-y-4">
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>React.js</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>HTML/CSS</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>PHP</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Database & DevOps */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-green-400">Database & DevOps</h3>
            <div className="space-y-4">
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>MongoDB</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>PostgreSQL</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>Docker</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
          {/* Networking */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Networking</h3>
            <div className="space-y-4">
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>Cisco</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>VoIP</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="flex justify-between mb-2">
                  <span>Network Security</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="skill-bar rounded-full h-2" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tech Stack Icons */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Technologies I Use</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="tech-stack-item text-4xl cursor-pointer" title="Python"><i className="fab fa-python"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="JavaScript"><i className="fab fa-js-square"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="React"><i className="fab fa-react"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="Node.js"><i className="fab fa-node-js"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="Docker"><i className="fab fa-docker"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="Git"><i className="fab fa-git-alt"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="AWS"><i className="fab fa-aws"></i></div>
            <div className="tech-stack-item text-4xl cursor-pointer" title="Linux"><i className="fab fa-linux"></i></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 