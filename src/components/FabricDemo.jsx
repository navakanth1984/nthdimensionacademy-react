import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function FabricDemo({ onPlayDemo }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.controls = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        if (onPlayDemo) {
          onPlayDemo();
        }
      }).catch(err => {
        console.warn('Playback block/error:', err);
      });
    }
  };

  return (
    <section id="fabric-demo" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="glass-panel p-8 md:p-12 text-center border-cosmic-gold/25 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition-shadow duration-500">
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-cosmic-gold mb-3 tracking-tight">
            Microsoft Fabric: The N<span className="nth-style">TH</span> Dimension Demo
          </h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto mb-8">
            Experience the convergence of Data Engineering and AI in our exclusive masterclass preview.
          </p>

          <div className="relative rounded-2xl overflow-hidden border border-hyper-drive-blue/30 max-w-[850px] mx-auto shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-black/40">
            <video 
              ref={videoRef}
              playsInline
              preload="metadata"
              className="w-full h-auto aspect-video object-cover block"
            >
              <source src="/assets/fabric_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300">
                <button 
                  onClick={handlePlay}
                  className="p-5 md:p-6 rounded-full bg-hyper-drive-blue text-black hover:scale-110 shadow-[0_0_25px_#00f0ff] hover:shadow-[0_0_35px_#00f0ff] transition-all duration-300 group cursor-pointer"
                >
                  <Play className="h-8 w-8 fill-black group-hover:scale-105 transition-transform" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
