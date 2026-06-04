import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AsymmetricSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-cosmic-gold/15 glass-card shadow-2xl"
          >
            <img 
              src="/assets/neural_datacenter.png" 
              alt="Futuristic Neural Data Center Rendering" 
              className="w-full h-auto object-cover max-h-[420px] transition-transform duration-700 hover:scale-[1.02] filter brightness-90 contrast-[1.1] saturate-[1.2]"
            />
          </motion.div>

          {/* Description Block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6 lg:pl-6"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Engineered for the <span className="italic font-light text-hyper-drive-blue">Infinite.</span>
            </h3>
            <p className="text-gray-300 font-light leading-relaxed">
              Our proprietary curriculum transcends standard documentation. We provide simulated environments, live data labyrinths, and holographic mentorship sessions.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hyper-drive-blue shrink-0 mt-1" />
                <span className="text-sm text-gray-300 font-light">
                  <strong className="font-semibold text-white">Curated by Active Cloud Architects:</strong> Real-world scenarios from enterprise migrations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hyper-drive-blue shrink-0 mt-1" />
                <span className="text-sm text-gray-300 font-light">
                  <strong className="font-semibold text-white">Private Sandbox Ecosystem:</strong> Hands-on environments with Databricks and Fabric capacities.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hyper-drive-blue shrink-0 mt-1" />
                <span className="text-sm text-gray-300 font-light">
                  <strong className="font-semibold text-white">Certification Pipeline Support:</strong> Precision structured study resources for DP-700 success.
                </span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
