import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_USER_ID')
      .then((result) => {
        setSending(false);
        setSent(true);
        setTimeout(() => setSent(false), 2000);
        formRef.current.reset();
      }, (error) => {
        setSending(false);
        alert('Error sending message. Please try again.');
      });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Let's Connect</h2>
          <p className="text-xl text-gray-400">Ready to collaborate on your next project?</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white">23102689@usc.edu.ph</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-white">09684165026</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">Cebu City, Philippines</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="fab fa-linkedin text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="fab fa-github text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="fab fa-twitter text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="fab fa-instagram text-white"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>
            <form className="space-y-6" id="contact-form" ref={formRef} onSubmit={sendEmail}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input type="text" name="subject" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea name="message" rows="5" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className={`w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 hover:bg-gray-100 transition-transform ${sending ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={sending}>
                {sending ? (
                  <span><i className="fas fa-spinner fa-spin mr-2"></i>Sending...</span>
                ) : sent ? (
                  <span><i className="fas fa-check mr-2"></i>Message Sent!</span>
                ) : (
                  <span>Send Message <i className="fas fa-paper-plane ml-2"></i></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 