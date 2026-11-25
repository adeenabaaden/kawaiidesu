import { assignments, courses, exams, materials, formatDate } from './mockData.js'

export const assistantIntro =
  'Welcome to the UM One AI Assistant. I can help you locate lecture materials, track assignment deadlines, check examination schedules, summarise topics, explain university procedures or suggest revision priorities. Ask a question to begin.'

export const suggestedQuestions = [
  'Where are the Week 5 Machine Learning slides?',
  'What assignments are due this week?',
  'When is my Database Systems exam?',
  'Summarise Bayesian Networks',
  'How do I apply for a scholarship?',
  'What should I revise first?',
]

function materialSummary(course) {
  const list = materials.filter((m) => m.code === course.code)
  const revision = list.filter((m) => m.type === 'Revision').length
  return `${list.length} items (${revision} revision)`
}

export function buildAssistantReply(input) {
  const q = input.toLowerCase().trim()
  const sources = []
  const lines = []

  const matchedCourse =
    courses.find((c) => q.includes(c.code.toLowerCase())) ??
    courses.find((c) => {
      const key = c.name.toLowerCase()
      return q.includes(key) || key.split(' ').some((w) => w.length > 4 && q.includes(w))
    })

  const wantsMaterial = /slide|material|note|lecture|tutorial|revision pack|resource|where|find/.test(q)
  const wantsSummary = /summar|explain|what is|what are|overview|concept/.test(q)
  const wantsDeadline = /assignment|deadline|due|submit|submission/.test(q)
  const wantsExam = /exam|examination|test|paper|sit for/.test(q)
  const wantsAdmin = /how (do|to)|procedure|apply|application|register|scholarship|fee|payment|hostel|document|transcript|appeal/.test(q)
  const wantsRevise = /revis|study first|what should i|recommend|priorit|prepare/.test(q)

  if (wantsExam) {
    const list = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date))
    const scoped = matchedCourse ? list.filter((e) => e.code === matchedCourse.code) : list.slice(0, 4)
    if (scoped.length) {
      lines.push(
        matchedCourse
          ? `Here is your examination schedule for ${matchedCourse.name} (${matchedCourse.code}):`
          : 'Here are your upcoming examinations:',
      )
      for (const e of scoped) {
        lines.push(`• ${e.code} ${e.course} — ${formatDate(e.date, { weekday: 'long', day: 'numeric', month: 'long' })} at ${e.start}, ${e.venue} (Seat ${e.seat}, ${e.format}).`)
      }
      sources.push({ label: 'Examinations — Final Timetable, Semester 1 2025/2026', route: 'examinations' })
    }
  }

  if (wantsDeadline) {
    const list = [...assignments]
      .filter((a) => a.status !== 'submitted')
      .sort((a, b) => new Date(a.due) - new Date(b.due))
    const scoped = matchedCourse ? list.filter((a) => a.code === matchedCourse.code) : list.slice(0, 4)
    if (scoped.length) {
      lines.push(
        matchedCourse
          ? `Your pending assignments for ${matchedCourse.code} are:`
          : 'Your upcoming assignment deadlines are:',
      )
      for (const a of scoped) {
        lines.push(`• ${a.title} (${a.code}) — due ${formatDate(a.due, { day: 'numeric', month: 'short', year: 'numeric' })}, worth ${a.weight}.`)
      }
      sources.push({ label: 'Assignments — Coursework Deadlines', route: 'assignments' })
    }
  }

  if (wantsMaterial) {
    const pool = matchedCourse ? materials.filter((m) => m.code === matchedCourse.code) : materials
    const weekMatch = q.match(/week\s*(\d{1,2})/)
    const topicWords = ['regression', 'logistic', 'svm', 'support vector', 'ensemble', 'normalis', 'normaliz', 'sql', 'join', 'bayesian', 'logic', 'cnn', 'convolution', 'backprop', 'agile', 'uml', 'plural', 'nation-building']
    const topics = topicWords.filter((t) => q.includes(t))

    let found = pool
    if (weekMatch) found = found.filter((m) => m.week === Number(weekMatch[1]))
    if (topics.length) {
      found = found.filter((m) => topics.some((t) => m.title.toLowerCase().includes(t) || m.type.toLowerCase().includes(t)))
    }

    const take = found.length ? found : pool
    const shown = take.slice(0, 5)
    if (shown.length) {
      const scope = weekMatch ? `Week ${weekMatch[1]}` : topics.length ? `"${topics[0]}"` : matchedCourse ? matchedCourse.code : 'your courses'
      lines.push(`I found ${take.length} matching material${take.length === 1 ? '' : 's'} for ${scope}:`)
      for (const m of shown) {
        lines.push(`• ${m.title} — ${m.type}, Week ${m.week}, ${m.occ} (updated ${m.updated}).`)
      }
      for (const m of shown.slice(0, 3)) {
        sources.push({ label: `${m.code} · ${m.title}`, route: 'courses', materialId: m.id })
      }
    }
  }

  if (wantsSummary) {
    const topic = matchedCourse ?? courses.find((c) => c.name.toLowerCase().split(' ').some((w) => w.length > 4 && q.includes(w)))
    const summaries = {
      WIA3001: 'Machine Learning covers supervised learning: linear and logistic regression, regularisation, then support vector machines and ensemble methods. Assessed through Tutorial 2 (gradient descent), Assignment 1 (regression report) and Assignment 2 (supervised learning pipelines).',
      WIA3002: 'Artificial Intelligence & Knowledge Representation introduces rational agents, propositional and first-order logic, inference, and Bayesian networks. Tutorial 5 focuses on Bayesian networks; the final paper is open book.',
      WIX3007: 'Database Systems spans ER modelling, normalisation from 1NF to BCNF, SQL joins and subqueries, then transaction management and indexing. Lab Report 4 covers query optimisation.',
      WIX3009: 'Software Engineering covers software processes and Agile, requirement elicitation, design patterns and architecture, delivered through a group project spanning two sprints.',
      WIA3015: 'Deep Learning & Neural Networks builds from neurons and backpropagation through optimisers, CNNs and RNNs, with regularisation and dropout. The mini-project applies CNNs to image classification.',
      GIG1004: 'Hubungan Etnik examines Malaysia\u2019s plural society, nation-building and integration, and contemporary social issues, assessed by a reflective essay.',
    }
    if (topic && summaries[topic.code]) {
      lines.push(summaries[topic.code])
      const week = topic.teachingWeeks ?? ''
      sources.push({ label: `${topic.code} · ${topic.name} — Course Synopsis (${week})`, route: 'courses' })
    } else if (q.includes('bayesian')) {
      lines.push('Bayesian Networks model uncertain knowledge as directed acyclic graphs where nodes are random variables and edges encode conditional dependence. Each node stores a conditional probability table, and inference computes posterior probabilities given evidence — a core topic in WIA3002, Week 6.')
      sources.push({ label: 'WIA3002 · Week 6 — Bayesian Networks', route: 'courses' })
    }
  }

  if (wantsRevise) {
    const feature = courses
      .map((c) => ({ c, pct: 100 - c.progress }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3)
    lines.push('Based on your progress and upcoming papers, I recommend revising in this order:')
    for (const { c } of feature) {
      lines.push(`• ${c.name} (${c.code}) — ${c.progress}% course progress; next session is ${feature.length ? 'this week' : 'soon'}.`)
    }
    lines.push('Start with the course whose examination falls earliest — Machine Learning is on 15 December 2025.')
    sources.push({ label: 'Revision Checklist — Examinations', route: 'examinations' })
    sources.push({ label: 'Revision Games — Practice Quizzes', route: 'games' })
  }

  if (wantsAdmin) {
    const procedures = [
      { match: /scholarship|financial|bursar|aid/, text: 'To apply for financial assistance, open Student Services, choose Scholarships & Aid, complete the application form with your household income details and upload supporting documents. Applications for Semester 2 open from 1 December 2025.' },
      { match: /fee|payment|pay|um touch/, text: 'Tuition fees are shown under Student Services → UM Touch. Payment can be made by FPX or card in the prototype; the outstanding balance for Semester 1 is RM 1,250, due by 15 December 2025 to avoid examination barring.' },
      { match: /hostel|residen|room|kolej/, text: 'Hostel and residency matters are handled under Student Services → Hostel & Residency. You are currently assigned to Kolej Kediaman Tun Ahmad Zaidi (KK7); room change requests open two weeks before each semester.' },
      { match: /transcript|document|letter|certif/, text: 'Official documents such as transcripts and enrolment letters can be requested under Student Services → Document Requests. Standard processing takes three working days; a collection slip is issued once ready.' },
      { match: /appeal|special consideration|remark/, text: 'Examination appeals and special consideration requests are filed with the Examinations Unit within five working days of the paper, using Student Services → Application Status.' },
      { match: /register|add|drop|course/, text: 'Course registration and add/drop are handled in Student Services → Course Registration. Your registered load for Semester 1 is 19 credit hours across six courses.' },
    ]
    const hit = procedures.find((p) => p.match.test(q))
    lines.push(hit ? hit.text : 'Most administrative procedures are available under Student Services: fees and payments, course registration, financial assistance, academic results, document requests and application tracking. Tell me which one you need and I will walk you through it.')
    sources.push({ label: 'Student Services — UM MAYA Administration', route: 'services' })
  }

  if (!lines.length) {
    lines.push(`I can help with that once I understand the topic. Try asking about a specific course code (for example ${courses[0].code}), lecture materials by week or topic, upcoming deadlines, examination schedules, or an administrative procedure. Here is a quick view of your registered courses:`)
    for (const c of courses.slice(0, 4)) {
      lines.push(`• ${c.code} ${c.name} — ${materialSummary(c)}.`)
    }
    sources.push({ label: 'My Courses — Enrolled Courses', route: 'courses' })
  }

  const uniqueSources = sources.filter((s, i, arr) => arr.findIndex((x) => x.label === s.label) === i)

  return { text: lines.join('\n'), sources: uniqueSources.slice(0, 4) }
}

export const starterConversation = [
  { id: 'msg-1', role: 'assistant', text: assistantIntro, sources: [] },
]

export function makeMessage(role, text, sources = []) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
    sources,
  }
}