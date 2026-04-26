import React, { useState } from 'react';
import { Heart, Users, Calendar, MessageCircle, MapPin, Smile } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function MuskanModule() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const wishes = [
    { id: 1, type: 'elder', title: 'Storytelling & Newspaper Reading', home: 'Aashirwad Old Age Home', location: 'Borivali East', time: 'Every morning', wish: 'Someone to read and talk' },
    { id: 2, type: 'child', title: 'Math & Science Mentor', home: 'Nirmala Children Home', location: 'Navi Mumbai', time: 'Weekends 4 PM', wish: 'Help with basic homework' },
    { id: 3, type: 'elder', title: 'Walk & Conversation Partner', home: 'Silver Oaks Residency', location: 'Pune Sector 4', time: 'Evenings', wish: 'Spend 1 hour walking/talking' },
    { id: 4, type: 'child', title: 'Music/Guitar Teacher', home: 'Little Angels Ashram', location: 'Dadar West', time: 'Sundays', wish: 'Teach a new song' }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(236, 64, 122, 0.1), transparent)'}}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <Smile color="#ec407a" size={36}/> {t('muskan')}
          </h1>
          <p style={{color: 'var(--color-text-muted)'}}>{t('muskanDesc')}</p>
        </div>

        <div style={{display: 'flex', gap: '24px', marginBottom: '40px'}}>
          <button 
            className="btn btn-primary pulse-button" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', background: '#ec407a', boxShadow: '0 4px 20px rgba(236,64,122,0.4)', borderRadius: '16px', border: 'none'}}
            onClick={() => {
              setModalTitle(t('visitElderly'));
              setIsModalOpen(true);
            }}
          >
             👵 {t('visitElderly').toUpperCase()}
          </button>
          <button 
            className="btn btn-secondary" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', borderColor: '#ec407a', color: '#ec407a', borderRadius: '16px'}}
            onClick={() => {
              setModalTitle(t('mentor'));
              setIsModalOpen(true);
            }}
          >
             👦 {t('mentor').toUpperCase()}
          </button>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>💖 {t('companionship')} <span style={{color: '#ec407a'}}>{t('liveFeed')}</span></h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px'}}>
          {wishes.map(wish => (
            <div key={wish.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', borderBottom: '4px solid #ec407a'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                <span className="badge" style={{background: 'rgba(236,64,122,0.1)', color: '#ec407a', fontSize: '0.75rem'}}>
                  {wish.type === 'elder' ? t('seniorCompanionship').toUpperCase() : t('childMentorship').toUpperCase()}
                </span>
                <MessageCircle size={20} color="#ec407a" opacity={0.6}/>
              </div>
              <h3 style={{fontSize: '1.4rem', marginBottom: '8px'}}>{wish.title}</h3>
              <p style={{color: '#ec407a', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '12px'}}>"{wish.wish}"</p>
              <div style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><MapPin size={14}/> {wish.home}, {wish.location}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Calendar size={14}/> {wish.time.toLowerCase().includes('evenings') ? t('evenings') : wish.time.toLowerCase().includes('weekends') ? t('weekends') : wish.time}</div>
              </div>
              <button 
                className="btn btn-primary"
                style={{width: '100%', marginTop: '24px', background: '#ec407a', border: 'none'}}
                onClick={() => {
                  setModalTitle(`${t('iCanHelp')}: ${wish.title}`);
                  setIsModalOpen(true);
                }}
              >
                {t('fulfillWish')} 💖
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('muskanConnectDesc')}
        moduleType="muskan"
      />
    </div>
  );
}
