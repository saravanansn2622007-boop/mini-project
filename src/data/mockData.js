// Mock dataset for Unified Healthcare Record System

export const INITIAL_PATIENTS = [
  {
    id: 'PAT-88219',
    name: 'David Jenkins',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    dob: '1987-04-18',
    age: 39,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+1 (555) 234-5678',
    email: 'david.jenkins@example.com',
    address: '442 Elmwood Ave, Boston, MA 02115',
    emergencyContact: {
      name: 'Emily Jenkins (Spouse)',
      phone: '+1 (555) 987-6543',
      relation: 'Spouse'
    },
    allergies: [
      { allergen: 'Penicillin', severity: 'High', reaction: 'Anaphylaxis / Severe hives', diagnosedDate: '2015-04-12' },
      { allergen: 'Sulfa Drugs', severity: 'Moderate', reaction: 'Skin rash, fever', diagnosedDate: '2018-09-03' },
      { allergen: 'Peanuts', severity: 'Mild', reaction: 'Mild throat irritation', diagnosedDate: '2010-01-20' }
    ],
    chronicConditions: [
      { condition: 'Type 2 Diabetes Mellitus', icd10: 'E11.9', diagnosedYear: '2021', status: 'Managed', doctor: 'Dr. Elena Rostova' },
      { condition: 'Primary Hypertension', icd10: 'I10', diagnosedYear: '2019', status: 'Active', doctor: 'Dr. Julian Carter' },
      { condition: 'Mild Persistent Asthma', icd10: 'J45.30', diagnosedYear: '2016', status: 'Well-Controlled', doctor: 'Dr. Elena Rostova' }
    ],
    vitals: {
      bloodPressure: '128/82 mmHg',
      heartRate: '72 bpm',
      temperature: '98.4 °F',
      respiratoryRate: '16 /min',
      oxygenSaturation: '99%',
      bmi: '24.6',
      weight: '78 kg',
      height: '178 cm'
    },
    medications: [
      {
        id: 'MED-1',
        name: 'Metformin HCl',
        dosage: '500 mg',
        frequency: 'Twice daily with meals (Morning & Evening)',
        startDate: '2021-08-15',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Elena Rostova',
        status: 'Active',
        instructions: 'Take after meals to minimize gastrointestinal upset.',
        reminderTime: '08:00, 20:00'
      },
      {
        id: 'MED-2',
        name: 'Lisinopril',
        dosage: '10 mg',
        frequency: 'Once daily in the morning',
        startDate: '2022-03-10',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Julian Carter',
        status: 'Active',
        instructions: 'Monitor blood pressure weekly; report dry cough if persistent.',
        reminderTime: '08:30'
      },
      {
        id: 'MED-3',
        name: 'Albuterol Inhaler (Ventolin HFA)',
        dosage: '90 mcg/actuation',
        frequency: '1-2 puffs every 4-6 hours PRN (As needed)',
        startDate: '2020-05-12',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Elena Rostova',
        status: 'Active',
        instructions: 'For sudden shortness of breath or wheezing.',
        reminderTime: 'As Needed'
      },
      {
        id: 'MED-4',
        name: 'Amoxicillin',
        dosage: '500 mg',
        frequency: 'Every 8 hours for 7 days',
        startDate: '2023-11-02',
        endDate: '2023-11-09',
        prescribedBy: 'Dr. Marcus Sterling',
        status: 'Discontinued',
        instructions: 'Course completed for acute sinus infection.',
        reminderTime: 'Completed'
      }
    ],
    vaccinations: [
      {
        id: 'VAC-1',
        vaccine: 'COVID-19 Bivalent Booster',
        doseNumber: 'Dose 3',
        dateAdministered: '2023-10-14',
        nextDue: '2024-10-14 (Annual)',
        administrator: 'Mass General Pharmacy',
        batchNumber: 'FL9920-A',
        certificateUrl: '#cert-covid'
      },
      {
        id: 'VAC-2',
        vaccine: 'Seasonal Influenza (Quadrivalent)',
        doseNumber: 'Annual',
        dateAdministered: '2024-09-22',
        nextDue: '2025-09-22',
        administrator: 'Metro Health Center',
        batchNumber: 'IN7741-B',
        certificateUrl: '#cert-flu'
      },
      {
        id: 'VAC-3',
        vaccine: 'Tetanus, Diphtheria, Pertussis (Tdap)',
        doseNumber: 'Booster',
        dateAdministered: '2020-04-18',
        nextDue: '2030-04-18',
        administrator: 'St. Luke Hospital',
        batchNumber: 'TD1029-C',
        certificateUrl: '#cert-tdap'
      },
      {
        id: 'VAC-4',
        vaccine: 'Hepatitis B (Recombinant)',
        doseNumber: '3-Dose Complete Series',
        dateAdministered: '2012-07-15',
        nextDue: 'Lifetime Immunity',
        administrator: 'University Health Services',
        batchNumber: 'HB4421-K',
        certificateUrl: '#cert-hepb'
      }
    ],
    surgeriesAndHospitalizations: [
      {
        id: 'SURG-1',
        procedure: 'Laparoscopic Cholecystectomy',
        type: 'Surgical Operation',
        hospital: 'Boston Central Medical Center',
        surgeon: 'Dr. Arthur Pendelton, FACS',
        admissionDate: '2022-07-14',
        dischargeDate: '2022-07-16',
        diagnosis: 'Symptomatic Cholelithiasis (Gallstones)',
        summary: 'Successful minimally invasive removal of gallbladder without intraoperative complications. Discharged with oral analgesics.',
        followUpInstructions: 'Low-fat diet for 4 weeks. Suture check completed on post-op day 10. Normal recovery.'
      },
      {
        id: 'SURG-2',
        procedure: 'Right Knee Arthroscopic Meniscectomy',
        type: 'Day Surgery',
        hospital: 'New England Orthopedic Pavilion',
        surgeon: 'Dr. Clara Vance',
        admissionDate: '2017-11-04',
        dischargeDate: '2017-11-04',
        diagnosis: 'Tear of medial meniscus of right knee',
        summary: 'Partial meniscectomy performed under regional anesthesia. Weight bearing tolerated with crutches.',
        followUpInstructions: 'Physical therapy 2x weekly for 6 weeks. Full return to activity achieved.'
      }
    ],
    documents: [
      {
        id: 'DOC-1',
        title: 'Comprehensive Metabolic Panel & Lipid Profile',
        category: 'Blood Test Report',
        date: '2024-08-10',
        facility: 'Quest Diagnostics Regional Lab',
        doctor: 'Dr. Elena Rostova',
        fileType: 'PDF',
        fileSize: '1.4 MB',
        summary: 'Fasting glucose 108 mg/dL (slightly elevated), HbA1c 6.2%, Total Cholesterol 185 mg/dL, Triglycerides 142 mg/dL.',
        keyValues: { 'Fasting Glucose': '108 mg/dL', 'HbA1c': '6.2%', 'Total Cholesterol': '185 mg/dL', 'HDL': '54 mg/dL', 'LDL': '103 mg/dL' }
      },
      {
        id: 'DOC-2',
        title: 'Transthoracic Echocardiogram (ECHO) 2D/Doppler',
        category: 'Diagnostic Scan',
        date: '2024-03-18',
        facility: 'Boston Heart Institute',
        doctor: 'Dr. Julian Carter',
        fileType: 'PDF',
        fileSize: '3.8 MB',
        summary: 'Normal LV cavity size with normal systolic function. LVEF estimated at 62%. No significant valvular stenosis or regurgitation.',
        keyValues: { 'LVEF': '62%', 'LV Wall Motion': 'Normal', 'Aortic Valve': 'Trileaflet, normal opening' }
      },
      {
        id: 'DOC-3',
        title: 'Chest X-Ray PA & Lateral Views',
        category: 'Radiology / X-Ray',
        date: '2023-11-03',
        facility: 'Metro Imaging Center',
        doctor: 'Dr. Marcus Sterling',
        fileType: 'IMG',
        fileSize: '2.1 MB',
        summary: 'Lungs are clear of focal consolidation, effusion, or pneumothorax. Cardiomediastinal silhouette is within normal limits.',
        keyValues: { 'Lung Fields': 'Clear', 'Cardiothoracic Ratio': '< 0.50' }
      },
      {
        id: 'DOC-4',
        title: 'Surgical Discharge Summary - Cholecystectomy',
        category: 'Discharge Summary',
        date: '2022-07-16',
        facility: 'Boston Central Medical Center',
        doctor: 'Dr. Arthur Pendelton',
        fileType: 'PDF',
        fileSize: '890 KB',
        summary: 'Uncomplicated laparoscopic cholecystectomy. Vital signs stable at discharge. Diet advanced to regular low-fat.',
        keyValues: { 'Blood Loss': '< 50 mL', 'Discharge Condition': 'Stable, Ambulatory' }
      }
    ],
    timeline: [
      {
        id: 'TL-1',
        date: '2024-08-10',
        title: 'Routine Endocrine & Lipid Panel',
        category: 'Lab Test',
        doctor: 'Dr. Elena Rostova',
        facility: 'Quest Diagnostics',
        description: 'HbA1c improved to 6.2% from 6.8% last year. Fasting glucose at 108 mg/dL. Continued Metformin 500mg BID.',
        badgeColor: 'emerald'
      },
      {
        id: 'TL-2',
        date: '2024-03-18',
        title: 'Annual Cardiology Follow-up & ECHO',
        category: 'Consultation',
        doctor: 'Dr. Julian Carter',
        facility: 'Boston Heart Institute',
        description: 'Blood pressure well-controlled at 128/82. Echocardiogram normal with 62% EF. Lisinopril 10mg maintained.',
        badgeColor: 'blue'
      },
      {
        id: 'TL-3',
        date: '2023-11-02',
        title: 'Acute Sinusitis Consultation & Rx',
        category: 'Prescription',
        doctor: 'Dr. Marcus Sterling',
        facility: 'Metro Health Urgent Care',
        description: 'Prescribed 7-day course of Amoxicillin 500mg. Symptoms resolved fully.',
        badgeColor: 'amber'
      },
      {
        id: 'TL-4',
        date: '2023-10-14',
        title: 'COVID-19 Bivalent Booster Administered',
        category: 'Vaccination',
        doctor: 'PharmD. Sarah Lin',
        facility: 'Mass General Pharmacy',
        description: 'Administered in left deltoid. No adverse acute reactions observed during 15-minute wait.',
        badgeColor: 'purple'
      },
      {
        id: 'TL-5',
        date: '2022-07-14',
        title: 'Laparoscopic Cholecystectomy Surgery',
        category: 'Operation',
        doctor: 'Dr. Arthur Pendelton',
        facility: 'Boston Central Medical Center',
        description: 'Gallbladder removal due to recurring cholelithiasis. Uneventful procedure.',
        badgeColor: 'rose'
      },
      {
        id: 'TL-6',
        date: '2021-08-15',
        title: 'Diagnosis: Type 2 Diabetes Mellitus',
        category: 'Diagnosis',
        doctor: 'Dr. Elena Rostova',
        facility: 'Metro Health Center',
        description: 'Diagnosed after consecutive fasting plasma glucose tests. Initiated lifestyle counseling and Metformin.',
        badgeColor: 'teal'
      }
    ],
    labTrends: {
      fastingGlucose: [
        { date: '2021-08', value: 142, unit: 'mg/dL', status: 'High', refRange: '70-99' },
        { date: '2022-03', value: 126, unit: 'mg/dL', status: 'Elevated', refRange: '70-99' },
        { date: '2022-10', value: 118, unit: 'mg/dL', status: 'Borderline', refRange: '70-99' },
        { date: '2023-06', value: 112, unit: 'mg/dL', status: 'Borderline', refRange: '70-99' },
        { date: '2024-02', value: 110, unit: 'mg/dL', status: 'Borderline', refRange: '70-99' },
        { date: '2024-08', value: 108, unit: 'mg/dL', status: 'Borderline', refRange: '70-99' }
      ],
      hba1c: [
        { date: '2021-08', value: 7.4, unit: '%', status: 'High', refRange: '< 5.7' },
        { date: '2022-03', value: 6.9, unit: '%', status: 'Elevated', refRange: '< 5.7' },
        { date: '2022-10', value: 6.6, unit: '%', status: 'Borderline', refRange: '< 5.7' },
        { date: '2023-06', value: 6.5, unit: '%', status: 'Borderline', refRange: '< 5.7' },
        { date: '2024-02', value: 6.3, unit: '%', status: 'Good Control', refRange: '< 5.7' },
        { date: '2024-08', value: 6.2, unit: '%', status: 'Good Control', refRange: '< 5.7' }
      ],
      bloodPressureSystolic: [
        { date: '2021-08', value: 148, unit: 'mmHg', status: 'Stage 1 HTN', refRange: '< 120' },
        { date: '2022-03', value: 138, unit: 'mmHg', status: 'Pre-HTN', refRange: '< 120' },
        { date: '2022-10', value: 132, unit: 'mmHg', status: 'Pre-HTN', refRange: '< 120' },
        { date: '2023-06', value: 130, unit: 'mmHg', status: 'Pre-HTN', refRange: '< 120' },
        { date: '2024-02', value: 126, unit: 'mmHg', status: 'Normal', refRange: '< 120' },
        { date: '2024-08', value: 128, unit: 'mmHg', status: 'Normal', refRange: '< 120' }
      ],
      totalCholesterol: [
        { date: '2021-08', value: 228, unit: 'mg/dL', status: 'High', refRange: '< 200' },
        { date: '2022-03', value: 210, unit: 'mg/dL', status: 'Borderline', refRange: '< 200' },
        { date: '2022-10', value: 198, unit: 'mg/dL', status: 'Desirable', refRange: '< 200' },
        { date: '2023-06', value: 192, unit: 'mg/dL', status: 'Desirable', refRange: '< 200' },
        { date: '2024-02', value: 188, unit: 'mg/dL', status: 'Desirable', refRange: '< 200' },
        { date: '2024-08', value: 185, unit: 'mg/dL', status: 'Desirable', refRange: '< 200' }
      ]
    },
    familyHistory: [
      { relative: 'Father', condition: 'Coronary Artery Disease (Bypass at age 62)', status: 'Deceased (Age 74)' },
      { relative: 'Mother', condition: 'Type 2 Diabetes Mellitus & Osteoarthritis', status: 'Living (Age 68)' },
      { relative: 'Maternal Aunt', condition: 'Breast Cancer (BRCA negative)', status: 'In Remission (Age 64)' }
    ],
    consents: [
      {
        id: 'CSNT-101',
        doctorId: 'DOC-CARTER',
        doctorName: 'Dr. Julian Carter',
        specialty: 'Cardiology',
        hospital: 'Boston Heart Institute',
        status: 'Active',
        grantedDate: '2024-03-01T10:00:00Z',
        expiryDate: '2028-12-31T23:59:59Z',
        categories: {
          profile: true,
          allergies: true,
          medications: true,
          surgeries: true,
          labReports: true,
          vaccines: false
        },
        accessCount: 8,
        lastAccessed: '2024-10-02T14:32:00Z'
      },
      {
        id: 'CSNT-102',
        doctorId: 'DOC-ROSTOVA',
        doctorName: 'Dr. Elena Rostova',
        specialty: 'Internal Medicine / PCP',
        hospital: 'Metro Health Primary Care',
        status: 'Active',
        grantedDate: '2024-01-15T09:30:00Z',
        expiryDate: '2028-12-31T23:59:59Z',
        categories: {
          profile: true,
          allergies: true,
          medications: true,
          surgeries: true,
          labReports: true,
          vaccines: true
        },
        accessCount: 14,
        lastAccessed: '2024-10-09T11:15:00Z'
      },
      {
        id: 'CSNT-103',
        doctorId: 'DOC-STERLING',
        doctorName: 'Dr. Marcus Sterling',
        specialty: 'Emergency Medicine',
        hospital: 'Metro Health Urgent Care',
        status: 'Expired',
        grantedDate: '2023-11-02T08:00:00Z',
        expiryDate: '2023-11-05T08:00:00Z',
        categories: {
          profile: true,
          allergies: true,
          medications: true,
          surgeries: false,
          labReports: false,
          vaccines: false
        },
        accessCount: 2,
        lastAccessed: '2023-11-02T09:40:00Z'
      }
    ],
    accessLogs: [
      {
        id: 'LOG-901',
        timestamp: '2024-10-09T11:15:22Z',
        actor: 'Dr. Elena Rostova',
        role: 'Internal Medicine (PCP)',
        action: 'Viewed Comprehensive Metabolic Panel and Updated Consultation Notes',
        sectionsAccessed: ['Lab Reports', 'Medications', 'Timeline'],
        ip: '192.168.10.45',
        authorized: true
      },
      {
        id: 'LOG-902',
        timestamp: '2024-10-02T14:32:10Z',
        actor: 'Dr. Julian Carter',
        role: 'Cardiology',
        action: 'Reviewed Blood Pressure Trend & Transthoracic ECHO Report',
        sectionsAccessed: ['Vitals', 'Scans & Lab Reports', 'Medications'],
        ip: '172.16.8.104',
        authorized: true
      },
      {
        id: 'LOG-903',
        timestamp: '2024-09-22T16:00:00Z',
        actor: 'David Jenkins (Patient)',
        role: 'Patient Self-Access',
        action: 'Uploaded Seasonal Influenza Vaccination Certificate',
        sectionsAccessed: ['Vaccines', 'Documents'],
        ip: '108.45.12.98',
        authorized: true
      },
      {
        id: 'LOG-904',
        timestamp: '2024-08-10T11:05:00Z',
        actor: 'Dr. Elena Rostova',
        role: 'Internal Medicine (PCP)',
        action: 'Reviewed Quest Diagnostics CMP and adjusted diet guidance',
        sectionsAccessed: ['Lab Reports', 'Chronic Conditions'],
        ip: '192.168.10.45',
        authorized: true
      }
    ]
  },
  {
    id: 'PAT-94102',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    dob: '1975-11-28',
    age: 51,
    gender: 'Male',
    bloodGroup: 'A-',
    phone: '+1 (555) 789-0123',
    email: 'marcus.vance@example.com',
    address: '120 Beacon St, Somerville, MA 02143',
    emergencyContact: {
      name: 'Rebecca Vance (Sister)',
      phone: '+1 (555) 321-7654',
      relation: 'Sister'
    },
    allergies: [
      { allergen: 'Latex', severity: 'Severe', reaction: 'Contact dermatitis & respiratory tightness', diagnosedDate: '2012-03-10' },
      { allergen: 'Aspirin (NSAIDs)', severity: 'Moderate', reaction: 'Gastric bleeding / Bronchospasm', diagnosedDate: '2019-11-15' }
    ],
    chronicConditions: [
      { condition: 'Coronary Artery Disease', icd10: 'I25.10', diagnosedYear: '2020', status: 'Stable post-stent', doctor: 'Dr. Julian Carter' },
      { condition: 'Hyperlipidemia', icd10: 'E78.5', diagnosedYear: '2018', status: 'Managed', doctor: 'Dr. Elena Rostova' }
    ],
    vitals: {
      bloodPressure: '134/86 mmHg',
      heartRate: '68 bpm',
      temperature: '98.6 °F',
      respiratoryRate: '15 /min',
      oxygenSaturation: '98%',
      bmi: '27.1',
      weight: '84 kg',
      height: '176 cm'
    },
    medications: [
      {
        id: 'MED-10',
        name: 'Atorvastatin',
        dosage: '40 mg',
        frequency: 'Once daily at bedtime',
        startDate: '2020-04-12',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Julian Carter',
        status: 'Active',
        instructions: 'Take at night. Avoid grapefruit juice.',
        reminderTime: '21:30'
      },
      {
        id: 'MED-11',
        name: 'Clopidogrel (Plavix)',
        dosage: '75 mg',
        frequency: 'Once daily with breakfast',
        startDate: '2020-05-01',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Julian Carter',
        status: 'Active',
        instructions: 'Blood thinner; inform dentist or surgeons before procedures.',
        reminderTime: '08:00'
      }
    ],
    vaccinations: [
      {
        id: 'VAC-10',
        vaccine: 'Pneumococcal Conjugate (PCV20)',
        doseNumber: 'Single Dose',
        dateAdministered: '2023-05-10',
        nextDue: 'Completed',
        administrator: 'Somerville Community Clinic',
        batchNumber: 'PN-88912',
        certificateUrl: '#cert-pcv'
      }
    ],
    surgeriesAndHospitalizations: [
      {
        id: 'SURG-10',
        procedure: 'Percutaneous Coronary Intervention (PCI) with Drug-Eluting Stent in LAD',
        type: 'Cardiac Catheterization',
        hospital: 'Boston Heart Institute',
        surgeon: 'Dr. Julian Carter',
        admissionDate: '2020-04-10',
        dischargeDate: '2020-04-12',
        diagnosis: 'Acute Coronary Syndrome, 85% LAD stenosis',
        summary: 'Drug-eluting stent successfully deployed in proximal LAD. TIMI 3 flow restored.',
        followUpInstructions: 'Dual antiplatelet therapy for at least 12 months. Cardiac rehab completed.'
      }
    ],
    documents: [],
    timeline: [],
    labTrends: {
      fastingGlucose: [
        { date: '2023-01', value: 96, unit: 'mg/dL', status: 'Normal', refRange: '70-99' },
        { date: '2024-04', value: 98, unit: 'mg/dL', status: 'Normal', refRange: '70-99' }
      ],
      hba1c: [
        { date: '2023-01', value: 5.4, unit: '%', status: 'Normal', refRange: '< 5.7' },
        { date: '2024-04', value: 5.5, unit: '%', status: 'Normal', refRange: '< 5.7' }
      ],
      bloodPressureSystolic: [
        { date: '2023-01', value: 142, unit: 'mmHg', status: 'Stage 1 HTN', refRange: '< 120' },
        { date: '2024-04', value: 134, unit: 'mmHg', status: 'Pre-HTN', refRange: '< 120' }
      ],
      totalCholesterol: [
        { date: '2023-01', value: 245, unit: 'mg/dL', status: 'High', refRange: '< 200' },
        { date: '2024-04', value: 165, unit: 'mg/dL', status: 'Desirable', refRange: '< 200' }
      ]
    },
    familyHistory: [],
    consents: [
      {
        id: 'CSNT-201',
        doctorId: 'DOC-CARTER',
        doctorName: 'Dr. Julian Carter',
        specialty: 'Cardiology',
        hospital: 'Boston Heart Institute',
        status: 'Active',
        grantedDate: '2024-01-01T00:00:00Z',
        expiryDate: '2028-12-31T23:59:59Z',
        categories: {
          profile: true,
          allergies: true,
          medications: true,
          surgeries: true,
          labReports: true,
          vaccines: true
        },
        accessCount: 19,
        lastAccessed: '2024-09-18T10:20:00Z'
      }
    ],
    accessLogs: []
  }
];

