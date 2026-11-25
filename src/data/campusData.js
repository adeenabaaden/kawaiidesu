export const busLive = [
  {
    id: 'B1',
    name: 'Route B1 — Main Campus Loop',
    color: '#22346b',
    status: 'In service',
    interval: '10 min',
    hours: '7:00 a.m. – 11:00 p.m.',
    buses: [
      { id: 'B1-01', percent: 0.18, speed: 1, nextStop: 'Central Library', eta: 3, occupancy: 'Moderate' },
      { id: 'B1-02', percent: 0.62, speed: 1.15, nextStop: 'Faculty of Engineering', eta: 6, occupancy: 'Light' },
    ],
    stops: [
      { name: 'Gate 1 (Main Entrance)', x: 12, y: 82 },
      { name: 'Chancellery Building', x: 30, y: 46 },
      { name: 'Central Library', x: 46, y: 34 },
      { name: 'Faculty of Computer Science', x: 68, y: 44 },
      { name: 'Faculty of Engineering', x: 78, y: 62 },
      { name: 'Sports Centre', x: 40, y: 74 },
    ],
  },
  {
    id: 'B3',
    name: 'Route B3 — Residential Colleges',
    color: '#d99a1c',
    status: 'In service',
    interval: '15 min',
    hours: '7:00 a.m. – 10:30 p.m.',
    buses: [
      { id: 'B3-01', percent: 0.35, speed: 0.9, nextStop: 'KK5 Tun Fatimah', eta: 4, occupancy: 'Full' },
    ],
    stops: [
      { name: 'KK7 Tun Ahmad Zaidi', x: 22, y: 62 },
      { name: 'KK5 Tun Fatimah', x: 16, y: 44 },
      { name: 'Sports Centre', x: 40, y: 74 },
      { name: 'Central Library', x: 46, y: 34 },
      { name: 'Faculty of Science', x: 58, y: 22 },
    ],
  },
  {
    id: 'B5',
    name: 'Route B5 — Medical Centre Shuttle',
    color: '#047857',
    status: 'Diversion',
    interval: '20 min',
    hours: '7:30 a.m. – 9:30 p.m.',
    note: 'Diverted via the Faculty of Engineering loop until 2 December 2025.',
    buses: [
      { id: 'B5-01', percent: 0.5, speed: 0.8, nextStop: 'UM Medical Centre', eta: 5, occupancy: 'Light' },
    ],
    stops: [
      { name: 'Gate 3', x: 84, y: 86 },
      { name: 'Faculty of Medicine', x: 70, y: 78 },
      { name: 'UM Medical Centre', x: 58, y: 80 },
      { name: 'Faculty of Dentistry', x: 66, y: 68 },
    ],
  },
]

export const mapLocations = [
  { id: 'fcs', name: 'Faculty of Computer Science & IT', category: 'Faculty', zone: 'East', x: 68, y: 44, open: '8:00 a.m. – 10:00 p.m.', note: 'Your faculty — home of WIA/WIX courses.' },
  { id: 'library', name: 'Central Library', category: 'Library', zone: 'North', x: 46, y: 34, open: '8:00 a.m. – 2:00 a.m.', note: 'Extended hours during Revision Week.' },
  { id: 'fom', name: 'Faculty of Medicine', category: 'Faculty', zone: 'South', x: 70, y: 78, open: '8:00 a.m. – 6:00 p.m.', note: 'Adjacent to UM Medical Centre.' },
  { id: 'foe', name: 'Faculty of Engineering', category: 'Faculty', zone: 'East', x: 78, y: 62, open: '8:00 a.m. – 10:00 p.m.', note: 'Engineering lecture theatres and labs.' },
  { id: 'fos', name: 'Faculty of Science', category: 'Faculty', zone: 'North', x: 58, y: 22, open: '8:00 a.m. – 9:00 p.m.', note: 'Science laboratories and lecture halls.' },
  { id: 'chancellery', name: 'Chancellery Building', category: 'Administration', zone: 'North', x: 30, y: 46, open: '8:30 a.m. – 5:30 p.m.', note: 'Registry, bursary and international office.' },
  { id: 'dtc', name: 'Dewan Tunku Canselor', category: 'Facility', zone: 'Centre', x: 40, y: 50, open: 'Event days only', note: 'Convocations and major university events.' },
  { id: 'dkb', name: 'Dewan Kuliah Besar (DKB)', category: 'Lecture Hall', zone: 'North', x: 60, y: 30, open: 'Event days only', note: 'Main examination venue.' },
  { id: 'sac', name: 'Student Activity Centre', category: 'Facility', zone: 'Centre', x: 50, y: 60, open: '8:00 a.m. – 11:30 p.m.', note: 'Clubs, societies and co-curriculum.' },
  { id: 'kk7', name: 'KK7 Tun Ahmad Zaidi', category: 'Residence', zone: 'West', x: 22, y: 62, open: '24 hours', note: 'Your residential college.' },
  { id: 'cafeteria', name: 'Cafeteria (Kafe Siswa)', category: 'Cafeteria', zone: 'Centre', x: 44, y: 58, open: '7:00 a.m. – 9:00 p.m.', note: 'Halal food court with 20+ stalls.' },
  { id: 'cafeteria2', name: 'Kafe FCS', category: 'Cafeteria', zone: 'East', x: 72, y: 38, open: '8:00 a.m. – 6:00 p.m.', note: 'Nearest cafeteria to your faculty.' },
  { id: 'sports', name: 'Sports Centre', category: 'Facility', zone: 'South', x: 40, y: 74, open: '7:00 a.m. – 11:00 p.m.', note: 'Gym, courts and swimming pool.' },
  { id: 'umc', name: 'UM Medical Centre', category: 'Health', zone: 'South', x: 58, y: 80, open: '24 hours', note: 'Clinic, emergency and pharmacy.' },
  { id: 'mosque', name: 'Masjid Universiti Malaya', category: 'Worship', zone: 'Centre', x: 34, y: 40, open: '5:00 a.m. – 11:00 p.m.', note: 'Main campus mosque.' },
]

