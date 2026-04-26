import React from 'react';
import { PackageOpen, BookOpen, Users, Droplet, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import './Services.css';

export default function ServicesGrid() {
  const { t } = useLanguage();

  const services = [
    {
      id: "resources",
      title: t('resEx') || "Resource Exchange",
      desc: t('resExDesc') || "Donate or request food, clothes, books.",
      icon: <PackageOpen size={32} color="var(--color-success)" />,
      color: "var(--color-success)"
    },
    {
      id: "volunteer",
      title: t('volNet') || "Volunteer Network",
      desc: t('volNetDesc') || "Register your skills.",
      icon: <Users size={32} color="#A020F0" />,
      color: "#A020F0"
    },
    {
      id: "education",
      title: t('eduEx') || "Education Exchange",
      desc: t('eduExDesc') || "Zero-cost knowledge sharing.",
      icon: <BookOpen size={32} color="var(--color-accent)" />,
      color: "var(--color-accent)"
    },
    {
      id: "livemap",
      title: t('liveMap') || "Live Help Map",
      desc: t('liveMapSub') || "Real-time visual coordination.",
      icon: <MapPin size={32} color="#FFAB00" />,
      color: "#FFAB00"
    },
    {
      id: "blood",
      title: t('bloodDon') || "Blood Donation",
      desc: t('bloodDonDesc') || "Smart emergency matching.",
      icon: <Droplet size={32} color="var(--color-primary)" />,
      color: "var(--color-primary)"
    },
    {
      id: "trust",
      title: "Trust & Safety (NGOs)",
      desc: "NGO Verification, user ratings, and proof of help tracking.",
      icon: <ShieldCheck size={32} color="#00F0FF" />,
      color: "#00F0FF"
    },
    {
      id: "ai-assistant",
      title: "AI Assistant",
      desc: "Natural language voice assistant matching.",
      icon: <Sparkles size={32} color="var(--color-success)" />,
      color: "var(--color-success)",
      to: "/assistant"
    }
  ];

  return (
    <section className="services-section container" id="services">
      <div className="section-header">
        <h2>{t('coreEx')?.split(' ')[0] || "Core"} <span className="gradient-text">{t('coreEx')?.split(' ').slice(1).join(' ') || "Exchanges"}</span></h2>
        <p>{t('coreExSub')}</p>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div className="service-card glass-panel" key={service.id} id={service.id}>
            <div className="icon-wrapper" style={{boxShadow: `0 0 20px ${service.color}40`, border: `1px solid ${service.color}80`}}>
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <Link to={service.to || `/module/${service.id}`} className="btn btn-secondary mt-auto" style={{width: '100%', marginTop: 'auto', textAlign: 'center'}}>
              {t('accessModule') || "Access Module"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
