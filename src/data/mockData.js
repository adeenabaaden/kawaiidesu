export const student = {
  name: 'Nur Aisyah binti Rahman',
  preferredName: 'Aisyah',
  matric: 'A184523',
  programme: 'Bachelor of Computer Science (Artificial Intelligence)',
  faculty: 'Faculty of Computer Science & Information Technology',
  year: 'Year 3',
  semester: 'Semester 1, 2025/2026',
  cgpa: 3.78,
  email: 'a184523@siswa.um.edu.my',
  residency: 'Kolej Kediaman Tun Ahmad Zaidi (KK7)',
  initials: 'NA',
  advisor: 'Dr. Wong Chee Wei',
}

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'courses', label: 'My Courses', icon: 'BookOpen' },
  { id: 'timetable', label: 'Timetable', icon: 'CalendarDays' },
  { id: 'assignments', label: 'Assignments', icon: 'ClipboardList', badge: 4 },
  { id: 'examinations', label: 'Examinations', icon: 'GraduationCap' },
  { id: 'attendance', label: 'Attendance', icon: 'UserCheck' },
  { id: 'assistant', label: 'AI Assistant', icon: 'Sparkles' },
  { id: 'games', label: 'Revision Games', icon: 'Gamepad2' },
  { id: 'bus', label: 'Campus Bus', icon: 'Bus' },
  { id: 'map', label: 'Campus Map', icon: 'Map' },
  { id: 'events', label: 'Events & Opportunities', icon: 'CalendarHeart' },
  { id: 'services', label: 'Student Services', icon: 'LifeBuoy' },
  { id: 'support', label: 'Student Support', icon: 'Headphones' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
]

export const courses = [
  {
    code: 'WIA3001',
    name: 'Machine Learning',
    lecturer: 'Dr. Wong Chee Wei',
    credits: 4,
    venue: 'FCS Building, DK2',
    progress: 68,
    color: 'bg-navy-600',
    grade: 'A-',
    attendance: 92,
    occ: 'OCC 1',
    occGroup: 'WIA3001-OCC1-01',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 96,
  },
  {
    code: 'WIA3002',
    name: 'Artificial Intelligence & Knowledge Representation',
    lecturer: 'Prof. Dr. Siti Hajar binti Omar',
    credits: 3,
    venue: 'FCS Building, DK5',
    progress: 55,
    color: 'bg-gold-500',
    grade: 'A',
    attendance: 88,
    occ: 'OCC 1',
    occGroup: 'WIA3002-OCC1-02',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 112,
  },
  {
    code: 'WIX3007',
    name: 'Database Systems',
    lecturer: 'Dr. Lim Kah Seng',
    credits: 3,
    venue: 'FCS Building, Lab 4',
    progress: 74,
    color: 'bg-emerald-600',
    grade: 'A',
    attendance: 96,
    occ: 'OCC 1',
    occGroup: 'WIX3007-OCC1-03',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 84,
  },
  {
    code: 'WIX3009',
    name: 'Software Engineering',
    lecturer: 'Dr. Aravind Krishnan',
    credits: 3,
    venue: 'FCS Building, DK1',
    progress: 61,
    color: 'bg-sky-700',
    grade: 'B+',
    attendance: 84,
    occ: 'OCC 2',
    occGroup: 'WIX3009-OCC2-01',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 78,
  },
  {
    code: 'WIA3015',
    name: 'Deep Learning & Neural Networks',
    lecturer: 'Dr. Tan Mei Ling',
    credits: 4,
    venue: 'FCS Building, Lab 2',
    progress: 42,
    color: 'bg-violet-700',
    grade: 'A-',
    attendance: 90,
    occ: 'OCC 2',
    occGroup: 'WIA3015-OCC2-04',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 60,
  },
  {
    code: 'GIG1004',
    name: 'Hubungan Etnik',
    lecturer: 'Dr. Mohd Faizal bin Yusof',
    credits: 2,
    venue: 'Akademi Pengajian Melayu, DK A',
    progress: 80,
    color: 'bg-rose-600',
    grade: 'A',
    attendance: 94,
    occ: 'OCC 1',
    occGroup: 'GIG1004-OCC1-07',
    teachingWeeks: 'Weeks 1–14',
    enrolled: 140,
  },
]

