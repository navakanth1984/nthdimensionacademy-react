import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import CurriculumMap from './components/CurriculumMap';
import Training from './components/Training';
import AsymmetricSection from './components/AsymmetricSection';
import Achievements from './components/Achievements';
import FabricDemo from './components/FabricDemo';
import Footer from './components/Footer';
import SyllabusModal from './components/SyllabusModal';
import AIAssistant from './components/AIAssistant';
import CMSDashboard from './components/CMSDashboard';
import StudentDashboard from './components/StudentDashboard';
import AuthModal from './components/AuthModal';
import Pricing from './components/Pricing';
import MobileNav from './components/MobileNav';
import AdvancedNotebookLMDashboard from './components/AdvancedNotebookLMDashboard';
import ScrollProgress from './components/ScrollProgress';
import EngagementHUD from './components/EngagementHUD';

function App() {
  const glowRef = useRef(null);

  // Advanced Standalone state
  const [showAdvancedNLM, setShowAdvancedNLM] = useState(false);

  // Auth states
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [triggerQuery, setTriggerQuery] = useState(null);

  // Syllabus Modal states
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [syllabusCourseId, setSyllabusCourseId] = useState('dp700');

  // CMS Dashboard states
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [contentData, setContentData] = useState(null);

  // Student Portal states
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);

  // Atlas Iframe Overlay state
  const [atlasIframeUrl, setAtlasIframeUrl] = useState(null);

  // HUD Visibility Check
  const [hudEnabled, setHudEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHudEnabled(params.has('hud') || params.has('debug'));
  }, []);

  // Fetch website conformed content from MongoDB Atlas API on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
        }
      } catch (err) {
        console.warn('DB content load failed, falling back to static components text:', err);
      }
    };
    fetchContent();
  }, []);

  // Sync edits back to MongoDB
  const handleSaveContent = async (password, updatedData) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: updatedData })
      });
      if (response.ok) {
        setContentData(updatedData);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to sync content to MongoDB:', err);
      return false;
    }
  };

  // Custom Cursor Glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        requestAnimationFrame(() => {
          glowRef.current.style.left = `${e.clientX}px`;
          glowRef.current.style.top = `${e.clientY}px`;
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenSyllabus = (courseId) => {
    setSyllabusCourseId(courseId);
    setIsSyllabusOpen(true);
  };

  const handleCloseAtlas = () => {
    setAtlasIframeUrl(null);
    if (window.resetNeuralCanvas) window.resetNeuralCanvas();
  };

  useEffect(() => {
    if (!atlasIframeUrl) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseAtlas();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [atlasIframeUrl]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'OPEN_AUTH') {
        setIsAuthOpen(true);
      } else if (event.data?.type === 'OPEN_PORTAL') {
        setIsStudentPortalOpen(true);
      } else if (event.data?.type === 'CLOSE_ATLAS') {
        handleCloseAtlas();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    window.handleNodeClick = (courseId) => {
      const normalized = (courseId || '').toLowerCase().replace('-', '');
      if (normalized === 'dp700') {
        setAtlasIframeUrl('/dp700-atlas/index.html');
        return;
      }
      if (normalized === 'dp600') {
        setAtlasIframeUrl('/dp600-atlas/index.html');
        return;
      }
      if (normalized === 'dp750') {
        setAtlasIframeUrl('/dp750-atlas/index.html');
        return;
      }
      if (normalized === 'dp800') {
        setAtlasIframeUrl('/dp800-atlas/index.html');
        return;
      }
      if (normalized === 'ai103') {
        setAtlasIframeUrl('/ai103-atlas/index.html');
        return;
      }

      setIsAssistantOpen(true);
      setTriggerQuery({
        userText: `Explore ${courseId} details`,
        apiPrompt: `I am looking at the 3D visualization for ${courseId}. Tell me about its core curriculum and why it is important in the Nth Dimension Academy.`
      });
    };
    return () => { delete window.handleNodeClick; };
  }, []);

  const handleBeginAscent = (courseId) => {
    setIsSyllabusOpen(false);

    const normalized = (courseId || '').toLowerCase().replace('-', '');

    // Unify with live website: Open the immersive Atlas directly
    if (normalized === 'dp700') {
      setAtlasIframeUrl('/dp700-atlas/index.html');
      return;
    }
    if (normalized === 'dp600') {
      setAtlasIframeUrl('/dp600-atlas/index.html');
      return;
    }
    if (normalized === 'dp750') {
      setAtlasIframeUrl('/dp750-atlas/index.html');
      return;
    }
    if (normalized === 'dp800') {
      setAtlasIframeUrl('/dp800-atlas/index.html');
      return;
    }
    if (normalized === 'ai103') {
      setAtlasIframeUrl('/ai103-atlas/index.html');
      return;
    }

    setIsAssistantOpen(true);

    let userText = '';
    let apiPrompt = '';

    if (normalized === 'dp900') {
      userText = 'Begin DP-900 Ascent';
      apiPrompt = "Let's begin the DP-900 Azure Data Fundamentals Ascent! Explain the core difference between relational and non-relational databases on Azure.";
    } else if (normalized === 'dp203') {
      userText = 'Begin DP-203 Ascent';
      apiPrompt = "Let's begin the DP-203 Azure Data Engineering Ascent! Tell me about Lab 01.";
    } else {
      userText = `Begin ${courseId ? courseId.toUpperCase() : 'Ascent'}`;
      apiPrompt = `Let's begin the ${courseId ? courseId.toUpperCase() : 'Nth Dimension'} Ascent! Tell me about its core curriculum and labs.`;
    }

    setTriggerQuery({ userText, apiPrompt });
  };

  const handlePlayDemo = () => {
    setIsAssistantOpen(true);
    setTriggerQuery({
      userText: 'Launch the Fabric Demo.',
      apiPrompt: 'I am watching the Microsoft Fabric Demo. Explain the key architectural components being shown and how they align with the NTH Dimension.',
      systemText: 'Initiating N<span class="nth-style">TH</span> Dimension Fabric Demo Masterclass... Observe the convergence of data streams.'
    });
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 selection:bg-hyper-drive-blue selection:text-black antialiased overflow-x-hidden font-sans pb-[64px] md:pb-0">
      
      {/* Scroll Progress & Learning HUD */}
      <ScrollProgress showPill={hudEnabled} />
      {hudEnabled && <EngagementHUD />}

      {/* Interactive Cursor Glow */}
      <div className="cursor-glow hidden md:block" ref={glowRef} />

      {/* Navbar Header */}
      <Navbar onOpenPortal={() => setIsStudentPortalOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Page Sections (Bind MongoDB text states if loaded) */}
      <div data-section="Academy Ascent">
        <Hero content={contentData?.hero} />
      </div>
      <div data-section="About MCT">
        <About content={contentData?.about} />
      </div>
      <div data-section="Core Expertise">
        <Expertise />
      </div>
      <div data-section="Curriculum Map">
        <CurriculumMap />
      </div>
      <div data-section="Training Pathways">
        <Training onOpenSyllabus={handleOpenSyllabus} onOpenAtlas={handleBeginAscent} />
      </div>
      
      {/* Launch Advanced UI Button */}
      <div className="flex justify-center my-12">
        <button 
          onClick={() => setShowAdvancedNLM(true)}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all hover:scale-105"
        >
          <span className="tracking-widest uppercase text-sm">Launch Advanced NotebookLM Dashboard</span>
        </button>
      </div>

      <div data-section="Pricing Details">
        <Pricing />
      </div>
      <AsymmetricSection />
      <div data-section="Achievements">
        <Achievements content={contentData?.achievements} />
      </div>
      <div data-section="Fabric Demo">
        <FabricDemo onPlayDemo={handlePlayDemo} />
      </div>


      {/* Footer Details */}
      <Footer onOpenAdmin={() => setIsCMSOpen(true)} />

      {/* Mobile thumb-zone bottom navigation */}
      <MobileNav />

      {/* Syllabus Tabbed Modal overlay */}
      <SyllabusModal 
        isOpen={isSyllabusOpen} 
        courseId={syllabusCourseId} 
        onClose={() => {
          setIsSyllabusOpen(false);
          if (window.resetNeuralCanvas) window.resetNeuralCanvas();
        }} 
        onBeginAscent={handleBeginAscent} 
      />

      {/* Floating AI chat assistant / Cosmic Guide */}
      <AIAssistant 
        isOpen={isAssistantOpen} 
        setIsOpen={setIsAssistantOpen} 
        triggerQuery={triggerQuery}
        setTriggerQuery={setTriggerQuery}
      />

      {/* Hidden Slide-in CMS Console Dashboard */}
      {contentData && (
        <CMSDashboard 
          isOpen={isCMSOpen}
          onClose={() => setIsCMSOpen(false)}
          contentData={contentData}
          onSaveContent={handleSaveContent}
        />
      )}

      {/* Student Portal Dashboard Overlay */}
      <StudentDashboard 
        isOpen={isStudentPortalOpen} 
        onClose={() => setIsStudentPortalOpen(false)} 
      />

      {/* Authentication Modal Overlay */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Atlas Iframe Overlay - Keeps subdirectories in the same main web page */}
      {atlasIframeUrl && (
        <div className="fixed inset-0 z-[9999] bg-[#070913] flex flex-col animate-fade-in">
          {/* Floating Controls Header */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            <a
              href={atlasIframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold backdrop-blur-md transition-all shadow-lg hover:border-hyper-drive-blue cursor-pointer"
              title="Open in New Tab"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="h-3.5 w-3.5 text-hyper-drive-blue" />
            </a>
            <button
              onClick={handleCloseAtlas}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold hover:opacity-95 text-black font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer"
              title="Return to Academy (Esc)"
            >
              <span>← Return to Academy</span>
              <X className="h-4 w-4" />
            </button>
          </div>

          <iframe
            src={atlasIframeUrl}
            className="w-full h-full border-none"
            title="Atlas Visualisation"
            onLoad={(e) => {
              try {
                const href = e.target?.contentWindow?.location?.href;
                // Guard: Do not close on initial uninitialized/blank state
                if (!href || href === 'about:blank') return;
                // If navigated away from atlas (e.g. Return to Portal clicked)
                if (!href.includes('-atlas/')) {
                  handleCloseAtlas();
                }
              } catch (_) {
                // cross-origin security restriction — safe to ignore
              }
            }}
          />
        </div>
      )}

      {/* Advanced Full-Screen Standalone Takeover */}
      {showAdvancedNLM && <AdvancedNotebookLMDashboard onClose={() => setShowAdvancedNLM(false)} />}

    </div>
  );
}

export default App;
