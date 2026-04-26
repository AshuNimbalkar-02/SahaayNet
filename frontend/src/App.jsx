import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import FunctionNav from './components/FunctionNav';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import ResourcesModule from './components/ResourcesModule';
import TrustModule from './components/TrustModule';
import EducationModule from './components/EducationModule';
import VolunteerModule from './components/VolunteerModule';
import BloodModule from './components/BloodModule';
import Login from './components/Login';
import LiveMapPlaceholder from './components/LiveMapPlaceholder';
import FAQ from './components/FAQ';
import KindnessTicker from './components/KindnessTicker';
import AnimalAidModule from './components/AnimalAidModule';
import MuskanModule from './components/MuskanModule';
import ParyavaranModule from './components/ParyavaranModule';
import ImpactModule from './components/ImpactModule';

function Overview({ userName }) {
  const { t } = useLanguage();
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const saved = JSON.parse(localStorage.getItem('sahaay_participations') || '[]');
      setParticipations(saved);
    };
    loadData();
    window.addEventListener('participationUpdate', loadData);
    return () => window.removeEventListener('participationUpdate', loadData);
  }, []);

  return (
    <section className="container animate-fade-in-up" style={{ padding: '40px 0', minHeight: '100vh' }}>
      {/* Welcome Hero */}
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '32px', marginBottom: '40px', border: '1px solid rgba(255, 74, 87, 0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', fontWeight: 800 }}>
            {t('welcomeBack')}, <span className="gradient-text">{userName || t('hero')}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', marginBottom: '24px' }}>
            {t('heroDesc')}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="glass-pill" style={{ color: 'var(--color-success)' }}>● 1,240 {t('volunteer')} Tasks</div>
            <div className="glass-pill" style={{ color: 'var(--color-accent)' }}>● 85 {t('trustSafety')} NGOs Nearby</div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(40px)' }}></div>
      </div>

      {/* Vision & Mission Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel animate-fade-in-up" style={{ padding: '30px', borderLeft: '4px solid var(--color-accent)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-accent)' }}>{t('visionTitle')}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{t('visionDesc')}</p>
        </div>
        <div className="glass-panel animate-fade-in-up" style={{ padding: '30px', borderLeft: '4px solid var(--color-primary)', transitionDelay: '0.1s' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-primary)' }}>{t('missionTitle')}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{t('missionDesc')}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Impact Stats */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 className="gradient-text" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{t('impactTitle')}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{t('impactDesc')}</p>
          <div style={{ marginTop: '20px', fontSize: '2rem', fontWeight: 800 }}>{participations.length}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{t('totalParticipations')}</div>
        </div>

        {/* Status Tracker */}
        <div className="glass-panel" style={{ padding: '30px', gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>{t('liveFeed')} • {t('myActivities')}</h3>

          {participations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
              {t('noActivitiesYet')}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {participations.slice(0, 3).map(p => (
                <div key={p.id} className="activity-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{p.date}</p>
                  </div>
                  <span className="badge" style={{
                    background: p.status.includes('Pending') ? 'rgba(255, 171, 0, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                    color: p.status.includes('Pending') ? '#FFAB00' : '#00F0FF'
                  }}>
                    {p.status.includes('Pending') ? t('pendingVerif') : p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <FAQ />
      </div>
    </section>
  );
}

function AIAssistantPage() {
  const { t } = useLanguage();
  return (
    <div className="container animate-fade-in-up" style={{ padding: '40px 0', minHeight: '80vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '10px' }}>{t('aiHelp')}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '30px' }}>{t('coreExSub')}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto 40px' }}>
            <span className="glass-pill" style={{ cursor: 'pointer' }} onClick={() => alert(`Feature: Say "${t('voiceEx1')}"`)}>"{t('voiceEx1')}"</span>
            <span className="glass-pill" style={{ cursor: 'pointer' }} onClick={() => alert(`Feature: Say "${t('voiceEx2')}"`)}>"{t('voiceEx2')}"</span>
            <span className="glass-pill" style={{ cursor: 'pointer' }} onClick={() => alert(`Feature: Say "${t('voiceEx3')}"`)}>"{t('voiceEx3')}"</span>
            <span className="glass-pill" style={{ cursor: 'pointer' }} onClick={() => alert(`Feature: Say "${t('voiceEx4')}"`)}>"{t('voiceEx4')}"</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <VoiceAssistant forceOpen={true} hideToggle={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('sahaay_userName') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState(() => localStorage.getItem('sahaay_activeModule') || 'dashboard');

  const handleLogout = () => {
    localStorage.removeItem('sahaay_isLoggedIn');
    localStorage.removeItem('sahaay_userName');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={(name) => {
      localStorage.setItem('sahaay_userName', name);
      setUserName(name);
      setActiveModule('dashboard');
      setIsLoggedIn(true);
    }} />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Overview userName={userName} />;
      case 'resources': return <ResourcesModule />;
      case 'education': return <EducationModule />;
      case 'blood': return <BloodModule />;
      case 'volunteer': return <VolunteerModule />;
      case 'trust': return <TrustModule />;
      case 'animal-aid': return <AnimalAidModule />;
      case 'muskan': return <MuskanModule />;
      case 'paryavaran': return <ParyavaranModule />;
      case 'livemap': return <LiveMapPlaceholder />;
      case 'ai-assistant': return <AIAssistantPage />;
      case 'impact': return <ImpactModule />;
      default: return <Overview userName={userName} />;
    }
  };

  return (
    <BrowserRouter>
      <div className="app-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
        {/* Sidebar Navigation */}
        <FunctionNav
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          onLogout={handleLogout}
        />

        {/* Main Content Viewport */}
        <div className="main-viewport" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          <Navbar onLogout={handleLogout} />

          <main style={{ flex: 1, position: 'relative' }}>
            {renderActiveModule()}
          </main>

          <Footer />
        </div>

        {/* Voice Assistant ONLY available in AI Help section now */}
        <KindnessTicker />
      </div>
    </BrowserRouter>
  );
}

export default App;
