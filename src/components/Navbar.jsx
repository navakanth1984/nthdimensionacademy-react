import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenPortal, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#05070f]/90 backdrop-blur-md border-b border-[#ffd700]/15 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-cosmic-gold tracking-widest uppercase cursor-pointer">
          <img
            src="/assets/Merge_these_images_and_create_202605052035.jpeg"
            alt="Logo"
            className="h-10 w-10 rounded-full border border-cosmic-gold/50 object-cover shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          />
          <span>N<span className="nth-style">TH</span> Dimension Academy</span>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a href="#training" className="text-[#f8fafc] hover:text-hyper-drive-blue text-sm font-medium uppercase tracking-wider transition-colors duration-300">
              Pathways
            </a>
          </li>
          <li>
            <a href="#expertise" className="text-[#f8fafc] hover:text-hyper-drive-blue text-sm font-medium uppercase tracking-wider transition-colors duration-300">
              Expertise
            </a>
          </li>
          <li>
            <a href="#fabric-demo" className="text-[#f8fafc] hover:text-hyper-drive-blue text-sm font-medium uppercase tracking-wider transition-colors duration-300">
              Demo
            </a>
          </li>
          <li>
            <a href="#contact" className="text-[#f8fafc] hover:text-hyper-drive-blue text-sm font-medium uppercase tracking-wider transition-colors duration-300">
              Contact
            </a>
          </li>
          <li>
            <button 
              disabled
              className="px-4 py-1.5 rounded-full border border-gray-500 bg-gray-500/10 text-gray-400 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-not-allowed opacity-60"
            >
              Sign In <span className="text-[10px] text-gray-500 ml-1">(Coming Soon)</span>
            </button>
          </li>
          <li>
            <button 
              disabled
              className="px-4 py-1.5 rounded-full border border-gray-500 bg-gray-500/10 text-gray-400 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-not-allowed opacity-60"
            >
              Student Portal <span className="text-[10px] text-gray-500 ml-1">(Coming Soon)</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
