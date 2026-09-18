import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenPortal, onOpenAuth, onOpenMatcher }) {
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
              onClick={onOpenMatcher}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#ffd700]/40 bg-gradient-to-r from-[#ffd700]/20 to-[#00f0ff]/20 hover:from-[#ffd700]/30 hover:to-[#00f0ff]/30 text-[#ffd700] hover:text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 cursor-pointer"
            >
              <span>Certification Matcher</span>
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
