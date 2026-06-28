import React, { useState } from 'react';

const NotebookLMDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = ['All', 'Architecture', 'Authentication', 'Security', 'AI Models'];

  const topics = [
    {
      id: 1,
      title: 'Direct API Bridge',
      category: 'Architecture',
      description: 'Instead of driving a browser, the agent acts as a REST client communicating directly with NotebookLM\'s internal GraphQL/RPC endpoints.',
      nugget: 'Bypasses strict anti-bot mechanisms like --enable-automation.'
    },
    {
      id: 2,
      title: 'The Cookie Trio',
      category: 'Authentication',
      description: 'Google verifies sessions using three tightly coupled HttpOnly cookies. These must be extracted once manually and stored securely.',
      nugget: 'Requires __Secure-1PSID, __Secure-1PSIDTS, and __Secure-3PSID.'
    },
    {
      id: 3,
      title: 'Security & Feasibility',
      category: 'Security',
      description: 'Uses the Windows Credential Vault and makes direct backend API calls, preventing XSS and avoiding password handling entirely.',
      nugget: 'Highly secure; no browser windows are exposed.'
    },
    {
      id: 4,
      title: 'Usage Limits & Rate Limiting',
      category: 'Security',
      description: 'Subject to standard Google account rate limits. For agentic workflows (fetching context, adding sources periodically), the usage is safe.',
      nugget: 'High-frequency polling will result in temporary throttling.'
    },
    {
      id: 5,
      title: 'Model Recommendation',
      category: 'AI Models',
      description: 'Gemini 3.1 Pro (High/Low) handles data extraction, API formatting, and routing flawlessly at a fraction of the cost of heavier models.',
      nugget: 'Optimal resolves-per-dollar for data extraction.'
    }
  ];

  const filteredTopics = activeCategory === 'All' 
    ? topics 
    : topics.filter(t => t.category === activeCategory);

  return (
    <div className="relative w-full min-h-screen bg-[#070913] text-slate-100 p-8 md:p-16 overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NotebookLM Architecture
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl">
            A deep-dive interactive dashboard exploring the Direct API Bridge, Cookie Authentication, and the AI routing mechanisms.
          </p>
        </header>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-slate-800 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                  : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Topics List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredTopics.map((topic) => (
              <div 
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`group cursor-pointer p-6 rounded-2xl backdrop-blur-md bg-white/5 border transition-all duration-500 ${
                  selectedTopic?.id === topic.id 
                    ? 'border-blue-500/50 shadow-[0_8px_30px_rgba(59,130,246,0.15)] bg-gradient-to-br from-white/10 to-transparent' 
                    : 'border-white/10 hover:border-purple-500/30 hover:bg-white/10 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                    {topic.title}
                  </h3>
                  <span className="text-xs font-medium px-3 py-1 bg-slate-900/50 rounded-full text-slate-400 uppercase tracking-wider border border-slate-700">
                    {topic.category}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {topic.description}
                </p>

                {/* Knowledge Nugget Inline */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-900/20 border border-blue-500/20 text-blue-200 text-sm font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  Knowledge Nugget: {topic.nugget}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive Panel */}
          <div className="lg:col-span-1 h-full">
            <div className="sticky top-8 p-8 rounded-3xl backdrop-blur-xl bg-[#0d1124]/80 border border-slate-700/50 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              {selectedTopic ? (
                <div className="animate-fade-in-up">
                  <span className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2 block">
                    Focus Mode
                  </span>
                  <h2 className="text-3xl font-extrabold mb-4">{selectedTopic.title}</h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {selectedTopic.description}
                  </p>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full"></div>
                    <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Core Insight
                    </h4>
                    <p className="text-sm text-slate-400 relative z-10">
                      {selectedTopic.nugget}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center flex-1 opacity-60">
                  <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <p className="text-lg font-medium text-slate-300">Select a topic to explore details</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotebookLMDashboard;
