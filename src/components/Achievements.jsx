import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Rocket, Award } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      title: 'Enterprise Upskilling',
      desc: 'Elevated the Azure data capabilities of global engineering squads through DP-600, DP-203, and DP-900 training.',
      icon: Trophy,
    },
    {
      title: 'Fabric Adoption',
      desc: 'Spearheaded the internal “Fabric Readiness” program, accelerating the transition to Lakehouse architectures.',
      icon: Rocket,
    },
    {
      title: 'Certification Enablement',
      desc: 'Mentored teams through Microsoft curricula, driving high certification success rates for Azure Data and Power BI.',
      icon: Award,
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tight">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Achievements</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((ach, index) => {
              const Icon = ach.icon;
              return (
                <div key={index} className="flex flex-col items-center p-6 rounded-2xl bg-black/20 border border-white/5 space-y-4">
                  <div className="p-4 rounded-full bg-hyper-drive-blue/5 border border-hyper-drive-blue/20">
                    <Icon className="h-8 w-8 text-hyper-drive-blue" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                    {ach.title}
                  </h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
