import React, { useState, useEffect } from 'react';
import { 
  X, BookOpen, Calendar, Award, TrendingUp, CheckCircle, 
  Clock, ExternalLink, Copy, FileText, Sparkles, Key, CheckSquare, Square
} from 'lucide-react';

export default function StudentDashboard({ isOpen, onClose }) {
  const [copiedText, setCopiedText] = useState('');
  const [countdown, setCountdown] = useState({ days: 2, hours: 4, minutes: 12, seconds: 45 });
  
  // Dynamic Mock Curriculum state
  const [modules, setModules] = useState([
    {
      id: 'mod1',
      title: 'Module 1: Fabric Architecture & OneLake',
      labs: [
        { id: 'l11', name: 'Lab 1.1: Provisioning Fabric Tenant & Workspace', completed: true },
        { id: 'l12', name: 'Lab 1.2: OneLake Explorer & Shortcut Integration', completed: true },
        { id: 'l13', name: 'Lab 1.3: Setting up Delta Parquet Storage tables', completed: true }
      ]
    },
    {
      id: 'mod2',
      title: 'Module 2: Data Ingestion & Dataflows Gen2',
      labs: [
        { id: 'l21', name: 'Lab 2.1: Building Dataflows Gen2 pipelines', completed: true },
        { id: 'l22', name: 'Lab 2.2: Incremental refresh setup in Dataflows', completed: false },
        { id: 'l23', name: 'Lab 2.3: Ingestion via Copy Activity in Pipelines', completed: false }
      ]
    },
    {
      id: 'mod3',
      title: 'Module 3: Warehousing & Analytics Development',
      labs: [
        { id: 'l31', name: 'Lab 3.1: Fabric Synapse Data Warehouse creation', completed: false },
        { id: 'l32', name: 'Lab 3.2: T-SQL analytics query performance tuning', completed: false },
        { id: 'l33', name: 'Lab 3.3: Cross-database querying via SQL Endpoint', completed: false }
      ]
    },
    {
      id: 'mod4',
      title: 'Module 4: Spark Lakehouse & Data Science Orchestration',
      labs: [
        { id: 'l41', name: 'Lab 4.1: Notebook orchestration with Spark clusters', completed: false },
        { id: 'l42', name: 'Lab 4.2: Machine Learning Autologging with MLflow', completed: false }
      ]
    },
    {
      id: 'mod5',
      title: 'Module 5: Real-time Intelligence & Eventstreams',
      labs: [
        { id: 'l51', name: 'Lab 5.1: Real-time Eventstream ingestion flow', completed: false },
        { id: 'l52', name: 'Lab 5.2: KQL Database storage and KQL query design', completed: false }
      ]
    },
    {
      id: 'mod6',
      title: 'Module 6: Enterprise Administration & Governance',
      labs: [
        { id: 'l61', name: 'Lab 6.1: Workspace and Item Level Permissions configuration', completed: false },
        { id: 'l62', name: 'Lab 6.2: Tenant Settings audit & Capacity Monitoring', completed: false }
      ]
    }
  ]);

  // Live session countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLab = (moduleId, labId) => {
    setModules(prevModules => 
      prevModules.map(mod => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            labs: mod.labs.map(lab => 
              lab.id === labId ? { ...lab, completed: !lab.completed } : lab
            )
          };
        }
        return mod;
      })
    );
  };

  // Calculations
  const totalLabs = modules.reduce((sum, mod) => sum + mod.labs.length, 0);
  const completedLabs = modules.reduce(
    (sum, mod) => sum + mod.labs.filter(l => l.completed).length, 0
  );
  
  const completionPercentage = totalLabs > 0 ? Math.round((completedLabs / totalLabs) * 100) : 0;
  
  // Readiness score starts at 20% and scales up to 100% based on labs completed
  const examReadiness = totalLabs > 0 ? Math.min(100, Math.round(20 + (completedLabs / totalLabs) * 80)) : 20;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleGenerateMCTLetter = () => {
    alert("🌌 [MCT ENDORSEMENT GENERATED] \n\nNavakanth (MCT) has signed and verified your curriculum completion. The formal endorsement letter PDF has been queued to your registered email for your Microsoft Certification upload portal.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      
      {/* Container Card */}
      <div className="relative w-full max-w-[1100px] h-[90vh] flex flex-col rounded-2xl border border-cosmic-gold/20 bg-[#060a13] shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#0a0f1d] border-b border-cosmic-gold/15">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-cosmic-gold bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              MCT
            </div>
            <div>
              <h2 className="text-lg font-bold text-cosmic-gold uppercase tracking-wider">Student Portal</h2>
              <p className="text-xs text-slate-400 font-light">
                Welcome back, <span className="text-[#00f0ff] font-medium">Data Engineer</span> | Microsoft Fabric DP-700 Cohort
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-300 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Workspace (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Metric Card 1: Overall Progress */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0a0f1d]/60 flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-[#00f0ff]/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Overall Progress</span>
                  <h3 className="text-3xl font-extrabold text-white mt-1">{completionPercentage}%</h3>
                </div>
                <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#00f0ff] to-indigo-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 font-light">
                  {completedLabs} of {totalLabs} practical sandbox labs checked
                </p>
              </div>
            </div>

            {/* Metric Card 2: Exam Readiness */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0a0f1d]/60 flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">DP-700 Exam Readiness</span>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{examReadiness}%</h3>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${examReadiness}%` }}
                  />
                </div>
                <p className="text-[11px] mt-2 font-light text-slate-400">
                  {examReadiness >= 80 
                    ? '🔥 Recommended to book exam today!' 
                    : '💡 Need 80%+ readiness score to qualify for MCT endorse'}
                </p>
              </div>
            </div>

            {/* Metric Card 3: Live Session Timer */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0a0f1d]/60 flex flex-col justify-between shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Next Live Sync (Cohort)</span>
                  <div className="flex items-center gap-1 mt-1 text-white font-extrabold font-mono text-xl tracking-tight">
                    <span>{countdown.days}d</span>
                    <span className="text-slate-500">:</span>
                    <span>{String(countdown.hours).padStart(2, '0')}h</span>
                    <span className="text-slate-500">:</span>
                    <span>{String(countdown.minutes).padStart(2, '0')}m</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-amber-500">{String(countdown.seconds).padStart(2, '0')}s</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 animate-pulse">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-light">Topic: DirectLake optimization</span>
                <a 
                  href="https://calendar.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[11px] text-cosmic-gold hover:underline flex items-center gap-1 font-semibold"
                >
                  Join Link <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Core Content Row: Left Sandbox/Labs, Right MCT / Exam Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Interactive Labs Checklist */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-hyper-drive-blue" />
                  Cohort Labs Tracker
                </h3>
                <span className="text-[11px] text-slate-400 italic">Toggle labs to update readiness</span>
              </div>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {modules.map((mod) => {
                  const modCompleted = mod.labs.filter(l => l.completed).length;
                  const modPercent = Math.round((modCompleted / mod.labs.length) * 100);
                  
                  return (
                    <div key={mod.id} className="p-4 rounded-xl border border-white/5 bg-[#090e18]/80 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-200">{mod.title}</span>
                        <span className="text-xs text-hyper-drive-blue font-bold font-mono">{modPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1">
                        <div 
                          className="bg-hyper-drive-blue h-1 rounded-full transition-all duration-300"
                          style={{ width: `${modPercent}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 mt-2 pt-1 border-t border-white/5">
                        {mod.labs.map(lab => (
                          <div 
                            key={lab.id} 
                            onClick={() => toggleLab(mod.id, lab.id)}
                            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                              lab.completed ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {lab.completed ? (
                              <CheckSquare className="h-4.5 w-4.5 text-[#00f0ff] flex-shrink-0" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-600 flex-shrink-0" />
                            )}
                            <span className="text-xs font-light">{lab.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sandbox Credentials + MCT Endorsement & Actions */}
            <div className="space-y-6">
              
              {/* Box 1: Sandbox Credentials */}
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0a0f1d]/75 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Key className="h-4.5 w-4.5 text-cosmic-gold" />
                  MCT Sandbox Access
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Your dedicated premium Microsoft Fabric sandbox for practice tenant:
                </p>
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-500">Tenant Username</p>
                      <p className="text-xs font-mono text-slate-300">mct_student_42@fabricfrontier.onmicrosoft.com</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('mct_student_42@fabricfrontier.onmicrosoft.com', 'user')}
                      className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-500">Password</p>
                      <p className="text-xs font-mono text-slate-300">••••••••••••••••</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('FabricGuruPass2026!', 'pass')}
                      className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {copiedText && (
                  <p className="text-[10px] text-[#00f0ff] font-medium text-center bg-[#00f0ff]/5 py-1 rounded">
                    Copied {copiedText} credentials to clipboard!
                  </p>
                )}
              </div>

              {/* Box 2: Microsoft Certification & Endorsement actions */}
              <div className="p-5 rounded-xl border border-cosmic-gold/20 bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] space-y-4 shadow-[inset_0_0_15px_rgba(255,215,0,0.05)]">
                <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-cosmic-gold" />
                  MCT Endorsements
                </h4>
                
                <div className="space-y-3">
                  {completionPercentage < 100 ? (
                    <div className="p-3.5 rounded-lg bg-black/35 border border-slate-800 text-slate-400 space-y-2">
                      <p className="text-xs font-light leading-relaxed">
                        Complete all 6 course modules (100% completion) to unlock your official Microsoft Certified Trainer recommendation letter signed by Navakanth.
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Locked: {100 - completionPercentage}% remaining</span>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleGenerateMCTLetter}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Sparkles className="h-4 w-4 fill-black" />
                      Generate Endorsement Letter
                    </button>
                  )}

                  {/* Booking Link */}
                  <a 
                    href="https://calendly.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-medium uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Book One-on-One MCT session
                  </a>

                  {/* Schedule Exam Link */}
                  <a 
                    href="https://learn.microsoft.com/en-us/credentials/certifications/exams/dp-700/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-medium text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Schedule Official Microsoft Exam
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
