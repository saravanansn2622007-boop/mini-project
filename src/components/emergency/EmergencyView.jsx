import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Phone, 
  Heart, 
  Search, 
  Lock, 
  Unlock, 
  FileCheck, 
  Activity, 
  CheckCircle,
  AlertOctagon
} from 'lucide-react';

export function EmergencyView({ patients, onLogEmergencyAccess }) {
  const [patientIdInput, setPatientIdInput] = useState('PAT-88219');
  const [activePatient, setActivePatient] = useState(patients.find(p => p.id === 'PAT-88219') || patients[0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('Unconscious patient with suspected trauma / acute distress');
  const [responderBadge, setResponderBadge] = useState('EMT-77402 (Boston EMS)');

  const handleLookup = (e) => {
    e.preventDefault();
    const query = patientIdInput.trim().toUpperCase();
    const found = patients.find(p => p.id.toUpperCase() === query);
    if (found) {
      setActivePatient(found);
      setIsUnlocked(false);
    } else {
      alert(`Patient ID "${patientIdInput}" not found in CareSync emergency registry.`);
    }
  };

  const handleBreakGlass = () => {
    if (!emergencyReason) {
      alert('Please specify the medical emergency rationale before breaking glass.');
      return;
    }

    setIsUnlocked(true);

    // Call parent logger to append immutable audit entry
    onLogEmergencyAccess(activePatient.id, {
      responderBadge,
      emergencyReason,
      patientName: activePatient.name,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Emergency Header */}
      <div style={{
        background: 'linear-gradient(135deg, #9f1239, #e11d48)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 32px',
        boxShadow: '0 10px 25px var(--rose-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '12px',
            display: 'flex'
          }}>
            <AlertOctagon size={36} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                Emergency First Responder "Break-Glass" Gateway
              </h1>
              <span style={{
                background: '#ffffff',
                color: '#be123c',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                LEVEL 1 TRIAGE
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.9 }}>
              Rapid life-saving health summary with mandatory statutory audit accountability
            </p>
          </div>
        </div>

        {/* Patient ID Search */}
        <form onSubmit={handleLookup} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Enter Patient ID (e.g. PAT-88219)"
            value={patientIdInput}
            onChange={(e) => setPatientIdInput(e.target.value)}
            className="form-control"
            style={{ width: '220px', fontWeight: 700, background: '#ffffff', color: '#0f172a' }}
          />
          <button type="submit" className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
            <Search size={14} /> Search
          </button>
        </form>
      </div>

      {/* Target Patient Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-surface)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src={activePatient.avatar} 
            alt={activePatient.name} 
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{activePatient.name}</strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Patient ID: <strong className="font-mono" style={{ color: 'var(--primary)' }}>{activePatient.id}</strong> • Age: {activePatient.age} ({activePatient.gender})
            </div>
          </div>
        </div>

        <div>
          <span className="badge badge-rose" style={{ fontSize: '0.9rem', fontWeight: 800, padding: '6px 14px' }}>
            Blood Group: {activePatient.bloodGroup}
          </span>
        </div>
      </div>

      {/* ================= IF LOCKED: BREAK-GLASS SAFEGUARD DIALOG ================= */}
      {!isUnlocked ? (
        <div className="card" style={{
          padding: '36px 28px',
          border: '2px dashed var(--rose)',
          background: 'var(--bg-subtle)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'var(--rose-light)',
            color: 'var(--rose)',
            borderRadius: '50%',
            width: '68px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock size={34} />
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text-main)' }}>
            Confirm Emergency Break-Glass Override
          </h2>
          <p style={{ maxWidth: '620px', margin: '0 auto 20px', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Accessing this emergency pass bypasses routine patient consent verification to save patient life. This action will be <strong>permanently logged into the CareSync regulatory audit ledger</strong> with your badge identification.
          </p>

          <div style={{ maxWidth: '520px', margin: '0 auto 24px', textAlign: 'left' }}>
            <div className="form-group">
              <label className="form-label">Responder Badge / Credentials *</label>
              <input 
                type="text" 
                value={responderBadge}
                onChange={(e) => setResponderBadge(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Clinical Emergency Justification *</label>
              <select 
                value={emergencyReason}
                onChange={(e) => setEmergencyReason(e.target.value)}
                className="form-control"
              >
                <option value="Unconscious patient with suspected trauma / acute distress">Unconscious patient with suspected trauma / acute distress</option>
                <option value="Severe acute anaphylaxis / Respiratory distress">Severe acute anaphylaxis / Respiratory distress</option>
                <option value="Suspected Acute Myocardial Infarction / Stroke">Suspected Acute Myocardial Infarction / Stroke</option>
                <option value="Mass casualty incident triage">Mass casualty incident triage</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleBreakGlass}
            className="btn btn-rose btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px var(--rose-glow)' }}
          >
            <Unlock size={20} />
            <span>Break Glass & Unlock Emergency Medical Profile</span>
          </button>
        </div>
      ) : (
        /* ================= IF UNLOCKED: CRITICAL LIFE-SAVING VIEW ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          {/* Audit Logging Notice */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald">Audited & Active</span>
              <span style={{ color: 'var(--text-muted)' }}>
                Unlocked by: <strong>{responderBadge}</strong> • Reason: {emergencyReason}
              </span>
            </div>
            <button 
              onClick={() => setIsUnlocked(false)} 
              className="btn btn-secondary btn-sm"
            >
              Lock Pass
            </button>
          </div>

          {/* 1. Critical Allergies (Highest Priority) */}
          <div style={{
            background: '#fff1f2',
            border: '2px solid #e11d48',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <ShieldAlert size={24} color="#e11d48" />
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#9f1239', textTransform: 'uppercase' }}>
                Critical Allergies & Anaphylaxis Warnings
              </h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {activePatient.allergies.map((alg, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '2px solid #f43f5e',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#be123c' }}>
                    {alg.allergen}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#881337', marginTop: '2px' }}>
                    Reaction: {alg.reaction}
                  </div>
                  <span className="badge badge-rose" style={{ marginTop: '6px' }}>
                    Severity: {alg.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Blood Group & Emergency Contacts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Blood & Vitals */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Blood Transfusion Type
                </span>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--rose)', lineHeight: 1.1 }}>
                  {activePatient.bloodGroup}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                <div>Last Recorded BP: <strong>{activePatient.vitals.bloodPressure}</strong></div>
                <div>Pulse / HR: <strong>{activePatient.vitals.heartRate}</strong></div>
                <div>SpO2: <strong>{activePatient.vitals.oxygenSaturation}</strong></div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Primary Emergency Contact
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {activePatient.emergencyContact.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Relationship: {activePatient.emergencyContact.relation}
              </div>
              <a 
                href={`tel:${activePatient.emergencyContact.phone}`}
                className="btn btn-rose btn-sm"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Phone size={16} />
                <span>Call Emergency Contact: {activePatient.emergencyContact.phone}</span>
              </a>
            </div>
          </div>

          {/* 3. Active Medications (Crucial for drug-drug interactions / blood thinners) */}
          <div className="card">
            <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 800 }}>
              Current Medications (Watch for Blood Thinners & Antidiabetics)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {activePatient.medications.filter(m => m.status === 'Active').map(m => (
                <div key={m.id} style={{
                  padding: '10px 14px',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>
                    {m.name} ({m.dosage})
                  </strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {m.frequency}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Chronic Conditions & Previous Surgeries */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="card">
              <h4 style={{ margin: '0 0 8px', fontSize: '0.95rem', fontWeight: 700 }}>Key Chronic Diagnoses</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', margin: 0 }}>
                {activePatient.chronicConditions.map((c, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <strong>{c.condition}</strong> (ICD: {c.icd10})
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 style={{ margin: '0 0 8px', fontSize: '0.95rem', fontWeight: 700 }}>Previous Major Surgeries</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', margin: 0 }}>
                {activePatient.surgeriesAndHospitalizations.map((s, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <strong>{s.procedure}</strong> ({s.hospital}, {s.admissionDate})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
