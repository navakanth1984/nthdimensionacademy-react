import React, { useState, useEffect, useRef } from 'react';
import { Compass, Clock, MousePointer, Activity, Award, ChevronDown, CheckSquare } from 'lucide-react';

// --- CONFIGURATION CONSTANTS ---
const CONFIG = {
  VERSION: 1,
  SESSION_STORAGE_KEY: 'nth_learning_hud_v1',
  
  // Score Weightings (Total = 100%)
  WEIGHTS: {
    TIME: 35,
    SCROLL: 30,
    CLICKS: 20,
    SECTIONS: 15
  },
  
  // Thresholds & Cap Limits
  CAPS: {
    MAX_TIME_SEC: 180,    // 3 minutes caps time score
    MAX_CLICKS: 5,        // 5 clicks caps interaction score
    TOTAL_SECTIONS: 8     // Total sections defined in App.jsx
  },

  // Learning Momentum Time Thresholds (in seconds)
  MOMENTUM_THRESHOLDS: {
    IMMERSION: 90,
    DEEP_DIVE: 45,
    EXPLORING: 15
  },

  // Explorer Ranks (Minimum Curiosity Index required)
  RANKS: [
    { min: 90, title: 'Cosmic Architect' },
    { min: 60, title: 'Dimension Weaver' },
    { min: 30, title: 'Knowledge Seeker' },
    { min: 0,  title: 'Apprentice Explorer' }
  ],

  // Toast Duration in milliseconds
  TOAST_DURATION_MS: 2400,

  // Curiosity Score Milestones to unlock
  MILESTONES: [
    { threshold: 25, label: 'Timeline unlocked', desc: 'Discovered the ancient history tracks.' },
    { threshold: 50, label: 'Hidden quote discovered', desc: 'Resonated with the architectural tenets.' },
    { threshold: 75, label: 'Interactive visualization unlocked', desc: 'Neural fabric data matrix ready.' },
    { threshold: 90, label: 'Cosmic Architect', desc: 'Achieved maximum comprehension of the Academy.' }
  ]
};

