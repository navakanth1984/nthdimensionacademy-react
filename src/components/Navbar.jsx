import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenPortal }) {
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
          <picture>
            <source media="(max-width: 768px)" srcSet="/assets/In_the_middle_of_the_202605052332.jpeg" />
            <img 
              src="/assets/Merge_these_images_and_create_202605052035.jpeg" 
              alt="Logo" 
              className="h-10 w-10 rounded-full border border-cosmic-gold/50 object-cover shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
            />
          </picture>
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
              onClick={onOpenPortal}
              className="px-4 py-1.5 rounded-full border border-cosmic-gold bg-cosmic-gold/5 text-cosmic-gold hover:bg-cosmic-gold hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(255,215,0,0.15)] hover:scale-105"
            >
              Student Portal
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
