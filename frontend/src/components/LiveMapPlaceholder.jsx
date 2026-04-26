import React, { useState } from 'react';
import { MapPin, Navigation, Info, X, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LiveMap.css';

export default function LiveMapPlaceholder() {
  const { t } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState(null);

  const points = [
    { id: 1, type: 'urgent', title: 'O+ Blood Needed', location: 'City Hospital, Building A', distance: '1.2 km', time: '15m ago', color: 'var(--color-primary)', top: '30%', left: '40%' },
    { id: 2, type: 'resource', title: '50 Meals Available', location: 'Sunshine Cafe, Sector 4', distance: '0.8 km', time: '5m ago', color: 'var(--color-success)', top: '60%', left: '70%' },
    { id: 3, type: 'volunteer', title: 'Water Rescue Support', location: 'Dadar Creek Side', distance: '3.5 km', time: '30m ago', color: '#A020F0', top: '45%', left: '55%' },
    { id: 4, type: 'animal', title: 'Injured Dog Sighted', location: 'Street 11, Andheri', distance: '2.1 km', time: '2m ago', color: '#ff6b6b', top: '20%', left: '25%' }
  ];

  return (
    <div className="module-workspace animate-fade-in" style={{paddingTop: '60px', minHeight: '100vh'}}>
      <div className="container">
        <div className="module-header glass-panel" style={{padding: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2 style={{fontSize: '2.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <MapPin color="var(--color-primary)" size={36}/> {t('liveMap')}
            </h2>
            <p style={{color: 'var(--color-text-muted)'}}>{t('liveMapSub')}</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Scanning 5km radius for live coordination signals...')}>
             <Navigation size={18}/> {t('findNearby')}
          </button>
        </div>
        
        <div className="map-container glass-panel" style={{height: '600px', borderRadius: '32px', position: 'relative', overflow: 'hidden', background: '#0a0b14', border: '1px solid rgba(255,255,255,0.05)'}}>
          
          {/* Simulated Map Background */}
          <div className="map-grid-overlay"></div>

          {/* Interactive Pins */}
          {points.map(point => (
            <div 
              key={point.id} 
              className={`pulse-pin-interactive ${selectedPoint?.id === point.id ? 'active' : ''}`}
              style={{top: point.top, left: point.left, position: 'absolute', cursor: 'pointer', zIndex: 10}}
              onClick={() => setSelectedPoint(point)}
            >
              <div className="pin-marker" style={{background: point.color}}>
                 {point.type === 'urgent' ? <AlertTriangle size={14} color="#fff"/> : <MapPin size={14} color="#fff"/>}
              </div>
              <div className="pin-ripple" style={{borderColor: point.color}}></div>
            </div>
          ))}

          {/* Detail Card Overlay */}
          {selectedPoint && (
            <div className="map-detail-card glass-panel animate-fade-in-up" style={{position: 'absolute', bottom: '24px', left: '24px', width: '350px', zIndex: 100, padding: '24px', borderLeft: `6px solid ${selectedPoint.color}`}}>
              <button className="close-details" onClick={() => setSelectedPoint(null)} style={{position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer'}}><X size={20}/></button>
              
              <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px'}}>
                 <span className="badge" style={{background: 'rgba(255,255,255,0.05)', color: selectedPoint.color, fontSize: '0.7rem', fontWeight: 800}}>{selectedPoint.type.toUpperCase()}</span>
                 <span style={{fontSize: '0.8rem', color: 'var(--color-text-muted)'}}><Clock size={12}/> {selectedPoint.time}</span>
              </div>
              
              <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>{selectedPoint.title}</h3>
              <p style={{fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '16px'}}><MapPin size={14} color={selectedPoint.color}/> {selectedPoint.location}</p>
              
              <div style={{display: 'flex', gap: '12px'}}>
                <button className="btn btn-primary" style={{flex: 1, background: selectedPoint.color, color: '#fff', border: 'none'}} onClick={() => alert(`Starting voice GPS to ${selectedPoint.location}...`)}>
                  <Navigation size={16}/> Go
                </button>
                <button className="btn btn-secondary" style={{flex: 1}} onClick={() => alert('Opening full coordination history...')}>
                  <Info size={16}/> Details
                </button>
              </div>
              
              <p style={{marginTop: '16px', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center'}}>Est. Distance: {selectedPoint.distance}</p>
            </div>
          )}

          {/* Map Legend */}
          <div className="map-legend-pills" style={{position: 'absolute', top: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10}}>
             <div className="glass-pill" style={{background: 'rgba(0,0,0,0.4)'}}><span style={{color: 'var(--color-primary)'}}>●</span> {t('urgentMatching')}</div>
             <div className="glass-pill" style={{background: 'rgba(0,0,0,0.4)'}}><span style={{color: 'var(--color-success)'}}>●</span> {t('resources')}</div>
             <div className="glass-pill" style={{background: 'rgba(0,0,0,0.4)'}}><span style={{color: '#A020F0'}}>●</span> {t('volunteer')}</div>
             <div className="glass-pill" style={{background: 'rgba(0,0,0,0.4)'}}><span style={{color: '#ff6b6b'}}>●</span> {t('animalAid')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
