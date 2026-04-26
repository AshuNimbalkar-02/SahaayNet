import React, { useState, useEffect } from 'react';
import { Award, Clock, CheckCircle, AlertCircle, FileText, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ImpactModule() {
  const { t } = useLanguage();
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sahaay_participations') || '[]');
    setParticipations(data);
  }, []);

  return (
    <div className="module-workspace animate-fade-in" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', background: 'linear-gradient(rgba(0, 240, 255, 0.1), transparent)'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px'}}>
            <Award color="#00F0FF" size={42}/> {t('impactTitle')}
          </h1>
          <p style={{color: 'var(--color-text-muted)', fontSize: '1.2rem'}}>{t('impactDesc')}</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px'}}>
           <div className="glass-panel" style={{padding: '24px', textAlign: 'center'}}>
              <h4 style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>{t('totalMissions')}</h4>
              <div style={{fontSize: '3rem', fontWeight: 800, color: 'var(--color-accent)'}}>{participations.length}</div>
           </div>
           <div className="glass-panel" style={{padding: '24px', textAlign: 'center'}}>
              <h4 style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>{t('impactScore')}</h4>
              <div style={{fontSize: '3rem', fontWeight: 800, color: 'var(--color-success)'}}>{participations.length * 10} XP</div>
           </div>
           <div className="glass-panel" style={{padding: '24px', textAlign: 'center'}}>
              <h4 style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>{t('certificates')}</h4>
              <div style={{fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)'}}>0</div>
           </div>
        </div>

        <h2 style={{fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <Clock size={24}/> {t('regTimeline')}
        </h2>

        {participations.length === 0 ? (
          <div className="glass-panel" style={{padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)'}}>
            <FileText size={48} style={{opacity: 0.2, marginBottom: '16px'}}/>
            <p>{t('noRegFound')}</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {participations.map(p => (
              <div key={p.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', borderLeft: `6px solid ${p.status.includes('Pending') ? '#FFAB00' : '#00F0FF'}`}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px'}}>
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                      <h3 style={{fontSize: '1.4rem', margin: 0}}>{p.title}</h3>
                      <span className="badge" style={{background: 'rgba(255,255,255,0.05)', color: 'var(--color-accent)'}}>{p.type.toUpperCase()}</span>
                    </div>
                    <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px'}}>{t('registeredOn')} {p.date}</p>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px'}}>
                       <div>
                         <label style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block'}}>{t('submittedBy')}</label>
                         <span style={{fontSize: '0.9rem'}}><User size={12}/> {p.details.fullName}</span>
                       </div>
                       {p.details.bloodGroup && (
                         <div>
                           <label style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block'}}>{t('bloodGroup')}</label>
                           <span style={{fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold'}}>{p.details.bloodGroup}</span>
                         </div>
                       )}
                       {p.details.animalType && (
                         <div>
                           <label style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block'}}>{t('animalType')}</label>
                           <span style={{fontSize: '0.9rem'}}>{p.details.animalType}</span>
                         </div>
                       )}
                       {p.details.saplings && (
                         <div>
                           <label style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block'}}>{t('saplingsPledged')}</label>
                           <span style={{fontSize: '0.9rem'}}>{p.details.saplings}</span>
                         </div>
                       )}
                    </div>
                  </div>

                  <div style={{textAlign: 'right'}}>
                    <div style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '12px 20px', 
                      borderRadius: '30px', 
                      background: p.status.includes('Pending') ? 'rgba(255, 171, 0, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                      color: p.status.includes('Pending') ? '#FFAB00' : '#00F0FF',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: `1px solid ${p.status.includes('Pending') ? 'rgba(255, 171, 0, 0.2)' : 'rgba(0, 240, 255, 0.2)'}`
                    }}>
                      {p.status.includes('Pending') ? <AlertCircle size={18}/> : <CheckCircle size={18}/>}
                      {p.status.includes('Pending') ? t('pendingVerif') : p.status}
                    </div>
                    <p style={{fontSize: '0.75rem', opacity: 0.5, marginTop: '8px'}}>ID: #SN-{p.id.toString().slice(-4)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
