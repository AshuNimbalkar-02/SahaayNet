import React from 'react';
import { PackageOpen, BookOpen, Users, Droplet, MapPin, ShieldCheck, Sparkles, LayoutDashboard, Heart, PawPrint, Smile, TreePine, Award, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FunctionNav.css';

export default function FunctionNav({ activeModule, onModuleChange, onLogout }) {
  const { t } = useLanguage();

  const functions = [
    {
      id: "dashboard",
      title: t('overview'),
      icon: <LayoutDashboard size={20} />,
      color: "var(--color-primary)"
    },
    {
      id: "resources",
      title: t('resEx'),
      icon: <PackageOpen size={20} />,
      color: "var(--color-success)"
    },
    {
      id: "volunteer",
      title: t('volNet'),
      icon: <Users size={20} />,
      color: "#A020F0"
    },
    {
      id: "education",
      title: t('eduEx'),
      icon: <BookOpen size={20} />,
      color: "var(--color-accent)"
    },
    {
      id: "livemap",
      title: t('liveMap'),
      icon: <MapPin size={20} />,
      color: "#FFAB00"
    },
    {
      id: "blood",
      title: t('bloodBank'),
      icon: <Droplet size={20} />,
      color: "var(--color-primary)"
    },
    {
      id: "trust",
      title: t('trustSafety'),
      icon: <ShieldCheck size={20} />,
      color: "#00F0FF"
    },
    {
      id: "animal-aid",
      title: t('animalAid'),
      icon: <PawPrint size={20} />,
      color: "#ff6b6b"
    },
    {
      id: "muskan",
      title: t('muskan'),
      icon: <Smile size={20} />,
      color: "#ec407a"
    },
    {
      id: "paryavaran",
      title: t('paryavaran'),
      icon: <TreePine size={20} />,
      color: "#4caf50"
    },
    {
      id: "ai-assistant",
      title: t('aiHelp'),
      icon: <Sparkles size={20} />,
      color: "var(--color-success)"
    },
    {
      id: "impact",
      title: t('impactTitle'),
      icon: <Award size={20} />,
      color: "#00F0FF"
    }
  ];

  return (
    <aside className="function-nav-container">
      <div className="function-nav-wrapper">
        <div className="sidebar-header" style={{ padding: '0 16px', marginBottom: '32px' }}>
          <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Heart fill="#FF4A57" color="#FF4A57" size={32} className="brand-icon pulse-button" />
            <span className="brand-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Sahaay<span className="text-primary" style={{ color: 'var(--color-primary)' }}>Net</span></span>
          </div>
        </div>

        <ul className="function-list">
          {functions.map((func) => (
            <li key={func.id}>
              <button
                className={`function-item ${activeModule === func.id ? 'active' : ''}`}
                onClick={() => onModuleChange(func.id)}
              >
                <span className="icon-box" style={{
                  color: activeModule === func.id ? '#fff' : func.color,
                  background: activeModule === func.id ? func.color : 'rgba(255,255,255,0.03)'
                }}>
                  {func.icon}
                </span>
                <span className="function-title">{func.title}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom section of sidebar */}
        <div style={{ marginTop: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <p>📍 {t('location')}: <strong>Mumbai, IN</strong></p>
            <p>🛡️ {t('secMatch')}</p>
          </div>
          
          <button 
            onClick={onLogout}
            className="btn btn-secondary" 
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              padding: '12px',
              color: '#FF4A57',
              borderColor: 'rgba(255, 74, 87, 0.2)'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}