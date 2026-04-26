import React, { useState } from 'react';
import { Heart, Globe, User, Phone, ShieldCheck, MapPin, RefreshCcw, CheckCircle, Mail, Map, UserPlus, LogIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';

export default function Login({ onLogin }) {
  const { language, setLanguage, t } = useLanguage();
  const languages = ['English', 'Hindi', 'Marathi', 'Panjabi', 'Bhojapuri', 'Mallyalam'];
  
  const [view, setView] = useState('landing'); // landing, register, login
  const [phone, setPhone] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpState, setOtpState] = useState('idle'); // idle, sent, verified
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    location: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setOtpState('sent');
      setIsProcessing(false);
      alert("Verification Code Sent to " + phone + ": 1234");
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpValue === '1234') {
      setOtpState('verified');
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Location services not supported.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({ ...formData, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS Verified)` });
        setIsLocating(false);
      },
      () => {
        alert("Unable to get location. Please type manually.");
        setIsLocating(false);
      }
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (otpState !== 'verified') {
      alert("Please verify your mobile number first.");
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('sahaay_users') || '[]');
      const newUser = { ...formData, phone };
      localStorage.setItem('sahaay_users', JSON.stringify([...storedUsers, newUser]));
      setIsProcessing(false);
      onLogin(formData.fullName);
    }, 1500);
  };

  const handleLoginOnly = (e) => {
    e.preventDefault();
    if (otpState !== 'verified') {
      alert("Please verify your mobile number first.");
      return;
    }
    
    const storedUsers = JSON.parse(localStorage.getItem('sahaay_users') || '[]');
    const user = storedUsers.find(u => u.phone === phone);
    
    if (user) {
      onLogin(user.fullName);
    } else {
      alert("User not found. Please create an account first.");
      setView('register');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="glass-panel login-card animate-fade-in-up" style={{ padding: '40px', maxWidth: '550px', width: '95%' }}>
        <div className="login-brand" style={{ marginBottom: '30px' }}>
          <Heart fill="#FF4A57" color="#FF4A57" size={56} className={isProcessing ? "spin-slow" : "pulse-button"} />
          <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>SahaayNet</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Official Humanitarian Identity Gate</p>
        </div>

        {view === 'landing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <button className="btn btn-primary" onClick={() => setView('register')} style={{ padding: '20px', fontSize: '1.1rem', justifyContent: 'center' }}>
               <UserPlus size={20} /> {t('joinNetwork') || 'Create Official Account'}
             </button>
             <button className="btn" onClick={() => setView('login')} style={{ padding: '20px', fontSize: '1.1rem', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
               <LogIn size={20} /> {t('welcomeBack') || 'Login with Mobile'}
             </button>
             
             <div className="form-group" style={{ marginTop: '20px' }}>
                <label style={{ fontSize: '0.8rem', opacity: 0.6 }}><Globe size={14} /> {t('chooseLanguage')}</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-dropdown-login">
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>
          </div>
        )}

        {view === 'register' && (
          <form onSubmit={handleRegister} className="official-form animate-fade-in">
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              Official Citizen Registration
            </h2>
            
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label><User size={16} /> Full Name *</label>
                <input type="text" className="login-input" placeholder="Rahul Kumar" required onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Email Address *</label>
                <input type="email" className="login-input" placeholder="rahul@example.com" required onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label><Phone size={16} /> Mobile Number (Identity) *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="tel" 
                  className="login-input" 
                  placeholder="10-digit number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpState === 'verified'}
                  required
                />
                {otpState === 'idle' && (
                  <button type="button" className="btn btn-primary" onClick={handleSendOtp} style={{ padding: '0 15px' }}>
                    Verify
                  </button>
                )}
                {otpState === 'verified' && <CheckCircle color="var(--color-success)" size={24} style={{ alignSelf: 'center' }} />}
              </div>
            </div>

            {otpState === 'sent' && (
              <div className="form-group animate-fade-in" style={{ marginTop: '10px', background: 'rgba(0, 240, 255, 0.05)', padding: '15px', borderRadius: '12px' }}>
                <label><ShieldCheck size={16} /> Enter Verification Code *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="login-input" placeholder="1234" maxLength={4} onChange={e => setOtpValue(e.target.value)} />
                  <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>Verify</button>
                </div>
              </div>
            )}

            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div className="form-group">
                <label><Map size={16} /> State *</label>
                <select className="login-input" required onChange={e => setFormData({...formData, state: e.target.value})}>
                  <option value="">Select State</option>
                  <option>Maharashtra</option><option>Delhi</option><option>Karnataka</option><option>Uttar Pradesh</option><option>Punjab</option>
                </select>
              </div>
              <div className="form-group">
                <label><MapPin size={16} /> City/Area *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="login-input" placeholder="e.g. Dadar" value={formData.location} required onChange={e => setFormData({...formData, location: e.target.value})} />
                  <button type="button" className="btn btn-primary" onClick={handleGetLocation} style={{ padding: '0 10px' }}>
                    {isLocating ? <RefreshCcw size={16} className="spin" /> : <MapPin size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn" style={{ marginTop: '30px', width: '100%', padding: '18px', fontSize: '1.1rem', justifyContent: 'center' }} disabled={otpState !== 'verified' || isProcessing}>
              {isProcessing ? 'Processing...' : 'Create Official Account 🚀'}
            </button>
            
            <button type="button" className="btn-text" onClick={() => setView('landing')} style={{ width: '100%', marginTop: '10px' }}>Back</button>
          </form>
        )}

        {view === 'login' && (
          <form onSubmit={handleLoginOnly} className="official-form animate-fade-in">
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Welcome Back</h2>
            <div className="form-group">
              <label><Phone size={16} /> Registered Mobile Number</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="tel" 
                  className="login-input" 
                  placeholder="10-digit number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpState === 'verified'}
                  required
                />
                {otpState === 'idle' && (
                  <button type="button" className="btn btn-primary" onClick={handleSendOtp}>OTP</button>
                )}
                {otpState === 'verified' && <CheckCircle color="var(--color-success)" size={24} style={{ alignSelf: 'center' }} />}
              </div>
            </div>

            {otpState === 'sent' && (
              <div className="form-group animate-fade-in" style={{ marginTop: '10px' }}>
                <label>Enter OTP</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="login-input" placeholder="1234" maxLength={4} onChange={e => setOtpValue(e.target.value)} />
                  <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>Verify</button>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary login-btn" style={{ marginTop: '20px', width: '100%' }} disabled={otpState !== 'verified'}>
              Login to Dashboard
            </button>
            <button type="button" className="btn-text" onClick={() => setView('landing')} style={{ width: '100%', marginTop: '10px' }}>Back</button>
          </form>
        )}
      </div>
    </div>
  );
}
