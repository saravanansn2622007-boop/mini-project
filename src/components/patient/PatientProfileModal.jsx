import React, { useState } from 'react';
import { 
  User, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  ShieldCheck, 
  Edit3, 
  Save, 
  CheckCircle,
  QrCode,
  Building,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function PatientProfileModal({ patient, onUpdatePatient, onClose, onOpenQR }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    dob: patient?.dob || '',
    gender: patient?.gender || 'Female',
    bloodGroup: patient?.bloodGroup || 'O+',
    phone: patient?.phone || '',
    email: patient?.email || '',
    address: patient?.address || '',
    emergencyName: patient?.emergencyContact?.name || '',
    emergencyPhone: patient?.emergencyContact?.phone || '',
    emergencyRelation: patient?.emergencyContact?.relation || 'Spouse',
    insuranceId: patient?.insuranceId || 'MED-CARE-882194-A'
  });

  if (!patient) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdatePatient) {
      onUpdatePatient({
        ...patient,
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        insuranceId: formData.insuranceId,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation
        }
      });
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex'
            }}>
              <User size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Personal Health Profile
                </h3>
                <span className="badge badge-primary font-mono" style={{ fontSize: '0.75rem' }}>
                  {patient.id}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Official patient identification and personal health demographics
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Identity Header Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            padding: '18px 20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={patient.avatar} 
                  alt={patient.name} 
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: 'var(--emerald)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  border: '2px solid #fff'
                }}>
                  ✓
                </span>
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isEditing ? formData.name : patient.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.8125rem' }}>
                  <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    ID: {patient.id}
                  </span>
                  <span>•</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {patient.gender}, Age {patient.age}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                textAlign: 'center',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--rose-light)',
                border: '1px solid rgba(225, 29, 72, 0.25)'
              }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', display: 'block' }}>
                  Blood Group
                </span>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--rose)', lineHeight: 1 }}>
                  {isEditing ? formData.bloodGroup : patient.bloodGroup}
                </span>
              </div>

              {onOpenQR && (
                <button
                  type="button"
                  onClick={onOpenQR}
                  className="btn btn-secondary btn-sm"
                  title="View QR Code"
                  style={{ padding: '8px 10px' }}
                >
                  <QrCode size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Form or Read View */}
          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Legal Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Date of Birth *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="form-control"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Blood Group</label>
                  <select 
                    value={formData.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    className="form-control"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Insurance ID</label>
                  <input 
                    type="text" 
                    value={formData.insuranceId}
                    onChange={(e) => handleChange('insuranceId', e.target.value)}
                    className="form-control font-mono"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Residential Address</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="form-control"
                />
              </div>

              {/* Emergency Contact Sub-section */}
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose)', display: 'block', marginBottom: '8px' }}>
                  Emergency Contact Details
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Contact Name"
                    value={formData.emergencyName}
                    onChange={(e) => handleChange('emergencyName', e.target.value)}
                    className="form-control"
                  />
                  <input 
                    type="tel" 
                    placeholder="Emergency Phone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    className="form-control"
                  />
                  <input 
                    type="text" 
                    placeholder="Relationship"
                    value={formData.emergencyRelation}
                    onChange={(e) => handleChange('emergencyRelation', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={15} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Profile Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Date of Birth</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Calendar size={14} color="var(--primary)" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{patient.dob}</strong>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Medical Insurance / Policy</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <ShieldCheck size={14} color="var(--emerald)" />
                    <strong className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {formData.insuranceId}
                    </strong>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Phone size={14} color="var(--primary)" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 600 }}>{patient.phone}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Mail size={14} color="var(--primary)" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 600 }}>{patient.email}</span>
                  </div>
                </div>
              </div>

              {/* Residential Address */}
              <div style={{ background: 'var(--bg-subtle)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Residential Address</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <MapPin size={14} color="var(--primary)" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{patient.address}</span>
                </div>
              </div>

              {/* Primary Emergency Contact */}
              <div style={{
                background: 'var(--bg-subtle)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--rose)'
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                  Primary In-Case-of-Emergency Contact
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {patient.emergencyContact?.name}
                    </strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Relation: {patient.emergencyContact?.relation}
                    </div>
                  </div>
                  <a 
                    href={`tel:${patient.emergencyContact?.phone}`}
                    className="btn btn-rose btn-sm"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Phone size={13} />
                    <span>{patient.emergencyContact?.phone}</span>
                  </a>
                </div>
              </div>

              {/* Security info */}
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'var(--primary-light)',
                padding: '10px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>
                  This health profile is encrypted at rest using AES-256. Sharing access requires explicit consent tokens.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-subtle)'
        }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Edit3 size={15} />
              <span>Edit Profile Details</span>
            </button>
          ) : (
            <div />
          )}

          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
