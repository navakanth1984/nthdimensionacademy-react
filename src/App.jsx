import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import CurriculumMap from './components/CurriculumMap';
import Training from './components/Training';
import AsymmetricSection from './components/AsymmetricSection';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import FabricDemo from './components/FabricDemo';
import Footer from './components/Footer';
import SyllabusModal from './components/SyllabusModal';
import AIAssistant from './components/AIAssistant';

function App() {
  const glowRef = useRef(null);

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

  // Handlers for dynamic page components integration
  const handleOpenSyllabus = (courseId) => {
    setSyllabusCourseId(courseId);
    setIsSyllabusOpen(true);
  };

  const handleBeginAscent = (courseId) => {
    setIsSyllabusOpen(false);
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
      <Navbar />

      {/* Page Sections */}
      <Hero />
      <About />
      <Expertise />
      <CurriculumMap />
      <Training onOpenSyllabus={handleOpenSyllabus} />
      <AsymmetricSection />
      <Experience />
      <Achievements />
      <FabricDemo onPlayDemo={handlePlayDemo} />

      {/* Footer Details */}
      <Footer />

      {/* Syllabus Tabbed Modal overlay */}
      <SyllabusModal 
        isOpen={isSyllabusOpen} 
        courseId={syllabusCourseId} 
        onClose={() => setIsSyllabusOpen(false)} 
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

    </div>
  );
}

export default App;
