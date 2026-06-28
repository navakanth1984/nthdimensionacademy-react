import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function About({ content }) {
  const bio1 = content?.summary1 || "Master Consultant and Microsoft Certified Trainer (MCT) with over 14 years of industry experience across global enterprises. Recognized for bridging the gap between complex cloud engineering and scalable technical enablement.";
  const bio2 = content?.summary2 || "A specialist in the Azure Data Ecosystem, delivering high-impact training programs for global audiences while concurrently serving as a Lead Data Architect. Proven expertise in designing Medallion architectures using Microsoft Fabric and Azure Databricks, empowering teams through structured, certification-aligned curricula and real-world project mentoring.";

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-5 md:p-8 lg:p-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Container */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="relative rounded-2xl overflow-hidden border border-cosmic-gold/20 shadow-2xl max-w-[350px] w-full"
              >
                <picture>
                  <source srcSet="/assets/badge_mct_hero.avif" type="image/avif" />
                  <source srcSet="/assets/badge_mct_hero.webp" type="image/webp" />
                  <img 
                    src="/assets/badge_mct_hero.jpg" 
                    alt="Navakanth Reddy Dumpa - MCT" 
                    className="w-full h-auto object-cover aspect-[4/5]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space-black/80 via-transparent to-transparent"></div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold">Summary</span>
                </h2>
                <p className="text-gray-300 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: bio1 }} />
                <p className="text-gray-300 font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: bio2 }} />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2 border-t border-white/5 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-hyper-drive-blue" />
                  <span>Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-hyper-drive-blue" />
                  <a href="mailto:mct@nthdimensionacademy.com" className="hover:text-hyper-drive-blue transition-colors">
                    mct@nthdimensionacademy.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-hyper-drive-blue" />
                  <a href="tel:+916304980314" className="hover:text-hyper-drive-blue transition-colors">
                    +91 6304980314
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-2 md:p-4 rounded-2xl text-center border border-cosmic-gold/10"
                >
                  <h3 className="text-xl md:text-3xl font-extrabold text-cosmic-gold">14+</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-wider whitespace-nowrap">Years Exp</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-2 md:p-4 rounded-2xl text-center border border-cosmic-gold/10"
                >
                  <h3 className="text-xl md:text-3xl font-extrabold text-cosmic-gold">MCT</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-wider whitespace-nowrap">Certified</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card p-2 md:p-4 rounded-2xl text-center border border-cosmic-gold/10"
                >
                  <h3 className="text-xl md:text-3xl font-extrabold text-cosmic-gold">5+</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-wider whitespace-nowrap">Active Certs</p>
                </motion.div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
