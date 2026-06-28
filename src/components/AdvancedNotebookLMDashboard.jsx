import React, { useState, useEffect } from 'react';

const AdvancedNotebookLMDashboard = ({ onClose }) => {
  const [activeTopic, setActiveTopic] = useState('architecture');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisText, setSynthesisText] = useState('');
  const [sources, setSources] = useState(['knowledge_base.pdf', 'api_docs.md']);
  const [dragActive, setDragActive] = useState(false);

  const topics = {
    architecture: {
      title: "Direct API Bridge",
      icon: "⚡",
      color: "from-amber-400 to-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      content: "Bypassing standard UI automation via GraphQL/RPC. Eliminates bot detection loops entirely.",
      nugget: "Never use --enable-automation. Inject directly into RPC."
    },
    auth: {
      title: "The Cookie Trio",
      icon: "🍪",
      color: "from-emerald-400 to-cyan-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      content: "Session validity hinges on __Secure-1PSID, __Secure-1PSIDTS, and __Secure-3PSID.",
      nugget: "Extract once, encrypt locally, inject programmatically."
    },
    engine: {
      title: "Model Economics",
      icon: "🧠",
      color: "from-violet-400 to-fuchsia-500",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/30",
      content: "Flash for parsing, Pro for synthesis. Dynamic routing based on token payload.",
      nugget: "Gemini 3.1 Pro maximizes resolves-per-dollar for extraction."
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSources([...sources, e.dataTransfer.files[0].name]);
    }
  };

  const runSynthesis = () => {
    if (isSynthesizing) return;
    setIsSynthesizing(true);
    setSynthesisText('');
    const mockResponse = "Analyzing sources...\nExtracting core architectural nodes...\nCorrelating Cookie authentication with API Bridge endpoints...\n\n[Synthesis Complete]\nThe Direct API Bridge successfully bypassed Chrome UI automation, reducing latency by 94%.";
    
    let i = 0;
    const interval = setInterval(() => {
      setSynthesisText(mockResponse.substring(0, i));
      i++;
      if (i > mockResponse.length) {
        clearInterval(interval);
        setIsSynthesizing(false);
      }
    }, 20);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030712] text-slate-200 overflow-y-auto overflow-x-hidden font-sans">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className={`absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] bg-gradient-to-br ${topics[activeTopic].color} opacity-20 transition-all duration-1000`} />
        <div className={`absolute bottom-0 right-1/4 w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] bg-gradient-to-tr ${topics[activeTopic].color} opacity-10 transition-all duration-1000`} />
        {/* CSS Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto p-6 md:p-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
              NotebookLM <span className={`bg-gradient-to-r ${topics[activeTopic].color} bg-clip-text text-transparent transition-all duration-500`}>Ascension</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium tracking-wide text-sm md:text-base uppercase">Standalone Cognitive Workspace</p>
          </div>
          <button 
            onClick={onClose}
            className="group relative px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
          >
            <span className="relative z-10 text-sm font-bold tracking-widest uppercase">Exit Space</span>
            <div className="absolute inset-0 bg-red-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
          
          {/* Left Column: Topics Navigation & Data Drop */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Interactive Topic Selector */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex-1 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Knowledge Nodes</h3>
              {Object.entries(topics).map(([key, data]) => {
                const isActive = activeTopic === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTopic(key)}
                    className={`relative p-5 rounded-2xl text-left transition-all duration-500 group overflow-hidden ${
                      isActive 
                        ? `bg-gradient-to-br ${data.color} shadow-lg shadow-white/5 scale-[1.02]` 
                        : 'bg-white/5 hover:bg-white/10 hover:scale-[1.01]'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-black/40 ${isActive ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
                    <div className="relative z-10 flex items-center gap-4">
                      <span className="text-2xl">{data.icon}</span>
                      <div>
                        <h4 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-300'}`}>{data.title}</h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Drag & Drop Upload Zone */}
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`p-8 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] text-center
                ${dragActive 
                  ? `border-blue-400 bg-blue-400/10` 
                  : `border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]`
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-300">Drop Source Material</h4>
              <p className="text-sm text-slate-500 mt-2">PDF, TXT, or MD files</p>
            </div>

          </div>

          {/* Center Column: Deep Dive & Synthesis */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Dynamic Content Display */}
            <div className={`p-8 md:p-12 rounded-3xl backdrop-blur-xl border transition-all duration-700 ${topics[activeTopic].bg} ${topics[activeTopic].border}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{topics[activeTopic].icon}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{topics[activeTopic].title}</h2>
              </div>
              
              <p className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed mb-8">
                {topics[activeTopic].content}
              </p>
              
              <div className="inline-flex items-start gap-4 p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                <div className={`mt-1 w-3 h-3 rounded-full animate-pulse bg-gradient-to-br ${topics[activeTopic].color}`} />
                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Knowledge Nugget</span>
                  <p className="text-white font-medium">{topics[activeTopic].nugget}</p>
                </div>
              </div>
            </div>

            {/* Synthesis Terminal Engine */}
            <div className="flex-1 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent p-[1px]">
              <div className="h-full rounded-[23px] bg-[#0a0a0a] flex flex-col overflow-hidden">
                
                {/* Terminal Header */}
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex gap-2">
                    {sources.map((s, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono bg-white/5 text-slate-400 rounded-md border border-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 p-6 font-mono text-sm md:text-base text-emerald-400 leading-relaxed whitespace-pre-wrap overflow-y-auto min-h-[250px]">
                  {synthesisText || <span className="text-slate-600">Waiting for synthesis command...\nSources loaded: {sources.length}</span>}
                  {isSynthesizing && <span className="animate-pulse">_</span>}
                </div>

                {/* Terminal Action */}
                <div className="p-4 bg-white/[0.02] border-t border-white/5">
                  <button
                    onClick={runSynthesis}
                    disabled={isSynthesizing}
                    className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 ${
                      isSynthesizing 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : `bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]`
                    }`}
                  >
                    {isSynthesizing ? 'Synthesizing...' : 'Run Deep Synthesis'}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvancedNotebookLMDashboard;
