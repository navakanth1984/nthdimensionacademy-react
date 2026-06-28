import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('Welcome');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // 1. Scroll percentage calculation (throttled with passive listener)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.round(progress));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. High-performance Section tracking using IntersectionObserver & Custom Event dispatching
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setCurrentSection(sectionName);
            // Dispatch a modern CustomEvent for extensible analytics and component decoupling
            window.dispatchEvent(
              new CustomEvent("academy:sectionVisited", {
                detail: { section: sectionName }
              })
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[101] pointer-events-none">
      {/* Scroll Progress Bar */}
      <div 
        className={`h-[4px] bg-gradient-to-r from-cosmic-gold via-hyper-drive-blue to-dimension-purple ${
          prefersReducedMotion ? '' : 'transition-all duration-100 ease-out'
        }`}
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Active Section HUD Pill */}
      <div className="absolute top-[8px] right-8 pointer-events-auto">
        <div className="glass-panel px-4 py-1.5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-cosmic-gold/20">
          <span className="w-1.5 h-1.5 rounded-full bg-hyper-drive-blue animate-pulse" />
          <span className="text-cosmic-gold tracking-widest">{currentSection}</span>
          <span className="text-slate-500">|</span>
          <span className="font-mono text-[10px] text-hyper-drive-blue">{scrollProgress}%</span>
        </div>
      </div>
    </div>
  );
}
