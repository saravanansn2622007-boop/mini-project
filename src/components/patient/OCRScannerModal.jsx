import React, { useState } from 'react';
import { 
  Scan, 
  UploadCloud, 
  FileCheck, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Database,
  Calendar,
  Building
} from 'lucide-react';
import { SAMPLE_OCR_TEMPLATES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function OCRScannerModal({ patient, onAddDocumentRecord, onClose }) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [customFileSelected, setCustomFileSelected] = useState(false);

  const activeTemplate = SAMPLE_OCR_TEMPLATES[selectedTemplateIndex];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setExtractedData(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setExtractedData(activeTemplate.detectedFields);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleVerifyAndSave = () => {
    if (!extractedData) return;

    // Create a new document in the patient's records
    const newDoc = {
      id: `DOC-OCR-${Date.now()}`,
      title: `${extractedData.category}: ${activeTemplate.name}`,
      category: extractedData.category,
      date: extractedData.date,
      facility: extractedData.facility,
      doctor: 'Dr. OCR Ingestion (Verified)',
      fileType: 'PDF/OCR',
      fileSize: '1.2 MB',
      summary: `Automated OCR extracted and patient-verified: ${extractedData.structuredValues.map(v => `${v.parameter}: ${v.value}`).join(', ')}`,
      keyValues: extractedData.structuredValues.reduce((acc, curr) => {
        acc[curr.parameter] = curr.value;
        return acc;
      }, {})
    };

    onAddDocumentRecord(newDoc, extractedData);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '840px' }}
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
              <Scan size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Intelligent Document Scanner (OCR)
                </h3>
                <span className="badge badge-primary">
                  <Sparkles size={11} /> AI Assisted
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Extract dates, test names, and biomarkers from uploaded medical scans before saving
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Sample Picker or Upload */}
          <div>
            <label className="form-label">
              <span>Select Sample Medical Document or Upload Scan</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interactive Demo</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {SAMPLE_OCR_TEMPLATES.map((tmpl, idx) => (
                <div
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplateIndex(idx);
                    setExtractedData(null);
                    setCustomFileSelected(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedTemplateIndex === idx && !customFileSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: selectedTemplateIndex === idx && !customFileSelected ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s'
                  }}
                >
                  <FileCheck size={24} color={selectedTemplateIndex === idx && !customFileSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                  <div>
                    <strong style={{ fontSize: '0.875rem', color: selectedTemplateIndex === idx && !customFileSelected ? 'var(--primary)' : 'var(--text-main)', display: 'block' }}>
                      {tmpl.name}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {tmpl.sampleImageName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scanner Simulation Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) 1.2fr',
            gap: '20px',
            alignItems: 'stretch'
          }}>
            {/* Visual Document & Scanning Frame */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '2px dashed var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '260px',
              overflow: 'hidden'
            }}>
              {/* Document Mockup View */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                borderRadius: '8px',
                width: '100%',
                padding: '16px',
                fontSize: '0.75rem',
                color: '#334155',
                position: 'relative'
              }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeTemplate.detectedFields.facility}</span>
                  <span style={{ color: '#64748b' }}>{activeTemplate.detectedFields.date}</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Patient:</strong> {patient.name} ({patient.id})
                </div>
                <pre style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap',
                  color: '#475569',
                  margin: 0
                }}>
                  {activeTemplate.detectedFields.extractedText}
                </pre>
              </div>

              {/* Scanning Laser Beam Overlay */}
              {isScanning && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(2, 132, 199, 0.1) 0%, rgba(2, 132, 199, 0.3) 50%, rgba(2, 132, 199, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '100%',
                    height: '3px',
                    background: '#0284c7',
                    boxShadow: '0 0 15px #0284c7, 0 0 25px #38bdf8',
                    position: 'absolute',
                    top: `${scanProgress}%`,
                    transition: 'top 0.3s linear'
                  }} />
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Scan size={16} className="animate-spin" />
                    <span>Analyzing Image... {scanProgress}%</span>
                  </div>
                </div>
              )}

              {/* Scan Trigger Button if not yet extracted */}
              {!extractedData && !isScanning && (
                <div style={{ marginTop: '16px', width: '100%' }}>
                  <button 
                    onClick={handleStartScan}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Scan size={16} />
                    <span>Run OCR Text Extraction</span>
                  </button>
                </div>
              )}
            </div>

            {/* Extracted Structured Data Verification Section */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Extracted Structured Data
                  </h4>
                  {extractedData ? (
                    <span className="badge badge-emerald">
                      <CheckCircle size={12} /> Ready For Verification
                    </span>
                  ) : (
                    <span className="badge badge-neutral">Awaiting Scan</span>
                  )}
                </div>

                {extractedData ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Header verification chips */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      background: 'var(--bg-subtle)',
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem'
                    }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Patient Match:</span>
                        <strong style={{ color: 'var(--emerald)' }}>✓ {extractedData.patientName} ({extractedData.patientId})</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Document Date:</span>
                        <strong>{extractedData.date}</strong>
                      </div>
                    </div>

                    {/* Extracted Values Table */}
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        Extracted Clinical Biomarkers / Parameters:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {extractedData.structuredValues.map((val, idx) => (
                          <div 
                            key={idx}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 10px',
                              background: 'var(--bg-subtle)',
                              borderRadius: '6px',
                              fontSize: '0.8125rem'
                            }}
                          >
                            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{val.parameter}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                                {val.value}
                              </span>
                              <span className={`badge ${val.flag.includes('High') || val.flag.includes('Pre-diabetes') ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.7rem' }}>
                                {val.flag}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={14} color="var(--primary)" />
                      <span>Review and verify these values before committing to your permanent record.</span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '36px 16px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    <Scan size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                    <p>Click "Run OCR Text Extraction" on the left to simulate automated text scanning and biomarker detection.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <button onClick={onClose} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                {extractedData && (
                  <button 
                    onClick={handleVerifyAndSave}
                    className="btn btn-emerald btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <CheckCircle size={16} />
                    <span>Verify & Save to Records</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
