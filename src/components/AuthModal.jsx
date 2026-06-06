import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Smartphone, Check, Loader2 } from 'lucide-react';
import { auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function AuthModal({ isOpen, onClose }) {
  const [authMode, setAuthMode] = useState('email'); // 'email' or 'mobile'
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // onClose(); // optionally close after successful login
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    setLoading(true);
    try {
      // Try to sign in first
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Nexus Rejoined! Welcome back", userCredential.user.email);
      onClose();
    } catch (error) {
      // If sign in fails, try to create account (or check if it's just wrong password)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("Nexus Joined! Welcome", userCredential.user.email);
          onClose();
        } catch (createError) {
          console.error("Error creating account:", createError);
          alert("Authentication failed: " + createError.message);
        }
      } else {
        console.error("Error signing in:", error);
        alert("Authentication failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-[450px] rounded-3xl p-10 border border-[#00f0ff]/30 relative bg-[#05070f]/95 text-center">
        <button 
          onClick={onClose} 
          aria-label="Close Authentication Modal"
          className="absolute top-5 right-5 bg-transparent border-none text-slate-400 text-2xl cursor-pointer hover:text-white transition-colors"
        >
          <X />
        </button>
        
        <h2 className="text-3xl font-bold mb-2 text-white">
          {user ? 'Welcome Back' : 'Sign In / Register'}
        </h2>
        
        {user ? (
          <div className="flex flex-col items-center gap-4 py-8">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full border-2 border-[#00f0ff]" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#00f0ff]/20 border-2 border-[#00f0ff] flex items-center justify-center text-2xl font-bold text-[#00f0ff]">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-center">
              <p className="text-white font-bold text-lg">{user.displayName || 'Voyager'}</p>
              <p className="text-slate-400 text-sm">{user.email || user.phoneNumber}</p>
            </div>
            <button 
              onClick={handleSignOut}
              className="mt-6 w-full bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white font-bold rounded-xl py-3 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-400 mb-8 text-sm">Create an account or log in to continue.</p>
            
            <button 
              id="google-signin-btn" 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mb-6 bg-white text-black flex items-center justify-center gap-3 font-bold rounded-xl py-3 px-4 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5" />
              )}
              {loading ? 'Authenticating...' : 'Continue with Google'}
            </button>

            <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
              <div className="h-[1px] bg-slate-500 flex-1"></div>
              <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">Or</span>
              <div className="h-[1px] bg-slate-500 flex-1"></div>
            </div>

            {authMode === 'email' ? (
              <div id="email-login-fields" className="flex flex-col gap-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com" 
                      className="w-full bg-black/40 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00f0ff] transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-black/40 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00f0ff] transition-colors" 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div id="mobile-login-fields" className="flex flex-col gap-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Mobile Number</label>
                  <div className="relative flex gap-2">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" placeholder="+91 99999 99999" className="flex-1 bg-black/40 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00f0ff] transition-colors" />
                    <button className="bg-transparent border border-slate-600 rounded-lg px-4 text-sm font-medium hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors cursor-pointer">
                      Send OTP
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Verification Code</label>
                  <input type="text" placeholder="6-digit code" className="w-full bg-black/40 border border-slate-700 rounded-lg py-3 px-4 text-white text-center tracking-[0.5em] focus:outline-none focus:border-[#00f0ff] transition-colors" />
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 mt-6 text-left">
              <button 
                onClick={() => setAgreed(!agreed)}
                className={`mt-1 w-4 h-4 rounded border flex items-center justify-center shrink-0 cursor-pointer ${agreed ? 'bg-[#00f0ff] border-[#00f0ff]' : 'border-slate-500 bg-transparent'}`}
              >
                {agreed && <Check className="w-3 h-3 text-black" />}
              </button>
              <span className="text-xs text-slate-400 leading-relaxed">
                By creating an account, you agree to the <a href="/terms.html" className="text-[#00f0ff] hover:underline" target="_blank" rel="noreferrer">Terms & Conditions</a> and <a href="/privacy.html" className="text-[#00f0ff] hover:underline" target="_blank" rel="noreferrer">Privacy Policy</a>.
              </span>
            </div>

            <button 
              onClick={authMode === 'email' ? handleEmailAuth : undefined}
              disabled={loading}
              className="w-full mt-6 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold rounded-xl py-3 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Continue'}
            </button>

            <button 
              onClick={() => setAuthMode(authMode === 'email' ? 'mobile' : 'email')}
              className="mt-6 bg-transparent border-none text-slate-400 text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
            >
              {authMode === 'email' ? 'Or continue with Mobile' : 'Or continue with Email'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
