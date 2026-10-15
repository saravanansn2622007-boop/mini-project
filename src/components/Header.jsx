import React from 'react';
import { 
  Shield, 
  User, 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Activity, 
  Lock, 
  HeartHandshake,
  QrCode,
  Home,
  ArrowLeft
} from 'lucide-react';

export function Header({ 
  activeRole, 
  setActiveRole, 
  patients, 
  activePatientId, 
  setActivePatientId, 
  doctors, 
  activeDoctorId, 
  setActiveDoctorId,
  theme, 
  setTheme,
  onOpenEmergencyModal
}) {
  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];
  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-subtle)',
      padding: '12px 24px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand / Title - Clickable to return Home */}
        <div 
          onClick={() => setActiveRole('home')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
          title="Return to CareSync Home"
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0284c7, #0d9488)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
          }}>
            <Activity size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                CareSync
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                <Lock size={10} /> Unified Health Records
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Secure & Consent-Governed Health Information Exchange
            </p>
          </div>
        </div>

        {/* Role & Module Switcher */}
        <nav style={{
          display: 'flex',
          background: 'var(--bg-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          gap: '4px',
          flexWrap: 'wrap'
        }}>
          {/* Home Button */}
          <button
            onClick={() => setActiveRole('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: activeRole === 'home' ? 700 : 500,
              background: activeRole === 'home' ? 'var(--bg-surface)' : 'transparent',
              color: activeRole === 'home' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: activeRole === 'home' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Home size={15} />
            <span>Home</span>
          </button>

          {/* Patient Portal */}
          <button
            onClick={() => setActiveRole('patient')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: activeRole === 'patient' ? 700 : 500,
              background: activeRole === 'patient' ? 'var(--bg-surface)' : 'transparent',
              color: activeRole === 'patient' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: activeRole === 'patient' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <User size={15} />
            <span>Patient Portal</span>
          </button>

          {/* Doctor Portal */}
          <button
            onClick={() => setActiveRole('doctor')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: activeRole === 'doctor' ? 700 : 500,
              background: activeRole === 'doctor' ? 'var(--bg-surface)' : 'transparent',
              color: activeRole === 'doctor' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: activeRole === 'doctor' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Stethoscope size={15} />
            <span>Doctor Portal</span>
          </button>

          {/* Admin Console */}
          <button
            onClick={() => setActiveRole('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: activeRole === 'admin' ? 700 : 500,
              background: activeRole === 'admin' ? 'var(--bg-surface)' : 'transparent',
              color: activeRole === 'admin' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: activeRole === 'admin' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <ShieldCheck size={15} />
            <span>Admin</span>
          </button>

          {/* ER Break-Glass */}
          <button
            onClick={() => setActiveRole('emergency')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: activeRole === 'emergency' ? 700 : 500,
              background: activeRole === 'emergency' ? 'var(--rose)' : 'transparent',
              color: activeRole === 'emergency' ? '#ffffff' : 'var(--rose)',
              boxShadow: activeRole === 'emergency' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <AlertTriangle size={15} />
            <span>ER Break-Glass</span>
          </button>
        </nav>

        {/* Right Tools / Persona Selector & Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Active Persona dropdown when inside patient module */}
          {activeRole === 'patient' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Patient:</span>
              <select
                value={activePatientId}
                onChange={(e) => setActivePatientId(e.target.value)}
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8125rem', fontWeight: 600 }}
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Active Persona dropdown when inside doctor module */}
          {activeRole === 'doctor' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Doctor:</span>
              <select
                value={activeDoctorId}
                onChange={(e) => setActiveDoctorId(e.target.value)}
                className="form-control"
                style={{ padding: '4px 10px', fontSize: '0.8125rem', fontWeight: 600 }}
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} - {d.specialty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Emergency Card Quick Button */}
          {activeRole === 'patient' && (
            <button
              onClick={onOpenEmergencyModal}
              className="btn btn-rose btn-sm"
              title="View Emergency Summary Card"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <AlertTriangle size={14} />
              <span>Emergency Pass</span>
            </button>
          )}

          {/* Quick Back to Home button if inside submodules */}
          {activeRole !== 'home' && (
            <button
              onClick={() => setActiveRole('home')}
              className="btn btn-secondary btn-sm"
              title="Return to Home Main Page"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <ArrowLeft size={13} />
              <span>Home</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn btn-secondary btn-sm"
            aria-label="Toggle dark mode"
            style={{ padding: '6px 10px', borderRadius: 'var(--radius-full)' }}
          >
            {theme === 'dark' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
