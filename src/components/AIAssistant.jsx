import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Mic, X, Minus, Sparkles } from 'lucide-react';

export default function AIAssistant({ isOpen, setIsOpen, messages, setMessages, triggerQuery, setTriggerQuery }) {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (triggerQuery) {
      const { userText, apiPrompt } = triggerQuery;
      // Add the user message directly to chat history
      setMessages(prev => [...prev, { id: Date.now() + '-user', sender: 'user', text: userText }]);
      // Fire callNIM with the prompt
      callNIM(apiPrompt);
      if (setTriggerQuery) setTriggerQuery(null);
    }
  }, [triggerQuery]);

  const callNIM = async (text) => {
    try {
      setIsThinking(true);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: 'en' })
      });

      // Add placeholder for system streaming message
      const systemMsgId = Date.now() + '-system';
      setMessages(prev => [...prev, { id: systemMsgId, sender: 'system', text: '' }]);

      setIsThinking(false);

      if (!response.ok) {
        throw new Error('Backend link failed.');
      }

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
                // Update specific message in state
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
    } catch (error) {
      console.error('NIM Chat Error:', error);
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now() + '-err',
        sender: 'system',
        text: 'Apologies, Voyager. The dimensional link is unstable. Please ensure the backend is running on port 8004.'
      }]);
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

  const synthesizeVoice = async () => {
    // Find the last system message to speak
    const lastSystemMsg = [...messages].reverse().find(m => m.sender === 'system');
    if (!lastSystemMsg || !lastSystemMsg.text) return;

    try {
      setMessages(prev => [...prev, {
        id: Date.now() + '-system-voice',
        sender: 'system',
        text: 'Synthesizing voice in the Nth Dimension...'
      }]);

      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lastSystemMsg.text, lang: 'te' }) // Default to Telugu as per static script
      });
      const data = await response.json();
      if (data.segments) {
        let i = 0;
        const playNext = () => {
          if (i < data.segments.length) {
            const audio = new Audio(data.segments[i].audio);
            audio.onended = playNext;
            audio.play();
            i++;
          }
        };
        playNext();
      }
    } catch (error) {
      console.error('Voice synthesis failed:', error);
    }
  };

  const formatMessageText = (text) => {
    if (!text) return '';
    // Replace standard URLs with styled anchor tags, excluding trailing punctuation
    let formatted = text.replace(
      /(https?:\/\/[^\s<]+[^.,:;?!()[\]{}'"`\s<])/g, 
      '<a href="$1" target="_blank" class="text-hyper-drive-blue underline hover:text-[#00f0ff] transition-colors break-all" style="color: #00f0ff; text-decoration: underline;">$1</a>'
    );
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
          <span>Ask Guide</span>
        </button>
      )}

      {/* Slide-in Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-dimension-purple/35 bg-[#0a0f19]/95 backdrop-blur-md">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#0a0f19]/90 border-b border-dimension-purple/35 shadow-[0_0_15px_rgba(138,43,226,0.25)]">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/Merge_these_images_and_create_202605052035.jpeg" 
                alt="Guide" 
                className="h-9 w-9 rounded-full object-cover border border-cosmic-gold/50" 
              />
              <div>
                <h4 className="text-sm font-bold text-cosmic-gold">Cosmic Guide</h4>
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
                <span>The Guide is consulting the Nth Dimension...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-3 bg-[#0a0f19]/95 border-t border-dimension-purple/35 flex items-center gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Fabric, Azure, or DP-700..." 
              className="flex-1 text-sm bg-[#05070f]/50 border border-hyper-drive-blue/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-hyper-drive-blue transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isThinking || !inputText.trim()}
              className="p-2 rounded-xl bg-hyper-drive-blue/10 border border-hyper-drive-blue/30 text-hyper-drive-blue hover:bg-hyper-drive-blue hover:text-black disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-hyper-drive-blue transition-all duration-300 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
            <button 
              onClick={synthesizeVoice}
              title="Speak Last Message (Telugu)"
              className="p-2 rounded-xl bg-[#8a2be2]/10 border border-[#8a2be2]/30 text-[#8a2be2] hover:bg-[#8a2be2] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
