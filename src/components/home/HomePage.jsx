import React from 'react';
import { 
  User, 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Scan, 
  Clock, 
  TrendingUp, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  QrCode,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react';

export function HomePage({ onSelectModule, onOpenEmergencyModal }) {
  const modules = [
    {
      id: 'patient',
      title: 'Patient Portal',
      tag: 'Personal Health Records',
      badgeColor: 'primary',
      icon: User,
      description: "Manage your unified health profile, track chronic conditions and surgeries, schedule medications, scan lab reports with AI OCR, and manage doctor access consent.",
      highlights: [
        'Complete medical, surgical & vaccination history',
        'Granular consent management & auto-expiration',
        'AI OCR document scanning & verification',
        'Longitudinal biomarker trend charts'
      ],
      actionText: 'Enter Patient Portal',
      btnClass: 'btn-primary',
      accentColor: '#0284c7'
    },
    {
      id: 'doctor',
      title: 'Doctor Portal',
      tag: 'Clinical Decision Hub',
      badgeColor: 'emerald',
      icon: Stethoscope,
      description: "Securely search patient records by ID or QR code, verify patient consent, review complete clinical summaries on one screen, and record consultation notes & e-prescriptions.",
      highlights: [
        'Zero-trust consent verification gatekeeper',
        'One-look summary: allergies, meds & vitals',
        'Sign consultations & ICD-10 diagnoses',
        'Side-by-side past vs latest lab comparator'
      ],
      actionText: 'Enter Doctor Portal',
      btnClass: 'btn-emerald',
      accentColor: '#059669'
    },
    {
      id: 'admin',
      title: 'Administrator Console',
      tag: 'Governance & Security',
      badgeColor: 'purple',
      icon: ShieldCheck,
      description: "Verify state medical licenses for practicing doctors, manage registered patient user accounts, and inspect the system-wide immutable cryptographic audit trail.",
      highlights: [
        'Doctor credentialing & license approval',
        'Patient identity token administration',
        'Immutable cryptographic audit ledger',
        'HIPAA & GDPR compliance monitoring'
      ],
      actionText: 'Enter Admin Console',
      btnClass: 'btn-secondary',
      accentColor: '#7c3aed'
    },
    {
      id: 'emergency',
      title: 'ER Break-Glass',
      tag: 'Level-1 Emergency Care',
      badgeColor: 'rose',
      icon: AlertTriangle,
      description: "Paramedic and ER trauma team emergency override. Bypasses routine consent to display critical life-saving allergies, blood types, and medications with mandatory statutory audit logs.",
      highlights: [
        'Instant blood group & transfusion type',
        'Severe allergy & anaphylaxis warnings',
        'Active blood thinners & drug alerts',
        'Mandatory first responder audit logging'
      ],
      actionText: 'Open Emergency Pass',
      btnClass: 'btn-rose',
      accentColor: '#e11d48'
    }
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Patient Registers',
      desc: 'Creates a verified profile and gets a unique pseudonymous Patient ID (e.g. PAT-88219).'
    },
    {
      num: '02',
      title: 'Uploads Medical History',
      desc: 'Adds chronic conditions, surgeries, active medications, vaccines, and scans paper reports via OCR.'
    },
    {
      num: '03',
      title: 'Smart Consent Delegation',
      desc: 'Selects the specific doctor, chooses permitted record categories, and sets a strict expiry timer.'
    },
    {
      num: '04',
      title: 'Doctor Reviews & Consults',
      desc: 'Doctor verifies consent, inspects longitudinal trends, authors diagnoses, and issues e-prescriptions.'
    },
    {
      num: '05',
      title: 'Audited in Real-Time',
      desc: 'Every access, note, and update is cryptographically logged into the immutable audit trail.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', paddingBottom: '60px' }} className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 50%, rgba(248, 250, 252, 0) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '64px 24px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Top Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            border: '1px solid var(--border-accent)',
            color: 'var(--primary)',
            fontSize: '0.8125rem',
            fontWeight: 700
          }}>
            <Sparkles size={14} />
            <span>Unified Healthcare Record System</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>Consent-Governed & Zero-Trust</span>
          </div>

          {/* Hero Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text-main)',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            Seamless Patient Information Sharing with <span style={{
              background: 'linear-gradient(135deg, #0284c7, #0d9488)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Smart Consent</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            lineHeight: 1.6,
            margin: 0
          }}>
            A centralized platform that stores complete patient medical histories and enables secure, consent-based access for healthcare providers, doctors, and emergency responders.
          </p>

          {/* Call to Actions */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <button
              onClick={() => onSelectModule('patient')}
              className="btn btn-primary btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px var(--primary-glow)' }}
            >
              <User size={18} />
              <span>Launch Patient Portal</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onSelectModule('doctor')}
              className="btn btn-secondary btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <Stethoscope size={18} color="var(--primary)" />
              <span>Doctor Clinical Portal</span>
            </button>

            <button
              onClick={() => onSelectModule('emergency')}
              className="btn btn-rose btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <AlertTriangle size={18} />
              <span>Emergency Break-Glass</span>
            </button>
          </div>

          {/* Key Trust Signals */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginTop: '24px',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--emerald)" /> Patient ID Does Not Grant Auto-Access
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--emerald)" /> Granular Category-Level Permissions
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--emerald)" /> Immutable Cryptographic Audit Ledger
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Modules Showcase (The Core Cards) */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Explore System Modules</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 8px', letterSpacing: '-0.02em' }}>
            Choose a Module to Get Started
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            Click on any module card below to test the full interactive workflow
          </p>
        </div>

        {/* 4 Modules Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px'
        }}>
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div 
                key={m.id}
                className="card"
                onClick={() => onSelectModule(m.id)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px 24px',
                  borderTop: `4px solid ${m.accentColor}`,
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      background: `var(--${m.badgeColor}-light)`,
                      color: `var(--${m.badgeColor})`,
                      padding: '12px',
                      borderRadius: '14px',
                      display: 'flex'
                    }}>
                      <Icon size={26} strokeWidth={2.2} />
                    </div>
                    <span className={`badge badge-${m.badgeColor}`} style={{ fontSize: '0.72rem' }}>
                      {m.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 10px' }}>
                    {m.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {m.description}
                  </p>

                  <div style={{
                    background: 'var(--bg-subtle)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '20px'
                  }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Key Capabilities:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {m.highlights.map((h, idx) => (
                        <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={13} color={m.accentColor} style={{ flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  className={`btn ${m.btnClass}`}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <span>{m.actionText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* How the Complete System Works (Interactive Flow) */}
      <section style={{
        background: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '56px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>Security & Consent Protocol</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 8px' }}>
              How the Unified Record System Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '640px', margin: '0 auto' }}>
              Patient autonomy is paramount: patient identification does not equal automatic medical history disclosure.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '24px 20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                <div className="font-mono" style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: 'var(--primary)',
                  opacity: 0.8,
                  marginBottom: '10px'
                }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standout Innovations Grid */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Advanced Features</span>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 8px' }}>
            Innovations That Make CareSync Stand Out
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Going beyond basic document storage with clinical intelligence and cryptographic safety
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {[
            {
              icon: Clock,
              title: 'A. Unified Medical Timeline',
              desc: 'High priority event stream displaying every major clinical event chronologically — diagnoses, prescriptions, surgeries, lab tests, and hospitalizations.'
            },
            {
              icon: Lock,
              title: 'B. Smart Consent Management',
              desc: 'Patients grant, review, configure granular categories (Profile, Allergies, Meds, Labs, Vaccines), set expiry timers, and revoke access with real-time audit logs.'
            },
            {
              icon: Scan,
              title: 'C. Automatic Document Reading (OCR)',
              desc: 'AI text extraction for uploaded paper prescriptions and blood test PDFs. Extracts dates, biomarkers, and drugs for patient/clinician verification before saving.'
            },
            {
              icon: TrendingUp,
              title: 'D. Longitudinal Lab Result Trends',
              desc: 'Interactive SVG visualizer displaying compatible test results (Glucose, HbA1c, BP, Cholesterol) over time with reference standards and clinical trajectories.'
            },
            {
              icon: Activity,
              title: 'E. Reminders & Follow-Ups',
              desc: 'Daily medication schedules with dose check-offs, upcoming doctor appointments, and booster shot countdowns with manageable alert settings.'
            },
            {
              icon: AlertTriangle,
              title: 'F. Emergency Health Summary (Pass)',
              desc: 'Rapid-access card and Level-1 triage mode for EMTs and ER doctors. Critical allergies, blood groups, and active meds with mandatory statutory audit logging.'
            }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="card" style={{ padding: '24px' }}>
                <div style={{
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '10px',
                  borderRadius: '12px',
                  width: 'fit-content',
                  marginBottom: '14px'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 8px' }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Banner */}
      <footer style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px 0',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--primary)" />
          <strong style={{ color: 'var(--text-main)' }}>CareSync EHR</strong> — Unified Healthcare Record System
        </div>
        <div>
          Zero-Trust Privacy • FHIR/HL7 Compliant • 256-bit AES GCM Encryption
        </div>
      </footer>
    </div>
  );
}
