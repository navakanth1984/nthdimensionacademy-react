import { useState } from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, MessageSquare, Phone, Mail, Award, BookOpen, ShieldCheck } from 'lucide-react';

const BACKGROUND_OPTIONS = [
  {
    id: 'bi_analyst',
    title: 'BI Analyst / Power BI Developer',
    desc: 'Experienced in DAX, Power BI dashboards, and business reporting.',
    recommendedCourse: 'DP-600',
    courseName: 'Implementing Analytics Solutions Using Microsoft Fabric',
    atlasUrl: '/dp600-atlas/'
  },
  {
    id: 'data_engineer',
    title: 'Data Engineer / Python Developer',
    desc: 'Hands-on with ETL pipelines, PySpark, SQL, and data lakes.',
    recommendedCourse: 'DP-700',
    courseName: 'Implementing Data Engineering Solutions Using Microsoft Fabric',
    atlasUrl: '/dp700-atlas/'
  },
  {
    id: 'databricks_practitioner',
    title: 'Databricks / Cloud Lakehouse Engineer',
    desc: 'Working with Spark clusters, Delta Live Tables, and Unity Catalog.',
    recommendedCourse: 'DP-750',
    courseName: 'Data Engineering with Microsoft Azure Databricks',
    atlasUrl: '/dp750-atlas/'
  },
  {
    id: 'dw_architect',
    title: 'SQL Developer / DW Architect',
    desc: 'Specialized in Synapse, SQL Server, stored procedures, and star schemas.',
    recommendedCourse: 'DP-800',
    courseName: 'Implementing a Microsoft Fabric Data Warehouse',
    atlasUrl: '/dp800-atlas/'
  },
  {
    id: 'ai_engineer',
    title: 'AI / Software Engineer',
    desc: 'Looking to build enterprise RAG pipelines, LLM solutions, and agents.',
    recommendedCourse: 'AI-103',
    courseName: 'Azure AI Foundry & Generative AI Solutions',
    atlasUrl: '/ai103-atlas/'
  }
];

const TIMELINE_OPTIONS = [
  { id: '30_days', label: 'Within 30 Days (Fast-Track Prep)' },
  { id: '60_days', label: '1–2 Months (Structured Weekend Batch)' },
  { id: 'enterprise', label: 'Enterprise Team Enablement' }
];

export default function CertificationMatcherModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedBackground, setSelectedBackground] = useState(BACKGROUND_OPTIONS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      ...formData,
      recommendedCourse: selectedBackground.recommendedCourse,
      background: selectedBackground.title,
      timeline: selectedTimeline.label,
      timestamp: new Date().toISOString()
    };

    try {
      // POST to lead collection API endpoint
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });
    } catch (err) {
      console.warn('Lead capture fallback triggered:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  // WhatsApp prefilled link to MCT directly
  const whatsappMessage = encodeURIComponent(
    `Hello Navakanth Sir,\n\nI completed the Certification Matcher on Nth Dimension Academy!\n\nName: ${formData.name || 'Aspiring Student'}\nRecommended Exam: ${selectedBackground.recommendedCourse} (${selectedBackground.courseName})\nGoal: ${selectedTimeline.label}\n\nI would like to discuss batch timings, course fees, and study roadmaps.`
  );
  const whatsappUrl = `https://wa.me/916304980314?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#080d1a] border border-[#ffd700]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-xs font-semibold text-[#ffd700] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2-Minute Certification Matcher</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Find Your Optimal Microsoft Exam Pathway
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
            Reverse-engineered recommendations guided by MCT Navakanth Reddy Dumpa.
          </p>
          
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === i 
                    ? 'w-8 bg-hyper-drive-blue shadow-[0_0_10px_#00f0ff]' 
                    : step > i 
                    ? 'w-4 bg-emerald-400' 
                    : 'w-4 bg-white/10'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Current Background */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cosmic-gold text-center">
              Step 1: Select Your Current Background & Skillset
            </h3>
            <div className="grid grid-cols-1 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {BACKGROUND_OPTIONS.map((opt) => {
                const isSelected = selectedBackground.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBackground(opt)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-hyper-drive-blue bg-hyper-drive-blue/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm md:text-base">{opt.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] font-mono font-bold">
                        {opt.recommendedCourse}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-hyper-drive-blue text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Goal & Timeline */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cosmic-gold text-center">
              Step 2: What is your target timeline?
            </h3>
            <div className="space-y-3">
              {TIMELINE_OPTIONS.map((time) => {
                const isSelected = selectedTimeline.id === time.id;
                return (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTimeline(time)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-hyper-drive-blue bg-hyper-drive-blue/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold text-white text-sm md:text-base">{time.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium">
                <Award className="w-4 h-4 text-[#ffd700]" />
                <span>Selected Focus: {selectedBackground.recommendedCourse} &mdash; {selectedBackground.courseName}</span>
              </div>
              <p>MCT-led syllabus covers 100% official Microsoft learning objectives with live architecture labs.</p>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-full border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-hyper-drive-blue text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all cursor-pointer"
              >
                <span>View My Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pathway Reveal & Lead Capture */}
        {step === 3 && (
          <div className="space-y-6">
            {!submitted ? (
              <>
                {/* Result Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#ffd700]/10 via-black/60 to-[#00f0ff]/10 border border-[#ffd700]/30 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ffd700] font-bold">
                      Your Matched Certification
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      98% Fit Score
                    </span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mt-2">
                    {selectedBackground.recommendedCourse}: {selectedBackground.courseName}
                  </h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    Designed for your background as a <strong>{selectedBackground.title}</strong> with a goal timeline of <strong>{selectedTimeline.label}</strong>.
                  </p>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Unlock Your Custom Study Blueprint &amp; 1-on-1 MCT Strategy
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Enter your contact details to receive syllabus modules, curated practice questions, and batch dates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rahul Sharma" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-hyper-drive-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp / Phone *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 9876543210" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-hyper-drive-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Work / Personal Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:border-hyper-drive-blue focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#f59e0b] text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:shadow-[0_0_35px_rgba(255,215,0,0.6)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Generating Blueprint...' : 'Get Instant Blueprint & Strategy Call'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-white">
                  Blueprint Generated Successfully!
                </h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Your personalized pathway for <strong>{selectedBackground.recommendedCourse}</strong> has been routed to our admissions desk.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-[#ffd700]/20 max-w-md mx-auto text-left space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2 text-[#ffd700] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>What happens next:</span>
                  </div>
                  <p>&bull; Navakanth Sir (MCT) or a senior coordinator will connect with you via WhatsApp ({formData.phone}).</p>
                  <p>&bull; You will receive curated exam dumps breakdown and lecture schedules.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                  <a
                    href={selectedBackground.atlasUrl}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Explore {selectedBackground.recommendedCourse} Learning Atlas</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
