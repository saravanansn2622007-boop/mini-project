import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, Lock, CheckSquare, Square, X, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GrantConsentModal({ doctors, onGrantConsent, onClose }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [durationDays, setDurationDays] = useState(30);
  const [categories, setCategories] = useState({
    profile: true,
    allergies: true,
    medications: true,
    surgeries: true,
    labReports: true,
    vaccines: true
  });
  const [notes, setNotes] = useState('Authorized for clinical consultation and ongoing treatment review.');

  const toggleCategory = (key) => {
    setCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const grantedDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + Number(durationDays));

    const newConsent = {
      id: `CSNT-${Math.floor(100 + Math.random() * 900)}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      hospital: selectedDoctor.hospital,
      status: 'Active',
      grantedDate: grantedDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      categories: { ...categories },
      accessCount: 0,
      lastAccessed: null,
      notes
    };

    onGrantConsent(newConsent);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '10px',
              borderRadius: '12px'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Grant Doctor Access Consent
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Set granular data access permissions and automatic expiration for your provider
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Select Doctor */}
          <div className="form-group">
            <label className="form-label">
              <span>Select Healthcare Provider (Doctor)</span>
              <span className="badge badge-emerald">Verified Only</span>
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="form-control"
              style={{ fontWeight: 600 }}
            >
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialty} ({doc.hospital})
                </option>
              ))}
            </select>
          </div>

          {selectedDoctor && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--bg-subtle)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px'
            }}>
              <img 
                src={selectedDoctor.avatar} 
                alt={selectedDoctor.name} 
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{selectedDoctor.name}</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  License: {selectedDoctor.licenseNumber} • {selectedDoctor.hospital}
                </div>
              </div>
              <span className="badge badge-primary">
                <UserCheck size={12} /> Verified
              </span>
            </div>
          )}

          {/* Granular Categories */}
          <div className="form-group">
            <label className="form-label">
              <span>Granular Medical Record Categories to Share</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}
                onClick={() => setCategories({ profile: true, allergies: true, medications: true, surgeries: true, labReports: true, vaccines: true })}
              >
                Select All
              </span>
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '10px'
            }}>
              {[
                { key: 'profile', label: 'Personal Health Profile', desc: 'Demographics, blood group, emergency contact' },
                { key: 'allergies', label: 'Allergies & Warnings', desc: 'Severe allergen triggers, risk levels' },
                { key: 'medications', label: 'Medicine & Prescriptions', desc: 'Active drugs, dosages, past history' },
                { key: 'surgeries', label: 'Operations & Hospitalization', desc: 'Surgical summaries, discharge notes' },
                { key: 'labReports', label: 'Lab Reports & Scan Documents', desc: 'Blood panels, ECGs, radiology imaging' },
                { key: 'vaccines', label: 'Vaccination History', desc: 'Immunization series, booster dates' }
              ].map(cat => (
                <div
                  key={cat.key}
                  onClick={() => toggleCategory(cat.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: categories[cat.key] ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                    background: categories[cat.key] ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ marginTop: '2px', color: categories[cat.key] ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {categories[cat.key] ? <CheckSquare size={18} /> : <Square size={18} />}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: categories[cat.key] ? 'var(--primary)' : 'var(--text-main)', display: 'block' }}>
                      {cat.label}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {cat.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Duration */}
          <div className="form-group">
            <label className="form-label">
              <span>Consent Validity & Auto-Expiration</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Revocable anytime</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { label: '24 Hours', days: 1, tag: 'Urgent Consult' },
                { label: '7 Days', days: 7, tag: 'Follow-up' },
                { label: '30 Days', days: 30, tag: 'Care Cycle' },
                { label: '1 Year', days: 365, tag: 'Primary Care' }
              ].map(dur => (
                <button
                  type="button"
                  key={dur.days}
                  onClick={() => setDurationDays(dur.days)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: durationDays === dur.days ? '2px solid var(--primary)' : '1px solid var(--border-medium)',
                    background: durationDays === dur.days ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: durationDays === dur.days ? 'var(--primary)' : 'var(--text-main)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.8125rem'
                  }}
                >
                  {dur.label}
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '2px' }}>
                    {dur.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional notes */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Purpose / Notes for Provider</label>
            <input 
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control"
              placeholder="e.g. Cardiology checkup for Lisinopril review"
            />
          </div>

          {/* Security Banner */}
          <div style={{
            marginTop: '20px',
            background: 'var(--bg-subtle)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Lock size={14} color="var(--primary)" />
            <span>
              Zero-Trust Verification: The doctor must verify their credentialed token before accessing records. You can revoke access at any time.
            </span>
          </div>

          {/* Submit Actions */}
          <div style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Grant Doctor Consent</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