export const mapCategories = ['All', 'Faculty', 'Lecture Hall', 'Library', 'Cafeteria', 'Administration', 'Facility', 'Residence', 'Health', 'Worship']

export function walkingDirections(from, to) {
  if (!from || !to) return []
  const dx = to.x - from.x
  const dy = to.y - from.y
  const ew = dx > 0 ? 'east' : 'west'
  const ns = dy > 0 ? 'south' : 'north'
  const distance = Math.round((Math.abs(dx) + Math.abs(dy)) * 4.5)
  const minutes = Math.max(2, Math.round(distance / 75))
  return [
    `Leave ${from.name} and head ${ns} along the main campus walkway.`,
    `Continue ${ew} past the ${dx > 10 ? 'central concourse' : 'nearest pedestrian crossing'}.`,
    `Follow the signposts towards ${to.name} in the ${zoneName(to.zone)} area of campus.`,
    `Arrive at ${to.name} (${to.open}).`,
    `Estimated walking distance ${distance} m, approximately ${minutes} minutes.`,
  ]
}

function zoneName(zone) {
  return { North: 'northern', South: 'southern', East: 'eastern', West: 'western', Centre: 'central' }[zone] ?? 'central'
}

export const opportunities = [
  {
    id: 'o1',
    title: 'UM Hackathon 2026',
    category: 'Competition',
    date: '2026-01-10',
    endDate: '2026-01-12',
    venue: 'FCS Innovation Lab',
    organiser: 'Student Affairs Division',
    deadline: '2025-12-20',
    prize: 'RM30,000 total',
    description: 'A 48-hour hackathon open to all faculties. Build solutions for smart campus challenges across sustainability, mobility and student wellbeing.',
    registrationOpen: true,
  },
  {
    id: 'o2',
    title: 'Software Engineering Internship — Maybank',
    category: 'Internship',
    date: '2026-02-01',
    venue: 'Maybank Tower, Kuala Lumpur',
    organiser: 'Maybank Innovation',
    deadline: '2025-12-15',
    duration: '6 months',
    description: 'Internship in digital banking engineering covering backend services, data pipelines and secure API integration. Open to Year 3 students.',
    registrationOpen: true,
  },
  {
    id: 'o3',
    title: 'AUN-ACTS Exchange Programme',
    category: 'Internship',
    date: '2026-03-01',
    venue: 'ASEAN partner universities',
    organiser: 'International Office',
    deadline: '2026-01-05',
    duration: '1 semester',
    description: 'Semester exchange across ASEAN partner universities including NUS, Chulalongkorn and Universitas Indonesia. Credit transfer applies.',
    registrationOpen: true,
  },
  {
    id: 'o4',
    title: 'Sungai Putat River Clean-Up',
    category: 'Volunteering',
    date: '2026-12-13',
    venue: 'Sungai Putat, Kuala Lumpur',
    organiser: 'UM Volunteer Corps',
    deadline: '2025-12-10',
    description: 'Community river clean-up and environmental awareness programme. Transport and meals provided; merits awarded.',
    registrationOpen: true,
  },
  {
    id: 'o5',
    title: 'Robotics Club — Autonomous Bot Sprint',
    category: 'Club Activity',
    date: '2026-01-17',
    venue: 'Student Activity Centre',
    organiser: 'UM Robotics Club',
    deadline: '2026-01-10',
    description: 'Team sprint to build an autonomous line-following robot. Open to beginners with mentors provided.',
    registrationOpen: true,
  },
  {
    id: 'o6',
    title: 'Yayasan UM Merit Scholarship',
    category: 'Scholarship',
    date: '2026-01-31',
    venue: 'Online application',
    organiser: 'Yayasan Universiti Malaya',
    deadline: '2026-01-31',
    prize: 'Full tuition + allowance',
    description: 'Merit-based scholarship for high-achieving students with demonstrated leadership and community involvement. CGPA 3.50 and above.',
    registrationOpen: true,
  },
  {
    id: 'o7',
    title: 'Career Fair: Tech & Finance Edition',
    category: 'Career',
    date: '2026-12-02',
    venue: 'Dewan Tunku Canselor',
    organiser: 'UM Career Centre',
    deadline: '2025-12-01',
    description: 'Meet 45 employers including Grab, Intel and Deloitte. Bring printed CVs; dress code is business attire.',
    registrationOpen: true,
  },
  {
    id: 'o8',
    title: 'Industry Talk: Generative AI in Practice',
    category: 'Career',
    date: '2026-11-27',
    venue: 'DK2, FCS Building',
    organiser: 'IEEE UM Student Branch',
    deadline: '2026-11-26',
    description: 'Engineers from a regional AI company discuss deploying large language models in production.',
    registrationOpen: false,
  },
]

