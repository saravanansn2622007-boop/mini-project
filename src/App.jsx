import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/home/HomePage';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { DoctorPortal } from './components/doctor/DoctorPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EmergencyView } from './components/emergency/EmergencyView';

import { EmergencyCardModal } from './components/patient/EmergencyCardModal';
import { ExportSummaryModal } from './components/patient/ExportSummaryModal';
import { GrantConsentModal } from './components/patient/GrantConsentModal';
import { OCRScannerModal } from './components/patient/OCRScannerModal';
import { AddRecordModal } from './components/patient/AddRecordModal';

import { 
  INITIAL_PATIENTS, 
  REGISTERED_DOCTORS, 
  SYSTEM_AUDIT_LOGS 
} from './data/mockData';

export default function App() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [doctors, setDoctors] = useState(REGISTERED_DOCTORS);
  const [auditLogs, setAuditLogs] = useState(SYSTEM_AUDIT_LOGS);

  // Default initial page is 'home' so users arrive at the main landing page!
  const [activeRole, setActiveRole] = useState('home'); // 'home' | 'patient' | 'doctor' | 'admin' | 'emergency'
  const [activePatientId, setActivePatientId] = useState('PAT-88219');
  const [activeDoctorId, setActiveDoctorId] = useState('DOC-CARTER');
  const [theme, setTheme] = useState('light');

  // Modal dialog states
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isExportSummaryOpen, setIsExportSummaryOpen] = useState(false);
  const [isGrantConsentOpen, setIsGrantConsentOpen] = useState(false);
  const [isOCRScannerOpen, setIsOCRScannerOpen] = useState(false);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);

  // Sync dark theme to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];
  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];

  // Helper: append system audit log
  const logSystemAudit = (type, user, target, description, severity = 'info') => {
    const newLog = {
      id: `AUD-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      type,
      user,
      target,
      description,
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Patient grants consent to a doctor
  const handleGrantConsent = (newConsent) => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatient.id) {
        return {
          ...p,
          consents: [newConsent, ...p.consents.filter(c => c.doctorId !== newConsent.doctorId)],
          accessLogs: [
            {
              id: `LOG-${Date.now()}`,
              timestamp: new Date().toISOString(),
              actor: `${p.name} (Patient)`,
              role: 'Patient Consent Delegation',
              action: `Granted access to ${newConsent.doctorName} (${newConsent.specialty})`,
              sectionsAccessed: Object.keys(newConsent.categories).filter(k => newConsent.categories[k]),
              ip: '127.0.0.1',
              authorized: true
            },
            ...p.accessLogs
          ]
        };
      }
      return p;
    }));

    logSystemAudit(
      'CONSENT_GRANTED',
      `${activePatient.name} (${activePatient.id})`,
      newConsent.doctorName,
      `Authorized clinical access to categories: ${Object.keys(newConsent.categories).filter(k => newConsent.categories[k]).join(', ')}`,
      'info'
    );
  };

  // 2. Patient revokes consent
  const handleRevokeConsent = (consentId) => {
    let docName = 'Doctor';
    setPatients(prev => prev.map(p => {
      if (p.id === activePatient.id) {
        const found = p.consents.find(c => c.id === consentId);
        if (found) docName = found.doctorName;
        return {
          ...p,
          consents: p.consents.map(c => c.id === consentId ? { ...c, status: 'Revoked' } : c),
          accessLogs: [
            {
              id: `LOG-${Date.now()}`,
              timestamp: new Date().toISOString(),
              actor: `${p.name} (Patient)`,
              role: 'Patient Access Control',
              action: `Revoked access consent for ${docName}`,
              sectionsAccessed: [],
              ip: '127.0.0.1',
              authorized: true
            },
            ...p.accessLogs
          ]
        };
      }
      return p;
    }));

    logSystemAudit(
      'CONSENT_REVOKED',
      `${activePatient.name} (${activePatient.id})`,
      docName,
      `Patient revoked all access rights for ${docName}`,
      'warning'
    );
  };

  // 3. Patient toggles granular consent category
  const handleToggleConsentCategory = (consentId, categoryKey) => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatient.id) {
        return {
          ...p,
          consents: p.consents.map(c => {
            if (c.id === consentId) {
              return {
                ...c,
                categories: {
                  ...c.categories,
                  [categoryKey]: !c.categories[categoryKey]
                }
              };
            }
            return c;
          })
        };
      }
      return p;
    }));
  };

  // 4. Ingest OCR scanned document
  const handleAddDocumentRecord = (newDoc, extractedData) => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatient.id) {
        // Also append to timeline
        const newTimelineEvent = {
          id: `TL-OCR-${Date.now()}`,
          date: newDoc.date,
          title: `Document Uploaded: ${newDoc.category}`,
          category: newDoc.category.includes('Blood') ? 'Lab Test' : 'Prescription',
          doctor: newDoc.doctor,
          facility: newDoc.facility,
          description: newDoc.summary,
          badgeColor: 'emerald'
        };

        return {
          ...p,
          documents: [newDoc, ...p.documents],
          timeline: [newTimelineEvent, ...p.timeline]
        };
      }
      return p;
    }));

    logSystemAudit(
      'OCR_DOCUMENT_INGESTED',
      `${activePatient.name} (${activePatient.id})`,
      newDoc.title,
      `OCR extracted and verified ${newDoc.category} from ${newDoc.facility}`,
      'success'
    );
  };

  // 5. Patient manually adds record entry (medication, allergy, condition, vaccine)
  const handleAddRecord = (type, data) => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatient.id) {
        let updated = { ...p };
        if (type === 'medication') {
          updated.medications = [data, ...p.medications];
          updated.timeline = [{
            id: `TL-ADD-${Date.now()}`,
            date: data.startDate,
            title: `Medication Added: ${data.name}`,
            category: 'Prescription',
            doctor: data.prescribedBy,
            facility: 'CareSync Patient Entry',
            description: `Started ${data.name} ${data.dosage} (${data.frequency}).`,
            badgeColor: 'amber'
          }, ...p.timeline];
        } else if (type === 'allergy') {
          updated.allergies = [data, ...p.allergies];
        } else if (type === 'condition') {
          updated.chronicConditions = [data, ...p.chronicConditions];
          updated.timeline = [{
            id: `TL-ADD-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            title: `Diagnosis: ${data.condition}`,
            category: 'Diagnosis',
            doctor: data.doctor,
            facility: 'Clinical Record Entry',
            description: `Documented condition ${data.condition} (ICD-10: ${data.icd10}).`,
            badgeColor: 'teal'
          }, ...p.timeline];
        } else if (type === 'vaccine') {
          updated.vaccinations = [data, ...p.vaccinations];
          updated.timeline = [{
            id: `TL-ADD-${Date.now()}`,
            date: data.dateAdministered,
            title: `Vaccine: ${data.vaccine}`,
            category: 'Vaccination',
            doctor: data.administrator,
            facility: data.administrator,
            description: `Administered ${data.vaccine} (${data.doseNumber}).`,
            badgeColor: 'purple'
          }, ...p.timeline];
        }
        return updated;
      }
      return p;
    }));

    logSystemAudit(
      'PATIENT_RECORD_ADDED',
      `${activePatient.name} (${activePatient.id})`,
      type.toUpperCase(),
      `Self-reported new ${type} entry into medical ledger`,
      'info'
    );
  };

  // 6. Doctor adds consultation notes and prescriptions
  const handleAddDoctorConsultation = (patientId, consultationRecord) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const timelineItem = {
          id: `TL-DOC-${Date.now()}`,
          date: consultationRecord.date,
          title: `Consultation: ${consultationRecord.diagnosis}`,
          category: 'Consultation',
          doctor: consultationRecord.doctor,
          facility: consultationRecord.facility,
          description: `Chief Complaint: ${consultationRecord.chiefComplaint}. Notes: ${consultationRecord.clinicalNotes || 'Exam completed.'}`,
          badgeColor: 'blue'
        };

        let updatedMeds = [...p.medications];
        if (consultationRecord.prescriptions?.length > 0) {
          consultationRecord.prescriptions.forEach((rx, i) => {
            updatedMeds.unshift({
              id: `MED-DOC-${Date.now()}-${i}`,
              name: rx.name,
              dosage: rx.dosage || 'Standard dose',
              frequency: rx.frequency || 'Daily',
              startDate: consultationRecord.date,
              endDate: 'Ongoing',
              prescribedBy: consultationRecord.doctor,
              status: 'Active',
              instructions: `Prescribed during consultation for ${consultationRecord.diagnosis}`,
              reminderTime: '09:00'
            });
          });
        }

        const accessLogItem = {
          id: `LOG-DOC-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: consultationRecord.doctor,
          role: consultationRecord.specialty,
          action: `Recorded Consultation: ${consultationRecord.diagnosis} and updated clinical orders`,
          sectionsAccessed: ['Consultation Notes', 'Prescriptions', 'Timeline'],
          ip: '192.168.1.100',
          authorized: true
        };

        return {
          ...p,
          medications: updatedMeds,
          timeline: [timelineItem, ...p.timeline],
          accessLogs: [accessLogItem, ...p.accessLogs]
        };
      }
      return p;
    }));

    logSystemAudit(
      'CLINICAL_NOTE_ADDED',
      consultationRecord.doctor,
      patientId,
      `Authored and signed consultation note for ${consultationRecord.diagnosis} [ICD-10: ${consultationRecord.icdCode}]`,
      'info'
    );
  };

  // 7. Request consent workflow
  const handleRequestConsent = (patientId, doctor) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);

        const newConsent = {
          id: `CSNT-REQ-${Date.now()}`,
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          hospital: doctor.hospital,
          status: 'Active',
          grantedDate: new Date().toISOString(),
          expiryDate: expiry.toISOString(),
          categories: {
            profile: true,
            allergies: true,
            medications: true,
            surgeries: true,
            labReports: true,
            vaccines: true
          },
          accessCount: 1,
          lastAccessed: new Date().toISOString()
        };

        return {
          ...p,
          consents: [newConsent, ...p.consents.filter(c => c.doctorId !== doctor.id)]
        };
      }
      return p;
    }));

    logSystemAudit(
      'CONSENT_REQUEST_APPROVED',
      doctor.name,
      patientId,
      `Requested and received verified clinical access for 30 days`,
      'info'
    );
  };

  // 8. Admin toggles doctor verification
  const handleToggleDoctorVerification = (doctorId) => {
    let docName = '';
    let newStatus = '';
    setDoctors(prev => prev.map(d => {
      if (d.id === doctorId) {
        newStatus = d.status === 'Verified' ? 'Revoked' : 'Verified';
        docName = d.name;
        return { ...d, status: newStatus };
      }
      return d;
    }));

    logSystemAudit(
      'DOCTOR_CREDENTIAL_CHANGE',
      'System Admin',
      docName,
      `Updated doctor verification status to: ${newStatus}`,
      newStatus === 'Verified' ? 'success' : 'warning'
    );
  };

  // 9. Emergency Break-Glass access logged
  const handleLogEmergencyAccess = (patientId, details) => {
    logSystemAudit(
      'EMERGENCY_BREAK_GLASS',
      details.responderBadge,
      patientId,
      `Emergency Override: ${details.emergencyReason} for ${details.patientName}`,
      'warning'
    );

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          accessLogs: [
            {
              id: `LOG-EMERGENCY-${Date.now()}`,
              timestamp: details.timestamp,
              actor: details.responderBadge,
              role: 'Emergency Medical Responder (Break-Glass)',
              action: `Bypassed standard consent for acute triage: ${details.emergencyReason}`,
              sectionsAccessed: ['Allergies', 'Blood Group', 'Medications', 'Emergency Contact'],
              ip: '10.0.99.1',
              authorized: true
            },
            ...p.accessLogs
          ]
        };
      }
      return p;
    }));
  };

  // 10. Patient updates their profile details
  const handleUpdatePatient = (updatedPatient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    logSystemAudit(
      'PROFILE_UPDATED',
      `${updatedPatient.name} (${updatedPatient.id})`,
      'Personal Health Profile',
      'Updated patient demographics, contact details, and emergency information',
      'info'
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Universal Top Header with Home navigation */}
      <Header 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        patients={patients}
        activePatientId={activePatientId}
        setActivePatientId={setActivePatientId}
        doctors={doctors}
        activeDoctorId={activeDoctorId}
        setActiveDoctorId={setActiveDoctorId}
        theme={theme}
        setTheme={setTheme}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {/* Main Landing / Home Page */}
        {activeRole === 'home' && (
          <HomePage 
            onSelectModule={(role) => setActiveRole(role)}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />
        )}

        {/* Patient Portal Module */}
        {activeRole === 'patient' && (
          <PatientDashboard 
            patient={activePatient}
            onGrantConsentOpen={() => setIsGrantConsentOpen(true)}
            onOpenOCRScanner={() => setIsOCRScannerOpen(true)}
            onOpenExportSummary={() => setIsExportSummaryOpen(true)}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            onOpenAddRecord={() => setIsAddRecordOpen(true)}
            onRevokeConsent={handleRevokeConsent}
            onToggleConsentCategory={handleToggleConsentCategory}
            onUpdatePatient={handleUpdatePatient}
          />
        )}

        {/* Doctor Portal Module */}
        {activeRole === 'doctor' && (
          <DoctorPortal 
            doctors={doctors}
            activeDoctorId={activeDoctorId}
            patients={patients}
            onAddDoctorConsultation={handleAddDoctorConsultation}
            onRequestConsent={handleRequestConsent}
          />
        )}

        {/* Administrator Module */}
        {activeRole === 'admin' && (
          <AdminDashboard 
            doctors={doctors}
            onToggleDoctorVerification={handleToggleDoctorVerification}
            patients={patients}
            auditLogs={auditLogs}
          />
        )}

        {/* Emergency First Responder Mode */}
        {activeRole === 'emergency' && (
          <EmergencyView 
            patients={patients}
            onLogEmergencyAccess={handleLogEmergencyAccess}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      {isEmergencyModalOpen && (
        <EmergencyCardModal 
          patient={activePatient}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      )}

      {isExportSummaryOpen && (
        <ExportSummaryModal 
          patient={activePatient}
          onClose={() => setIsExportSummaryOpen(false)}
        />
      )}

      {isGrantConsentOpen && (
        <GrantConsentModal 
          doctors={doctors.filter(d => d.status === 'Verified')}
          onGrantConsent={handleGrantConsent}
          onClose={() => setIsGrantConsentOpen(false)}
        />
      )}

      {isOCRScannerOpen && (
        <OCRScannerModal 
          patient={activePatient}
          onAddDocumentRecord={handleAddDocumentRecord}
          onClose={() => setIsOCRScannerOpen(false)}
        />
      )}

      {isAddRecordOpen && (
        <AddRecordModal 
          onAddRecord={handleAddRecord}
          onClose={() => setIsAddRecordOpen(false)}
        />
      )}
    </div>
  );
}
