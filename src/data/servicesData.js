export const feeSummary = {
  semester: 'Semester 1, 2025/2026',
  totalDue: 4250,
  paid: 3000,
  outstanding: 1250,
  dueDate: '2025-12-15',
  status: 'Partially paid',
}

export const paymentHistory = [
  { id: 'p1', date: '2026-08-28', description: 'Semester 1 tuition — first instalment', method: 'FPX (Maybank2u)', amount: 3000, status: 'Paid', receipt: 'UM-FEE-2026-08-1001' },
  { id: 'p2', date: '2026-07-20', description: 'Registration and enrolment fee', method: 'Card', amount: 350, status: 'Paid', receipt: 'UM-FEE-2026-07-0942' },
  { id: 'p3', date: '2026-06-30', description: 'Student activity and welfare fee', method: 'FPX (CIMB Clicks)', amount: 150, status: 'Paid', receipt: 'UM-FEE-2026-06-0810' },
]

export const feeBreakdown = [
  { item: 'Tuition (19 credit hours)', amount: 3400 },
  { item: 'Registration fee', amount: 350 },
  { item: 'Student activity & welfare', amount: 150 },
  { item: 'Library and laboratory charge', amount: 200 },
  { item: 'Insurance and medical', amount: 150 },
]

export const academicResults = [
  { semester: 'Semester 2, 2024/2025', gpa: 3.82, credits: 18, courses: [
    { code: 'WIA2005', name: 'Algorithms & Complexity', grade: 'A', points: 4.0 },
    { code: 'WIA2006', name: 'Data Structures', grade: 'A-', points: 3.7 },
    { code: 'WIX2004', name: 'Object-Oriented Programming', grade: 'A', points: 4.0 },
    { code: 'WIA2010', name: 'Discrete Mathematics', grade: 'B+', points: 3.3 },
  ] },
  { semester: 'Semester 1, 2024/2025', gpa: 3.71, credits: 17, courses: [
    { code: 'WIA1001', name: 'Information Systems', grade: 'A', points: 4.0 },
    { code: 'WIA1002', name: 'Programming Fundamentals', grade: 'A-', points: 3.7 },
    { code: 'WIA1005', name: 'Computer Organisation', grade: 'B+', points: 3.3 },
    { code: 'GIG1003', name: 'Integrity & Anti-Corruption', grade: 'A', points: 4.0 },
  ] },
  { semester: 'Semester 2, 2023/2024', gpa: 3.65, credits: 16, courses: [
    { code: 'WIA1003', name: 'Probability & Statistics', grade: 'A-', points: 3.7 },
    { code: 'GIG1001', name: 'TITAS', grade: 'A', points: 4.0 },
    { code: 'WIA1004', name: 'Database Fundamentals', grade: 'B+', points: 3.3 },
  ] },
]

export const documentTypes = [
  { id: 'transcript', label: 'Official Academic Transcript', fee: 30, days: '3 working days' },
  { id: 'enrolment', label: 'Confirmation of Enrolment Letter', fee: 0, days: '1 working day' },
  { id: 'graduation', label: 'Graduation Eligibility Letter', fee: 20, days: '5 working days' },
  { id: 'conduct', label: 'Good Conduct Certificate', fee: 15, days: '3 working days' },
]

export const selectedCourses = [
  { code: 'WIA3001', name: 'Machine Learning', credits: 4 },
  { code: 'WIA3002', name: 'Artificial Intelligence & Knowledge Representation', credits: 3 },
  { code: 'WIX3007', name: 'Database Systems', credits: 3 },
  { code: 'WIX3009', name: 'Software Engineering', credits: 3 },
  { code: 'WIA3015', name: 'Deep Learning & Neural Networks', credits: 4 },
  { code: 'GIG1004', name: 'Hubungan Etnik', credits: 2 },
]

export const courseOffering = [
  { code: 'WIA3018', name: 'Computer Vision', credits: 3, slots: '12 seats left', available: true },
  { code: 'WIX3020', name: 'Cloud & Distributed Systems', credits: 3, slots: 'Full — waitlist', available: false },
  { code: 'WIA3022', name: 'Natural Language Processing', credits: 3, slots: '8 seats left', available: true },
  { code: 'WIX3015', name: 'Cybersecurity Essentials', credits: 3, slots: '20 seats left', available: true },
  { code: 'GIG2002', name: 'Entrepreneurship & Innovation', credits: 2, slots: '30 seats left', available: true },
]

export const scholarshipSchemes = [
  { id: 'sch1', name: 'Yayasan UM Merit Scholarship', amount: 'Full tuition + RM600 monthly', criteria: 'CGPA 3.50 and above', deadline: '2026-01-31', open: true },
  { id: 'sch2', name: 'PTPTN Loan', amount: 'Per-scheme rate', criteria: 'Malaysian citizen, household income below RM8,000', deadline: '2026-02-15', open: true },
  { id: 'sch3', name: 'UM Student Welfare Bursary', amount: 'RM1,500 one-off', criteria: 'Demonstrated financial hardship', deadline: '2025-12-20', open: true },
  { id: 'sch4', name: 'Industry Talent Sponsorship', amount: 'RM8,000 per year', criteria: 'Year 3, nominated by faculty', deadline: '2026-03-01', open: false },
]

export const initialApplications = [
  { id: 'app1', ref: 'UM-APP-2025-4471', type: 'Document Request', detail: 'Confirmation of Enrolment Letter', submitted: '2026-11-18', status: 'Ready for collection', stage: 3 },
  { id: 'app2', ref: 'UM-APP-2025-4402', type: 'Welfare Bursary', detail: 'UM Student Welfare Bursary', submitted: '2026-11-10', status: 'Under review', stage: 2 },
  { id: 'app3', ref: 'UM-APP-2025-4388', type: 'Course Registration', detail: 'Add WIA3018 Computer Vision', submitted: '2026-11-06', status: 'Approved', stage: 4 },
]

export const applicationStages = ['Submitted', 'Verification', 'Under review', 'Approved', 'Completed']

export function makeRef(prefix = 'UM-APP') {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-2025-${n}`
}