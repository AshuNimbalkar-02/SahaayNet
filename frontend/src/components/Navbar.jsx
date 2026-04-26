import React, { useState } from 'react';
import { Heart, Globe, Menu, X, ShieldCheck, Bell, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const languages = ['English', 'Hindi', 'Marathi', 'Panjabi', 'Bhojapuri', 'Mallyalam'];

  const notifications = [
    { id: 1, text: "🚨 Emergency: O+ Blood needed at City Hospital", time: "2m ago", type: "urgent" },
    { id: 2, text: "🐾 Animal rescue completed near your location", time: "15m ago", type: "success" },
    { id: 3, text: "🌿 New tree plantation drive starting tomorrow", time: "1h ago", type: "info" }
  ];

  return (
    <nav className="navbar" style={{zIndex: 1000}}>
      <div className="navbar-container">
        {/* Brand shows ONLY on mobile topbar */}
        <div className="navbar-brand mobile-only">
          <Heart fill="#FF4A57" color="#FF4A57" size={24} className="pulse-button" />
          <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Sahaay<span style={{color: 'var(--color-primary)'}}>Net</span></span>
        </div>

        {/* Global Horizontal Language Bar */}
        <div className="language-bar desktop-only">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe size={16} color="var(--color-accent)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '10px' }}>{t('translateLabel')}</span>
            <div className="lang-pills">
               {languages.map(l => (
                 <button 
                  key={l} 
                  className={`lang-pill-btn ${language === l ? 'active' : ''}`}
                  onClick={() => setLanguage(l)}
                 >
                   {l}
                 </button>
               ))}
            </div>
          </div>
        </div>

        <div className="navbar-actions" style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          {/* Notification Center */}
          <div style={{position: 'relative'}}>
            <button 
              className="notif-btn" 
              style={{background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center'}}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={22} color={showNotifications ? 'var(--color-accent)' : 'currentColor'} />
              <span style={{position: 'absolute', top: '-4px', right: '-4px', background: 'var(--color-primary)', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #000'}}></span>
            </button>

            {showNotifications && (
              <div className="glass-panel animate-fade-in-up" style={{position: 'absolute', top: '50px', right: '0', width: '320px', padding: '20px', zIndex: 2000, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                  <h4 style={{fontSize: '1rem', margin: 0}}>{t('updates')}</h4>
                  <span className="badge" style={{background: 'var(--color-primary)', fontSize: '0.65rem'}}>3 {t('newLabel')}</span>
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {notifications.map(n => (
                    <div key={n.id} style={{padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', fontSize: '0.85rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)'}} className="notif-item">
                      <p style={{margin: 0, marginBottom: '6px', lineHeight: '1.4'}}>{n.text}</p>
                      <span style={{opacity: 0.4, fontSize: '0.75rem'}}>{n.time}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="btn btn-secondary" 
                  style={{width: '100%', marginTop: '16px', fontSize: '0.8rem', padding: '10px'}} 
                  onClick={() => setShowNotifications(false)}
                >
                  {t('markRead')}
                </button>
              </div>
            )}
          </div>

          <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            <ShieldCheck size={16} />
            {t('joinNetwork')}
          </button>
          
          <button className="mobile-toggle" onClick={toggleMenu} style={{background: 'none', border: 'none', color: 'var(--color-text)'}}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu animate-fade-in-up">
           <div style={{ padding: '0 8px' }}>
             <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>{t('chooseLanguage')}</p>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
               {languages.map(l => (
                 <button 
                  key={l} 
                  className={`lang-pill-btn ${language === l ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(l);
                    setIsOpen(false);
                  }}
                 >
                   {l}
                 </button>
               ))}
             </div>
           </div>
           
           <div style={{ padding: '20px 8px' }}>
             <button 
              onClick={onLogout}
              className="btn btn-secondary" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FF4A57' }}
             >
               <LogOut size={16} />
               {t('logoutSession')}
             </button>
           </div>
        </div>
      )}
    </nav>
  );
}
