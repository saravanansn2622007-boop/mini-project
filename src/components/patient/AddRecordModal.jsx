import React, { useState } from 'react';
import { PlusCircle, X, ShieldAlert, Pill, Stethoscope, Syringe, FileText } from 'lucide-react';

export function AddRecordModal({ onAddRecord, onClose }) {
  const [recordType, setRecordType] = useState('medication'); // 'allergy', 'medication', 'condition', 'vaccine'

  // Medication form state
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFreq, setMedFreq] = useState('');
  const [medDoctor, setMedDoctor] = useState('');

  // Allergy form state
  const [allergen, setAllergen] = useState('');
  const [allergyReaction, setAllergyReaction] = useState('');
  const [allergySeverity, setAllergySeverity] = useState('Moderate');

  // Condition form state
  const [conditionName, setConditionName] = useState('');
  const [conditionIcd, setConditionIcd] = useState('');
  const [conditionDoctor, setConditionDoctor] = useState('');

  // Vaccine form state
  const [vaccineName, setVaccineName] = useState('');
  const [doseNumber, setDoseNumber] = useState('Dose 1');
  const [vacFacility, setVacFacility] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recordType === 'medication') {
      if (!medName) return;
      onAddRecord('medication', {
        id: `MED-${Date.now()}`,
        name: medName,
        dosage: medDosage || 'Standard',
        frequency: medFreq || 'Once daily',
        startDate: new Date().toISOString().split('T')[0],
        endDate: 'Ongoing',
        prescribedBy: medDoctor || 'Self-Reported / Attending Physician',
        status: 'Active',
        instructions: 'Take as directed.',
        reminderTime: '08:00'
      });
    } else if (recordType === 'allergy') {
      if (!allergen) return;
      onAddRecord('allergy', {
        allergen,
        reaction: allergyReaction || 'Mild reaction',
        severity: allergySeverity,
        diagnosedDate: new Date().toISOString().split('T')[0]
      });
    } else if (recordType === 'condition') {
      if (!conditionName) return;
      onAddRecord('condition', {
        condition: conditionName,
        icd10: conditionIcd || 'R69',
        diagnosedYear: new Date().getFullYear().toString(),
        status: 'Active',
        doctor: conditionDoctor || 'Attending Physician'
      });
    } else if (recordType === 'vaccine') {
      if (!vaccineName) return;
      onAddRecord('vaccine', {
        id: `VAC-${Date.now()}`,
        vaccine: vaccineName,
        doseNumber,
        dateAdministered: new Date().toISOString().split('T')[0],
        nextDue: 'Consult Physician',
        administrator: vacFacility || 'Community Health Clinic',
        batchNumber: `VA-${Math.floor(1000 + Math.random() * 9000)}`,
        certificateUrl: '#cert'
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px' }}
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
              <PlusCircle size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Add New Medical Record Entry
              </h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Keep your centralized health record up-to-date
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Record Type Selector */}
        <div style={{ padding: '20px 24px 0' }}>
          <label className="form-label">Select Record Category</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {[
              { type: 'medication', label: 'Medicine', icon: Pill },
              { type: 'allergy', label: 'Allergy', icon: ShieldAlert },
              { type: 'condition', label: 'Condition', icon: Stethoscope },
              { type: 'vaccine', label: 'Vaccine', icon: Syringe }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = recordType === tab.type;
              return (
                <button
                  type="button"
                  key={tab.type}
                  onClick={() => setRecordType(tab.type)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-medium)',
                    background: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px' }}>
          {recordType === 'medication' && (
            <>
              <div className="form-group">
                <label className="form-label">Medication / Drug Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Metformin HCl, Lisinopril, Atorvastatin"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Dosage</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 500 mg, 10 mg"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Twice daily with meals"
                    value={medFreq}
                    onChange={(e) => setMedFreq(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Prescribing Doctor or Hospital</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Elena Rostova"
                  value={medDoctor}
                  onChange={(e) => setMedDoctor(e.target.value)}
                  className="form-control"
                />
              </div>
            </>
          )}

          {recordType === 'allergy' && (
            <>
              <div className="form-group">
                <label className="form-label">Allergen Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Penicillin, Latex, Peanuts"
                  value={allergen}
                  onChange={(e) => setAllergen(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reaction Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hives, facial swelling, anaphylaxis"
                  value={allergyReaction}
                  onChange={(e) => setAllgyReaction ? setAllergyReaction(e.target.value) : setAllergyReaction(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <select 
                  value={allergySeverity} 
                  onChange={(e) => setAllergySeverity(e.target.value)}
                  className="form-control"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe / Critical">Severe / Critical</option>
                </select>
              </div>
            </>
          )}

          {recordType === 'condition' && (
            <>
              <div className="form-group">
                <label className="form-label">Medical Condition / Diagnosis *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Primary Hypertension, Type 2 Diabetes"
                  value={conditionName}
                  onChange={(e) => setConditionName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">ICD-10 Code (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. I10, E11.9"
                    value={conditionIcd}
                    onChange={(e) => setConditionIcd(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Diagnosing Doctor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Julian Carter"
                    value={conditionDoctor}
                    onChange={(e) => setConditionDoctor(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}

          {recordType === 'vaccine' && (
            <>
              <div className="form-group">
                <label className="form-label">Vaccine Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Hepatitis B, Seasonal Influenza, Tdap"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Dose Number / Cycle</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dose 1, Booster"
                    value={doseNumber}
                    onChange={(e) => setDoseNumber(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Administered Facility</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Metro Health Pharmacy"
                    value={vacFacility}
                    onChange={(e) => setVacFacility(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