export const opportunityCategories = ['All', 'Competition', 'Internship', 'Volunteering', 'Scholarship', 'Club Activity', 'Career']

export const departmentDirectory = [
  { id: 'd1', name: 'Academic Affairs Division', email: 'akademik@um.edu.my', phone: '+603-7967 3200', location: 'Chancellery Building, Level 2', hours: 'Mon–Fri, 8:30 a.m. – 5:30 p.m.', tags: ['Registration', 'Courses', 'Academic records'] },
  { id: 'd2', name: 'Examinations Unit', email: 'peperiksaan@um.edu.my', phone: '+603-7967 3210', location: 'Chancellery Building, Level 1', hours: 'Mon–Fri, 8:30 a.m. – 5:00 p.m.', tags: ['Examinations', 'Appeals', 'Results'] },
  { id: 'd3', name: 'Bursary', email: 'bendahari@um.edu.my', phone: '+603-7967 3220', location: 'Chancellery Building, Level 3', hours: 'Mon–Fri, 8:30 a.m. – 5:00 p.m.', tags: ['Fees', 'Payments', 'Scholarships'] },
  { id: 'd4', name: 'Student Affairs Division', email: 'hepa@um.edu.my', phone: '+603-7967 3230', location: 'Student Activity Centre, Level 1', hours: 'Mon–Fri, 8:30 a.m. – 5:30 p.m.', tags: ['Clubs', 'Welfare', 'Hostel'] },
  { id: 'd5', name: 'Health & Counselling Centre', email: 'kaunseling@um.edu.my', phone: '+603-7967 3240', location: 'Student Health Centre', hours: 'Mon–Fri, 8:00 a.m. – 5:00 p.m.', tags: ['Counselling', 'Wellbeing', 'Health'] },
  { id: 'd6', name: 'International Office', email: 'international@um.edu.my', phone: '+603-7967 3250', location: 'Chancellery Building, Level 4', hours: 'Mon–Fri, 9:00 a.m. – 5:00 p.m.', tags: ['Exchange', 'Visa', 'Mobility'] },
  { id: 'd7', name: 'Career Centre', email: 'career@um.edu.my', phone: '+603-7967 3260', location: 'Student Activity Centre, Level 2', hours: 'Mon–Fri, 9:00 a.m. – 5:00 p.m.', tags: ['Internships', 'CV', 'Career fairs'] },
  { id: 'd8', name: 'IT Helpdesk (UM IT)', email: 'helpdesk@um.edu.my', phone: '+603-7967 3270', location: 'Central Library, Level 1', hours: 'Mon–Sat, 8:00 a.m. – 8:00 p.m.', tags: ['Account', 'Wi-Fi', 'Portal'] },
  { id: 'd9', name: 'Library Services', email: 'library@um.edu.my', phone: '+603-7967 3280', location: 'Central Library, Level 1', hours: 'Daily, 8:00 a.m. – 2:00 a.m.', tags: ['Loans', 'Bookings', 'Databases'] },
]

export const supportTopics = ['Course registration', 'Examination matters', 'Fees & payment', 'Hostel & residency', 'Technical / portal issue', 'Welfare & counselling', 'Other']

export const wellbeingResources = [
  { id: 'w1', title: 'Counselling Appointments', description: 'Confidential one-to-one sessions with a university counsellor, in person or online.', contact: 'kaunseling@um.edu.my', availability: 'Mon–Fri, 8:00 a.m. – 5:00 p.m.', icon: 'HeartPulse' },
  { id: 'w2', title: '24-Hour Crisis Line', description: 'Immediate emotional support for students in distress, available every day.', contact: '+603-7967 3200 (ext. 9)', availability: '24 hours', icon: 'PhoneCall' },
  { id: 'w3', title: 'Financial Hardship Support', description: 'Emergency assistance, meal vouchers and fee deferment for students in need.', contact: 'hepa@um.edu.my', availability: 'Mon–Fri, 8:30 a.m. – 5:30 p.m.', icon: 'HandHeart' },
  { id: 'w4', title: 'Peer Support Network', description: 'Trained student volunteers offering informal listening and referral support.', contact: 'peersupport@um.edu.my', availability: 'Mon–Fri, 10:00 a.m. – 6:00 p.m.', icon: 'Users' },
]