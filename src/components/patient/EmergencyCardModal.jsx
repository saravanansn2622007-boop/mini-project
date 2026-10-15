import React from 'react';
import { AlertOctagon, Phone, ShieldAlert, Heart, Activity, X, Printer } from 'lucide-react';

export function EmergencyCardModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          border: '2px solid var(--rose)',
          boxShadow: '0 0 35px var(--rose-glow)',
          overflow: 'hidden'
        }}
      >
        {/* Urgent Header */}
        <div style={{
          background: 'linear-gradient(135deg, #be123c, #e11d48)',
          color: '#ffffff',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex'
            }}>
              <AlertOctagon size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                  Emergency Medical Pass
                </h3>
                <span style={{
                  background: '#ffffff',
                  color: '#be123c',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  CRITICAL CARE
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
                Rapid-access vital data for first responders & emergency physicians
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Patient Overview Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src={patient.avatar} 
                alt={patient.name} 
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {patient.name}
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <span>ID: <strong className="font-mono" style={{ color: 'var(--primary)' }}>{patient.id}</strong></span>
                  <span>•</span>
                  <span>Age: {patient.age} ({patient.gender})</span>
                </div>
              </div>
            </div>

            {/* Blood Group Highlight */}
            <div style={{
              textAlign: 'center',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--rose-light)',
              border: '1px solid rgba(225, 29, 72, 0.3)'
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', display: 'block' }}>
                Blood Group
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--rose)', lineHeight: 1.1 }}>
                {patient.bloodGroup}
              </span>
            </div>
          </div>

          {/* Critical Allergies Box */}
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldAlert size={18} color="#e11d48" />
              <strong style={{ fontSize: '0.875rem', color: '#9f1239', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Severe Allergies & Adverse Reactions
              </strong>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {patient.allergies.map((alg, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #f43f5e',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '0.8125rem'
                  }}
                >
                  <strong style={{ color: '#be123c' }}>{alg.allergen}</strong>: {alg.reaction} ({alg.severity})
                </div>
              ))}
            </div>
          </div>

          {/* Active Medications (Potential Drug-Drug Interactions) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Heart size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Active Medications (Check For Contraindications)
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {patient.medications.filter(m => m.status === 'Active').map(m => (
                <div 
                  key={m.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{m.name} ({m.dosage})</span>
                  <span style={{ color: 'var(--text-muted)' }}>{m.frequency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronic Conditions */}
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Existing Chronic Conditions
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {patient.chronicConditions.map((cond, i) => (
                <span key={i} className="badge badge-neutral" style={{ fontSize: '0.8rem' }}>
                  {cond.condition} ({cond.icd10})
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                Primary In-Case-of-Emergency Contact
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {patient.emergencyContact.name}
              </strong>
            </div>
            <a 
              href={`tel:${patient.emergencyContact.phone}`}
              className="btn btn-rose btn-sm"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Phone size={14} />
              <span>{patient.emergencyContact.phone}</span>
            </a>
          </div>

          {/* Safeguard Notice */}
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            borderTop: '1px dashed var(--border-subtle)',
            paddingTop: '12px'
          }}>
            🔒 Emergency Access Safeguard: Every access to this pass is cryptographically recorded with paramedic timestamp in the permanent CareSync audit trail.
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <button 
            onClick={() => window.print()}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={15} />
            <span>Print Emergency Card</span>
          </button>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Pass
          </button>
        </div>
      </div>
    </div>
  );
}
