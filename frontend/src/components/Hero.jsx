import React from 'react';
import { ArrowRight, Activity, Users, PlusCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-blur primary-blur"></div>
      <div className="hero-blur accent-blur"></div>
      
      <div className="container hero-content">
        <div className="glass-pill float-anim hero-badge">
          <Activity size={16} color="var(--color-accent)" />
          <span>{t('liveMatch')}</span>
        </div>

        <h1 className="hero-title animate-fade-in-up">
          {t('heroTitle1')}<br />
          <span className="gradient-text">{t('heroTitle2')}</span>
        </h1>
        
        <p className="hero-subtitle animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {t('heroDesc')}
        </p>

        <div className="hero-actions animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <button className="btn btn-primary pulse-button" style={{padding: '16px 32px', fontSize: '1.1rem'}}>
            <PlusCircle size={20} /> {t('btnHelp')}
          </button>
          <button className="btn btn-secondary" style={{padding: '16px 32px', fontSize: '1.1rem'}}>
            {t('btnNeed')} <ArrowRight size={20} />
          </button>
        </div>

        <div className="hero-stats glass-panel animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="stat-item">
            <h3>12,450+</h3>
            <p>{t('resources')}</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>4,200+</h3>
            <p>{t('education')}</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="text-danger">1,890</h3>
            <p>{t('bloodBank')}</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>Verified</h3>
            <p>NGO Partners</p>
          </div>
        </div>
      </div>
    </section>
  );
}
