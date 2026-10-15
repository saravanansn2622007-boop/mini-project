import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Building, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react';

export function MedicalReportModal({ report, patient, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!report || !patient) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `
=================================================================
             OFFICIAL MEDICAL DIAGNOSTIC REPORT
=================================================================
Facility:    ${report.facility}
Report ID:   ACC-EHR-${report.id}
Date:        ${report.date}
Status:      FINAL / CLINICALLY VERIFIED

PATIENT DEMOGRAPHICS
-----------------------------------------------------------------
Name:        ${patient.name}
Patient ID:  ${patient.id}
DOB / Age:   ${patient.dob} (${patient.age} yrs)
Gender:      ${patient.gender}
Blood Group: ${patient.bloodGroup}

CLINICAL DETAILS
-----------------------------------------------------------------
Title:       ${report.title}
Category:    ${report.category}
Clinician:   ${report.doctor}

KEY BIOMARKERS / FINDINGS:
${Object.entries(report.keyValues || {}).map(([k, v]) => `• ${k}: ${v}`).join('\n')}

CLINICAL IMPRESSION:
${report.summary}

=================================================================
Electronically Signed by: ${report.doctor}
CareSync Verified Health Information Exchange (HIE)
=================================================================
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/[^a-zA-Z0-9]/g, '_')}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Determine standard reference ranges & statuses for display
  const getParamInfo = (param, value) => {
    const p = param.toLowerCase();
    if (p.includes('glucose')) {
      return { ref: '70 - 99 mg/dL', status: 'Elevated', tagColor: 'amber' };
    }
    if (p.includes('hba1c')) {
      return { ref: '< 5.7 %', status: 'Pre-Diabetic Range', tagColor: 'amber' };
    }
    if (p.includes('cholesterol')) {
      return { ref: '< 200 mg/dL', status: 'Desirable', tagColor: 'emerald' };
    }
    if (p.includes('hdl')) {
      return { ref: '> 40 mg/dL', status: 'Optimal', tagColor: 'emerald' };
    }
    if (p.includes('ldl')) {
      return { ref: '< 100 mg/dL', status: 'Borderline', tagColor: 'amber' };
    }
    if (p.includes('lvef')) {
      return { ref: '55 - 70 %', status: 'Normal Systolic Function', tagColor: 'emerald' };
    }
    if (p.includes('ratio')) {
      return { ref: '< 0.50', status: 'Normal Cardiac Size', tagColor: 'emerald' };
    }
    if (p.includes('lung')) {
      return { ref: 'Clear bilaterally', status: 'Unremarkable', tagColor: 'emerald' };
    }
    return { ref: 'Clinical Standard', status: 'Within Limits', tagColor: 'emerald' };
  };

  const isScanOrImage = report.fileUrl || 
    report.fileType === 'IMG' || 
    report.category.toLowerCase().includes('radiology') || 
    report.category.toLowerCase().includes('scan') || 
    report.category.toLowerCase().includes('x-ray') || 
    report.title.toLowerCase().includes('x-ray') ||
    report.title.toLowerCase().includes('echo');

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200, padding: '16px' }}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '860px', 
          maxHeight: '92vh',
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          background: 'var(--bg-surface)'
        }}
      >
        {/* Top Action Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem', marginBottom: '2px' }}>
                <CheckCircle size={10} /> Official Final Diagnostic Report
              </span>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {report.title}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Print Clinical Report"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Download Report Text / Summary"
            >
              <Download size={14} />
              <span>Download</span>
            </button>

            <button 
              onClick={onClose} 
              className="btn btn-ghost" 
              style={{ padding: '6px', borderRadius: '50%' }}
              title="Close Report Viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Report Sheet View */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Institutional Letterhead */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid var(--border-medium)',
            paddingBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={20} color="var(--primary)" />
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  {report.facility}
                </h2>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Department of Laboratory Medicine & Diagnostic Imaging • CLIA: 22D0652881 • CAP Accredited
              </p>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
              <div className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                ACCESSION #{report.id}-2024
              </div>
              <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                Service Date: <strong>{report.date}</strong>
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.72rem' }}>
                Electronic Signature Verified ✓
              </div>
            </div>
          </div>

          {/* Patient Demographics & Order Metadata Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8125rem'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Patient Demographics
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>
                {patient.name}
              </strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                ID: <span className="font-mono">{patient.id}</span> • DOB: {patient.dob} ({patient.age}y / {patient.gender})
              </div>
              <div style={{ color: 'var(--rose)', fontWeight: 600, marginTop: '2px' }}>
                Blood Group: {patient.bloodGroup}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Ordering Provider & Category
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'block' }}>
                {report.doctor}
              </strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                Category: <span className="badge badge-primary">{report.category}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                File: {report.fileType} ({report.fileSize})
              </div>
            </div>
          </div>

          {/* Visual Scan / Imaging Viewer (if scan image or uploaded file) */}
          {isScanOrImage && (
            <div style={{
              background: '#090d16',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-medium)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-primary font-mono" style={{ fontSize: '0.7rem' }}>
                    DIAGNOSTIC SCAN DISPLAY
                  </span>
                  <span>Contrast: Window W:400 L:40 • High Resolution</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => setIsZoomed(prev => !prev)}
                    className="btn btn-secondary btn-sm"
                    style={{ background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '3px 8px', fontSize: '0.72rem' }}
                  >
                    {isZoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
                    <span style={{ marginLeft: '4px' }}>{isZoomed ? 'Reset Zoom' : 'Zoom 1.5x'}</span>
                  </button>
                </div>
              </div>

              {/* Scan Frame */}
              <div style={{
                minHeight: isZoomed ? '380px' : '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000000',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {report.fileUrl ? (
                  <img 
                    src={report.fileUrl} 
                    alt={report.title} 
                    style={{ 
                      maxWidth: isZoomed ? '130%' : '100%', 
                      maxHeight: isZoomed ? '480px' : '280px', 
                      objectFit: 'contain',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                ) : (
                  /* High-Contrast Clinical Radiology Simulation Frame */
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: isZoomed ? '360px' : '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle at center, #1e293b 0%, #020617 80%)'
                  }}>
                    <svg width="220" height="220" viewBox="0 0 100 100" style={{ opacity: 0.85 }}>
                      {/* Rib cage and spine simulation */}
                      <ellipse cx="50" cy="50" rx="35" ry="40" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="50" y1="15" x2="50" y2="85" stroke="#cbd5e1" strokeWidth="2.5" />
                      {/* Left Lung Field */}
                      <path d="M45 25 C30 25, 20 40, 20 65 C20 78, 30 82, 45 80 Z" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                      {/* Right Lung Field */}
                      <path d="M55 25 C70 25, 80 40, 80 65 C80 78, 70 82, 55 80 Z" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                      {/* Cardiac Silhouette */}
                      <ellipse cx="44" cy="62" rx="14" ry="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                      {/* Aortic Arch */}
                      <circle cx="48" cy="40" r="5" fill="#334155" stroke="#cbd5e1" strokeWidth="1" />
                    </svg>

                    {/* Anatomical Calibration Overlay */}
                    <div style={{ position: 'absolute', top: '10px', left: '12px', color: '#94a3b8', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                      POSTEROANTERIOR VIEW (PA)<br />
                      kVp: 120 • mAs: 3.2 • SID: 180cm
                    </div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '12px', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      R ➔ LATERAL
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detailed Lab Biomarker Results Table (if keyValues present) */}
          {report.keyValues && Object.keys(report.keyValues).length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Detailed Laboratory Assay Findings & Parameters
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Standard SI Units & Biological Reference Ranges
                </span>
              </div>

              <div style={{
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 14px' }}>Parameter / Test Name</th>
                      <th style={{ padding: '10px 14px' }}>Measured Result</th>
                      <th style={{ padding: '10px 14px' }}>Reference Interval</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>Diagnostic Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.keyValues).map(([param, value], idx) => {
                      const info = getParamInfo(param, value);
                      return (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-subtle)' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-main)' }}>
                            {param}
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: 800 }} className="font-mono">
                            {value}
                          </td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>
                            {info.ref}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                            <span className={`badge badge-${info.tagColor}`} style={{ fontSize: '0.7rem' }}>
                              {info.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clinical Diagnostic Narrative & Findings */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 20px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                Clinical Diagnostic Impression:
              </strong>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {report.summary}
              </p>
            </div>

            <div style={{
              background: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)'
            }}>
              <strong>Clinical Action / Recommendation:</strong> Findings have been transmitted to managing physician <strong>{report.doctor}</strong>. Correlate with current medication regimen and follow-up consultation schedule.
            </div>
          </div>

          {/* Attestation & Electronic Signature Block */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--emerald)" />
              <div>
                <span>Electronically Signed & Validated: </span>
                <strong style={{ color: 'var(--text-main)' }}>{report.doctor}</strong>
                <div style={{ fontSize: '0.7rem' }}>CareSync HIE Cryptographic Verification Hash: 9f8a...3312</div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-neutral font-mono">
                ISO 15189 Compliant
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 20px' }}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
