import React, { useState } from 'react';
import { Share2, PlusCircle, Navigation, PackageCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RegistrationModal from './RegistrationModal';

export default function ResourcesModule() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const feed = [
    { id: 1, type: 'donation', user: 'Rahul K.', item: '50 Fresh Meals (Roti, Dal)', location: 'Mumbai Central', time: '10 mins ago', urgent: false },
    { id: 2, type: 'request', user: 'Annamaya NGO', item: 'Winter Blankets Needed', location: 'Pune Sector 4', time: '1 hr ago', urgent: true },
    { id: 3, type: 'donation', user: 'Sneha M.', item: 'Class 10 NCERT Books', location: 'Navi Mumbai', time: '3 hrs ago', urgent: false },
    { id: 4, type: 'request', user: 'Local Shelter', item: 'Baby Clothes & Formula', location: 'Dadar West', time: '5 hrs ago', urgent: true },
  ];

  const filteredFeed = activeTab === 'all' ? feed : feed.filter(f => f.type === activeTab);

  return (
    <div className="resources-workspace" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        
        {/* Header Dashboard Area */}
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <Share2 color="var(--color-success)" size={36}/> {t('resEx')}
            </h1>
            <p style={{color: 'var(--color-text-muted)'}}>{t('resExDesc')}</p>
          </div>
          <div style={{display: 'flex', gap: '16px'}}>
            <button 
              className="btn btn-secondary pulse-button" 
              style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)'}}
              onClick={() => { setModalTitle(t('requestHelp')); setIsModalOpen(true); }}
            >
              <AlertCircle size={18}/> {t('requestHelp')}
            </button>
            <button 
              className="btn btn-primary" 
              style={{background: 'var(--color-success)', color: '#000', boxShadow: '0 4px 15px rgba(0, 230, 118, 0.4)'}}
              onClick={() => { setModalTitle(t('donateItem')); setIsModalOpen(true); }}
            >
              <PlusCircle size={18}/> {t('donateItem')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px'}}>
          <button className={`glass-pill ${activeTab === 'all' ? 'active' : ''}`} onClick={()=>setActiveTab('all')} style={activeTab === 'all' ? {background: 'var(--color-success)', color: '#000'} : {}}>
            {t('liveFeed')}
          </button>
          <button className={`glass-pill ${activeTab === 'donation' ? 'active' : ''}`} onClick={()=>setActiveTab('donation')} style={activeTab === 'donation' ? {background: 'var(--color-success)', color: '#000'} : {}}>
            {t('resources')}
          </button>
          <button className={`glass-pill ${activeTab === 'request' ? 'active' : ''}`} onClick={()=>setActiveTab('request')} style={activeTab === 'request' ? {background: 'var(--color-success)', color: '#000'} : {}}>
            {t('requestHelp')}
          </button>
        </div>

        {/* Live Feed Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px'}}>
          {filteredFeed.map(post => (
            <div key={post.id} className="glass-panel animate-fade-in-up" style={{padding: '24px', borderLeft: post.type === 'request' ? '4px solid var(--color-primary)' : '4px solid var(--color-success)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                <span className="badge" style={{background: post.type === 'request' ? 'rgba(255, 23, 68, 0.2)' : 'rgba(0, 230, 118, 0.2)', color: post.type === 'request' ? 'var(--color-primary)' : 'var(--color-success)', fontSize: '0.75rem'}}>
                   {post.type === 'request' ? t('request').toUpperCase() : t('donation').toUpperCase()}
                </span>
                <span style={{color: 'var(--color-text-muted)', fontSize: '0.8rem'}}>{post.time.includes('mins') ? `${post.time.split(' ')[0]} ${t('minsAgo')}` : post.time.includes('hr ago') ? `1 ${t('hrAgo')}` : `${post.time.split(' ')[0]} ${t('hrsAgo')}`}</span>
              </div>
              <h3 style={{fontSize: '1.4rem', marginBottom: '8px'}}>{post.item}</h3>
              <p style={{color: 'var(--color-text-muted)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem'}}>
                <Navigation size={14} /> {post.location} • {post.user}
              </p>
              
              {post.type === 'donation' ? (
                <button 
                  className="btn btn-secondary" 
                  style={{width: '100%', borderColor: 'var(--color-success)', color: 'var(--color-success)'}}
                  onClick={() => { setModalTitle(`${t('claimResource')}: ${post.item}`); setIsModalOpen(true); }}
                >
                  <PackageCheck size={18}/> {t('claimResource')}
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{width: '100%'}}
                  onClick={() => { setModalTitle(`${t('iCanHelp')}: ${post.item}`); setIsModalOpen(true); }}
                >
                  <PlusCircle size={18}/> {t('iCanHelp')}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        subtitle={t('specifyShare')}
        moduleType="resources"
      />
    </div>
  );
}

