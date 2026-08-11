import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, BarChart3, Database, Compass, ArrowUpRight, BrainCircuit, Server } from 'lucide-react';

export default function Training({ onOpenSyllabus }) {
  const courses = [
    {
      id: 'dp700',
      tag: 'DP-700 Masterclass',
      title: 'Microsoft Fabric Data Engineer',
      status: 'ACTIVE',
      level: 'Elite Master',
      desc: 'Master the end-to-end data engineering lifecycle in Fabric, from OneLake management and Medallion architecture to real-time analytics and Spark optimization.',
      icon: GitBranch,
      color: '#00f0ff',
      bgColor: 'rgba(0, 240, 255, 0.08)',
      borderColor: 'rgba(0, 240, 255, 0.25)',
      levelText: 'Level: Elite Master',
    },
    {
      id: 'dp600',
      tag: 'DP-600 Masterclass',
      title: 'Implementing Analytics Solutions',
      status: 'ACTIVE',
      level: 'Specialist',
      desc: 'Conducted high-impact training for global squads. Covers Fabric Analytics, Lakehouses, Notebooks, and Power BI enterprise integration for modern ETL squads.',
      icon: BarChart3,
      color: '#8a2be2',
      bgColor: 'rgba(138, 43, 226, 0.08)',
      borderColor: 'rgba(138, 43, 226, 0.25)',
      levelText: 'Level: Specialist',
    },
    {
      id: 'dp750',
      tag: 'DP-750 Masterclass',
      title: 'Implement a Lakehouse with Microsoft Fabric',
      status: 'ACTIVE',
      level: 'Specialist',
      desc: 'Design and implement a full lakehouse solution using Microsoft Fabric. Covers data ingestion, Delta Lake storage, Spark transformations, and semantic model integration.',
      icon: BrainCircuit,
      color: '#22d3ee',
      bgColor: 'rgba(34, 211, 238, 0.08)',
      borderColor: 'rgba(34, 211, 238, 0.25)',
      levelText: 'Level: Specialist',
    },
    {
      id: 'dp800',
      tag: 'DP-800 Masterclass',
      title: 'Developing AI-Enabled Database Solutions',
      status: 'ACTIVE',
      level: 'Specialist',
      desc: 'Design and implement AI-enabled database solutions on Azure SQL. Covers advanced T-SQL, database security, performance optimization, CI/CD, vector search, and RAG patterns.',
      icon: Server,
      color: '#a78bfa',
      bgColor: 'rgba(167, 139, 250, 0.08)',
      borderColor: 'rgba(167, 139, 250, 0.25)',
      levelText: 'Level: Specialist',
    },
    {
      id: 'dp203',
      tag: 'DP-203 Masterclass',
      title: 'Azure Data Engineering',
      status: 'RETIRED',
      level: 'Legacy Core',
      desc: 'Scalable cloud pipelines, PySpark execution, Delta Lakes, and Medallion architecture deployments inside Synapse, Databricks, and Data Factory.',
      icon: Database,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: 'rgba(239, 68, 68, 0.25)',
      levelText: 'Level: Legacy Core',
    },
    {
      id: 'dp900',
      tag: 'DP-900 Masterclass',
      title: 'Azure Data Fundamentals',
      status: 'COMING SOON',
      level: 'Foundation',
      desc: 'Master the foundational concepts of cloud data services, relational & non-relational database models, and modern analytics workloads on Azure.',
      icon: Compass,
      color: '#ffd700',
      bgColor: 'rgba(255, 215, 0, 0.08)',
      borderColor: 'rgba(255, 215, 0, 0.25)',
      levelText: 'Level: Foundation',
    },
  ];

  return (
    <section id="training" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Bento Grid Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Pathways to <span className="text-cosmic-gold">Ascension</span>
            </h2>
            <p className="text-gray-400 font-light max-w-lg leading-relaxed text-base md:text-lg">
              Our certification paths are engineered to transform skilled engineers into multi-dimensional data architects.
            </p>
          </div>
          <div className="pb-1">
            <a 
              href="#knowledge-graph" 
              className="inline-flex items-center gap-2 text-hyper-drive-blue font-bold tracking-wider text-sm uppercase hover:underline transition-all duration-300"
            >
              <span>Browse Neural Map</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-card holographic-sweep p-8 flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  {/* Icon Block */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border"
                    style={{ background: course.bgColor, borderColor: course.borderColor }}
                  >
                    <Icon className="h-6 w-6" style={{ color: course.color }} />
                  </div>

                  {/* Course Status/Tag */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest uppercase text-cosmic-gold">
                      {course.tag}
                    </span>
                    <span 
                      className="px-2 py-0.5 text-[9px] font-bold tracking-wider rounded border"
                      style={{ 
                        color: course.status === 'ACTIVE' ? '#10b981' : course.status === 'RETIRED' ? '#ef4444' : '#ffd700',
                        borderColor: course.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.3)' : course.status === 'RETIRED' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 215, 0, 0.3)',
                        background: course.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.1)' : course.status === 'RETIRED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                      }}
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                    {course.desc}
                  </p>
                </div>

                {/* Footer block */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    {course.levelText}
                  </span>
                  <button 
                    onClick={() => onOpenSyllabus(course.id)}
                    className="px-5 py-2 rounded-full border border-white/10 hover:border-hyper-drive-blue hover:text-hyper-drive-blue transition-all duration-300 text-xs font-medium uppercase tracking-wider bg-transparent"
                  >
                    Syllabus
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