export const occGroups = {
  'OCC 1': 'OCC 1 — Even weeks focus (Weeks 1–7 core, 8–14 applied)',
  'OCC 2': 'OCC 2 — Continuous cohort groups (Weeks 1–14)',
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const weeklyClasses = [
  {
    id: 'c1',
    day: 1,
    start: '08:00',
    end: '10:00',
    course: 'Machine Learning',
    code: 'WIA3001',
    venue: 'DK2, FCS Building',
    lecturer: 'Dr. Wong Chee Wei',
    type: 'Lecture',
    occGroup: 'WIA3001-OCC1-01',
  },
  {
    id: 'c2',
    day: 1,
    start: '11:00',
    end: '13:00',
    course: 'Database Systems',
    code: 'WIX3007',
    venue: 'Lab 4, FCS Building',
    lecturer: 'Dr. Lim Kah Seng',
    type: 'Laboratory',
    occGroup: 'WIX3007-OCC1-03',
  },
  {
    id: 'c3',
    day: 1,
    start: '14:00',
    end: '16:00',
    course: 'Deep Learning & Neural Networks',
    code: 'WIA3015',
    venue: 'Lab 2, FCS Building',
    lecturer: 'Dr. Tan Mei Ling',
    type: 'Laboratory',
    occGroup: 'WIA3015-OCC2-04',
  },
  {
    id: 'c4',
    day: 2,
    start: '09:00',
    end: '11:00',
    course: 'Artificial Intelligence & Knowledge Representation',
    code: 'WIA3002',
    venue: 'DK5, FCS Building',
    lecturer: 'Prof. Dr. Siti Hajar binti Omar',
    type: 'Lecture',
    occGroup: 'WIA3002-OCC1-02',
  },
  {
    id: 'c5',
    day: 2,
    start: '14:00',
    end: '16:00',
    course: 'Software Engineering',
    code: 'WIX3009',
    venue: 'DK1, FCS Building',
    lecturer: 'Dr. Aravind Krishnan',
    type: 'Lecture',
    occGroup: 'WIX3009-OCC2-01',
  },
  {
    id: 'c6',
    day: 3,
    start: '08:00',
    end: '10:00',
    course: 'Machine Learning',
    code: 'WIA3001',
    venue: 'Tutorial Room 3, FCS Building',
    lecturer: 'Dr. Wong Chee Wei',
    type: 'Tutorial',
    occGroup: 'WIA3001-OCC1-T1',
  },
  {
    id: 'c7',
    day: 3,
    start: '10:00',
    end: '12:00',
    course: 'Hubungan Etnik',
    code: 'GIG1004',
    venue: 'DK A, Akademi Pengajian Melayu',
    lecturer: 'Dr. Mohd Faizal bin Yusof',
    type: 'Lecture',
    occGroup: 'GIG1004-OCC1-07',
  },
  {
    id: 'c8',
    day: 3,
    start: '15:00',
    end: '17:00',
    course: 'Deep Learning & Neural Networks',
    code: 'WIA3015',
    venue: 'DK2, FCS Building',
    lecturer: 'Dr. Tan Mei Ling',
    type: 'Lecture',
    occGroup: 'WIA3015-OCC2-04',
  },
  {
    id: 'c9',
    day: 4,
    start: '09:00',
    end: '11:00',
    course: 'Database Systems',
    code: 'WIX3007',
    venue: 'DK5, FCS Building',
    lecturer: 'Dr. Lim Kah Seng',
    type: 'Lecture',
    occGroup: 'WIX3007-OCC1-03',
  },
  {
    id: 'c10',
    day: 4,
    start: '13:00',
    end: '15:00',
    course: 'Software Engineering',
    code: 'WIX3009',
    venue: 'Lab 1, FCS Building',
    lecturer: 'Dr. Aravind Krishnan',
    type: 'Laboratory',
    occGroup: 'WIX3009-OCC2-01',
  },
  {
    id: 'c11',
    day: 4,
    start: '16:00',
    end: '17:00',
    course: 'Final Year Project Consultation',
    code: 'WIA3999',
    venue: 'Room 3.12, FCS Building',
    lecturer: 'Dr. Wong Chee Wei',
    type: 'Consultation',
    occGroup: 'FYP-OCC1-01',
  },
  {
    id: 'c12',
    day: 5,
    start: '08:30',
    end: '10:30',
    course: 'Artificial Intelligence & Knowledge Representation',
    code: 'WIA3002',
    venue: 'Tutorial Room 2, FCS Building',
    lecturer: 'Prof. Dr. Siti Hajar binti Omar',
    type: 'Tutorial',
    occGroup: 'WIA3002-OCC1-T2',
  },
  {
    id: 'c13',
    day: 5,
    start: '11:00',
    end: '12:00',
    course: 'Co-Curriculum: Robotics Club',
    code: 'GKG2001',
    venue: 'Student Activity Centre',
    lecturer: 'Puan Rosnah binti Idris',
    type: 'Co-Curriculum',
    occGroup: 'GKG2001-OCC1-01',
  },
]

export function classesOnDay(day) {
  return weeklyClasses
    .filter((c) => c.day === day)
    .sort((a, b) => a.start.localeCompare(b.start))
}

export const assignments = [
  {
    id: 'a1',
    title: 'Assignment 2: Supervised Learning Pipelines',
    course: 'Machine Learning',
    code: 'WIA3001',
    due: '2026-12-01T23:59:00',
    status: 'in-progress',
    weight: '15%',
    type: 'Individual',
  },
  {
    id: 'a2',
    title: 'Lab Report 4: Query Optimisation',
    course: 'Database Systems',
    code: 'WIX3007',
    due: '2026-11-28T17:00:00',
    status: 'pending',
    weight: '10%',
    type: 'Group',
  },
  {
    id: 'a3',
    title: 'Group Project Sprint 2 — SRS Document',
    course: 'Software Engineering',
    code: 'WIX3009',
    due: '2026-12-04T23:59:00',
    status: 'in-progress',
    weight: '20%',
    type: 'Group',
  },
  {
    id: 'a4',
    title: 'CNN Image Classification Mini-Project',
    course: 'Deep Learning & Neural Networks',
    code: 'WIA3015',
    due: '2026-12-08T23:59:00',
    status: 'pending',
    weight: '25%',
    type: 'Individual',
  },
  {
    id: 'a5',
    title: "Reflective Essay: Malaysia's Nation-Building",
    course: 'Hubungan Etnik',
    code: 'GIG1004',
    due: '2026-11-26T23:59:00',
    status: 'pending',
    weight: '15%',
    type: 'Individual',
  },
  {
    id: 'a6',
    title: 'Tutorial 5: Bayesian Networks',
    course: 'Artificial Intelligence & Knowledge Representation',
    code: 'WIA3002',
    due: '2026-11-29T23:59:00',
    status: 'submitted',
    weight: '5%',
    type: 'Individual',
  },
  {
    id: 'a7',
    title: 'Proposal Presentation Slides',
    course: 'Final Year Project',
    code: 'WIA3999',
    due: '2026-12-11T09:00:00',
    status: 'pending',
    weight: '10%',
    type: 'Group',
  },
]

export const announcements = [
  {
    id: 'n1',
    title: 'Semester 1 Final Examination Timetable Released',
    body: 'The final examination timetable for Semester 1 2025/2026 is now available in UM One. Please verify your paper codes and venues. Clashes must be reported to the Examinations Unit by 5 December 2025.',
    source: 'Examinations Unit',
    date: '2026-11-23',
    priority: 'high',
    tag: 'Examination',
  },
  {
    id: 'n2',
    title: 'Fee Payment Deadline — 15 December 2025',
    body: 'Outstanding tuition fees for Semester 1 must be settled before the deadline to avoid examination barring. Payment can be made via UM Touch or FPX.',
    source: 'Bursary',
    date: '2026-11-22',
    priority: 'high',
    tag: 'Finance',
  },
  {
    id: 'n3',
    title: 'Library Extended Hours During Revision Week',
    body: 'The Central Library will operate from 8:00 a.m. to 2:00 a.m. throughout Revision Week (8–19 December 2025). Group discussion rooms may be booked through the library portal.',
    source: 'UM Library',
    date: '2026-11-21',
    priority: 'medium',
    tag: 'Library',
  },
  {
    id: 'n4',
    title: 'UM Hackathon 2026 — Registration Now Open',
    body: 'Join the annual UM Hackathon from 10–12 January 2026. Open to all faculties, with prizes worth RM30,000. Register in teams of three by 20 December 2025.',
    source: 'Student Affairs Division',
    date: '2026-11-20',
    priority: 'low',
    tag: 'Event',
  },
  {
    id: 'n5',
    title: 'Bus Route B5 Temporary Diversion',
    body: 'Campus Bus Route B5 will divert via the Faculty of Engineering loop from 25 November to 2 December 2025 due to road resurfacing works near Gate 3.',
    source: 'Campus Transport Unit',
    date: '2026-11-19',
    priority: 'medium',
    tag: 'Campus',
  },
]

export const announcements_short = announcements

export const exams = [
  {
    id: 'e1',
    code: 'WIA3001',
    course: 'Machine Learning',
    date: '2026-12-15',
    start: '09:00',
    end: '12:00',
    venue: 'Dewan Kuliah Besar (DKB)',
    seat: 'B-114',
    duration: '3 hours',
    format: 'Closed Book',
  },
  {
    id: 'e2',
    code: 'WIX3007',
    course: 'Database Systems',
    date: '2026-12-17',
    start: '14:00',
    end: '17:00',
    venue: 'Dewan Kuliah Besar (DKB)',
    seat: 'C-207',
    duration: '3 hours',
    format: 'Closed Book',
  },
  {
    id: 'e3',
    code: 'WIA3002',
    course: 'Artificial Intelligence & Knowledge Representation',
    date: '2026-12-18',
    start: '09:00',
    end: '12:00',
    venue: 'Dewan Tunku Canselor',
    seat: 'A-032',
    duration: '3 hours',
    format: 'Open Book',
  },
  {
    id: 'e4',
    code: 'WIX3009',
    course: 'Software Engineering',
    date: '2026-12-19',
    start: '14:00',
    end: '16:30',
    venue: 'Dewan Kuliah 3, FCS',
    seat: 'D-041',
    duration: '2.5 hours',
    format: 'Closed Book',
  },
  {
    id: 'e5',
    code: 'WIA3015',
    course: 'Deep Learning & Neural Networks',
    date: '2026-12-22',
    start: '09:00',
    end: '12:00',
    venue: 'Dewan Kuliah Besar (DKB)',
    seat: 'B-088',
    duration: '3 hours',
    format: 'Closed Book',
  },
  {
    id: 'e6',
    code: 'GIG1004',
    course: 'Hubungan Etnik',
    date: '2026-12-23',
    start: '14:00',
    end: '16:00',
    venue: 'Dewan Kuliah 1, APM',
    seat: 'E-019',
    duration: '2 hours',
    format: 'Closed Book',
  },
]

export const busRoutes = [
  {
    id: 'B1',
    name: 'Route B1 — Main Campus Loop',
    color: '#22346b',
    stops: [
      'Gate 1 (Main Entrance)',
      'Chancellery Building',
      'Central Library',
      'Faculty of Computer Science',
      'Faculty of Engineering',
      'Gate 1 (Main Entrance)',
    ],
    interval: '10 min',
    hours: '7:00 a.m. – 11:00 p.m.',
  },
  {
    id: 'B3',
    name: 'Route B3 — Residential Colleges',
    color: '#d99a1c',
    stops: [
      'KK7 Tun Ahmad Zaidi',
      'KK5 Tun Fatimah',
      'Sports Centre',
      'Central Library',
      'Faculty of Science',
      'KK7 Tun Ahmad Zaidi',
    ],
    interval: '15 min',
    hours: '7:00 a.m. – 10:30 p.m.',
  },
  {
    id: 'B5',
    name: 'Route B5 — Medical Centre Shuttle',
    color: '#047857',
    stops: [
      'Gate 3',
      'Faculty of Medicine',
      'UM Medical Centre',
      'Faculty of Dentistry',
      'Gate 3',
    ],
    interval: '20 min',
    hours: '7:30 a.m. – 9:30 p.m.',
  },
]

export const campusLocations = [
  { id: 'l1', name: 'Central Library', category: 'Academic', zone: 'North', x: 46, y: 34, open: '8:00 a.m. – 2:00 a.m.' },
  { id: 'l2', name: 'Faculty of Computer Science & IT', category: 'Faculty', zone: 'East', x: 68, y: 44, open: '8:00 a.m. – 10:00 p.m.' },
  { id: 'l3', name: 'Chancellery Building', category: 'Administration', zone: 'North', x: 52, y: 22, open: '8:30 a.m. – 5:30 p.m.' },
  { id: 'l4', name: 'Dewan Tunku Canselor', category: 'Facility', zone: 'Centre', x: 40, y: 50, open: 'Event days only' },
  { id: 'l5', name: 'KK7 Tun Ahmad Zaidi', category: 'Residence', zone: 'West', x: 22, y: 62, open: '24 hours' },
  { id: 'l6', name: 'Sports Centre', category: 'Facility', zone: 'South', x: 38, y: 72, open: '7:00 a.m. – 11:00 p.m.' },
  { id: 'l7', name: 'UM Medical Centre', category: 'Health', zone: 'South', x: 58, y: 80, open: '24 hours' },
  { id: 'l8', name: 'Faculty of Engineering', category: 'Faculty', zone: 'East', x: 76, y: 60, open: '8:00 a.m. – 10:00 p.m.' },
  { id: 'l9', name: 'Student Activity Centre', category: 'Facility', zone: 'Centre', x: 50, y: 60, open: '8:00 a.m. – 11:30 p.m.' },
  { id: 'l10', name: 'Examination Hall (DKB)', category: 'Academic', zone: 'North', x: 60, y: 30, open: 'Event days only' },
]

export const events = [
  {
    id: 'v1',
    title: 'UM Hackathon 2026',
    date: '2026-01-10',
    endDate: '2026-01-12',
    venue: 'FCS Innovation Lab',
    category: 'Competition',
    organiser: 'Student Affairs Division',
    description: 'A 48-hour hackathon open to all faculties. Build solutions for smart campus challenges and win prizes worth RM30,000.',
  },
  {
    id: 'v2',
    title: 'Career Fair: Tech & Finance Edition',
    date: '2026-12-02',
    venue: 'Dewan Tunku Canselor',
    category: 'Career',
    organiser: 'UM Career Centre',
    description: 'Meet 45 employers including Maybank, Grab, Intel and Deloitte. Bring printed CVs and dress in business attire.',
  },
  {
    id: 'v3',
    title: 'FCS Research Symposium',
    date: '2026-12-06',
    venue: 'FCS Auditorium',
    category: 'Academic',
    organiser: 'Faculty of Computer Science & IT',
    description: 'Postgraduate and final-year students present research in AI, cybersecurity and data science.',
  },
  {
    id: 'v4',
    title: 'Community Service: Sungai Putat Clean-Up',
    date: '2026-12-13',
    venue: 'Sungai Putat, Kuala Lumpur',
    category: 'Volunteering',
    organiser: 'UM Volunteer Corps',
    description: 'River clean-up and awareness programme. Transport and meals provided. Merits awarded for participation.',
  },
  {
    id: 'v5',
    title: 'Exchange Programme Info Session (AUN-ACTS)',
    date: '2026-11-28',
    venue: 'Online (Microsoft Teams)',
    category: 'Opportunity',
    organiser: 'International Office',
    description: 'Learn about semester exchange opportunities across ASEAN partner universities for Semester 2 2025/2026.',
  },
  {
    id: 'v6',
    title: 'Industry Talk: Generative AI in Practice',
    date: '2026-11-27',
    venue: 'DK2, FCS Building',
    category: 'Talk',
    organiser: 'IEEE UM Student Branch',
    description: 'Engineers from a leading regional AI company discuss deploying large language models in production.',
  },
]

export const services = [
  { id: 's1', name: 'UM Touch (Financial)', description: 'Fees, payments and financial statements', icon: 'CreditCard', status: 'Action required', tone: 'warning' },
  { id: 's2', name: 'Hostel & Residency', description: 'Room applications and residential matters', icon: 'Building2', status: 'Active', tone: 'ok' },
  { id: 's3', name: 'Library Services', description: 'Loans, bookings and digital resources', icon: 'Library', status: '2 loans due', tone: 'warning' },
  { id: 's4', name: 'Examination Unit', description: 'Exam slips, appeals and clash reports', icon: 'FileCheck2', status: 'Available', tone: 'ok' },
  { id: 's5', name: 'Health & Counselling', description: 'Clinic appointments and wellbeing support', icon: 'HeartPulse', status: 'Available', tone: 'ok' },
  { id: 's6', name: 'Scholarships & Aid', description: 'Bursaries, PTPTN and financial assistance', icon: 'Award', status: 'Open', tone: 'ok' },
  { id: 's7', name: 'Career Centre', description: 'Internships, CV clinics and job fairs', icon: 'Briefcase', status: 'New', tone: 'info' },
  { id: 's8', name: 'IT Helpdesk', description: 'Account, Wi-Fi and portal assistance', icon: 'HelpCircle', status: 'Available', tone: 'ok' },
]

export const revisionGames = [
  { id: 'g1', name: 'ML Concept Match', subject: 'Machine Learning', mode: 'Matching', best: '92%', plays: 14, icon: 'Brain' },
  { id: 'g2', name: 'SQL Query Builder', subject: 'Database Systems', mode: 'Puzzle', best: '88%', plays: 9, icon: 'Database' },
  { id: 'g3', name: 'Neural Net Flashcards', subject: 'Deep Learning', mode: 'Flashcards', best: '95%', plays: 21, icon: 'Layers' },
  { id: 'g4', name: 'SE Terminology Sprint', subject: 'Software Engineering', mode: 'Timed Quiz', best: '81%', plays: 6, icon: 'Zap' },
]

export const courseColors = Object.fromEntries(courses.map((c) => [c.code, c.color]))

export function courseByCode(code) {
  return courses.find((c) => c.code === code)
}

export const materialTypes = ['Lecture Slides', 'Tutorial', 'Assignment', 'Revision']

export const materials = [
  { id: 'm01', code: 'WIA3001', type: 'Lecture Slides', title: 'Week 1 — Introduction to Machine Learning', week: 1, occ: 'OCC 1', size: '2.4 MB', updated: '2026-09-08' },
  { id: 'm02', code: 'WIA3001', type: 'Lecture Slides', title: 'Week 2 — Linear Regression & Gradient Descent', week: 2, occ: 'OCC 1', size: '3.1 MB', updated: '2026-09-15' },
  { id: 'm03', code: 'WIA3001', type: 'Tutorial', title: 'Tutorial 2 — Gradient Descent Exercises', week: 2, occ: 'OCC 1', size: '780 KB', updated: '2026-09-16' },
  { id: 'm04', code: 'WIA3001', type: 'Lecture Slides', title: 'Week 3 — Logistic Regression & Regularisation', week: 3, occ: 'OCC 1', size: '2.9 MB', updated: '2026-09-22' },
  { id: 'm05', code: 'WIA3001', type: 'Assignment', title: 'Assignment 1 — Regression Model Report', week: 3, occ: 'OCC 1', size: '540 KB', updated: '2026-09-23' },
  { id: 'm06', code: 'WIA3001', type: 'Lecture Slides', title: 'Week 5 — Support Vector Machines', week: 5, occ: 'OCC 1', size: '3.6 MB', updated: '2026-10-06' },
  { id: 'm07', code: 'WIA3001', type: 'Revision', title: 'Midterm Revision Pack — Topics 1 to 5', week: 7, occ: 'OCC 1', size: '5.2 MB', updated: '2026-10-20' },
  { id: 'm08', code: 'WIA3001', type: 'Assignment', title: 'Assignment 2 — Supervised Learning Pipelines', week: 10, occ: 'OCC 1', size: '620 KB', updated: '2026-11-10' },
  { id: 'm09', code: 'WIA3001', type: 'Lecture Slides', title: 'Week 11 — Ensemble Methods', week: 11, occ: 'OCC 1', size: '3.3 MB', updated: '2026-11-17' },
  { id: 'm10', code: 'WIA3001', type: 'Revision', title: 'Past Year Questions (2022–2025)', week: 13, occ: 'OCC 1', size: '4.1 MB', updated: '2026-11-24' },

  { id: 'm11', code: 'WIA3002', type: 'Lecture Slides', title: 'Week 1 — Foundations of AI Agents', week: 1, occ: 'OCC 1', size: '2.2 MB', updated: '2026-09-09' },
  { id: 'm12', code: 'WIA3002', type: 'Lecture Slides', title: 'Week 4 — Propositional Logic & Inference', week: 4, occ: 'OCC 1', size: '3.0 MB', updated: '2026-09-30' },
  { id: 'm13', code: 'WIA3002', type: 'Tutorial', title: 'Tutorial 3 — Knowledge Representation', week: 4, occ: 'OCC 1', size: '690 KB', updated: '2026-10-01' },
  { id: 'm14', code: 'WIA3002', type: 'Lecture Slides', title: 'Week 6 — Bayesian Networks', week: 6, occ: 'OCC 1', size: '2.8 MB', updated: '2026-10-13' },
  { id: 'm15', code: 'WIA3002', type: 'Assignment', title: 'Tutorial 5 — Bayesian Networks Submission', week: 9, occ: 'OCC 1', size: '410 KB', updated: '2026-11-03' },
  { id: 'm16', code: 'WIA3002', type: 'Revision', title: 'Revision Slides — Logic & Search', week: 12, occ: 'OCC 1', size: '3.7 MB', updated: '2026-11-18' },

  { id: 'm17', code: 'WIX3007', type: 'Lecture Slides', title: 'Week 1 — Database Architecture & ER Modelling', week: 1, occ: 'OCC 1', size: '2.6 MB', updated: '2026-09-08' },
  { id: 'm18', code: 'WIX3007', type: 'Tutorial', title: 'Tutorial 2 — ER Diagram Practice', week: 2, occ: 'OCC 1', size: '640 KB', updated: '2026-09-15' },
  { id: 'm19', code: 'WIX3007', type: 'Lecture Slides', title: 'Week 4 — Normalisation (1NF to BCNF)', week: 4, occ: 'OCC 1', size: '3.4 MB', updated: '2026-09-29' },
  { id: 'm20', code: 'WIX3007', type: 'Lecture Slides', title: 'Week 6 — SQL Joins and Subqueries', week: 6, occ: 'OCC 1', size: '3.9 MB', updated: '2026-10-14' },
  { id: 'm21', code: 'WIX3007', type: 'Assignment', title: 'Lab Report 4 — Query Optimisation', week: 10, occ: 'OCC 1', size: '530 KB', updated: '2026-11-11' },
  { id: 'm22', code: 'WIX3007', type: 'Revision', title: 'SQL Cheat Sheet & Normalisation Flashcards', week: 13, occ: 'OCC 1', size: '1.2 MB', updated: '2026-11-23' },

  { id: 'm23', code: 'WIX3009', type: 'Lecture Slides', title: 'Week 1 — Software Processes & Agile', week: 1, occ: 'OCC 2', size: '2.1 MB', updated: '2026-09-10' },
  { id: 'm24', code: 'WIX3009', type: 'Tutorial', title: 'Tutorial 2 — Requirement Elicitation', week: 2, occ: 'OCC 2', size: '700 KB', updated: '2026-09-17' },
  { id: 'm25', code: 'WIX3009', type: 'Assignment', title: 'Group Project Sprint 2 — SRS Document', week: 11, occ: 'OCC 2', size: '810 KB', updated: '2026-11-13' },
  { id: 'm26', code: 'WIX3009', type: 'Lecture Slides', title: 'Week 8 — Design Patterns & Architecture', week: 8, occ: 'OCC 2', size: '3.5 MB', updated: '2026-10-27' },
  { id: 'm27', code: 'WIX3009', type: 'Revision', title: 'UML Diagrams Quick Reference', week: 12, occ: 'OCC 2', size: '2.0 MB', updated: '2026-11-19' },

  { id: 'm28', code: 'WIA3015', type: 'Lecture Slides', title: 'Week 1 — Introduction to Deep Learning', week: 1, occ: 'OCC 2', size: '2.7 MB', updated: '2026-09-11' },
  { id: 'm29', code: 'WIA3015', type: 'Lecture Slides', title: 'Week 3 — Backpropagation & Optimisers', week: 3, occ: 'OCC 2', size: '3.8 MB', updated: '2026-09-24' },
  { id: 'm30', code: 'WIA3015', type: 'Tutorial', title: 'Lab 3 — PyTorch Fundamentals', week: 4, occ: 'OCC 2', size: '1.5 MB', updated: '2026-10-01' },
  { id: 'm31', code: 'WIA3015', type: 'Lecture Slides', title: 'Week 7 — Convolutional Neural Networks', week: 7, occ: 'OCC 2', size: '4.2 MB', updated: '2026-10-22' },
  { id: 'm32', code: 'WIA3015', type: 'Assignment', title: 'CNN Image Classification Mini-Project', week: 12, occ: 'OCC 2', size: '930 KB', updated: '2026-11-18' },
  { id: 'm33', code: 'WIA3015', type: 'Revision', title: 'Architecture Comparison Summary', week: 13, occ: 'OCC 2', size: '2.3 MB', updated: '2026-11-22' },

  { id: 'm34', code: 'GIG1004', type: 'Lecture Slides', title: 'Week 1 — Plural Society in Malaysia', week: 1, occ: 'OCC 1', size: '2.0 MB', updated: '2026-09-09' },
  { id: 'm35', code: 'GIG1004', type: 'Lecture Slides', title: 'Week 5 — Nation-Building & Integration', week: 5, occ: 'OCC 1', size: '2.5 MB', updated: '2026-10-07' },
  { id: 'm36', code: 'GIG1004', type: 'Assignment', title: "Reflective Essay — Malaysia's Nation-Building", week: 9, occ: 'OCC 1', size: '320 KB', updated: '2026-11-05' },
  { id: 'm37', code: 'GIG1004', type: 'Revision', title: 'Revision Notes — Weeks 1 to 7', week: 12, occ: 'OCC 1', size: '1.8 MB', updated: '2026-11-20' },
]

export const attendanceSessions = [
  { id: 't1', code: 'WIA3001', date: '2026-09-08', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't2', code: 'WIA3001', date: '2026-09-15', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't3', code: 'WIA3001', date: '2026-09-17', start: '08:00', type: 'Tutorial', status: 'present', venue: 'Tutorial Room 3' },
  { id: 't4', code: 'WIA3001', date: '2026-09-22', start: '08:00', type: 'Lecture', status: 'absent', venue: 'DK2, FCS Building' },
  { id: 't5', code: 'WIA3001', date: '2026-10-06', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't6', code: 'WIA3001', date: '2026-10-13', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't7', code: 'WIA3001', date: '2026-10-15', start: '08:00', type: 'Tutorial', status: 'late', venue: 'Tutorial Room 3' },
  { id: 't8', code: 'WIA3001', date: '2026-10-27', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't9', code: 'WIA3001', date: '2026-11-03', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't10', code: 'WIA3001', date: '2026-11-10', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't11', code: 'WIA3001', date: '2026-11-17', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't12', code: 'WIA3001', date: '2026-11-24', start: '08:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },

  { id: 't13', code: 'WIA3002', date: '2026-09-09', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't14', code: 'WIA3002', date: '2026-09-23', start: '09:00', type: 'Lecture', status: 'absent', venue: 'DK5, FCS Building' },
  { id: 't15', code: 'WIA3002', date: '2026-10-13', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't16', code: 'WIA3002', date: '2026-10-16', start: '08:30', type: 'Tutorial', status: 'present', venue: 'Tutorial Room 2' },
  { id: 't17', code: 'WIA3002', date: '2026-10-27', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't18', code: 'WIA3002', date: '2026-11-10', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't19', code: 'WIA3002', date: '2026-11-17', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't20', code: 'WIA3002', date: '2026-11-24', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },

  { id: 't21', code: 'WIX3007', date: '2026-09-08', start: '11:00', type: 'Laboratory', status: 'present', venue: 'Lab 4, FCS Building' },
  { id: 't22', code: 'WIX3007', date: '2026-09-15', start: '11:00', type: 'Laboratory', status: 'present', venue: 'Lab 4, FCS Building' },
  { id: 't23', code: 'WIX3007', date: '2026-09-29', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't24', code: 'WIX3007', date: '2026-10-13', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't25', code: 'WIX3007', date: '2026-10-27', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't26', code: 'WIX3007', date: '2026-11-10', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't27', code: 'WIX3007', date: '2026-11-17', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },
  { id: 't28', code: 'WIX3007', date: '2026-11-24', start: '09:00', type: 'Lecture', status: 'present', venue: 'DK5, FCS Building' },

  { id: 't29', code: 'WIX3009', date: '2026-09-10', start: '14:00', type: 'Lecture', status: 'present', venue: 'DK1, FCS Building' },
  { id: 't30', code: 'WIX3009', date: '2026-09-24', start: '14:00', type: 'Lecture', status: 'absent', venue: 'DK1, FCS Building' },
  { id: 't31', code: 'WIX3009', date: '2026-10-08', start: '13:00', type: 'Laboratory', status: 'present', venue: 'Lab 1, FCS Building' },
  { id: 't32', code: 'WIX3009', date: '2026-10-22', start: '14:00', type: 'Lecture', status: 'late', venue: 'DK1, FCS Building' },
  { id: 't33', code: 'WIX3009', date: '2026-11-05', start: '13:00', type: 'Laboratory', status: 'present', venue: 'Lab 1, FCS Building' },
  { id: 't34', code: 'WIX3009', date: '2026-11-12', start: '14:00', type: 'Lecture', status: 'present', venue: 'DK1, FCS Building' },
  { id: 't35', code: 'WIX3009', date: '2026-11-19', start: '14:00', type: 'Lecture', status: 'absent', venue: 'DK1, FCS Building' },
  { id: 't36', code: 'WIX3009', date: '2026-11-20', start: '13:00', type: 'Laboratory', status: 'present', venue: 'Lab 1, FCS Building' },

  { id: 't37', code: 'WIA3015', date: '2026-09-11', start: '15:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't38', code: 'WIA3015', date: '2026-09-18', start: '14:00', type: 'Laboratory', status: 'present', venue: 'Lab 2, FCS Building' },
  { id: 't39', code: 'WIA3015', date: '2026-10-02', start: '14:00', type: 'Laboratory', status: 'absent', venue: 'Lab 2, FCS Building' },
  { id: 't40', code: 'WIA3015', date: '2026-10-09', start: '15:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't41', code: 'WIA3015', date: '2026-10-30', start: '15:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't42', code: 'WIA3015', date: '2026-11-06', start: '14:00', type: 'Laboratory', status: 'present', venue: 'Lab 2, FCS Building' },
  { id: 't43', code: 'WIA3015', date: '2026-11-13', start: '15:00', type: 'Lecture', status: 'present', venue: 'DK2, FCS Building' },
  { id: 't44', code: 'WIA3015', date: '2026-11-20', start: '14:00', type: 'Laboratory', status: 'present', venue: 'Lab 2, FCS Building' },

  { id: 't45', code: 'GIG1004', date: '2026-09-10', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
  { id: 't46', code: 'GIG1004', date: '2026-10-08', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
  { id: 't47', code: 'GIG1004', date: '2026-10-22', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
  { id: 't48', code: 'GIG1004', date: '2026-11-05', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
  { id: 't49', code: 'GIG1004', date: '2026-11-12', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
  { id: 't50', code: 'GIG1004', date: '2026-11-19', start: '10:00', type: 'Lecture', status: 'present', venue: 'DK A, APM' },
]

export const attendanceOpenWindows = [
  { code: 'WIA3001', opened: true, closesIn: '2 days', sessionDate: '2026-11-25' },
  { code: 'WIX3009', opened: true, closesIn: '1 day', sessionDate: '2026-11-25' },
  { code: 'WIA3015', opened: true, closesIn: '3 days', sessionDate: '2026-11-26' },
]

export const examRevisionChecklist = [
  { id: 'r1', code: 'WIA3001', topic: 'Linear & Logistic Regression', done: true },
  { id: 'r2', code: 'WIA3001', topic: 'Support Vector Machines', done: true },
  { id: 'r3', code: 'WIA3001', topic: 'Ensemble Methods & Boosting', done: false },
  { id: 'r4', code: 'WIA3001', topic: 'Past Year Questions (2022–2025)', done: false },
  { id: 'r5', code: 'WIA3002', topic: 'Propositional & First-Order Logic', done: true },
  { id: 'r6', code: 'WIA3002', topic: 'Bayesian Networks', done: false },
  { id: 'r7', code: 'WIA3002', topic: 'Search Algorithms (A*, Minimax)', done: false },
  { id: 'r8', code: 'WIX3007', topic: 'Normalisation (1NF–BCNF)', done: true },
  { id: 'r9', code: 'WIX3007', topic: 'SQL Joins & Subqueries', done: true },
  { id: 'r10', code: 'WIX3007', topic: 'Transaction Management & Indexing', done: false },
  { id: 'r11', code: 'WIX3009', topic: 'Agile & Scrum Terminology', done: true },
  { id: 'r12', code: 'WIX3009', topic: 'UML Diagrams & Design Patterns', done: false },
  { id: 'r13', code: 'WIA3015', topic: 'Backpropagation & Optimisers', done: true },
  { id: 'r14', code: 'WIA3015', topic: 'CNN & RNN Architectures', done: false },
  { id: 'r15', code: 'WIA3015', topic: 'Regularisation & Dropout', done: false },
  { id: 'r16', code: 'GIG1004', topic: 'Plural Society & Nation-Building', done: true },
  { id: 'r17', code: 'GIG1004', topic: 'Contemporary Malaysian Issues', done: false },
]

export function sessionsByCourse(code) {
  return attendanceSessions
    .filter((s) => s.code === code)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function attendanceStats(code) {
  const sessions = attendanceSessions.filter((s) => s.code === code)
  const present = sessions.filter((s) => s.status === 'present').length
  const late = sessions.filter((s) => s.status === 'late').length
  const absent = sessions.filter((s) => s.status === 'absent').length
  const total = sessions.length || 1
  const pct = Math.round(((present + late * 0.5) / total) * 100)
  return { present, late, absent, total: sessions.length, pct }
}

export function formatTime(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleTimeString('en-MY', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function formatDate(iso, opts) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-MY', opts ?? { day: 'numeric', month: 'short', year: 'numeric' })
}

export function daysUntil(iso) {
  const target = new Date(iso)
  const now = new Date()
  target.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  return Math.round((target - now) / 86400000)
}

export function relativeDue(iso) {
  const diffMs = new Date(iso) - new Date()
  const overdue = diffMs < 0
  const mins = Math.abs(diffMs) / 60000
  if (mins < 60) return { label: overdue ? 'Overdue' : `${Math.round(mins)} min left`, overdue }
  const hours = mins / 60
  if (hours < 24) return { label: overdue ? 'Overdue' : `${Math.round(hours)} h left`, overdue }
  const days = Math.round(hours / 24)
  return { label: overdue ? `Overdue by ${days} d` : `in ${days} d`, overdue }
}

export { dayNames }