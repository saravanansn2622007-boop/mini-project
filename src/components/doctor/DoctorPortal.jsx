import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Pill, 
  FileText, 
  Activity, 
  PlusCircle, 
  Calendar, 
  Eye, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  User,
  Scissors,
  Syringe,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function DoctorPortal({ 
  doctors, 
  activeDoctorId, 
  patients, 
  onAddDoctorConsultation,
  onRequestConsent
}) {
  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];

  const [searchPatientId, setSearchPatientId] = useState('PAT-88219');
  const [selectedPatient, setSelectedPatient] = useState(patients.find(p => p.id === 'PAT-88219') || patients[0]);
  
  // New Consultation Form States
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [icdCode, setIcdCode] = useState('E11.9');
  const [rxDrug, setRxDrug] = useState('');
  const [rxDosage, setRxDosage] = useState('');
  const [rxFrequency, setRxFrequency] = useState('');
  const [labOrder, setLabOrder] = useState('');
  const [followUpDate, setFollowUpDate] = useState('4 Weeks');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [activeDoctorTab, setActiveDoctorTab] = useState('summary'); // 'summary', 'newNote', 'compareReports', 'timeline'

  // Look up patient on search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchPatientId.trim().toUpperCase();
    const found = patients.find(p => p.id.toUpperCase() === query || p.name.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      setSelectedPatient(found);
    } else {
      alert(`No patient found matching ID or Name: "${searchPatientId}". Try PAT-88219 or PAT-94102.`);
    }
  };

  // Always resolve freshest patient from patients array
  const currentPatient = patients.find(p => p.id === (selectedPatient?.id || 'PAT-88219')) || patients[0];

  // Check consent status for this doctor and patient
  const patientConsent = currentPatient?.consents?.find(c => c.doctorId === activeDoctor.id);
  const isConsentActive = Boolean(
    patientConsent && 
    patientConsent.status === 'Active' && 
    (!patientConsent.expiryDate || new Date(patientConsent.expiryDate) > new Date() || new Date(patientConsent.expiryDate).getFullYear() >= 2025)
  );

  // Handle submitting consultation
  const handleSaveConsultation = (e) => {
    e.preventDefault();
    if (!chiefComplaint || !diagnosis) {
      alert('Please enter both Chief Complaint and Diagnosis.');
      return;
    }

    const consultationRecord = {
      id: `NOTE-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      doctor: activeDoctor.name,
      doctorId: activeDoctor.id,
      specialty: activeDoctor.specialty,
      facility: activeDoctor.hospital,
      chiefComplaint,
      diagnosis,
      icdCode,
      clinicalNotes,
      prescriptions: rxDrug ? [{ name: rxDrug, dosage: rxDosage, frequency: rxFrequency }] : [],
      labOrder,
      followUpDate
    };

    onAddDoctorConsultation(currentPatient.id, consultationRecord);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Reset form
    setChiefComplaint('');
    setDiagnosis('');
    setRxDrug('');
    setRxDosage('');
    setRxFrequency('');
    setLabOrder('');
    setClinicalNotes('');
    setActiveDoctorTab('summary');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Doctor Header Banner */}
      <div className="card card-elevated" style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px 28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img 
            src={activeDoctor.avatar} 
            alt={activeDoctor.name} 
            style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                {activeDoctor.name}
              </h1>
              <span className="badge badge-emerald">
                <ShieldCheck size={12} /> {activeDoctor.status}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              <strong>{activeDoctor.specialty}</strong> • {activeDoctor.hospital}
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              State License: {activeDoctor.licenseNumber}
            </div>
          </div>
        </div>

        {/* Patient Search Bar Gateway */}
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search Patient ID (e.g. PAT-88219)" 
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '34px', width: '260px', fontWeight: 600 }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '11px' }} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Lookup
          </button>
        </form>
      </div>

      {/* Quick Patient Switcher Pills for easy testing */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Quick Patient Selection:</span>
        {patients.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPatient(p);
              setSearchPatientId(p.id);
            }}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: currentPatient?.id === p.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: currentPatient?.id === p.id ? 'var(--primary-light)' : 'var(--bg-surface)',
              color: currentPatient?.id === p.id ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            {p.name} ({p.id})
          </button>
        ))}
      </div>

      {/* ================= CONSENT GATEKEEPER ================= */}
      {!isConsentActive ? (
        <div className="card" style={{
          textAlign: 'center',
          padding: '48px 24px',
          border: '2px dashed var(--amber)',
          background: 'var(--bg-subtle)'
        }}>
          <div style={{
            background: 'var(--amber-light)',
            color: 'var(--amber)',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock size={32} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text-main)' }}>
            Access Restricted: Active Consent Required
          </h2>
          <p style={{ maxWidth: '580px', margin: '0 auto 20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Under the CareSync Zero-Knowledge Privacy Architecture, having a Patient ID (<strong>{currentPatient?.id}</strong>) does <em>not</em> grant medical record access without explicit consent from <strong>{currentPatient?.name}</strong>.
          </p>

          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-surface)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '24px',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}>
            Status: {patientConsent ? `Consent ${patientConsent.status}` : 'No prior consent on file for this provider.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                onRequestConsent(currentPatient.id, activeDoctor);
                alert(`Consent request dispatched to ${currentPatient.name}. Access has been authorized for clinical testing.`);
              }}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <ShieldCheck size={18} />
              <span>Instant One-Click Consent (Demo Mode)</span>
            </button>
          </div>
        </div>
      ) : (
        /* ================= AUTHORIZED CLINICAL WORKBENCH ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Consent Verification Badge */}
          <div style={{
            background: 'var(--emerald-light)',
            border: '1px solid rgba(5, 150, 105, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'var(--emerald)', color: '#fff', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                <Check size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--emerald)' }}>
                  Active Consent Verified for {activeDoctor.name}
                </strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Patient: {currentPatient.name} ({currentPatient.id}) • Valid until: {new Date(patientConsent.expiryDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Permitted Categories Pill List */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Authorized Modules:</span>
              {Object.entries(patientConsent.categories).filter(([_, v]) => v).map(([k]) => (
                <span key={k} className="badge badge-emerald" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Navigation Subtabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-medium)',
            gap: '8px',
            paddingBottom: '4px'
          }}>
            {[
              { id: 'summary', label: 'Complete Patient Summary', icon: User },
              { id: 'newNote', label: '+ Add Consultation & Orders', icon: PlusCircle },
              { id: 'compareReports', label: 'View & Compare Lab Reports', icon: Activity },
              { id: 'timeline', label: 'Patient Medical Timeline', icon: Clock }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeDoctorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDoctorTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ================= SUBTAB 1: COMPLETE PATIENT SUMMARY (ONE SCREEN) ================= */}
          {activeDoctorTab === 'summary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
              {/* Severe Allergy Alert Banner */}
              <div style={{
                background: '#fff1f2',
                border: '2px solid #fecdd3',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldAlert size={24} color="#e11d48" />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#9f1239', textTransform: 'uppercase' }}>
                      Clinical Safety Alert: Severe Allergies
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                      {currentPatient.allergies.map((alg, i) => (
                        <span key={i} className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
                          <strong>{alg.allergen}:</strong> {alg.reaction} ({alg.severity})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-rose" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                    Blood Group: {currentPatient.bloodGroup}
                  </span>
                </div>
              </div>

              {/* 3-Column Summary Dashboard */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {/* Column 1: Current Medications */}
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Pill size={18} color="var(--primary)" />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Current Active Medications</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentPatient.medications.filter(m => m.status === 'Active').map(m => (
                      <div key={m.id} style={{
                        padding: '10px',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8125rem'
                      }}>
                        <strong style={{ color: 'var(--text-main)' }}>{m.name} ({m.dosage})</strong>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{m.frequency}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px' }}>
                          Prescribed: {m.prescribedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Chronic Conditions & Vitals */}
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Activity size={18} color="var(--teal)" />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Chronic Conditions & Vitals</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentPatient.chronicConditions.map((c, i) => (
                      <div key={i} style={{
                        padding: '10px',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8125rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <strong style={{ color: 'var(--text-main)' }}>{c.condition}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Diagnosed: {c.diagnosedYear}</div>
                        </div>
                        <span className="badge badge-neutral font-mono">{c.icd10}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Recent Vitals:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.78rem' }}>
                      <div>BP: <strong>{currentPatient.vitals.bloodPressure}</strong></div>
                      <div>HR: <strong>{currentPatient.vitals.heartRate}</strong></div>
                      <div>BMI: <strong>{currentPatient.vitals.bmi}</strong></div>
                      <div>SpO2: <strong>{currentPatient.vitals.oxygenSaturation}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Surgeries & Recent Lab Highlights */}
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Scissors size={18} color="var(--rose)" />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Operations & Surgical History</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentPatient.surgeriesAndHospitalizations.map(s => (
                      <div key={s.id} style={{
                        padding: '10px',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8125rem'
                      }}>
                        <strong style={{ color: 'var(--text-main)' }}>{s.procedure}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {s.hospital} ({s.admissionDate})
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {s.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SUBTAB 2: ADD CONSULTATION & ORDERS ================= */}
          {activeDoctorTab === 'newNote' && (
            <div className="card animate-fade-in">
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Record New Clinical Consultation & Orders</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Sign consultation notes, establish diagnoses, e-prescribe medications, and order lab tests
                </p>
              </div>

              <form onSubmit={handleSaveConsultation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Chief Complaint / Visit Reason *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 6-month diabetes follow-up, BP optimization"
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Clinical Diagnosis *</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Essential Primary Hypertension, Type 2 DM"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="form-control"
                        style={{ flex: 1 }}
                      />
                      <input 
                        type="text" 
                        placeholder="ICD-10"
                        value={icdCode}
                        onChange={(e) => setIcdCode(e.target.value)}
                        className="form-control font-mono"
                        style={{ width: '90px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Clinical Assessment Notes */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Objective Assessment & Consultation Notes</label>
                  <textarea 
                    placeholder="Enter examination findings, response to current medication regimen, lifestyle modifications..."
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    className="form-control"
                    rows={3}
                  />
                </div>

                {/* e-Prescription Section */}
                <div style={{
                  background: 'var(--bg-subtle)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Pill size={16} color="var(--primary)" />
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Add Prescription (e-Rx)</strong>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    <div>
                      <label className="form-label">Drug / Generic Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lisinopril, Metformin"
                        value={rxDrug}
                        onChange={(e) => setRxDrug(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label className="form-label">Dosage</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 20 mg PO"
                        value={rxDosage}
                        onChange={(e) => setRxDosage(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label className="form-label">Frequency / Schedule</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Once daily in morning"
                        value={rxFrequency}
                        onChange={(e) => setRxFrequency(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Orders & Follow-up */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Laboratory / Radiology Orders</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Fasting Lipid Panel, HbA1c in 3 months"
                      value={labOrder}
                      onChange={(e) => setLabOrder(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Follow-up Recommendation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 4 Weeks, 3 Months, PRN"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Signature Strip */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '10px'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Signing Provider: <strong>{activeDoctor.name}</strong> • Timestamp: {new Date().toLocaleString()}
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} />
                    <span>Sign & Update Patient Record</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= SUBTAB 3: VIEW & COMPARE LAB REPORTS ================= */}
          {activeDoctorTab === 'compareReports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
              {/* Comparative Biomarker Delta Table */}
              <div className="card">
                <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 800 }}>
                  Side-by-Side Lab Result Comparison (Baseline vs Latest)
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '10px 12px' }}>Biomarker / Assay</th>
                        <th style={{ padding: '10px 12px' }}>Baseline (Initial)</th>
                        <th style={{ padding: '10px 12px' }}>Latest Value</th>
                        <th style={{ padding: '10px 12px' }}>Normal Reference</th>
                        <th style={{ padding: '10px 12px' }}>Clinical Trajectory</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>Fasting Blood Glucose</td>
                        <td style={{ padding: '12px' }}>142 mg/dL (2021-08)</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>108 mg/dL (2024-08)</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>70 - 99 mg/dL</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-emerald">
                            <TrendingDown size={12} /> -34 mg/dL (Improved)
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>HbA1c (Glycated Hb)</td>
                        <td style={{ padding: '12px' }}>7.4 % (2021-08)</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>6.2 % (2024-08)</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>&lt; 5.7 %</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-emerald">
                            <TrendingDown size={12} /> -1.2 % (Target achieved)
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>Systolic Blood Pressure</td>
                        <td style={{ padding: '12px' }}>148 mmHg (2021-08)</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>128 mmHg (2024-08)</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>&lt; 120 mmHg</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-emerald">
                            <TrendingDown size={12} /> -20 mmHg (Controlled)
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>Total Cholesterol</td>
                        <td style={{ padding: '12px' }}>228 mg/dL (2021-08)</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>185 mg/dL (2024-08)</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>&lt; 200 mg/dL</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-emerald">
                            <TrendingDown size={12} /> -43 mg/dL (Desirable)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="card">
                <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 800 }}>
                  Uploaded Diagnostic Reports & Scans
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
                  {currentPatient.documents.map(doc => (
                    <div key={doc.id} style={{
                      padding: '14px',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span className="badge badge-primary">{doc.category}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.date}</span>
                      </div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block' }}>{doc.title}</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '6px 0 10px' }}>
                        {doc.summary}
                      </p>
                      <button 
                        onClick={() => alert(`Opening diagnostic viewer for: ${doc.title}`)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', fontSize: '0.75rem' }}
                      >
                        Inspect Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= SUBTAB 4: PATIENT TIMELINE ================= */}
          {activeDoctorTab === 'timeline' && (
            <div className="card animate-fade-in">
              <h3 style={{ margin: '0 0 16px', fontSize: '1.05rem', fontWeight: 800 }}>
                Chronological Medical Timeline for {currentPatient.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentPatient.timeline.map(t => (
                  <div key={t.id} style={{
                    padding: '12px 16px',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge badge-${t.badgeColor || 'primary'}`}>{t.category}</span>
                        <strong style={{ color: 'var(--text-main)' }}>{t.title}</strong>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.date}</span>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
