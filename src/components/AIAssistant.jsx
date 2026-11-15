import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Mic, X, Minus, Sparkles, Volume2 } from 'lucide-react';
import knowledgeBankData from '../data/knowledge_bank.json';

export default function AIAssistant({ isOpen, setIsOpen, triggerQuery, setTriggerQuery, onOpenMatcher }) {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'system',
      text: 'Greetings, Voyager. I am your Academy Assistant for the N<span class="nth-style">TH</span> Dimension Academy. How can I assist your data journey today?'
    }
  ]);
  const messagesEndRef = useRef(null);
  const streamingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up any streaming interval on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (triggerQuery) {
      const { userText, apiPrompt, systemText } = triggerQuery;
      
      if (systemText) {
        setMessages(prev => [...prev, { id: Date.now() + '-system-trig', sender: 'system', text: systemText }]);
      } 
      
      if (userText && apiPrompt) {
        setMessages(prev => [...prev, { id: Date.now() + '-user', sender: 'user', text: userText }]);
        callNIM(apiPrompt);
      }
      
      if (setTriggerQuery) setTriggerQuery(null);
    }
  }, [triggerQuery]);

  // Offline Knowledge Bank query matcher
  const matchKnowledgeBank = (text) => {
    const lowerText = (text || '').toLowerCase();
    const prompts = knowledgeBankData?.prompts || [];

    for (const item of prompts) {
      if (item.keywords && item.keywords.some(kw => lowerText.includes(kw.toLowerCase()))) {
        return item.response;
      }
    }

    return knowledgeBankData?.default || 
      "Welcome to Nth Dimension Academy! You can explore our core Microsoft Fabric & Azure certifications (DP-700, DP-600, DP-750, DP-800, AI-103, DP-900), take our 2-Minute Certification Matcher, or chat directly with MCT Navakanth Reddy on WhatsApp (+91-6304980314).";
  };

  // Stream local knowledge bank response with smooth typing effect
  const streamLocalResponse = (text, systemMsgId) => {
    setIsThinking(false);
    const targetText = matchKnowledgeBank(text);

    // Split text into words/tokens
    const words = targetText.split(' ');
    let currentIdx = 0;
    let accumulated = '';

    if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);

    streamingIntervalRef.current = setInterval(() => {
      // Chunk 2-3 words per tick for smooth, responsive reading
      const nextChunk = words.slice(currentIdx, currentIdx + 3).join(' ') + (currentIdx + 3 < words.length ? ' ' : '');
      accumulated += nextChunk;
      currentIdx += 3;

      setMessages(prev =>
        prev.map(m => m.id === systemMsgId ? { ...m, text: accumulated } : m)
      );

      if (currentIdx >= words.length) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
    }, 28);
  };

  const callNIM = async (text) => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
      streamingIntervalRef.current = null;
    }

    setIsThinking(true);
    const systemMsgId = Date.now() + '-system';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: 'en' })
      });

      // If serverless endpoint is missing, returned error or fallback flag
      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      // Add system streaming placeholder once connection is verified
      setMessages(prev => [...prev, { id: systemMsgId, sender: 'system', text: '' }]);
      setIsThinking(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                fullResponse += data.content;
                setMessages(prev => 
                  prev.map(m => m.id === systemMsgId ? { ...m, text: fullResponse } : m)
                );
              }
            } catch (e) {
              // Ignore parse errors on malformed lines
            }
          }
        }
      }

      // If for any reason the stream ended with no content, engage offline fallback
      if (!fullResponse.trim()) {
        streamLocalResponse(text, systemMsgId);
      }

    } catch (error) {
      console.warn('API Chat unavailable, engaging offline Knowledge Bank fallback:', error);
      // Ensure the placeholder exists and stream the localized knowledge bank response
      setMessages(prev => {
        const exists = prev.some(m => m.id === systemMsgId);
        if (exists) return prev;
        return [...prev, { id: systemMsgId, sender: 'system', text: '' }];
      });
      streamLocalResponse(text, systemMsgId);
    }
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (text) {
      setMessages(prev => [...prev, { id: Date.now() + '-user', sender: 'user', text }]);
      setInputText('');
      callNIM(text);
    }
  };

  const handleQuickAction = (question) => {
    setMessages(prev => [...prev, { id: Date.now() + '-user', sender: 'user', text: question }]);
    callNIM(question);
  };

  // Browser-native dual-speaker speech synthesis with zero external API dependencies
  const synthesizeVoice = () => {
    if (!window.speechSynthesis) return;

    // Toggle speech off if currently active
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const lastSystemMsg = [...messages].reverse().find(m => m.sender === 'system' && m.text);
    if (!lastSystemMsg || !lastSystemMsg.text) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    // Strip HTML tags and markdown symbols
    const cleanText = lastSystemMsg.text
      .replace(/<[^>]+>/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    if (!cleanText) {
      setIsSpeaking(false);
      return;
    }

    // Check for dual-speaker Socratic tags
    const parts = cleanText.split(/(\[GURU\]:|\[AURA\]:)/);
    const utterances = [];

    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i += 2) {
        const tag = parts[i];
        const seg = (parts[i + 1] || '').trim();
        if (!seg) continue;

        const isGuru = tag.includes('[GURU]');
        const utt = new SpeechSynthesisUtterance(seg);
        if (isGuru) {
          utt.pitch = 0.88; // Authoritative Guru
          utt.rate = 0.98;
        } else {
          utt.pitch = 1.18; // Tactical Aura
          utt.rate = 1.04;
        }
        utterances.push(utt);
      }
    } else {
      const utt = new SpeechSynthesisUtterance(cleanText);
      utt.pitch = 0.95;
      utt.rate = 1.0;
      utterances.push(utt);
    }

    if (utterances.length === 0) {
      setIsSpeaking(false);
      return;
    }

    // Set end handler on last utterance
    utterances[utterances.length - 1].onend = () => setIsSpeaking(false);
    utterances[utterances.length - 1].onerror = () => setIsSpeaking(false);

    for (const u of utterances) {
      window.speechSynthesis.speak(u);
    }
  };

  const formatMessageText = (text) => {
    if (!text) return '';
    // Replace standard URLs with styled anchor tags, excluding trailing punctuation
    let formatted = text.replace(
      /(https?:\/\/[^\s<]+[^.,:;?!()[\]{}'"`\s<])/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-hyper-drive-blue underline hover:text-[#00f0ff] transition-colors break-all" style="color: #00f0ff; text-decoration: underline;">$1</a>'
    );
    // Render markdown bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formatted.replace(/\n/g, '<br>');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full border border-hyper-drive-blue bg-[#00f0ff]/5 text-hyper-drive-blue shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105 hover:bg-[#00f0ff]/10 transition-all duration-300 font-medium tracking-wide uppercase text-xs cursor-pointer"
        >
          <MessageSquare className="h-5 w-5 fill-none" />
          <span>Academy Assistant</span>
        </button>
      )}

      {/* Slide-in Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] sm:max-w-[420px] h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-dimension-purple/35 bg-[#0a0f19]/95 backdrop-blur-md">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#0a0f19]/90 border-b border-dimension-purple/35 shadow-[0_0_15px_rgba(138,43,226,0.25)]">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/Merge_these_images_and_create_202605052035.jpeg" 
                alt="Guide" 
                className="h-9 w-9 rounded-full object-cover border border-cosmic-gold/50" 
              />
              <div>
                <h4 className="text-sm font-bold text-cosmic-gold">Academy Assistant</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Online | N<span className="nth-style">TH</span> Dimension Academy</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minus className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#05070f]/80">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div 
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-br-none shadow-md' 
                      : 'bg-slate-900/80 border border-white/5 text-gray-200 rounded-bl-none shadow-sm'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
                />
              </div>
            ))}
            
            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-cosmic-gold font-light animate-pulse select-none">
                <Sparkles className="h-4 w-4 text-cosmic-gold" />
                <span>The Assistant is consulting the Nth Dimension...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggested Action Pills */}
          <div className="px-3 py-2 bg-[#060a14] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                if (onOpenMatcher) {
                  setIsOpen(false);
                  onOpenMatcher();
                }
              }}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>🎯 2-Min Matcher</span>
            </button>
            <a
              href="https://wa.me/916304980314?text=Hi%20Navakanth%20Sir%2C%20I%20have%20a%20question%20regarding%20Microsoft%20Fabric%20and%20Azure%20training%20at%20Nth%20Dimension%20Academy."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>💬 WhatsApp MCT</span>
            </a>
            <button
              onClick={() => handleQuickAction('What is the difference between DP-600 and DP-700?')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition cursor-pointer shrink-0"
            >
              ⚡ DP-600 vs DP-700
            </button>
            <button
              onClick={() => handleQuickAction('Tell me about AI-103 Azure AI Foundry Masterclass')}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 transition cursor-pointer shrink-0"
            >
              🤖 AI-103 Foundry
            </button>
          </div>

          {/* Chat Input Area */}
          <div className="p-3 bg-[#0a0f19]/95 border-t border-dimension-purple/35 flex items-center gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Fabric, DP-700, DP-600, AI-103, Azure..." 
              className="flex-1 text-sm bg-[#05070f]/50 border border-hyper-drive-blue/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-hyper-drive-blue transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isThinking || !inputText.trim()}
              className="p-2 rounded-xl bg-hyper-drive-blue/10 border border-hyper-drive-blue/30 text-hyper-drive-blue hover:bg-hyper-drive-blue hover:text-black disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-hyper-drive-blue transition-all duration-300 cursor-pointer"
              title="Send Message"
            >
              <Send className="h-4 w-4" />
            </button>
            <button 
              onClick={synthesizeVoice}
              title={isSpeaking ? "Stop Voice Synthesis" : "Speak Last Message"}
              className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                isSpeaking 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 animate-pulse' 
                  : 'bg-[#8a2be2]/10 border-[#8a2be2]/30 text-[#8a2be2] hover:bg-[#8a2be2] hover:text-white'
              }`}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          </div>

        </div>
      )}
    </>
  );
}
