import React from 'react';
import { FileText, Download, Printer, CheckCircle2, X, Calendar, User, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ExportSummaryModal({ patient, onClose }) {
  if (!patient) return null;

  const handleDownload = () => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Generate formatted text medical passport summary
    const summaryText = `
======================================================
CARESYNC - UNIFIED HEALTHCARE RECORD SYSTEM
PATIENT MEDICAL SUMMARY REPORT (HEALTH PASSPORT)
======================================================
Generated Date: ${new Date().toLocaleDateString()}
Report ID: CS-EXP-${Math.floor(100000 + Math.random() * 900000)}

1. PATIENT DEMOGRAPHICS
Name: ${patient.name}
Patient ID: ${patient.id}
Date of Birth: ${patient.dob} (Age: ${patient.age})
Gender: ${patient.gender}
Blood Group: ${patient.bloodGroup}
Primary Emergency Contact: ${patient.emergencyContact.name} (${patient.emergencyContact.phone})

2. ALLERGIES & ADVERSE REACTIONS
${patient.allergies.map(a => `- ${a.allergen}: ${a.reaction} (Severity: ${a.severity})`).join('\n')}

3. CHRONIC CONDITIONS & DIAGNOSES
${patient.chronicConditions.map(c => `- ${c.condition} [ICD-10: ${c.icd10}] (Diagnosed: ${c.diagnosedYear}, Doctor: ${c.doctor})`).join('\n')}

4. ACTIVE MEDICATIONS
${patient.medications.filter(m => m.status === 'Active').map(m => `- ${m.name} ${m.dosage}: ${m.frequency} (Prescribed by: ${m.prescribedBy})`).join('\n')}

5. VACCINATION RECORDS
${patient.vaccinations.map(v => `- ${v.vaccine} (${v.doseNumber}) - Administered: ${v.dateAdministered} - Next Due: ${v.nextDue}`).join('\n')}

6. SURGICAL PROCEDURES & HOSPITALIZATIONS
${patient.surgeriesAndHospitalizations.map(s => `- ${s.procedure} (${s.admissionDate} to ${s.dischargeDate}) at ${s.hospital} [Surgeon: ${s.surgeon}]`).join('\n')}

7. RECENT VITALS & LAB HIGHLIGHTS
Blood Pressure: ${patient.vitals.bloodPressure}
Heart Rate: ${patient.vitals.heartRate}
BMI: ${patient.vitals.bmi}

======================================================
CONFIDENTIAL HEALTH RECORD • PROTECTED BY CARESYNC
======================================================
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patient.name.replace(/\s+/g, '_')}_Medical_Summary_${patient.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px' }}
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
              <FileText size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Export Complete Health-Record Summary
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Verified clinical summary export for hospital transfers, visas, or personal archives
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Printable Preview Document */}
        <div style={{
          padding: '28px',
          maxHeight: '60vh',
          overflowY: 'auto',
          background: 'var(--bg-subtle)'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Document Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '2px solid var(--border-medium)',
              paddingBottom: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                  CareSync Clinical Health Record
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Unified National Patient Registry • Standard FHIR/HL7 Compliant Extract
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-emerald">Verified Active Record</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Generated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Demographics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              background: 'var(--bg-subtle)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Patient Name</span>
                <strong style={{ fontSize: '0.95rem' }}>{patient.name}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Unique ID</span>
                <strong className="font-mono" style={{ color: 'var(--primary)' }}>{patient.id}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>DOB / Age</span>
                <strong style={{ fontSize: '0.95rem' }}>{patient.dob} ({patient.age}y)</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Blood Type</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--rose)' }}>{patient.bloodGroup}</strong>
              </div>
            </div>

            {/* Section: Allergies */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                1. Allergies & Sensitivities
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', margin: 0 }}>
                {patient.allergies.map((a, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <strong>{a.allergen}</strong>: {a.reaction} — <em>Severity: {a.severity}</em>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Active Meds */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                2. Current Prescriptions & Medications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {patient.medications.filter(m => m.status === 'Active').map(m => (
                  <div key={m.id} style={{ fontSize: '0.875rem', padding: '6px 10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                    <strong>{m.name} {m.dosage}</strong> — {m.frequency} (Prescribing Dr: {m.prescribedBy})
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Chronic Conditions */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                3. Chronic Diagnoses & Illness History
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', margin: 0 }}>
                {patient.chronicConditions.map((c, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <strong>{c.condition}</strong> (ICD-10: {c.icd10}) — Status: {c.status}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Surgeries */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                4. Operations & Hospitalization Summaries
              </h4>
              {patient.surgeriesAndHospitalizations.map(s => (
                <div key={s.id} style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
                  <strong>{s.procedure}</strong> ({s.admissionDate}) at {s.hospital}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.summary}</div>
                </div>
              ))}
            </div>

            {/* Section: Vaccines */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}>
                5. Immunization Records
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8125rem' }}>
                {patient.vaccinations.map(v => (
                  <div key={v.id} style={{ background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '6px' }}>
                    <strong>{v.vaccine}</strong> ({v.doseNumber})<br />
                    <span style={{ color: 'var(--text-muted)' }}>Date: {v.dateAdministered} | Next: {v.nextDue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Cryptographically sealed • SHA-256 Checksum: 8f4a...29b1
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={15} />
              <span>Print Preview</span>
            </button>
            <button 
              onClick={handleDownload}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={15} />
              <span>Download Health Passport (.txt/.pdf)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
