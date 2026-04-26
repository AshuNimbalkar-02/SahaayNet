import React, { useState, useRef } from 'react';
import { X, CheckCircle, Package, Users, Heart, PawPrint, Smile, TreePine, Droplet, BookOpen, ShieldCheck, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './RegistrationModal.css';

export default function RegistrationModal({ isOpen, onClose, title, subtitle, moduleType = 'general' }) {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    evidence: null,
    // Category specific
    itemName: '',
    quantity: '',
    skill: '',
    subject: '',
    animalType: '',
    condition: '',
    wishType: '',
    saplings: '',
    bloodGroup: '',
    age: '',
    regId: '',
    website: '',
  });

  if (!isOpen) return null;

  // Determine if evidence is needed and if it's mandatory
  const isEvidenceRequired = ['animal'].includes(moduleType);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEvidenceRequired && !formData.evidence) {
      alert("Photo Evidence is mandatory for this module to prevent fake reports.");
      return;
    }

    // Get verified user info from session
    const userName = localStorage.getItem('sahaay_userName') || 'Anonymous';
    
    // Create participation record
    const newRecord = {
      id: Date.now(),
      type: moduleType,
      title: title,
      date: new Date().toLocaleDateString(),
      status: 'Verified Submission',
      isVerifiedIdentity: true,
      hasEvidence: !!formData.evidence,
      submittedBy: userName,
      details: formData
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('sahaay_participations') || '[]');
    localStorage.setItem('sahaay_participations', JSON.stringify([newRecord, ...existing]));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      window.dispatchEvent(new Event('participationUpdate'));
    }, 2500);
  };

  const renderModuleFields = () => {
    switch(moduleType) {
      case 'resources':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>{t('itemName')} *</label>
              <input type="text" placeholder="e.g. Rice, Clothes" className="modal-input" required onChange={e => setFormData({...formData, itemName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t('quantity')} *</label>
              <input type="text" placeholder="e.g. 5kg" className="modal-input" required onChange={e => setFormData({...formData, quantity: e.target.value})} />
            </div>
          </div>
        );
      case 'volunteer':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>{t('skill')} *</label>
              <input type="text" placeholder="e.g. Doc, IT, Cook" className="modal-input" required onChange={e => setFormData({...formData, skill: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t('hours')} *</label>
              <input type="text" placeholder="e.g. 4 hrs/week" className="modal-input" required onChange={e => setFormData({...formData, quantity: e.target.value})} />
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="form-group">
            <label>{t('education')} *</label>
            <input type="text" placeholder="e.g. Math, Coding, Guitar" className="modal-input" required onChange={e => setFormData({...formData, subject: e.target.value})} />
          </div>
        );
      case 'blood':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>{t('bloodGroup')} *</label>
              <select className="modal-input" required onChange={e => setFormData({...formData, bloodGroup: e.target.value})}>
                <option value="">{t('findNearby')}...</option>
                <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
                <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('age')} *</label>
              <input type="number" placeholder="25" className="modal-input" required onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>
        );
      case 'animal':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>{t('animalType')} *</label>
              <input type="text" placeholder="e.g. Dog, Cat" className="modal-input" required onChange={e => setFormData({...formData, animalType: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t('condition')} *</label>
              <select className="modal-input" required onChange={e => setFormData({...formData, condition: e.target.value})}>
                <option>{t('healthy')}</option>
                <option>{t('injured')}</option>
                <option>{t('sick')}</option>
              </select>
            </div>
          </div>
        );
      case 'muskan':
        return (
          <div className="form-group">
            <label>{t('spendWith')}</label>
            <select className="modal-input" required onChange={e => setFormData({...formData, wishType: e.target.value})}>
              <option>{t('seniors')}</option>
              <option>{t('children')}</option>
              <option>{t('both')}</option>
            </select>
          </div>
        );
      case 'paryavaran':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>{t('saplings')} *</label>
              <input type="number" placeholder="Number" className="modal-input" required onChange={e => setFormData({...formData, saplings: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t('participationType')} *</label>
              <select className="modal-input" required>
                <option>{t('planting')}</option>
                <option>{t('cleanlinessDrive')}</option>
                <option>{t('donationOnly')}</option>
              </select>
            </div>
          </div>
        );
      case 'trust':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Registration ID *</label>
              <input type="text" placeholder="80G / 12A ID" className="modal-input" required onChange={e => setFormData({...formData, regId: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Website / Link</label>
              <input type="text" placeholder="https://..." className="modal-input" onChange={e => setFormData({...formData, website: e.target.value})} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getModuleIcon = () => {
    switch(moduleType) {
      case 'resources': return <Package color="var(--color-success)" />;
      case 'education': return <BookOpen color="var(--color-accent)" />;
      case 'volunteer': return <Users color="#A020F0" />;
      case 'blood': return <Droplet color="var(--color-primary)" />;
      case 'animal': return <PawPrint color="#ff6b6b" />;
      case 'muskan': return <Smile color="#ec407a" />;
      case 'paryavaran': return <TreePine color="#4caf50" />;
      case 'trust': return <ShieldCheck color="#00F0FF" />;
      default: return <Heart color="var(--color-primary)" />;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '500px', width: '95%' }}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        {isSubmitted ? (
          <div className="success-state" style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle size={64} color="var(--color-success)" className="pulse-button" />
            <h2 className="gradient-text" style={{ marginTop: '24px' }}>{t('registrationReceived')}</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>{t('thankYouContact')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px'}}>
                {getModuleIcon()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{title}</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '4px'}}>
                  <ShieldCheck size={14} /> <span>{t('verifiedBadge')}</span>
                </div>
              </div>
            </div>
            
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>{subtitle}</p>

            <div className="module-specific-fields" style={{ margin: '16px 0', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
               {renderModuleFields()}
            </div>

            {isEvidenceRequired && (
              <div className="form-group animate-fade-in">
                <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Camera size={16} /> {t('photoEvidence')} *
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  style={{display: 'none'}}
                  onChange={e => setFormData({ ...formData, evidence: e.target.files[0] })}
                />
                <button 
                  type="button" 
                  className="modal-input" 
                  style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', border: !formData.evidence ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <span style={{ color: formData.evidence ? '#fff' : 'var(--color-text-muted)' }}>
                    {formData.evidence ? formData.evidence.name : 'Upload mandatory photo...'}
                  </span>
                  {formData.evidence && <CheckCircle size={16} color="var(--color-success)" />}
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '16px', padding: '16px', fontSize: '1.1rem', justifyContent: 'center' }}
            >
               {t('confirmParticipation')} 🚀
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
