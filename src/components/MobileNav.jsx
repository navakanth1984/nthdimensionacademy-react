import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'training',
    label: 'Pathways',
    href: '#training',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'expertise',
    label: 'Expertise',
    href: '#expertise',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'fabric-demo',
    label: 'Demo',
    href: '#fabric-demo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const [active, setActive] = useState('home');

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) =>
      item.id === 'home' ? null : item.id
    ).filter(Boolean);

    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Mark home active when scrolled to very top
    const handleScroll = () => {
      if (window.scrollY < 120) setActive('home');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTap = (item) => {
    setActive(item.id);
    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[200]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Frosted glass bar */}
      <div
        className="flex items-stretch justify-around"
        style={{
          background: 'rgba(5, 7, 15, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 215, 0, 0.15)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.5)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTap(item)}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-all duration-200 active:scale-90 select-none"
              style={{ minHeight: 64, WebkitTapHighlightColor: 'transparent' }}
              aria-label={item.label}
            >
              {/* Icon container with active glow ring */}
              <span
                className="relative flex items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  color: isActive ? '#ffd700' : '#94a3b8',
                  filter: isActive
                    ? 'drop-shadow(0 0 8px rgba(255,215,0,0.7))'
                    : 'none',
                  transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
                }}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#ffd700', boxShadow: '0 0 6px #ffd700' }}
                  />
                )}
                {item.icon}
              </span>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase transition-colors duration-300"
                style={{ color: isActive ? '#ffd700' : '#64748b' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
