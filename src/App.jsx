import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'OPEN_AUTH') {
        setIsAuthOpen(true);
      } else if (event.data?.type === 'OPEN_PORTAL') {
        setIsStudentPortalOpen(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    window.handleNodeClick = (courseId) => {
      // Provide exactly the same system as the live website for atlas links
      if (courseId === 'DP-700') {
        setAtlasIframeUrl('/dp700-atlas/index.html');
        return;
      }
      if (courseId === 'DP-600') {
        setAtlasIframeUrl('/dp600-atlas/index.html');
        return;
      }
      if (courseId === 'DP-750') {
        setAtlasIframeUrl('/dp750-atlas/index.html');
        return;
      }
      if (courseId === 'DP-800') {
        setAtlasIframeUrl('/dp800-atlas/index.html');
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

    // Unify with live website: Open the immersive Atlas directly
    if (courseId === 'dp700') {
      setAtlasIframeUrl('/dp700-atlas/index.html');
      return;
    }
    if (courseId === 'dp600') {
      setAtlasIframeUrl('/dp600-atlas/index.html');
      return;
    }
    if (courseId === 'dp750') {
      setAtlasIframeUrl('/dp750-atlas/index.html');
      return;
    }
    if (courseId === 'dp800') {
      setAtlasIframeUrl('/dp800-atlas/index.html');
      return;
    }

    setIsAssistantOpen(true);

    let userText = '';
    let apiPrompt = '';

    if (courseId === 'dp900') {
      userText = 'Begin DP-900 Ascent';
      apiPrompt = "Let's begin the DP-900 Azure Data Fundamentals Ascent! Explain the core difference between relational and non-relational databases on Azure.";
    } else if (courseId === 'dp600') {
      userText = 'Begin DP-600 Ascent';
      apiPrompt = "Let's begin the DP-600 Microsoft Fabric Analytics Engineer Ascent! Tell me about Lab 01.";
    } else if (courseId === 'dp203') {
      userText = 'Begin DP-203 Ascent';
      apiPrompt = "Let's begin the DP-203 Azure Data Engineering Ascent! Tell me about Lab 01.";
    } else {
      userText = 'Begin DP-700 Ascent';
      apiPrompt = "Let's begin the DP-700 Microsoft Fabric Data Engineer Ascent! Tell me about Lab 01.";
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
      <ScrollProgress />
      <EngagementHUD />

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
        <Training onOpenSyllabus={handleOpenSyllabus} />
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
        <div className="fixed inset-0 z-[9999] bg-[#070913] animate-fade-in">
          <iframe
            src={atlasIframeUrl}
            className="w-full h-full border-none"
            title="Atlas Visualisation"
            onLoad={(e) => {
              try {
                const href = e.target.contentWindow.location.href;
                if (!href.includes('-atlas/')) {
                  setAtlasIframeUrl(null);
                  if (window.resetNeuralCanvas) window.resetNeuralCanvas();
                }
              } catch (_) {
                // cross-origin — ignore
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
