import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, MessageSquare, Send, X, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './VoiceAssistant.css';

export default function VoiceAssistant({ forceOpen = false, hideToggle = false }) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initial greeting in current language
    setMessages([{ role: 'ai', text: t('aiGreeting') }]);
  }, [language]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = inputText.toLowerCase().trim();
    if (!text || isTyping) return;
    
    // Add user message
    const userMsg = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Logic Engine
    let responseKey = 'aiAnalyzing';

    // Simple Intent Detection
    if (text.match(/animal|dog|cat|rescue|पशु|प्राणी|ਜਾਨਵਰ/i)) {
      responseKey = 'aiAnimal';
    } else if (text.match(/old age|elder|muskan|orphanage|child|वृद्ध|अनाथ|ਬੱਚਾ/i)) {
      responseKey = 'aiMuskan';
    } else if (text.match(/blood|रक्त|रक्तदान|ਖੂਨ/i)) {
      responseKey = 'aiBlood';
    } else if (text.match(/clean|tree|paryavaran|plant|पर्यावरण|सफाई|ਸਫਾਈ/i)) {
      responseKey = 'aiEco';
    } else if (text.match(/food|clothes|resource|भोजन|खाना|कपड़े|ਭੋਜਨ/i)) {
      responseKey = 'aiResource';
    }

    // Simulate AI thinking and typing
    setTimeout(() => {
      setIsTyping(false);
      const response = t(responseKey);
      const newMsg = { role: 'ai', text: response };
      
      // If resource intent, generate QR
      if (responseKey === 'aiResource') {
        newMsg.qrData = "SahaayNet-Resource-Token-" + Date.now();
      }
      
      setMessages(prev => [...prev, newMsg]);
    }, 1500);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API. Please try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    const langMap = {
      English: 'en-US', Hindi: 'hi-IN', Marathi: 'mr-IN', Panjabi: 'pa-IN', Bhojapuri: 'hi-IN', Mallyalam: 'ml-IN'
    };
    
    recognition.lang = langMap[language] || 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => setInputText(event.results[0][0].transcript);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <>
      <div className={`ai-chat-panel glass-panel ${isOpen ? 'open' : ''} ${forceOpen ? 'relative-panel' : ''}`} 
           style={forceOpen ? { position: 'relative', width: '100%', height: '550px', bottom: 'auto', right: 'auto', display: 'flex' } : {}}>
        
        <div className="chat-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Sparkles color="var(--color-accent)" size={20} className="float-anim"/>
            <h3 style={{margin: 0}}>{t('aiHelp')}</h3>
          </div>
          {!hideToggle && <button onClick={() => setIsOpen(false)} style={{color: 'var(--color-text-muted)', background: 'none', border: 'none'}}><X size={20}/></button>}
        </div>
        
        <div className="chat-body" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role} animate-fade-in-up`} 
                 style={{ 
                   marginBottom: '12px', 
                   padding: '12px 16px', 
                   borderRadius: '16px', 
                   maxWidth: '85%',
                   alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                   background: msg.role === 'user' ? 'linear-gradient(135deg, var(--color-primary), #FF7b85)' : 'rgba(255,255,255,0.08)',
                   color: '#fff',
                   fontSize: '0.95rem',
                   boxShadow: msg.role === 'user' ? '0 4px 15px rgba(255,74,87,0.2)' : 'none',
                   marginLeft: msg.role === 'user' ? 'auto' : '0'
                 }}>
              {msg.text}
              {msg.qrData && (
                <div style={{ marginTop: '12px', padding: '12px', background: '#fff', borderRadius: '12px', textAlign: 'center' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${msg.qrData}`} 
                    alt="Resource QR Code" 
                    style={{ width: '120px', height: '120px' }}
                  />
                  <p style={{ color: '#000', fontSize: '0.7rem', marginTop: '8px', fontWeight: 'bold' }}>SCAN TO CLAIM</p>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message ai typing animate-fade-in-up" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', width: 'fit-content' }}>
              <MoreHorizontal size={24} className="pulse-button" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer" style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className={`chat-mic ${isListening ? 'listening' : ''}`} 
            onClick={startVoiceRecognition}
            style={{ 
              background: isListening ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)', 
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: '0.3s'
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="chat-input"
            style={{ 
              flex: 1, 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '12px 16px', 
              borderRadius: '24px', 
              color: '#fff',
              outline: 'none'
            }}
          />
          
          <button 
            className="chat-send" 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            style={{ 
              background: 'var(--color-accent)', 
              color: '#000', 
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: inputText.trim() ? 1 : 0.5
            }}
          >
            <Send size={18}/>
          </button>
        </div>
      </div>

      {!isOpen && !hideToggle && (
        <div className="voice-assistant" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000 }}>
          <button 
            className="voice-btn pulse-button"
            onClick={() => setIsOpen(true)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              color: '#fff',
              boxShadow: '0 8px 32px rgba(255, 74, 87, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MessageSquare size={28} />
          </button>
        </div>
      )}
    </>
  );
}
