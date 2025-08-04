import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Josh Lui
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-wide">
          Full Stack Developer & Creative Technologist
        </h2>
        <p className="text-lg md:text-xl mb-8 font-medium leading-relaxed">
          Building seamless digital experiences with a passion for elegant code, intuitive design, and impactful solutions.<br />
          <span className="inline-block mt-2 text-pink-200 font-bold">IRIS Project Lead</span> | <span className="text-blue-200">Open-source & AI Enthusiast</span> | <span className="text-purple-200">Tech Educator</span>
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <span className="bg-white/20 rounded px-4 py-2 text-sm font-semibold">LAN & Network Management</span>
          <span className="bg-white/20 rounded px-4 py-2 text-sm font-semibold">Real-time Systems</span>
          <span className="bg-white/20 rounded px-4 py-2 text-sm font-semibold">AI & Automation</span>
          <span className="bg-white/20 rounded px-4 py-2 text-sm font-semibold">Web Development</span>
        </div>
        <div className="mb-8">
          <p className="text-base md:text-lg italic text-white/80">
            “Let’s create something extraordinary together.”
          </p>
        </div>
        <a
          href="#contact"
          className="mt-6 inline-block px-8 py-3 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:bg-gray-200 transition"
        >
          Get in Touch
        </a>
      </div>
    </motion.section>
  );
};

export default Hero;