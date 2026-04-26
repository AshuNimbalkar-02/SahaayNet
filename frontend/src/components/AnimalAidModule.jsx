import React, { useState } from 'react';
import { PawPrint, MapPin, Heart, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function AnimalAidModule() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const activeAlerts = [
    { id: 1, type: 'Rescue', subject: 'Injured Dog (Hit & Run)', location: 'Dadar Station', status: 'URGENT', time: '15m ago' },
    { id: 2, type: 'Foster', subject: '3 Kittens need temporary home', location: 'Versova', status: 'High', time: '1h ago' },
    { id: 3, type: 'Feeding', subject: 'Weekly Food Drive (40 Dogs)', location: 'Bandra West', status: 'Scheduled', time: 'Tonight' }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), transparent)'}}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <PawPrint color="#ff6b6b" size={36}/> {t('animalAid')}
          </h1>
          <p style={{color: 'var(--color-text-muted)'}}>{t('animalAidDesc')}</p>
        </div>

        <div style={{display: 'flex', gap: '24px', marginBottom: '40px'}}>
          <button 
            className="btn btn-primary pulse-button" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', background: '#ff6b6b', boxShadow: '0 4px 20px rgba(255,107,107,0.4)', borderRadius: '16px'}}
            onClick={() => {
              setModalTitle(t('reportInjury'));
              setIsModalOpen(true);
            }}
          >
             🚨 {t('reportInjury').toUpperCase()}
          </button>
          <button 
            className="btn btn-secondary" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', borderColor: '#ff6b6b', color: '#ff6b6b', borderRadius: '16px'}}
            onClick={() => {
              setModalTitle(t('fosterCare'));
              setIsModalOpen(true);
            }}
          >
             🏠 {t('fosterCare').toUpperCase()}
          </button>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>🐾 {t('rescueAlert')} <span style={{color: '#ff6b6b'}}>{t('liveFeed')}</span></h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {activeAlerts.map(alert => (
            <div key={alert.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: alert.status === 'URGENT' ? '6px solid #ff6b6b' : '6px solid #ffcc00'}}>
              <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <div style={{background: 'rgba(255,107,107,0.1)', padding: '12px', borderRadius: '16px', color: '#ff6b6b'}}>
                  {alert.type === 'Rescue' ? <AlertTriangle size={32}/> : <Heart size={32}/>}
                </div>
                <div>
                  <h3 style={{fontSize: '1.4rem', fontWeight: 700}}>{alert.subject}</h3>
                  <p style={{color: 'var(--color-text-muted)', marginTop: '4px', fontSize: '0.9rem'}}>
                    <MapPin size={14}/> {alert.location} | {alert.time.includes('mins') ? `${alert.time.split(' ')[0]} ${t('minsAgo')}` : alert.time.includes('hr ago') ? `1 ${t('hrAgo')}` : `${alert.time.split(' ')[0]} ${t('hrsAgo')}`}
                  </p>
                </div>
              </div>
              <button 
                className="btn btn-primary"
                style={{padding: '12px 32px', background: '#ff6b6b'}}
                onClick={() => {
                  setModalTitle(`${t('iCanHelp')}: ${alert.subject}`);
                  setIsModalOpen(true);
                }}
              >
                {t('respond')}
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('animalConnectDesc')}
        moduleType="animal"
      />
    </div>
  );
}