export const REGISTERED_DOCTORS = [
  {
    id: 'DOC-CARTER',
    name: 'Dr. Julian Carter, MD',
    specialty: 'Cardiology & Interventional Cardiovascular',
    licenseNumber: 'MA-MD-984421',
    hospital: 'Boston Heart Institute',
    email: 'j.carter@bostonheart.org',
    status: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80',
    verificationDate: '2021-04-12',
    credentials: ['MD (Harvard Medical School)', 'FACC (Fellow of American College of Cardiology)']
  },
  {
    id: 'DOC-ROSTOVA',
    name: 'Dr. Elena Rostova, MD',
    specialty: 'Internal Medicine / Primary Care',
    licenseNumber: 'MA-MD-771923',
    hospital: 'Metro Health Primary Care',
    email: 'e.rostova@metrohealth.org',
    status: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1594824813589-73f1d8c19957?auto=format&fit=crop&w=256&q=80',
    verificationDate: '2020-09-18',
    credentials: ['MD (Johns Hopkins School of Medicine)', 'FACP (American College of Physicians)']
  },
  {
    id: 'DOC-CHEN',
    name: 'Dr. Angela Chen, MD',
    specialty: 'Endocrinology & Metabolism',
    licenseNumber: 'MA-MD-554210',
    hospital: 'New England Endocrine Clinic',
    email: 'a.chen@neendoclinic.org',
    status: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80',
    verificationDate: '2022-01-20',
    credentials: ['MD (Columbia College of Physicians & Surgeons)']
  },
  {
    id: 'DOC-KHAN',
    name: 'Dr. Tariq Khan, DO',
    specialty: 'Pulmonology & Critical Care',
    licenseNumber: 'MA-DO-889102',
    hospital: 'Bay State Respiratory Associates',
    email: 't.khan@baystateresp.org',
    status: 'Pending Verification',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80',
    verificationDate: null,
    credentials: ['DO (Tufts University School of Medicine)']
  }
];

