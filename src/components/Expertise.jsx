import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, BarChart3, Cpu } from 'lucide-react';

export default function Expertise() {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const videos = [
    '/assets/fabric_video.mp4',
    '/assets/ppt_video_1.mp4',
    '/assets/ppt_video_2.mp4',
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveDot(index);
    }
  };

  const scrollToVideo = (index) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
      setActiveDot(index);
    }
  };

  return (
    <section id="expertise" className="py-20 bg-deep-space-black/40">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Expertise</span>
          </h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Architecting scalable solutions and driving analytics mastery.
          </p>
        </div>

        {/* Video Slider */}
        <div className="relative rounded-2xl overflow-hidden border border-cosmic-gold/15 shadow-2xl mb-16 max-w-[850px] mx-auto bg-black/40">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="video-carousel"
          >
            {videos.map((src, index) => (
              <video 
                key={index}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-[220px] md:h-[420px] object-cover flex-shrink-0 select-none"
              >
                <source src={src} type="video/mp4" />
              </video>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToVideo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeDot === index 
                    ? 'bg-hyper-drive-blue scale-125 shadow-[0_0_8px_#00f0ff]' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Hint Overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-cosmic-gold font-bold tracking-widest uppercase border border-white/5 select-none pointer-events-none">
            Swipe / Scroll
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-panel p-8 flex flex-col items-center text-center space-y-4 border border-cosmic-gold/10 hover:border-hyper-drive-blue/30 transition-colors duration-300"
          >
            <div className="p-4 rounded-full bg-hyper-drive-blue/5 border border-hyper-drive-blue/20">
              <Cloud className="h-8 w-8 text-hyper-drive-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Cloud & Data</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-light w-full">
              <li className="py-1 border-b border-white/5 last:border-0">Microsoft Fabric</li>
              <li className="py-1 border-b border-white/5 last:border-0">Azure Databricks (PySpark/SQL)</li>
              <li className="py-1 border-b border-white/5 last:border-0">Medallion Architecture</li>
              <li className="py-1 border-b border-white/5 last:border-0">ADLS Gen2</li>
              <li className="py-1 border-b border-white/5 last:border-0">Azure Event Hub & Key Vault</li>
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-panel p-8 flex flex-col items-center text-center space-y-4 border border-cosmic-gold/10 hover:border-hyper-drive-blue/30 transition-colors duration-300"
          >
            <div className="p-4 rounded-full bg-hyper-drive-blue/5 border border-hyper-drive-blue/20">
              <BarChart3 className="h-8 w-8 text-hyper-drive-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Analytics</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-light w-full">
              <li className="py-1 border-b border-white/5 last:border-0">Advanced Power BI (DAX, Modeling)</li>
              <li className="py-1 border-b border-white/5 last:border-0">Power BI Service Architecture</li>
              <li className="py-1 border-b border-white/5 last:border-0">Alteryx</li>
              <li className="py-1 border-b border-white/5 last:border-0">T-SQL</li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="glass-panel p-8 flex flex-col items-center text-center space-y-4 border border-cosmic-gold/10 hover:border-hyper-drive-blue/30 transition-colors duration-300"
          >
            <div className="p-4 rounded-full bg-hyper-drive-blue/5 border border-hyper-drive-blue/20">
              <Cpu className="h-8 w-8 text-hyper-drive-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Automation</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-light w-full">
              <li className="py-1 border-b border-white/5 last:border-0">Python</li>
              <li className="py-1 border-b border-white/5 last:border-0">VBA / Macros</li>
              <li className="py-1 border-b border-white/5 last:border-0">Winshuttle</li>
              <li className="py-1 border-b border-white/5 last:border-0">Workflow Optimization</li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
