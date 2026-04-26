import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './KindnessTicker.css';

export default function KindnessTicker() {
  const { t } = useLanguage();

  const events = [
    { id: 1, text: "Rahul K. donated 20 meals in Mumbai Central", time: "2m ago" },
    { id: 2, text: "Eco-Pulse: 100 Saplings planted at Aarey Forest", time: "5m ago" },
    { id: 3, text: "Muskaan: Sameer visited Silver Oaks Seniors", time: "7m ago" },
    { id: 4, text: "Cleanliness: 50kg trash removed from Juhu Beach", time: "10m ago" },
    { id: 5, text: "Animal Aid: Injured pup rescued in Bandra", time: "15m ago" },
    { id: 6, text: "NGO Annamaya fulfilled a request for 10 blankets", time: "18m ago" }
  ];

  return (
    <div className="kindness-ticker-container">
      <div className="ticker-label">
        <Sparkles size={14} className="pulse-icon" />
        <span>{t('tickerLabel')}</span>
      </div>
      <div className="ticker-content-wrapper">
        <div className="ticker-content">
          {[...events, ...events].map((event, idx) => (
            <div key={`${event.id}-${idx}`} className="ticker-item">
              <Heart size={12} fill="var(--color-primary)" color="var(--color-primary)" />
              <span className="event-text">{event.text}</span>
              <span className="event-time">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