export const SYSTEM_AUDIT_LOGS = [
  {
    id: 'AUD-801',
    timestamp: '2024-10-11T09:14:02Z',
    type: 'CONSENT_GRANTED',
    user: 'David Jenkins (PAT-88219)',
    target: 'Dr. Julian Carter (Cardiology)',
    description: 'Granted 1-year granular access to Profile, Allergies, Medications, Surgeries, Lab Reports',
    severity: 'info'
  },
  {
    id: 'AUD-802',
    timestamp: '2024-10-10T15:20:11Z',
    type: 'CLINICAL_NOTE_ADDED',
    user: 'Dr. Elena Rostova',
    target: 'PAT-88219',
    description: 'Added diagnosis review: Type 2 Diabetes stable on Metformin 500mg BID',
    severity: 'info'
  },
  {
    id: 'AUD-803',
    timestamp: '2024-10-09T18:45:00Z',
    type: 'EMERGENCY_BREAK_GLASS',
    user: 'Paramedic EMT-402 (Boston EMS)',
    target: 'PAT-88219',
    description: 'Emergency Responder break-glass accessed critical allergy profile and blood type (Audited)',
    severity: 'warning'
  },
  {
    id: 'AUD-804',
    timestamp: '2024-10-08T11:00:30Z',
    type: 'DOC_VERIFICATION',
    user: 'Admin (Compliance Officer)',
    target: 'Dr. Angela Chen, MD',
    description: 'Verified State Board License MA-MD-554210 and granted Doctor Portal access',
    severity: 'info'
  },
  {
    id: 'AUD-805',
    timestamp: '2024-10-07T08:30:19Z',
    type: 'SECURITY_SCAN',
    user: 'Automated System Monitor',
    target: 'System Infrastructure',
    description: '256-bit AES encryption verified; Zero unauthorized access attempts detected in past 7 days',
    severity: 'success'
  }
];

