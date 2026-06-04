import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero({ content }) {
  const headline = content?.title || "Get Set Certified";
  const subtitle = content?.subtitle || "Microsoft Fabric & Azure mastery, led by MCT Navakanth Reddy Dumpa.\nStep through the data multiverse.";

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-16 overflow-hidden">
      {/* Background Videos */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-[0.12]"
        >
          <source src="/assets/_Maintain_the_3D_hyper-realistic_crystalline_202605061839.mp4" type="video/mp4" />
        </video>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover md:hidden opacity-[0.12]"
        >
          <source src="/assets/Continue_with_pulsating_text_and_202605061853.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-[1000px] px-8 flex flex-col items-center justify-center">
        {/* Monolith Branded Image or Spline 3D Embed Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8 w-full max-w-[900px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] border border-[#ffd700]/10 hover:border-[#00f0ff]/30 transition-colors duration-500 bg-black/20"
        >
          {content?.splineEmbedUrl ? (
            <div className="w-full h-[320px] sm:h-[420px] md:h-[500px] relative">
              <iframe 
                src={content.splineEmbedUrl} 
                className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                title="Spline 3D Scene"
                allow="xr-spatial-tracking"
              />
            </div>
          ) : (
            <picture>
              <source media="(max-width: 768px)" srcSet="/assets/[IMAGE_END]__A_10-row_vertical_grid_202605060728.jpeg" />
              <img 
                src="/assets/[IMAGE_END]__A_premium_4D_glass_202605052049.jpeg" 
                alt="Nth Dimension Academy Monolith" 
                className="w-full h-auto object-contain max-h-[480px] md:max-h-[600px] transition-transform duration-700 hover:scale-[1.01]"
              />
            </picture>
          )}
        </motion.div>

        {/* Text and CTAs */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500">
            {headline}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-[650px] text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-10 whitespace-pre-line"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto"
        >
          <a 
            href="#training" 
            className="flex items-center gap-2 px-8 py-4 rounded-full text-black font-bold uppercase tracking-wider bg-gradient-to-r from-[#a5f3fc] to-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto text-center justify-center"
          >
            <span>Begin the Ascent</span>
            <ArrowRight className="h-5 w-5" />
          </a>
          <a 
            href="#knowledge-graph" 
            className="px-8 py-4 rounded-full text-white font-semibold uppercase tracking-wider bg-slate-900/60 backdrop-blur-md border border-white/10 hover:bg-slate-800/80 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto text-center"
          >
            Explore Pathways
          </a>
        </motion.div>
      </div>
    </header>
  );
}
