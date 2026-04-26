import React, { useState } from 'react';
import { TreePine, Trash2, Sprout, MapPin, Award, Search, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function ParyavaranModule() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const drives = [
    { id: 1, type: 'cleanup', title: 'Beach Cleanup Drive', location: 'Juhu Beach, Mumbai', time: 'Sunday 7:00 AM', status: 'Join 45 others', icon: <Trash2 color="#ffcc00"/> },
    { id: 2, type: 'plantation', title: '1000 Sapling Challenge', location: 'Aarey Forest', time: 'Monday 9:00 AM', status: 'Need 20 more hands', icon: <Sprout color="#4caf50"/> },
    { id: 3, type: 'waste', title: 'E-Waste Collection Drive', location: 'Kandivali Society', time: 'Saturday 10:00 AM', status: 'Drop-off only', icon: <Trash2 color="#2196f3"/> },
    { id: 4, type: 'plantation', title: 'Urban Garden Initiative', location: 'Worli Sea Face', time: 'Tuesday 4:00 PM', status: 'Open to all', icon: <Sprout color="#4caf50"/> }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), transparent)'}}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <TreePine color="#4caf50" size={36}/> {t('paryavaran')}
          </h1>
          <p style={{color: 'var(--color-text-muted)'}}>{t('paryavaranDesc')}</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px'}}>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center'}}>
            <Sprout size={48} color="#4caf50" style={{marginBottom: '16px'}}/>
            <h3 style={{fontSize: '1.2rem', marginBottom: '16px'}}>{t('treePlantation')}</h3>
            <button className="btn btn-primary" onClick={() => { setModalTitle(t('treePlantation')); setIsModalOpen(true); }} style={{background: '#4caf50', border: 'none'}}>{t('joinDrive')}</button>
          </div>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center', transitionDelay: '0.1s'}}>
            <Trash2 size={48} color="#ffcc00" style={{marginBottom: '16px'}}/>
            <h3 style={{fontSize: '1.2rem', marginBottom: '16px'}}>{t('cleanlinessDrive')}</h3>
            <button className="btn btn-primary" onClick={() => { setModalTitle(t('reportWaste')); setIsModalOpen(true); }} style={{background: '#ffcc00', border: 'none', color: '#000'}}>{t('reportSpot')}</button>
          </div>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center', transitionDelay: '0.2s'}}>
            <Award size={48} color="#2196f3" style={{marginBottom: '16px'}}/>
            <h3 style={{fontSize: '1.2rem', marginBottom: '8px'}}>{t('ecoHero')}</h3>
            <p style={{fontSize: '2rem', fontWeight: 800, color: '#2196f3'}}>450 XP</p>
          </div>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>🌍 {t('liveFeed')} <span style={{color: '#4caf50'}}>{t('activeDrives')}</span></h2>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {drives.map(drive => (
            <div key={drive.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${drive.type === 'cleanup' ? '#ffcc00' : '#4caf50'}`}}>
              <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '16px'}}>
                  {drive.icon}
                </div>
                <div>
                  <h3 style={{fontSize: '1.4rem'}}>{drive.title}</h3>
                  <div style={{display: 'flex', gap: '16px', marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>
                    <span><MapPin size={14}/> {drive.location}</span>
                    <span>🕒 {drive.time}</span>
                  </div>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <p style={{fontSize: '0.8rem', color: drive.type === 'cleanup' ? '#ffcc00' : '#4caf50', fontWeight: 'bold', marginBottom: '8px'}}>{drive.status}</p>
                <button className="btn btn-secondary" onClick={() => { setModalTitle(`${t('joining')}: ${drive.title}`); setIsModalOpen(true); }}>{t('participate')}</button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('earthNeedsHelp')}
        moduleType="paryavaran"
      />
    </div>
  );
}
