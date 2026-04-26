import React, { useState } from 'react';
import { ShieldCheck, Star, UserCheck, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function TrustModule() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const ngos = [
    { id: 1, name: 'Annamaya Foundation', status: 'Verified', rating: 4.8, helps: '4,500', verifiedOn: 'BlockChain / Standard' },
    { id: 2, name: 'EduTech NGO India', status: 'Verified', rating: 4.9, helps: '1,200', verifiedOn: 'Govt Registry' },
    { id: 3, name: 'Local Shelter (Dadar)', status: 'Pending Review', rating: 3.5, helps: '200', verifiedOn: 'In Progress' }
  ];

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(to right, rgba(0, 240, 255, 0.1), transparent)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                <ShieldCheck color="#00F0FF" size={36}/> {t('trustSafety')}
              </h1>
              <p style={{color: 'var(--color-text-muted)'}}>{t('coreExSub')}</p>
            </div>
            <button 
              className="btn btn-primary" 
              style={{background: 'var(--color-accent)', color: '#000'}}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18}/> {t('registerNgo')}
            </button>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px'}}>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center'}}>
            <h3 style={{fontSize: '2.5rem', color: '#00F0FF', fontWeight: 800}}>98%</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>{t('verificationStatus')}</p>
          </div>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center', transitionDelay: '0.1s'}}>
            <h3 style={{fontSize: '2.5rem', color: '#00F0FF', fontWeight: 800}}>AI</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>{t('spamGuard')}</p>
          </div>
          <div className="glass-panel animate-fade-in-up" style={{padding: '24px', textAlign: 'center', transitionDelay: '0.2s'}}>
            <h3 style={{fontSize: '2.5rem', color: '#00F0FF', fontWeight: 800}}>+12k</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>{t('safeHandouts')}</p>
          </div>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}><UserCheck style={{marginRight: '8px'}}/> {t('donorNetwork')}</h2>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {ngos.map(ngo => (
            <div key={ngo.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{fontSize: '1.4rem', fontWeight: 700}}>{ngo.name}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '24px', marginTop: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem'}}>
                  <span style={{color: ngo.status === 'Verified' ? 'var(--color-success)' : 'var(--color-warning)', fontWeight: 'bold'}}>
                     {ngo.status === 'Verified' ? `✔️ ${t('verified')}` : `⏳ ${t('pending')}`}
                  </span>
                  <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Star size={14} fill="gold" color="gold"/> {ngo.rating}/5.0</span>
                  <span>{t('impacted')}: {ngo.helps}</span>
                </div>
              </div>
              <button 
                className="btn btn-secondary"
                style={{padding: '10px 20px', fontSize: '0.9rem'}}
                onClick={() => alert(`Transparency Report: ${ngo.name}`)}
              >
                {t('viewAudit')}
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={t('ngoVerifApp')}
        subtitle={t('ngoVerifDesc')}
        moduleType="trust"
      />
    </div>
  );
}
