import React from 'react';
import { Heart, Link, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Heart fill="#FF4A57" color="#FF4A57" size={28} className="brand-icon" />
            <span className="brand-text">Sahaay<span className="text-primary">Net</span></span>
            <p className="mt-4 text-muted">{t('footerBrandDesc')}</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>{t('coreEx').split(' ')[1] || t('coreEx')}</h4>
              <a href="#">{t('resEx')}</a>
              <a href="#">{t('education')}</a>
              <a href="#">{t('bloodBank')}</a>
              <a href="#">{t('liveMap')}</a>
            </div>
            <div className="link-group">
              <h4>{t('platform')}</h4>
              <a href="#">{t('trustSafety')}</a>
              <a href="#">{t('donorNetwork')}</a>
              <a href="#">{t('impactTitle')}</a>
            </div>
            <div className="link-group">
              <h4>{t('connect')}</h4>
              <div className="social-links">
                <a href="#"><Link size={20} /></a>
                <a href="#"><MessageCircle size={20} /></a>
                <a href="#"><Mail size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 SahaayNet. SDG Alignment: {language === 'English' ? 'Zero Hunger | Good Health | Quality Education' : language === 'Hindi' ? 'भुखमरी मुक्ति | स्वास्थ्य | गुणवत्तापूर्ण शिक्षा' : 'SahaayNet Humanitarian Ecosystem'}.</p>
        </div>
      </div>
    </footer>
  );
}