export const SAMPLE_OCR_TEMPLATES = [
  {
    id: 'OCR-LAB-1',
    name: 'Sample Blood Test (Biochem Lab)',
    sampleImageName: 'Quest_Diagnostics_CMP_Report.pdf',
    detectedFields: {
      patientName: 'David Jenkins',
      patientId: 'PAT-88219',
      date: '2024-09-15',
      facility: 'Quest Diagnostics Regional Hub',
      category: 'Blood Test Report',
      extractedText: 'TEST NAME: Fasting Blood Glucose (104 mg/dL - Reference: 70-99)\nHbA1c (6.1% - Reference: 4.0-5.6)\nSerum Creatinine (0.85 mg/dL - Normal)\neGFR (>90 mL/min/1.73m2)\nAST (22 U/L), ALT (26 U/L)',
      structuredValues: [
        { parameter: 'Fasting Blood Glucose', value: '104 mg/dL', flag: 'High (Borderline)', ref: '70-99' },
        { parameter: 'HbA1c', value: '6.1 %', flag: 'Pre-diabetes Range', ref: '< 5.7' },
        { parameter: 'Serum Creatinine', value: '0.85 mg/dL', flag: 'Normal', ref: '0.6-1.1' },
        { parameter: 'eGFR', value: '98 mL/min', flag: 'Normal Renal Function', ref: '> 90' }
      ]
    }
  },
  {
    id: 'OCR-RX-1',
    name: 'Sample Clinic Prescription',
    sampleImageName: 'Cardiology_Consultation_Rx.pdf',
    detectedFields: {
      patientName: 'David Jenkins',
      patientId: 'PAT-88219',
      date: '2024-09-20',
      facility: 'Boston Heart Institute',
      category: 'Prescription',
      extractedText: 'Rx:\n1. Lisinopril 10mg PO Daily each Morning #30 (Refills: 3)\n2. CoQ10 100mg PO Daily Dietary Supplement\nInstructions: Check blood pressure once weekly, maintain sodium < 2000mg/day.',
      structuredValues: [
        { parameter: 'Medication', value: 'Lisinopril 10 mg', flag: 'Active Rx', ref: 'Daily morning' },
        { parameter: 'Dietary Supplement', value: 'CoQ10 100 mg', flag: 'Recommended', ref: 'Daily' },
        { parameter: 'Dietary Restriction', value: 'Sodium < 2000 mg/day', flag: 'Cardiovascular Care', ref: 'Daily limit' }
      ]
    }
  }
];
