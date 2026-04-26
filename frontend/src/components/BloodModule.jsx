import React, { useState } from 'react';
import { Droplet, Activity, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function BloodModule() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const alerts = [
    { id: 1, bloodGroup: 'O+', location: 'City Hospital, Andheri', urgency: 'CRITICAL', time: '10 mins ago', distance: '2.4 km' },
    { id: 2, bloodGroup: 'A-', location: 'Ruby Hall Clinic, Pune', urgency: 'HIGH', time: '1 hr ago', distance: '5.1 km' },
    { id: 3, bloodGroup: 'B+', location: 'Tata Memorial, Parel', urgency: 'MEDIUM', time: '3 hrs ago', distance: '8.0 km' }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(rgba(255, 74, 87, 0.1), transparent)'}}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <Droplet fill="var(--color-primary)" color="var(--color-primary)" size={36}/> {t('bloodBank')}
          </h1>
          <p style={{color: 'var(--color-text-muted)'}}>{t('bloodDonDesc')}</p>
        </div>

        <div style={{display: 'flex', gap: '24px', marginBottom: '40px'}}>
          <button 
            className="btn btn-primary pulse-button" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', boxShadow: '0 4px 20px rgba(255,0,0,0.4)', borderRadius: '16px'}}
            onClick={() => {
              setModalTitle(t('btnNeed'));
              setIsModalOpen(true);
            }}
          >
             🚨 {t('btnNeed').toUpperCase()}
          </button>
          <button 
            className="btn btn-secondary" 
            style={{padding: '28px', flex: 1, fontSize: '1.2rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)', borderRadius: '16px'}}
            onClick={() => {
              setModalTitle(t('btnHelp'));
              setIsModalOpen(true);
            }}
          >
             🩸 {t('btnHelp').toUpperCase()}
          </button>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>🚨 {t('urgentMatching')} <span style={{color: 'var(--color-primary)'}}>{t('liveFeed')}</span></h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {alerts.map(alert => (
            <div key={alert.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: alert.urgency === 'CRITICAL' ? '6px solid #FF1744' : '6px solid #FFAB00'}}>
              <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
                <div style={{background: 'rgba(255,0,0,0.1)', padding: '16px', borderRadius: '20px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.8rem', width: '90px', height: '90px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid rgba(255, 74, 87, 0.3)'}}>
                  {alert.bloodGroup}
                </div>
                <div>
                  <h3 style={{fontSize: '1.4rem', fontWeight: 700}}>{alert.location}</h3>
                  <p style={{color: 'var(--color-text-muted)', marginTop: '4px', fontSize: '0.9rem'}}><MapPin size={14}/> {alert.distance} {t('away')} | {alert.time.includes('mins') ? `${alert.time.split(' ')[0]} ${t('minsAgo')}` : alert.time.includes('hr ago') ? `1 ${t('hrAgo')}` : `${alert.time.split(' ')[0]} ${t('hrsAgo')}`}</p>
                </div>
              </div>
              <button 
                className="btn btn-primary"
                style={{padding: '12px 32px'}}
                onClick={() => {
                  setModalTitle(`${t('btnHelp')}: ${alert.bloodGroup}`);
                  setIsModalOpen(true);
                }}
              >
                {t('connect')}
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('bloodVerifyDesc')}
        moduleType="blood"
      />
    </div>
  );
}

