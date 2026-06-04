import React from 'react';
import { motion } from 'framer-motion';

export default function Experience() {
  const experiences = [
    {
      role: 'MCT Lead & Lead Consultant',
      company: 'Genpact India Pvt Ltd',
      duration: 'Dec 2019 – Present',
      desc: 'Elite MCT Trainer & Data Architect: upskilling global engineering squads on DP-700, DP-600, and DP-900. Architected production-grade Medallion architectures using Microsoft Fabric & Azure Databricks.',
    },
    {
      role: 'Process Lead (VBA Programmer)',
      company: 'Deloitte (via Magna Infotech)',
      duration: '2018 – 2019',
      desc: 'Enterprise Analytics Architect: automated reporting and built interactive Power BI, Synapse, and Alteryx workflows for high-scale Consumer-Packaged Goods analytics.',
    },
    {
      role: 'Data Analyst',
      company: 'IBM (via Alchemy Techsol)',
      duration: '2015 – 2017',
      desc: 'Financial & Automation Analyst: designed financial models, custom macros, and Cognos/VBA automated reporting systems for global SLA monitoring.',
    },
    {
      role: 'QA Data Analyst',
      company: 'Wells Fargo (via Magna Infotech)',
      duration: '2009 – 2011',
      desc: 'QA Data & Macro Engineer: conditioned and validated multi-terabyte financial datasets, building custom Excel/VBA tools for banking test environments.',
    },
    {
      role: 'MIS Officer',
      company: 'Sitel India',
      duration: '2007 – 2009',
      desc: 'MIS & Reporting Specialist: developed automated templates, database procedures, and custom SQL/VBA scripts for SLA tracking.',
    },
    {
      role: 'Customer Dialog Executive',
      company: 'Magus Customer Dialog Pvt Ltd',
      duration: '2005 – 2006',
      desc: 'Operations & Metrics Coordinator: engineered reporting templates and data-driven client tracking models for customer service desks.',
    },
  ];

  return (
    <section id="experience" className="py-20 relative bg-black/10">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Experience</span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-cosmic-gold/15 max-w-[800px] mx-auto pl-6 md:pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-hyper-drive-blue border border-deep-space-black shadow-[0_0_8px_#00f0ff] z-10" />

              {/* Handoff item card */}
              <div className="glass-panel p-6 border border-cosmic-gold/10 hover:border-hyper-drive-blue/30 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-cosmic-gold font-medium uppercase tracking-wider font-mono">
                    {exp.company} | {exp.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
