import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      id: 'novice',
      name: 'Basic',
      price: 'Free',
      tag: 'NOVICE',
      features: ['Access to website and subdirectories', 'Core Syllabus Chapters', 'Community Forum Access', 'Standard Support'],
      buttonText: 'Coming Soon',
      isPopular: false,
      stripeLink: '#'
    },
    {
      id: 'explorer',
      name: 'Recommended',
      price: '₹##99 / $#9 / mo',
      tag: 'EXPLORER',
      features: ['Full Neural Map Access', 'Complete Video Library', 'Hands-on Cloud Labs', 'Priority Mentorship Support', 'Certification Vouchers'],
      buttonText: 'Coming Soon',
      isPopular: true,
      stripeLink: '#'
    },
    {
      id: 'architect',
      name: 'Elite',
      price: '₹##99 / $#9 lifetime',
      tag: 'ARCHITECT',
      features: ['Unlimited Access to All Tracks', '1-on-1 Architect Mentorship', 'Enterprise Real-world Projects', 'Job Placement Assistance', 'Lifetime Alumni Network'],
      buttonText: 'Coming Soon',
      isPopular: false,
      stripeLink: '#'
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Data Link <span className="text-cosmic-gold">Pricing</span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto text-base md:text-lg">
          Secure your neural connection to the NTH Dimension Academy. 
          Prices are localized for Indian (INR) and International (USD) voyagers.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
           <div className="bg-[#05070f]/90 backdrop-blur-md text-[#00f0ff] border border-[#00f0ff] px-8 py-4 rounded-2xl text-2xl md:text-4xl font-black tracking-widest uppercase rotate-[-5deg] shadow-[0_0_30px_rgba(0,240,255,0.3)]">
             Coming Soon
           </div>
        </div>

        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`glass-panel p-8 rounded-3xl relative flex flex-col opacity-50 grayscale pointer-events-none select-none ${
              plan.isPopular 
                ? 'border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-gradient-to-b from-[#00f0ff]/5 to-transparent' 
                : 'border-white/10'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00f0ff] text-black font-bold uppercase tracking-widest text-xs px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="text-cosmic-gold text-xs font-bold uppercase tracking-widest mb-2">{plan.tag}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
            <div className="text-3xl md:text-4xl font-bold text-white mb-8">{plan.price}</div>
            
            <ul className="flex-1 space-y-4 mb-8 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-[#00f0ff] shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button disabled className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 text-sm flex justify-center items-center ${
              plan.isPopular 
                ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                : 'bg-transparent border border-white/20 text-white'
            }`}>
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
