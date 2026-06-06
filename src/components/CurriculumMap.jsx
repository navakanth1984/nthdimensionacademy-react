import React, { useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { MousePointerClick } from 'lucide-react';

export default function CurriculumMap() {
  const [viewMode, setViewMode] = useState('solar');

  return (
    <section id="knowledge-graph" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Curriculum Map</span>
          </h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Explore the Microsoft Azure & Fabric ecosystem through this multi-dimensional 3D visualization.
          </p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-[550px] rounded-3xl overflow-hidden border border-hyper-drive-blue/20 bg-[#070913] shadow-[0_0_35px_rgba(0,240,255,0.08)]">
          
          {/* Neural Canvas in absolute container */}
          <div className="absolute inset-0 z-0">
            <NeuralCanvas mode={viewMode} />
          </div>

          {/* User Hint overlay (Top-Left) */}
          <div className="absolute top-6 left-6 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md text-[10px] md:text-xs text-hyper-drive-blue font-mono uppercase tracking-wider select-none pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 animate-bounce" />
              <span className="hidden md:inline">Drag to rotate | Scroll to zoom | Click nodes</span>
              <span className="md:hidden">1 Finger: Rotate | 2 Fingers: Zoom</span>
            </div>
          </div>

          {/* Version Switcher Control Overlay (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 z-10 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <button
              onClick={() => setViewMode('solar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                viewMode === 'solar'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🪐 Solar System
            </button>
            <button
              onClick={() => setViewMode('atom')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                viewMode === 'atom'
                  ? 'bg-gradient-to-r from-fuchsia-400 to-pink-500 text-black shadow-[0_0_15px_rgba(232,121,249,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ⚛️ Atomic Shell
            </button>
            <button
              onClick={() => setViewMode('molecule')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                viewMode === 'molecule'
                  ? 'bg-gradient-to-r from-violet-400 to-indigo-500 text-black shadow-[0_0_15px_rgba(167,139,250,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🧬 Molecular Lattice
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
