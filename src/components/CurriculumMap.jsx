import React from 'react';
import NeuralCanvas from './NeuralCanvas';
import { MousePointerClick } from 'lucide-react';

export default function CurriculumMap() {
  return (
    <section id="knowledge-graph" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Curriculum Map</span>
          </h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Explore the Microsoft Azure & Fabric ecosystem through this 3D neural visualization.
          </p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-[550px] rounded-3xl overflow-hidden border border-hyper-drive-blue/20 bg-[#070913] shadow-[0_0_35px_rgba(0,240,255,0.08)]">
          {/* Neural Canvas in absolute container inside the box */}
          <div className="absolute inset-0 z-0">
            <NeuralCanvas />
          </div>

          {/* User Hint overlay */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md text-[10px] md:text-xs text-hyper-drive-blue font-mono uppercase tracking-wider select-none pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <MousePointerClick className="h-4 w-4 animate-bounce" />
            <span>Drag to rotate | Scroll to zoom | Hover nodes for info</span>
          </div>
        </div>

      </div>
    </section>
  );
}
