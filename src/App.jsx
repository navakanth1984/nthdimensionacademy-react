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

function App() {
  const glowRef = useRef(null);

  // Auth states
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Assistant Chat states
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState([
    {
      id: 'welcome',
      sender: 'system',
      text: 'Greetings, Voyager. I am your guide to the N<span class="nth-style">TH</span> Dimension Academy. How can I assist your data journey today?'
    }
  ]);
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
    setAssistantMessages(prev => [
      ...prev,
      {
        id: Date.now() + '-system-demo-init',
        sender: 'system',
        text: 'Initiating N<span class="nth-style">TH</span> Dimension Fabric Demo Masterclass... Observe the convergence of data streams.'
      }
    ]);
    setTriggerQuery({
      userText: 'Launch the Fabric Demo.',
      apiPrompt: 'I am watching the Microsoft Fabric Demo. Explain the key architectural components being shown and how they align with the NTH Dimension.'
    });
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 selection:bg-hyper-drive-blue selection:text-black antialiased overflow-hidden font-sans">
      
      {/* Interactive Cursor Glow */}
      <div className="cursor-glow hidden md:block" ref={glowRef} />

      {/* Navbar Header */}
      <Navbar onOpenPortal={() => setIsStudentPortalOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Page Sections (Bind MongoDB text states if loaded) */}
      <Hero content={contentData?.hero} />
      <About content={contentData?.about} />
      <Expertise />
      <CurriculumMap />
      <Training onOpenSyllabus={handleOpenSyllabus} />
      <Pricing />
      <AsymmetricSection />
      <Achievements content={contentData?.achievements} />
      <FabricDemo onPlayDemo={handlePlayDemo} />

      {/* Footer Details */}
      <Footer onOpenAdmin={() => setIsCMSOpen(true)} />

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
        messages={assistantMessages} 
        setMessages={setAssistantMessages} 
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10000] w-full max-w-[300px] flex justify-center pointer-events-none">
            <button 
              onClick={() => {
                setAtlasIframeUrl(null);
                if (window.resetNeuralCanvas) window.resetNeuralCanvas();
              }}
              className="pointer-events-auto bg-[#070913]/90 text-[#00ffff] border border-[#00ffff] px-8 py-3 rounded-full font-bold hover:bg-[#00ffff] hover:text-black hover:scale-105 transition-all backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              ← Return to Main Academy
            </button>
          </div>
          <iframe 
            src={atlasIframeUrl} 
            className="w-full h-full border-none" 
            title="Atlas Visualisation"
          />
        </div>
      )}

    </div>
  );
}

export default App;