export default function EngagementHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [maxScrollDepth, setMaxScrollDepth] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [visitedSections, setVisitedSections] = useState([]);
  const [unlockedMilestones, setUnlockedMilestones] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const hudRef = useRef(null);
  const lastEmittedScore = useRef(-1);

  // 1. Accessibility: prefers-reduced-motion check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 2. Load consolidated state from sessionStorage
  useEffect(() => {
    const rawData = sessionStorage.getItem(CONFIG.SESSION_STORAGE_KEY);
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        if (data.version === CONFIG.VERSION) {
          if (data.timeOnPage) setTimeOnPage(data.timeOnPage);
          if (data.maxScrollDepth) setMaxScrollDepth(data.maxScrollDepth);
          if (data.clickCount) setClickCount(data.clickCount);
          if (data.visitedSections) setVisitedSections(data.visitedSections);
          if (data.unlockedMilestones) setUnlockedMilestones(data.unlockedMilestones);
        }
      } catch (err) {
        console.warn('Failed to parse HUD session storage, initializing fresh state:', err);
      }
    }

    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  // 3. Persist consolidated state to sessionStorage
  useEffect(() => {
    const stateToSave = {
      version: CONFIG.VERSION,
      timeOnPage,
      maxScrollDepth,
      clickCount,
      visitedSections,
      unlockedMilestones
    };
    sessionStorage.setItem(CONFIG.SESSION_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [timeOnPage, maxScrollDepth, clickCount, visitedSections, unlockedMilestones]);

  // 4. Timer for Time on Page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 5. Scroll Depth tracking (passive, throttled via requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentPercentage = Math.min(
              100,
              Math.round((window.scrollY / totalHeight) * 100)
            );
            setMaxScrollDepth((prev) => Math.max(prev, currentPercentage));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Listen to Custom DOM Events for Section visits
  useEffect(() => {
    const handleSectionVisitedEvent = (e) => {
      const sectionName = e.detail?.section;
      if (!sectionName) return;

      setVisitedSections((prev) => {
        if (!prev.includes(sectionName)) {
          return [...prev, sectionName];
        }
        return prev;
      });
    };

    window.addEventListener("academy:sectionVisited", handleSectionVisitedEvent);
    return () => window.removeEventListener("academy:sectionVisited", handleSectionVisitedEvent);
  }, []);

  // 7. Delegated click monitoring for meaningful interactions
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (hudRef.current && hudRef.current.contains(e.target)) return;

      let currentEl = e.target;
      let depth = 0;
      let isMeaningful = false;

      while (currentEl && depth < 4) {
        const tagName = currentEl.tagName?.toLowerCase();
        const role = currentEl.getAttribute('role');
        const hasClickTrack = currentEl.hasAttribute('data-track-click') || currentEl.classList.contains('track-click');

        if (
          tagName === 'button' ||
          tagName === 'a' ||
          tagName === 'summary' ||
          role === 'button' ||
          role === 'tab' ||
          role === 'link' ||
          hasClickTrack
        ) {
          if (!currentEl.hasAttribute('disabled')) {
            isMeaningful = true;
            break;
          }
        }
        currentEl = currentEl.parentElement;
        depth++;
      }

      if (isMeaningful) {
        setClickCount((prev) => prev + 1);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // 8. Curiosity Index calculations
  const timeScore = Math.min(CONFIG.WEIGHTS.TIME, (timeOnPage / CONFIG.CAPS.MAX_TIME_SEC) * CONFIG.WEIGHTS.TIME);
  const scrollScore = maxScrollDepth * (CONFIG.WEIGHTS.SCROLL / 100);
  const clickScore = Math.min(CONFIG.WEIGHTS.CLICKS, (clickCount / CONFIG.CAPS.MAX_CLICKS) * CONFIG.WEIGHTS.CLICKS);
  
  const uniqueSectionsVisited = Math.max(1, visitedSections.length);
  const sectionScore = Math.min(
    CONFIG.WEIGHTS.SECTIONS,
    (uniqueSectionsVisited / CONFIG.CAPS.TOTAL_SECTIONS) * CONFIG.WEIGHTS.SECTIONS
  );

  const curiosityIndex = Math.min(100, Math.round(timeScore + scrollScore + clickScore + sectionScore));

  const currentRankObj = CONFIG.RANKS.find((r) => curiosityIndex >= r.min) || CONFIG.RANKS[CONFIG.RANKS.length - 1];
  const explorerRank = currentRankObj.title;

  // Emit Curiosity score change events (throttled/batched to prevent event noise)
  useEffect(() => {
    if (curiosityIndex !== lastEmittedScore.current) {
      lastEmittedScore.current = curiosityIndex;
      window.dispatchEvent(
        new CustomEvent("academy:curiosityChanged", {
          detail: { index: curiosityIndex, rank: explorerRank }
        })
      );
    }
  }, [curiosityIndex, explorerRank]);

  // Learning Momentum derived from Time on Page
  let learningMomentum = 'Initializing...';
  if (timeOnPage >= CONFIG.MOMENTUM_THRESHOLDS.IMMERSION) learningMomentum = 'Knowledge Immersion';
  else if (timeOnPage >= CONFIG.MOMENTUM_THRESHOLDS.DEEP_DIVE) learningMomentum = 'Deep Dive';
  else if (timeOnPage >= CONFIG.MOMENTUM_THRESHOLDS.EXPLORING) learningMomentum = 'Exploring';

  const showToast = (title, message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, CONFIG.TOAST_DURATION_MS);
  };

  // Monitor Milestones
  useEffect(() => {
    CONFIG.MILESTONES.forEach((milestone) => {
      if (curiosityIndex >= milestone.threshold && !unlockedMilestones.includes(milestone.label)) {
        setUnlockedMilestones((prev) => [...prev, milestone.label]);
        showToast(`✨ ${milestone.label}`, milestone.desc);
        
        // Dispatch Custom DOM Event for milestone unlock
        window.dispatchEvent(
          new CustomEvent("academy:milestoneUnlocked", {
            detail: { milestone: milestone.label, description: milestone.desc }
          })
        );
      }
    });
  }, [curiosityIndex, unlockedMilestones]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Toast Overlay */}
      <div className="fixed bottom-24 right-6 left-6 md:left-auto z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full mx-auto md:mx-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#070b19]/95 border border-cosmic-gold/30 rounded-lg p-3.5 shadow-[0_0_20px_rgba(255,215,0,0.15)] backdrop-blur-md flex gap-3 items-start ${
              prefersReducedMotion ? '' : 'animate-fade-in translate-y-0 transition-transform duration-300'
            }`}
          >
            <div className="p-1.5 bg-cosmic-gold/15 rounded-md text-cosmic-gold">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-[10px] font-bold text-cosmic-gold uppercase tracking-wider">{toast.title}</h4>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-normal">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main HUD */}
      <div 
        ref={hudRef}
        className={`fixed z-[100] transition-all duration-300 ease-in-out ${
          'bottom-6 left-1/2 md:left-auto md:right-6 -translate-x-1/2 md:translate-x-0'
        }`}
      >
        {isOpen ? (
          <div className="glass-panel w-[290px] md:w-[320px] overflow-hidden border border-cosmic-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <div className="px-4 py-2.5 bg-gradient-to-r from-cosmic-gold/10 to-transparent border-b border-cosmic-gold/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-cosmic-gold animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-100">Learning HUD</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Collapse HUD"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3.5">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Curiosity Index</span>
                  <span className="font-mono text-xs font-bold text-hyper-drive-blue">{curiosityIndex}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cosmic-gold to-hyper-drive-blue transition-all duration-500"
                    style={{ width: `${curiosityIndex}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-cosmic-gold uppercase tracking-wider">{explorerRank}</span>
                </div>
              </div>

              <hr className="border-slate-800" />

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider block">Momentum</span>
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-hyper-drive-blue" />
                    <span className="text-[11px] font-bold text-slate-200">{learningMomentum}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider block">Session Dwell</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-mono font-semibold text-slate-200">{formatTime(timeOnPage)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider block">Max Scroll</span>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-mono font-semibold text-slate-200">{maxScrollDepth}%</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider block">Key Actions</span>
                  <div className="flex items-center gap-1.5">
                    <MousePointer className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-mono font-semibold text-slate-200">{clickCount} clicks</span>
                  </div>
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider block">Academy Explored</span>
                <div className="flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-semibold text-slate-200">{uniqueSectionsVisited} of {CONFIG.CAPS.TOTAL_SECTIONS} sectors</span>
                </div>
              </div>

              {unlockedMilestones.length > 0 && (
                <>
                  <hr className="border-slate-800" />
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Milestones Unlocked</span>
                    <div className="space-y-1 max-h-[70px] overflow-y-auto pr-1 scrollbar-thin">
                      {unlockedMilestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[9px] text-slate-300">
                          <span className="text-cosmic-gold">✓</span>
                          <span>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className={`glass-panel p-2.5 md:p-3 border border-cosmic-gold/30 text-cosmic-gold hover:text-white shadow-[0_4px_20px_rgba(255,215,0,0.15)] flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
              prefersReducedMotion ? '' : 'neon-pulse'
            }`}
            aria-label="Expand Learning HUD"
          >
            <Compass className="w-4 h-4 md:w-5 md:h-5 animate-spin-slow" />
            <span className="ml-2 text-[9px] font-bold uppercase tracking-widest pr-1">HUD {curiosityIndex}%</span>
          </button>
        )}
      </div>
    </>
  );
}
