import React, { useState } from 'react';
import { BookOpen, MapPin, GraduationCap, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function EducationModule() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const classes = [
    { id: 1, type: 'teach', subject: 'English Communication', tutor: 'Prof. Sharma', location: 'Online', time: 'Mon, Wed 6 PM' },
    { id: 2, type: 'learn', subject: 'Basic Mathematics', student: 'Rohan (Class 8)', location: 'Pune Sector 4', time: 'Flexible' },
    { id: 3, type: 'teach', subject: 'Programming (Python)', tutor: 'Tech Club', location: 'Online', time: 'Weekends' },
    { id: 4, type: 'learn', subject: 'Digital Literacy', student: 'Local NGO Group', location: 'Mumbai Central', time: 'Evenings' }
  ];

  const filtered = activeTab === 'all' ? classes : classes.filter(c => c.type === activeTab);

  return (
    <div className="module-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px'}}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <BookOpen color="var(--color-accent)" size={36}/> {t('eduEx')}
          </h1>
          <p style={{color: 'var(--color-text-muted)'}}>{t('eduExDesc')}</p>
        </div>

        <div style={{display: 'flex', gap: '16px', marginBottom: '32px'}}>
          <button className={`glass-pill ${activeTab === 'all' ? 'active' : ''}`} onClick={()=>setActiveTab('all')} style={activeTab === 'all' ? {background: 'var(--color-accent)', color: '#000'} : {}}>{t('platform')}</button>
          <button className={`glass-pill ${activeTab === 'teach' ? 'active' : ''}`} onClick={()=>setActiveTab('teach')} style={activeTab === 'teach' ? {background: 'var(--color-accent)', color: '#000'} : {}}>{t('teachForFree')}</button>
          <button className={`glass-pill ${activeTab === 'learn' ? 'active' : ''}`} onClick={()=>setActiveTab('learn')} style={activeTab === 'learn' ? {background: 'var(--color-accent)', color: '#000'} : {}}>{t('learnForFree')}</button>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px'}}>
          {filtered.map(cls => (
            <div key={cls.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', borderTop: '4px solid var(--color-accent)'}}>
              <span className="badge" style={{background: 'rgba(0, 240, 255, 0.1)', color: 'var(--color-accent)', fontSize: '0.75rem'}}>
                {cls.type === 'teach' ? t('teachForFree').toUpperCase() : t('learnForFree').toUpperCase()}
              </span>
              <h3 style={{fontSize: '1.4rem', marginTop: '16px', marginBottom: '8px'}}>{cls.subject}</h3>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem'}}><MapPin size={14}/> {cls.location.toLowerCase().includes('online') ? t('online') : cls.location} | {cls.time.toLowerCase().includes('flexible') ? t('flexible') : cls.time.toLowerCase().includes('weekends') ? t('weekends') : cls.time}</p>
              <p style={{marginTop: '12px', fontWeight: '500', fontSize: '0.9rem'}}><Users size={14}/> {cls.type === 'teach' ? cls.tutor : cls.student}</p>
              <button 
                className="btn btn-secondary" 
                style={{width: '100%', borderColor: 'var(--color-accent)', color: 'var(--color-accent)', marginTop: '20px'}}
                onClick={() => {
                  setModalTitle(`${cls.type === 'teach' ? t('joinClass') : t('volunteerToTeach')}: ${cls.subject}`);
                  setIsModalOpen(true);
                }}
              >
                {cls.type === 'teach' ? t('enrollNow') : t('supportStudent')}
              </button>
            </div>
          ))}
        </div>

      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        subtitle={t('contactInfoDesc')}
        moduleType="education"
      />
    </div>
  );
}

