import React, { useState } from 'react';
import { Users, Navigation, CalendarCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function VolunteerModule() {
  const { t } = useLanguage();
  const [availableNow, setAvailableNow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const missions = [
    { id: 1, title: 'Food Distribution Drive', org: 'Local Shelter', location: 'Dadar West', date: 'Tomorrow, 10 AM', req: '5 People' },
    { id: 2, title: 'IT Setup for School', org: 'EduTech NGO', location: 'Navi Mumbai', date: 'Sat, 11 AM', req: '2 People (Tech Skills)' },
    { id: 3, title: 'Medical Camp Coordination', org: 'CareFoundation', location: 'Pune Sector 4', date: 'Next week', req: '10 People' }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <Users color="#A020F0" size={36}/> {t('volNet')}
            </h1>
            <p style={{color: 'var(--color-text-muted)'}}>{t('volNetDesc')}</p>
          </div>
          
          <div className="glass-panel" style={{padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', background: availableNow ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 255, 255, 0.05)', border: availableNow ? '1px solid var(--color-success)' : '1px solid rgba(255,255,255,0.05)'}}>
            <span style={{fontWeight: 'bold', fontSize: '1.2rem', color: availableNow ? 'var(--color-success)' : 'var(--color-text-muted)'}}>
              {t('availableNow')} {availableNow ? '🟢' : '🔴'}
            </span>
            <label className="switch" style={{cursor: 'pointer', background: availableNow ? 'var(--color-success)' : '#444', border: 'none', borderRadius: '40px', width: '60px', height: '30px', position: 'relative', display: 'inline-block'}}>
              <input type="checkbox" checked={availableNow} onChange={() => setAvailableNow(!availableNow)} style={{opacity: 0, width: 0, height: 0}} />
              <span style={{position: 'absolute', top: '2px', left: availableNow ? '32px' : '2px', width: '26px', height: '26px', background: '#fff', borderRadius: '50%', transition: '0.3s'}}></span>
            </label>
          </div>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>{t('activeVolunteerMissions')}</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px'}}>
          {missions.map(mission => (
            <div key={mission.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #A020F0'}}>
              <div>
                <h3 style={{fontSize: '1.4rem'}}>{mission.title}</h3>
                <p style={{color: 'var(--color-text-muted)', marginTop: '8px', fontSize: '0.9rem'}}><Navigation size={14}/> {mission.location} | {mission.org}</p>
                <div style={{display: 'flex', gap: '16px', marginTop: '12px'}}>
                  <span className="glass-pill" style={{fontSize: '0.8rem'}}><CalendarCheck size={14}/> {mission.date}</span>
                  <span className="glass-pill" style={{fontSize: '0.8rem'}}><Users size={14}/> {t('required')}: {mission.req}</span>
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{background: '#A020F0', color: '#fff', boxShadow: '0 4px 15px rgba(160,32,240,0.4)', padding: '12px 24px'}}
                onClick={() => {
                  setModalTitle(`${t('iCanHelp')}: ${mission.title}`);
                  setIsModalOpen(true);
                }}
              >
                {t('joinNow')}
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('volunteerRegisterDesc')}
        moduleType="volunteer"
      />
    </div>
  );
}

