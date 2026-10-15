import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity, 
  FileCheck, 
  Search,
  Key,
  Shield,
  Server
} from 'lucide-react';

export function AdminDashboard({ 
  doctors, 
  onToggleDoctorVerification, 
  patients, 
  auditLogs 
}) {
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors', 'users', 'audit', 'security'
  const [auditFilter, setAuditFilter] = useState('All');

  const filteredLogs = auditFilter === 'All' 
    ? auditLogs 
    : auditLogs.filter(l => l.severity.toLowerCase() === auditFilter.toLowerCase());

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Admin Header */}
      <div className="card card-elevated" style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #334155)',
            color: '#fff',
            padding: '12px',
            borderRadius: '16px'
          }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              System Administrator & Governance Console
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Doctor Credentialing, User Account Oversight, and Cryptographic Security Auditing
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-emerald">HIPAA & GDPR Enforced</span>
          <span className="badge badge-primary">256-bit AES GCM</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {[
          { label: 'Registered Patients', val: '1,482', icon: Users, change: '+12 this week', color: 'primary' },
          { label: 'Licensed Doctors', val: doctors.length.toString(), icon: Stethoscope, change: `${doctors.filter(d => d.status === 'Verified').length} Verified`, color: 'emerald' },
          { label: 'Active Consents', val: '3,190', icon: Lock, change: '99.4% Authorized', color: 'teal' },
          { label: 'Security Score', val: '99.8%', icon: Shield, change: 'Zero breaches', color: 'purple' }
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
              <div style={{
                background: `var(--${kpi.color}-light, var(--primary-light))`,
                color: `var(--${kpi.color}, var(--primary))`,
                padding: '12px',
                borderRadius: '12px'
              }}>
                <Icon size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{kpi.label}</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--text-main)', lineHeight: 1.2 }}>{kpi.val}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-medium)',
        gap: '8px',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'doctors', label: 'Doctor Verification & Credentialing', icon: Stethoscope, count: doctors.length },
          { id: 'users', label: 'Patient User Accounts', icon: Users, count: patients.length },
          { id: 'audit', label: 'Security & Access Audit Trail', icon: FileCheck, count: auditLogs.length },
          { id: 'security', label: 'System Compliance & Encryption', icon: Server }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
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
              {tab.count !== undefined && (
                <span className={`badge ${isActive ? 'badge-primary' : 'badge-neutral'}`} style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: DOCTOR CREDENTIALING ================= */}
      {activeTab === 'doctors' && (
        <div className="card animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                Healthcare Provider Verification Registry
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Inspect state medical licenses, university board certifications, and grant/suspend EHR doctor privileges
              </p>
            </div>
            <span className="badge badge-primary">{doctors.length} Registered Clinicians</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Doctor Name & Photo</th>
                  <th style={{ padding: '10px 12px' }}>Specialty</th>
                  <th style={{ padding: '10px 12px' }}>License Number</th>
                  <th style={{ padding: '10px 12px' }}>Hospital Affiliation</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => {
                  const isVerified = doc.status === 'Verified';
                  return (
                    <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={doc.avatar} 
                            alt={doc.name} 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ color: 'var(--text-main)', display: 'block' }}>{doc.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                        {doc.specialty}
                      </td>
                      <td className="font-mono" style={{ padding: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                        {doc.licenseNumber}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                        {doc.hospital}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span className={`badge ${isVerified ? 'badge-emerald' : 'badge-amber'}`}>
                          {isVerified ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                          <span>{doc.status}</span>
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button
                          onClick={() => onToggleDoctorVerification(doc.id)}
                          className={`btn btn-sm ${isVerified ? 'btn-rose' : 'btn-emerald'}`}
                          style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                        >
                          {isVerified ? 'Revoke Credentials' : 'Verify & Approve'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 2: PATIENT ACCOUNTS ================= */}
      {activeTab === 'users' && (
        <div className="card animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Patient Account Directory</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Centralized registry of patient identifiers and verified identity tokens
              </p>
            </div>
            <span className="badge badge-primary">{patients.length} Active Records</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {patients.map(p => (
              <div key={p.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{p.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {p.gender}, Age {p.age} • Blood Group: <strong style={{ color: 'var(--rose)' }}>{p.bloodGroup}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Patient ID</span>
                    <strong className="font-mono" style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{p.id}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Emergency Contact</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.emergencyContact.name}</span>
                  </div>
                  <span className="badge badge-emerald">Identity Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: AUDIT TRAIL ================= */}
      {activeTab === 'audit' && (
        <div className="card animate-fade-in">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                System-Wide Cryptographic Audit Trail
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Immutable event ledger tracking consent grants, medical notes, document uploads, and break-glass events
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Info', 'Warning', 'Success'].map(f => (
                <button
                  key={f}
                  onClick={() => setAuditFilter(f)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: auditFilter === f ? '1px solid var(--primary)' : '1px solid var(--border-medium)',
                    background: auditFilter === f ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: auditFilter === f ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Event ID & Time</th>
                  <th style={{ padding: '10px 12px' }}>Action Type</th>
                  <th style={{ padding: '10px 12px' }}>Origin Actor</th>
                  <th style={{ padding: '10px 12px' }}>Target Resource</th>
                  <th style={{ padding: '10px 12px' }}>Audit Details</th>
                  <th style={{ padding: '10px 12px' }}>Severity</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <span className="font-mono" style={{ fontWeight: 600, color: 'var(--primary)', display: 'block' }}>{log.id}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className="badge badge-neutral font-mono" style={{ fontSize: '0.7rem' }}>
                        {log.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{log.user}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{log.target}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{log.description}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className={`badge badge-${log.severity === 'warning' ? 'rose' : log.severity === 'success' ? 'emerald' : 'primary'}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: COMPLIANCE & SECURITY ================= */}
      {activeTab === 'security' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }} className="animate-fade-in">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={20} color="var(--emerald)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Data Protection & Compliance Matrix</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                <span>HIPAA Security Rule (45 CFR § 164.312)</span>
                <span className="badge badge-emerald">Compliant</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                <span>GDPR Consent & Right to Erasure</span>
                <span className="badge badge-emerald">Compliant</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                <span>HL7 / FHIR R4 Interoperability</span>
                <span className="badge badge-primary">Standardized</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-subtle)', borderRadius: '6px' }}>
                <span>Data-At-Rest Encryption</span>
                <span className="badge badge-emerald">AES-256-GCM</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Key size={20} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Zero-Knowledge Access Policy</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              The CareSync architecture guarantees that patient IDs function solely as pseudonymous identifiers. Decryption keys for medical record nodes are derived exclusively upon validation of an active, unexpired, patient-granted consent contract.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
