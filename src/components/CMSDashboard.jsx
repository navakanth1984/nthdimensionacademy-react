import React, { useState } from 'react';
import { X, Lock, Save, Plus, Trash2, Sparkles } from 'lucide-react';

export default function CMSDashboard({ isOpen, onClose, contentData, onSaveContent }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Local copy of editable content data
  const [hero, setHero] = useState(contentData?.hero || { title: '', subtitle: '', splineEmbedUrl: '' });
  const [about, setAbout] = useState(contentData?.about || { summary1: '', summary2: '' });
  const [experience, setExperience] = useState(contentData?.experience || []);
  const [achievements, setAchievements] = useState(contentData?.achievements || []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      // Validate credentials by testing a post request with the password
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: contentData }) // send current data back as check
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const err = await response.json();
        setAuthError(err.error || 'Invalid password.');
      }
    } catch (error) {
      setAuthError('Connection failed.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updatedData = { hero, about, experience, achievements };
    
    const success = await onSaveContent(password, updatedData);
    setIsSaving(false);
    
    if (success) {
      alert('Website synced successfully to MongoDB Atlas!');
    } else {
      alert('Failed to save. Check your connection or password.');
    }
  };

  const handleAddExperience = () => {
    setExperience(prev => [
      ...prev,
      { role: 'New Role', company: 'Company Name', duration: '2026', desc: 'Describe your duties...' }
    ]);
  };

  const handleRemoveExperience = (index) => {
    setExperience(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    setExperience(prev => 
      prev.map((exp, idx) => idx === index ? { ...exp, [field]: value } : exp)
    );
  };

  const handleAchievementChange = (index, field, value) => {
    setAchievements(prev => 
      prev.map((ach, idx) => idx === index ? { ...ach, [field]: value } : ach)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[1000] w-full max-w-[550px] bg-[#0a0f19]/98 border-l border-cosmic-gold/25 shadow-2xl flex flex-col backdrop-blur-md">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cosmic-gold" />
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">CMS Console</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
          <X className="h-6 w-6" />
        </button>
      </div>

      {!isAuthenticated ? (
        /* Login Screen */
        <div className="flex-1 flex flex-col justify-center px-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-cosmic-gold/10 border border-cosmic-gold/30 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-5 w-5 text-cosmic-gold" />
            </div>
            <h3 className="text-lg font-semibold text-white">Enter Admin Access</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Please enter your Nth Dimension CMS password to authenticate access to MongoDB.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto w-full">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full text-sm bg-black/40 border border-cosmic-gold/30 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-hyper-drive-blue focus:shadow-[0_0_10px_#00f0ff30]"
              required
            />
            {authError && <p className="text-xs text-red-400 text-center">{authError}</p>}
            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold text-black font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.35)] transition-all cursor-pointer"
            >
              Verify Login
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Edit Dashboard */
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          
          {/* Section 1: Hero */}
          <div className="space-y-4 border-b border-white/5 pb-6">
            <h3 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">Hero Section</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">Headline</label>
                <input 
                  type="text" 
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-hyper-drive-blue"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">Subtitle</label>
                <textarea 
                  rows={2}
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-hyper-drive-blue"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">Spline 3D Embed URL (Optional)</label>
                <input 
                  type="text" 
                  value={hero.splineEmbedUrl || ''}
                  onChange={(e) => setHero({ ...hero, splineEmbedUrl: e.target.value })}
                  placeholder="e.g. https://my.spline.design/crystal-..."
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-hyper-drive-blue"
                />
              </div>
            </div>
          </div>

          {/* Section 2: About / Summary */}
          <div className="space-y-4 border-b border-white/5 pb-6">
            <h3 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">About Summary</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">Paragraph 1</label>
                <textarea 
                  rows={3}
                  value={about.summary1}
                  onChange={(e) => setAbout({ ...about, summary1: e.target.value })}
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-hyper-drive-blue"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">Paragraph 2</label>
                <textarea 
                  rows={3}
                  value={about.summary2}
                  onChange={(e) => setAbout({ ...about, summary2: e.target.value })}
                  className="w-full text-xs bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-hyper-drive-blue"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Career Timeline */}
          <div className="space-y-4 border-b border-white/5 pb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">Career Timeline</h3>
              <button 
                onClick={handleAddExperience}
                className="flex items-center gap-1 text-[10px] font-bold uppercase px-3 py-1 rounded bg-hyper-drive-blue/10 border border-hyper-drive-blue/30 text-hyper-drive-blue hover:bg-hyper-drive-blue hover:text-black cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3 relative">
                  <button 
                    onClick={() => handleRemoveExperience(idx)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider">Role</label>
                      <input 
                        type="text" 
                        value={exp.role} 
                        onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                        className="w-full text-xs bg-black/50 border border-white/10 rounded p-1.5 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider">Company / Date</label>
                      <input 
                        type="text" 
                        value={exp.company} 
                        onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                        className="w-full text-xs bg-black/50 border border-white/10 rounded p-1.5 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider block">Description</label>
                    <textarea 
                      rows={2}
                      value={exp.desc} 
                      onChange={(e) => handleExperienceChange(idx, 'desc', e.target.value)}
                      className="w-full text-xs bg-black/50 border border-white/10 rounded p-1.5 text-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Achievements */}
          <div className="space-y-4 pb-6">
            <h3 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">Key Achievements</h3>
            <div className="space-y-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                  <div>
                    <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider">Achievement Title</label>
                    <input 
                      type="text" 
                      value={ach.title} 
                      onChange={(e) => handleAchievementChange(idx, 'title', e.target.value)}
                      className="w-full text-xs bg-black/50 border border-white/10 rounded p-1.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-gray-400 font-bold tracking-wider block">Description</label>
                    <textarea 
                      rows={2}
                      value={ach.desc} 
                      onChange={(e) => handleAchievementChange(idx, 'desc', e.target.value)}
                      className="w-full text-xs bg-black/50 border border-white/10 rounded p-1.5 text-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3 rounded-xl bg-hyper-drive-blue text-black font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save & Sync to DB'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
