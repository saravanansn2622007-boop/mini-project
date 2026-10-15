import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  Pill, 
  Syringe, 
  Scissors, 
  FileText, 
  Activity, 
  Lock, 
  Plus, 
  Scan, 
  Download, 
  QrCode, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Bell, 
  ChevronDown,
  XCircle
} from 'lucide-react';
import { LabTrendsChart } from './LabTrendsChart';
import { PatientProfileModal } from './PatientProfileModal';

export function PatientDashboard({ 
  patient, 
  onGrantConsentOpen, 
  onOpenOCRScanner, 
  onOpenExportSummary, 
  onOpenEmergencyModal: _onOpenEmergencyModal,
  onOpenAddRecord,
  onRevokeConsent,
  onToggleConsentCategory,
  onUpdatePatient
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'records', 'consent', 'reminders'
  const [recordsSubTab, setRecordsSubTab] = useState('timeline'); // 'timeline', 'meds', 'labs', 'surgeries', 'vaccines'
  const [timelineFilter, setTimelineFilter] = useState('All');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [reminderDosesChecked, setReminderDosesChecked] = useState({});

  if (!patient) return null;

  const toggleDoseCheck = (medId) => {
    setReminderDosesChecked(prev => ({
      ...prev,
      [medId]: !prev[medId]
    }));
  };

  const filteredTimeline = timelineFilter === 'All' 
    ? patient.timeline 
    : patient.timeline.filter(t => t.category.toLowerCase().includes(timelineFilter.toLowerCase()) || timelineFilter.toLowerCase().includes(t.category.toLowerCase()));

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Patient Profile Banner */}
      <div className="card card-elevated" style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '24px 28px'
      }}>
        {/* Left: Avatar & Demographics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div 
            onClick={() => {
              setActiveTab('overview');
              setShowProfileModal(true);
            }}
            style={{ position: 'relative', cursor: 'pointer' }}
            title="Click to view full personal profile"
          >
            <img 
              src={patient.avatar} 
              alt={patient.name} 
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: 'var(--emerald)',
              color: '#fff',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff',
              fontSize: '10px'
            }}>
              ✓
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 
                onClick={() => {
                  setActiveTab('overview');
                  setShowProfileModal(true);
                }}
                style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: 800, 
                  margin: 0, 
                  color: 'var(--text-main)', 
                  letterSpacing: '-0.02em',
                  cursor: 'pointer' 
                }}
                title="Click to view full personal profile"
              >
                {patient.name}
              </h1>
              
              {/* Clickable Patient ID Icon / Badge */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('overview');
                  setShowProfileModal(true);
                }}
                className="badge badge-primary font-mono"
                title="Click to view and edit your Personal Health Profile"
                style={{ 
                  fontSize: '0.8rem', 
                  cursor: 'pointer',
                  border: '1px solid var(--border-accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 3px 8px var(--primary-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <User size={13} />
                <span>ID: {patient.id}</span>
              </button>

              <span className="badge badge-rose" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                Blood: {patient.bloodGroup}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '6px',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap'
            }}>
              <span><strong>DOB:</strong> {patient.dob} ({patient.age} yrs)</span>
              <span>•</span>
              <span><strong>Gender:</strong> {patient.gender}</span>
              <span>•</span>
              <span><Phone size={13} style={{ verticalAlign: 'middle' }} /> {patient.phone}</span>
              <span>•</span>
              <span><MapPin size={13} style={{ verticalAlign: 'middle' }} /> {patient.address}</span>
            </div>
          </div>
        </div>

        {/* Right: Streamlined Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', position: 'relative' }}>
          {/* Primary Action Button */}
          <button 
            onClick={onOpenAddRecord}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontWeight: 600 }}
          >
            <Plus size={15} />
            <span>Add Record</span>
          </button>

          {/* Quick Doctor Consent Action */}
          <button 
            onClick={onGrantConsentOpen}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', borderColor: 'var(--border-accent)', color: 'var(--primary)', padding: '8px 14px' }}
          >
            <Lock size={14} />
            <span>Grant Access</span>
          </button>

          {/* More Actions Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowActionsMenu(prev => !prev)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px' }}
              title="More Actions & Tools"
            >
              <span>More Actions</span>
              <ChevronDown size={14} style={{ transform: showActionsMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {showActionsMenu && (
              <>
                <div 
                  style={{ position: 'fixed', inset: 0, zIndex: 110 }} 
                  onClick={() => setShowActionsMenu(false)} 
                />
                <div 
                  className="dropdown-menu animate-fade-in"
                  onClick={() => setShowActionsMenu(false)}
                >
                  <button
                    onClick={onOpenOCRScanner}
                    className="dropdown-item"
                    type="button"
                  >
                    <Scan size={15} color="var(--primary)" />
                    <span>AI Document OCR</span>
                  </button>

                  <button
                    onClick={() => setShowQRModal(true)}
                    className="dropdown-item"
                    type="button"
                  >
                    <QrCode size={15} color="var(--teal)" />
                    <span>Patient QR Code</span>
                  </button>

                  <button
                    onClick={onOpenExportSummary}
                    className="dropdown-item"
                    type="button"
                  >
                    <Download size={15} color="var(--emerald)" />
                    <span>Export Health Record</span>
                  </button>

                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="dropdown-item"
                    type="button"
                  >
                    <User size={15} color="var(--purple)" />
                    <span>Edit Health Profile</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Dashboard Layout with Left Sidebar Navigation */}
      <div className="patient-dashboard-grid">
        {/* Left Sidebar Navigation Rail */}
        <aside style={{
          position: 'sticky',
          top: '86px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Main Navigation Card */}
          <div className="card" style={{ padding: '16px 12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 8px 12px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Medical Records
              </span>
              <span className="badge badge-primary font-mono" style={{ fontSize: '0.68rem' }}>
                {patient.id}
              </span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { 
                  id: 'overview', 
                  label: 'Overview & Vitals', 
                  icon: Activity 
                },
                { 
                  id: 'records', 
                  label: 'Unified Health Records', 
                  icon: FileText, 
                  badge: patient.timeline.length + patient.medications.length + patient.documents.length 
                },
                { 
                  id: 'consent', 
                  label: 'Doctor Access & Consent', 
                  icon: Lock, 
                  badge: patient.consents.filter(c => c.status === 'Active').length 
                },
                { 
                  id: 'reminders', 
                  label: 'Schedule & Reminders', 
                  icon: Bell, 
                  badge: patient.medications.filter(m => m.status === 'Active').length 
                }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    type="button"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span className={`badge ${isActive ? 'badge-primary' : 'badge-neutral'}`} style={{ padding: '2px 7px', fontSize: '0.7rem' }}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Health Summary & Fast Actions in Sidebar */}
          <div className="card" style={{ padding: '16px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
              Quick Patient Summary
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Blood Group:</span>
                <strong style={{ color: 'var(--rose)' }}>{patient.bloodGroup}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Severe Allergies:</span>
                <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                  {patient.allergies.length} Critical
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active Doctors:</span>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  {patient.consents.filter(c => c.status === 'Active').length} Permitted
                </span>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('overview');
                  setShowProfileModal(true);
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <User size={14} />
                <span>View Full Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQRModal(true)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <QrCode size={14} />
                <span>Show Patient QR</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Main Content Pane */}
        <main style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* ================= TAB 1: OVERVIEW & PROFILE ================= */}
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }} className="animate-fade-in">
              {/* Left Column: Alerts & Vitals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Severe Allergies Alert Banner */}
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px'
            }}>
              <div style={{ background: '#f43f5e', color: '#fff', borderRadius: '50%', padding: '6px', display: 'flex' }}>
                <ShieldAlert size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#9f1239', textTransform: 'uppercase' }}>
                    Active Allergy Warnings & Contraindications
                  </h3>
                  <span className="badge badge-rose">Flagged for Clinical Review</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {patient.allergies.map((alg, i) => (
                    <div key={i} style={{
                      background: '#ffffff',
                      border: '1px solid #f43f5e',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.8125rem'
                    }}>
                      <strong style={{ color: '#be123c' }}>{alg.allergen}:</strong> {alg.reaction} 
                      <span style={{ fontSize: '0.7rem', color: '#9f1239', marginLeft: '6px' }}>({alg.severity})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Clinical Vitals Grid */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="var(--primary)" />
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Latest Recorded Vitals</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('records');
                    setRecordsSubTab('labs');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Biomarker Trends</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}>
                {[
                  { label: 'Blood Pressure', val: patient.vitals.bloodPressure, tag: 'Controlled', color: 'primary' },
                  { label: 'Heart Rate', val: patient.vitals.heartRate, tag: 'Normal Sinus', color: 'emerald' },
                  { label: 'Body Temp', val: patient.vitals.temperature, tag: 'Afebrile', color: 'neutral' },
                  { label: 'SpO2 Oxygen', val: patient.vitals.oxygenSaturation, tag: 'Optimal', color: 'emerald' },
                  { label: 'BMI', val: `${patient.vitals.bmi} kg/m²`, tag: 'Normal Weight', color: 'primary' },
                  { label: 'Weight / Height', val: `${patient.vitals.weight} / ${patient.vitals.height}`, tag: 'Recorded', color: 'neutral' }
                ].map((v, i) => (
                  <div key={i} style={{
                    background: 'var(--bg-subtle)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>{v.label}</span>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginTop: '2px', display: 'block' }}>{v.val}</strong>
                    <span className={`badge badge-${v.color}`} style={{ fontSize: '0.65rem', marginTop: '6px' }}>{v.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Chronic Conditions */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Ongoing Diagnoses & Chronic Conditions</h3>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('records');
                    setRecordsSubTab('meds');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Active Meds</span>
                  <ChevronRight size={13} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {patient.chronicConditions.map((cond, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{cond.condition}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Diagnosed in {cond.diagnosedYear} • Managing Physician: {cond.doctor}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-neutral font-mono">{cond.icd10}</span>
                      <span className="badge badge-emerald">{cond.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Medical History */}
            <div className="card">
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 700 }}>Family Medical History</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {patient.familyHistory.map((fam, i) => (
                  <div key={i} style={{
                    padding: '10px 14px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{fam.relative}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '2px' }}>{fam.condition}</div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fam.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Emergency & Consents Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Emergency Contact Quick Widget */}
            <div className="card" style={{ borderLeft: '4px solid var(--rose)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Phone size={16} color="var(--rose)" />
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Emergency Contact</h4>
              </div>
              <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-main)' }}>
                {patient.emergencyContact.name}
              </strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 12px' }}>
                Relation: {patient.emergencyContact.relation}
              </div>
              <a 
                href={`tel:${patient.emergencyContact.phone}`}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', textAlign: 'center', textDecoration: 'none' }}
              >
                Call: {patient.emergencyContact.phone}
              </a>
            </div>

            {/* Smart Consent Overview Card */}
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} color="var(--primary)" />
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Authorized Doctors</h4>
                </div>
                <button 
                  onClick={() => setActiveTab('consent')} 
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Manage All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {patient.consents.filter(c => c.status === 'Active').map(c => (
                  <div key={c.id} style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8125rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--text-main)' }}>{c.doctorName}</strong>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Active</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                      {c.specialty} • {c.hospital}
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '0.7rem', color: 'var(--primary)' }}>
                      Shared: {Object.keys(c.categories).filter(k => c.categories[k]).length} of 6 categories
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Safeguard Callout */}
            <div style={{
              background: 'var(--primary-light)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)'
            }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                🛡️ CareSync Security Guarantee
              </strong>
              Your patient ID identifies your account, but never automatically unlocks medical history without explicit, time-bounded consent.
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: UNIFIED HEALTH RECORDS ================= */}
      {activeTab === 'records' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          {/* Segmented Sub-Tab Header Bar */}
          <div className="card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Unified Health Records
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                View complete clinical visits, medications, diagnostic labs, surgeries, and immunizations
              </p>
            </div>

            {/* Sub-Tab Navigation Pills */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-medium)',
              gap: '4px',
              flexWrap: 'wrap'
            }}>
              {[
                { id: 'timeline', label: 'Timeline Visits', icon: Clock, count: patient.timeline.length },
                { id: 'meds', label: 'Medicines & Rx', icon: Pill, count: patient.medications.filter(m => m.status === 'Active').length },
                { id: 'labs', label: 'Lab Reports & Trends', icon: Activity, count: patient.documents.length },
                { id: 'surgeries', label: 'Surgeries & Hospital', icon: Scissors, count: patient.surgeriesAndHospitalizations.length },
                { id: 'vaccines', label: 'Vaccines', icon: Syringe, count: patient.vaccinations.length }
              ].map(sub => {
                const SubIcon = sub.icon;
                const isSelected = recordsSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setRecordsSubTab(sub.id)}
                    className={`subtab-pill ${isSelected ? 'active' : ''}`}
                  >
                    <SubIcon size={14} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>{sub.label}</span>
                    <span className={`badge ${isSelected ? 'badge-primary' : 'badge-neutral'}`} style={{ padding: '1px 6px', fontSize: '0.68rem' }}>
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtab 1: Timeline Visits */}
          {recordsSubTab === 'timeline' && (
            <div className="card animate-fade-in">
              {/* Header & Filter Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '16px',
                marginBottom: '20px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    Chronological Clinical Timeline
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    Unified stream of diagnoses, prescriptions, surgeries, lab tests, and hospitalizations
                  </p>
                </div>

                {/* Filter pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Consultation', 'Diagnosis', 'Prescription', 'Operation', 'Lab Test', 'Vaccination'].map(f => (
                <button
                  key={f}
                  onClick={() => setTimelineFilter(f)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: timelineFilter === f ? '1px solid var(--primary)' : '1px solid var(--border-medium)',
                    background: timelineFilter === f ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: timelineFilter === f ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: timelineFilter === f ? 700 : 500,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Stream */}
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical spine line */}
            <div style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '11px',
              width: '2px',
              background: 'var(--border-medium)'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filteredTimeline.map(item => (
                <div key={item.id} style={{ position: 'relative' }}>
                  {/* Node Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-32px',
                    top: '4px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: '3px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                  </div>

                  {/* Card Content */}
                  <div style={{
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px 20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className={`badge badge-${item.badgeColor || 'primary'}`} style={{ fontSize: '0.72rem' }}>
                          {item.category}
                        </span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{item.title}</strong>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Calendar size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        {item.date}
                      </span>
                    </div>

                    <p style={{ margin: '8px 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      borderTop: '1px dashed var(--border-medium)',
                      paddingTop: '8px',
                      marginTop: '8px'
                    }}>
                      <span><strong>Doctor:</strong> {item.doctor}</span>
                      <span>•</span>
                      <span><strong>Facility:</strong> {item.facility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          )}

          {/* Subtab 4: Surgeries, Operations & Hospital Visits */}
          {recordsSubTab === 'surgeries' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
          {/* Operations & Hospitalizations Section */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Surgeries, Operations & Hospital Visits</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Detailed surgical procedures, operating facilities, discharge summaries, and recovery directions
                </p>
              </div>
              <button onClick={onOpenAddRecord} className="btn btn-secondary btn-sm">
                + Add Surgery / Hospitalization
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {patient.surgeriesAndHospitalizations.map(surg => (
                <div key={surg.id} style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                    <div>
                      <span className="badge badge-rose" style={{ marginBottom: '6px' }}>{surg.type}</span>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {surg.procedure}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {surg.hospital} • Surgeon: <strong>{surg.surgeon}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admission Dates</span>
                      <div className="font-mono" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {surg.admissionDate} → {surg.dischargeDate}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Pre-Op / Admission Diagnosis:</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginLeft: '6px' }}>{surg.diagnosis}</span>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <strong style={{ fontSize: '0.8125rem', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                        Clinical Discharge Summary:
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {surg.summary}
                      </p>
                    </div>

                    <div style={{ background: 'var(--emerald-light)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
                      <strong style={{ fontSize: '0.8125rem', color: 'var(--emerald)', display: 'block', marginBottom: '2px' }}>
                        Post-Discharge Instructions & Follow-up:
                      </strong>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-main)' }}>
                        {surg.followUpInstructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          )}

          {/* Subtab 2: Medicines & Prescription Records */}
          {recordsSubTab === 'meds' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Prescription & Medication Records</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active medications, dosages, prescribing clinicians, and schedules
                </p>
              </div>
              <button onClick={onOpenAddRecord} className="btn btn-primary btn-sm">
                + Add Medication Entry
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {patient.medications.map(med => {
                const isActive = med.status === 'Active';
                return (
                  <div key={med.id} style={{
                    background: 'var(--bg-subtle)',
                    border: isActive ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {med.name}
                          </h4>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>
                            {med.dosage}
                          </span>
                        </div>
                        <span className={`badge ${isActive ? 'badge-emerald' : 'badge-neutral'}`}>
                          {med.status}
                        </span>
                      </div>

                      <div style={{ marginTop: '12px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        <div><strong>Frequency:</strong> {med.frequency}</div>
                        <div><strong>Prescribing Doctor:</strong> {med.prescribedBy}</div>
                        <div><strong>Active Dates:</strong> {med.startDate} → {med.endDate}</div>
                      </div>

                      {med.instructions && (
                        <div style={{
                          marginTop: '10px',
                          background: 'var(--bg-surface)',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          💡 {med.instructions}
                        </div>
                      )}
                    </div>

                    {/* Reminder toggle */}
                    {isActive && (
                      <div style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          ⏰ Daily Alert: {med.reminderTime}
                        </span>
                        <button
                          onClick={() => toggleDoseCheck(med.id)}
                          className={`btn btn-sm ${reminderDosesChecked[med.id] ? 'btn-emerald' : 'btn-secondary'}`}
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          {reminderDosesChecked[med.id] ? '✓ Dose Taken Today' : 'Mark Dose Taken'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
          )}

          {/* Subtab 5: Vaccination & Immunization Ledger */}
          {recordsSubTab === 'vaccines' && (
        <div className="card animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Vaccination & Immunization Ledger</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Official vaccine dates, dose series tracking, next dose due schedules, and batch credentials
              </p>
            </div>
            <button onClick={onOpenAddRecord} className="btn btn-secondary btn-sm">
              + Log New Vaccine Dose
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {patient.vaccinations.map(vac => (
              <div key={vac.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    background: 'var(--purple-light)',
                    color: 'var(--purple)',
                    padding: '10px',
                    borderRadius: '12px',
                    display: 'flex'
                  }}>
                    <Syringe size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {vac.vaccine}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {vac.doseNumber} • Administered at {vac.administrator}
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                      Batch: {vac.batchNumber}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Date Given</span>
                    <strong style={{ fontSize: '0.875rem' }}>{vac.dateAdministered}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Next Booster Due</span>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{vac.nextDue}</strong>
                  </div>
                  <button 
                    onClick={() => alert(`Certificate verified for ${vac.vaccine} (${vac.batchNumber})`)}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={14} />
                    <span>Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
          )}

          {/* Subtab 3: Reports & Lab Biomarker Trends */}
          {recordsSubTab === 'labs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
          {/* Interactive Trend Chart */}
          <LabTrendsChart labTrends={patient.labTrends} />

          {/* Document Vault Section */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Medical Documents & Lab Scan Reports</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Uploaded blood test reports, echocardiograms, MRI/CT scans, and discharge summaries
                </p>
              </div>
              <button onClick={onOpenOCRScanner} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scan size={15} />
                <span>Upload & AI Scan Report</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {patient.documents.map(doc => (
                <div key={doc.id} style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className="badge badge-primary">{doc.category}</span>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {doc.date}
                      </span>
                    </div>

                    <h4 style={{ margin: '4px 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {doc.title}
                    </h4>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      {doc.facility} • {doc.doctor}
                    </div>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 12px' }}>
                      {doc.summary}
                    </p>

                    {/* Key Extracted Values Chip list */}
                    {doc.keyValues && Object.keys(doc.keyValues).length > 0 && (
                      <div style={{
                        background: 'var(--bg-surface)',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Key Extracted Values:</span>
                        {Object.entries(doc.keyValues).map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                            <strong className="font-mono" style={{ color: 'var(--primary)' }}>{v}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                      {doc.fileType} • {doc.fileSize}
                    </span>
                    <button 
                      onClick={() => alert(`Opening report viewer for: ${doc.title}`)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: SMART CONSENT MANAGEMENT ================= */}
      {activeTab === 'consent' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
          {/* Active Consents Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Smart Doctor Access & Consent Management</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Approve access for specific doctors, choose what record categories to share, set expiry dates, or revoke instantly
                </p>
              </div>
              <button onClick={onGrantConsentOpen} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={15} />
                <span>+ Grant New Doctor Consent</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {patient.consents.map(consent => {
                const isActive = consent.status === 'Active';
                return (
                  <div key={consent.id} style={{
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    border: isActive ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}>
                    {/* Consent Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {consent.doctorName}
                          </h4>
                          <span className={`badge ${isActive ? 'badge-emerald' : 'badge-neutral'}`}>
                            {consent.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {consent.specialty} • {consent.hospital}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right', fontSize: '0.78rem' }}>
                          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Expiry Date:</span>
                          <strong className="font-mono" style={{ color: isActive ? 'var(--text-main)' : 'var(--rose)' }}>
                            {new Date(consent.expiryDate).toLocaleDateString()}
                          </strong>
                        </div>

                        {isActive && (
                          <button
                            onClick={() => onRevokeConsent(consent.id)}
                            className="btn btn-rose btn-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <XCircle size={14} />
                            <span>Revoke Access</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Checkboxes / Pills */}
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        Permitted Information Categories:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {Object.entries(consent.categories).map(([cat, isPermitted]) => (
                          <button
                            key={cat}
                            disabled={!isActive}
                            onClick={() => onToggleConsentCategory(consent.id, cat)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: isPermitted ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                              background: isPermitted ? 'var(--primary-light)' : 'var(--bg-surface)',
                              color: isPermitted ? 'var(--primary)' : 'var(--text-muted)',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: isActive ? 'pointer' : 'default'
                            }}
                          >
                            <span>{isPermitted ? '✓' : '✗'}</span>
                            <span style={{ textTransform: 'capitalize' }}>{cat.replace(/([A-Z])/g, ' $1')}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Access count badge */}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '16px' }}>
                      <span>Access Count: <strong>{consent.accessCount} consultations</strong></span>
                      {consent.lastAccessed && (
                        <span>Last Accessed: {new Date(consent.lastAccessed).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Access Logs Audit Table */}
          <div className="card">
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', fontWeight: 800 }}>
              Live Access Audit Log (Who accessed what and when)
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '8px 12px' }}>Timestamp</th>
                    <th style={{ padding: '8px 12px' }}>Authorized Clinician / User</th>
                    <th style={{ padding: '8px 12px' }}>Action & Description</th>
                    <th style={{ padding: '8px 12px' }}>Sections Accessed</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.accessLogs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td className="font-mono" style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                        {log.actor} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>{log.role}</span>
                      </td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                        {log.action}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {log.sectionsAccessed.map((sec, i) => (
                            <span key={i} className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>{sec}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span className="badge badge-emerald">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 8: REMINDERS & FOLLOW-UPS ================= */}
      {activeTab === 'reminders' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }} className="animate-fade-in">
          {/* Daily Meds Schedule */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Pill size={18} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Today's Medication Schedule</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {patient.medications.filter(m => m.status === 'Active').map(m => {
                const isChecked = !!reminderDosesChecked[m.id];
                return (
                  <div key={m.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    background: isChecked ? 'var(--emerald-light)' : 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: isChecked ? '1px solid rgba(5, 150, 105, 0.3)' : '1px solid var(--border-subtle)',
                    transition: 'all 0.2s'
                  }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: isChecked ? 'var(--emerald)' : 'var(--text-main)' }}>
                        {m.name} ({m.dosage})
                      </strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {m.frequency} • Schedule: {m.reminderTime}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleDoseCheck(m.id)}
                      className={`btn btn-sm ${isChecked ? 'btn-emerald' : 'btn-secondary'}`}
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      {isChecked ? '✓ Completed' : 'Take Dose'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Care Consultations */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Calendar size={18} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Upcoming Doctor Appointments</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '14px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Cardiology 6-Month Checkup</strong>
                  <span className="badge badge-primary">Confirmed</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Dr. Julian Carter • Boston Heart Institute
                </div>
                <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--primary)', marginTop: '6px' }}>
                  📅 Oct 28, 2024 at 10:30 AM (In 17 Days)
                </div>
              </div>

              <div style={{
                padding: '14px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Routine Endocrine & HbA1c Lab</strong>
                  <span className="badge badge-amber">Due Soon</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Quest Diagnostics Regional Lab
                </div>
                <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--amber)', marginTop: '6px' }}>
                  📅 Nov 15, 2024 (Fasting Blood Sugar Panel)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </main>
      </div>

      {/* QR Code Sharing Modal */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center', padding: '32px 24px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800 }}>Patient QR Code</h3>
            <p style={{ margin: '0 0 20px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Scan at a healthcare clinic to initiate secure consent authorization
            </p>

            {/* Generated QR Matrix Simulation */}
            <div style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              display: 'inline-block',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--border-medium)',
              margin: '0 auto 20px'
            }}>
              <svg width="180" height="180" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#ffffff" />
                {/* QR Finder Top-Left */}
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
                <rect x="11" y="11" width="13" height="13" fill="#0f172a" />
                {/* QR Finder Top-Right */}
                <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
                <rect x="76" y="11" width="13" height="13" fill="#0f172a" />
                {/* QR Finder Bottom-Left */}
                <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
                <rect x="11" y="76" width="13" height="13" fill="#0f172a" />
                {/* Simulated Data blocks */}
                <rect x="35" y="10" width="6" height="6" fill="#0284c7" />
                <rect x="45" y="15" width="6" height="6" fill="#0f172a" />
                <rect x="55" y="8" width="6" height="6" fill="#0284c7" />
                <rect x="35" y="35" width="30" height="30" rx="4" fill="#0284c7" opacity="0.15" />
                <circle cx="50" cy="50" r="8" fill="#0284c7" />
                <rect x="10" y="45" width="15" height="6" fill="#0f172a" />
                <rect x="75" y="45" width="15" height="6" fill="#0f172a" />
                <rect x="45" y="75" width="10" height="15" fill="#0f172a" />
                <rect x="70" y="75" width="15" height="15" fill="#0284c7" />
              </svg>
            </div>

            <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
              {patient.id}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Token: ehr://caresync.health/verify/{patient.id}?tok=89f4b
            </div>

            <div style={{
              marginTop: '20px',
              padding: '10px',
              background: 'var(--bg-subtle)',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              ⚠️ Scanning this QR code allows a doctor to submit a consent request. It will NOT grant access until you approve it.
            </div>

            <button onClick={() => setShowQRModal(false)} className="btn btn-primary btn-sm" style={{ marginTop: '20px', width: '100%' }}>
              Close QR Code
            </button>
          </div>
        </div>
      )}

      {/* Patient Profile Details & Edit Modal */}
      {showProfileModal && (
        <PatientProfileModal
          patient={patient}
          onUpdatePatient={onUpdatePatient}
          onClose={() => setShowProfileModal(false)}
          onOpenQR={() => {
            setShowProfileModal(false);
            setShowQRModal(true);
          }}
        />
      )}
    </div>
  );
}

