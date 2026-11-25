import { useState } from 'react'
import {
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  Check,
  ChevronRight,
  CreditCard,
  FileText,
  GraduationCap,
  LifeBuoy,
  Plus,
  Receipt,
  ScrollText,
  Send,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import {
  academicResults,
  applicationStages,
  courseOffering,
  documentTypes,
  feeBreakdown,
  feeSummary,
  initialApplications,
  makeRef,
  paymentHistory,
  scholarshipSchemes,
  selectedCourses,
} from '../data/servicesData.js'
import { formatDate } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const TABS = [
  { id: 'fees', label: 'Fees & Payments', icon: CreditCard },
  { id: 'registration', label: 'Course Registration', icon: BookOpen },
  { id: 'aid', label: 'Financial Assistance', icon: Award },
  { id: 'results', label: 'Academic Results', icon: GraduationCap },
  { id: 'documents', label: 'Document Requests', icon: ScrollText },
  { id: 'status', label: 'Application Status', icon: BadgeCheck },
]

function Notice({ children, tone = 'emerald' }) {
  const tones = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    navy: 'border-navy-200 bg-navy-50 text-navy-800',
    gold: 'border-gold-200 bg-gold-50 text-gold-900',
  }
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs ${tones[tone]}`}>
      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export function StudentServices() {
  const [tab, setTab] = useState('fees')
  const [applications, setApplications] = useLocalStorage('um-one:services-applications', initialApplications)
  const [enrolled, setEnrolled] = useLocalStorage('um-one:services-enrolled', selectedCourses.map((c) => c.code))
  const [payAmount, setPayAmount] = useState('')
  const [paid, setPaid] = useState(false)

  const [aidScheme, setAidScheme] = useState(scholarshipSchemes[0].id)
  const [income, setIncome] = useState('')
  const [statement, setStatement] = useState('')
  const [aidSubmitted, setAidSubmitted] = useState(false)

  const [docType, setDocType] = useState(documentTypes[0].id)
  const [docCopies, setDocCopies] = useState('1')
  const [docSubmitted, setDocSubmitted] = useState(false)

  const [regMsg, setRegMsg] = useState(null)

  const totalCredits = selectedCourses.filter((c) => enrolled.includes(c.code)).reduce((s, c) => s + c.credits, 0)
  const scheme = scholarshipSchemes.find((s) => s.id === aidScheme)
  const doc = documentTypes.find((d) => d.id === docType)
  const copies = Math.min(5, Math.max(1, Math.floor(Number(docCopies) || 1)))

  const addApplication = (app) => setApplications((prev) => [app, ...prev])

  const submitPayment = (e) => {
    e.preventDefault()
    const amt = Number(payAmount)
    if (!amt || amt <= 0) return
    addApplication({
      id: `app-${Date.now()}`,
      ref: makeRef('UM-PAY'),
      type: 'Payment',
      detail: `Fee payment RM${amt.toLocaleString()}`,
      submitted: new Date().toISOString().slice(0, 10),
      status: 'Approved',
      stage: 4,
    })
    setPaid(true)
    setPayAmount('')
  }

  const submitAid = (e) => {
    e.preventDefault()
    addApplication({
      id: `app-${Date.now()}`,
      ref: makeRef(),
      type: 'Financial Assistance',
      detail: `${scheme.name} · household income RM${Number(income).toLocaleString()}`,
      submitted: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      stage: 1,
    })
    setAidSubmitted(true)
    setIncome('')
    setStatement('')
  }

  const submitDoc = (e) => {
    e.preventDefault()
    addApplication({
      id: `app-${Date.now()}`,
      ref: makeRef('UM-DOC'),
      type: 'Document Request',
      detail: `${doc.label} × ${copies}`,
      submitted: new Date().toISOString().slice(0, 10),
      status: 'Submitted',
      stage: 1,
    })
    setDocSubmitted(true)
  }

  const toggleEnrol = (code) => {
    setEnrolled((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]))
    setRegMsg(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={LifeBuoy}
        title="Student Services"
        description="Centralised administrative portal providing UM MAYA functions — fees, registration, financial aid, results and documents."
        action={<Badge tone="navy">Prototype — no real transactions</Badge>}
      />

      <div className="scrollbar-thin flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Student services sections">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`svc-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`svc-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                active ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-navy-300 hover:text-navy-800'
              }`}
            >
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'fees' ? (
        <div role="tabpanel" id="svc-panel-fees" aria-labelledby="svc-tab-fees" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader icon={Receipt} title="Tuition Fees — Current Semester" subtitle={feeSummary.semester} action={<Badge tone="amber">{feeSummary.status}</Badge>} />
              <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-3">
                <div className="bg-white p-5">
                  <p className="section-label">Total billed</p>
                  <p className="mt-1.5 text-xl font-semibold text-navy-900">RM {feeSummary.totalDue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-5">
                  <p className="section-label">Paid</p>
                  <p className="mt-1.5 text-xl font-semibold text-emerald-600">RM {feeSummary.paid.toLocaleString()}</p>
                </div>
                <div className="bg-white p-5">
                  <p className="section-label">Outstanding</p>
                  <p className="mt-1.5 text-xl font-semibold text-rose-600">RM {feeSummary.outstanding.toLocaleString()}</p>
                </div>
              </div>
              <div className="px-5 pb-5 sm:px-6">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
                  <span>Settlement progress</span>
                  <span className="font-medium text-slate-500">{Math.round((feeSummary.paid / feeSummary.totalDue) * 100)}%</span>
                </div>
                <ProgressBar value={(feeSummary.paid / feeSummary.totalDue) * 100} tone="emerald" />
                <p className="mt-2 text-xs text-slate-500">Payment deadline: {formatDate(feeSummary.dueDate)} — settle to avoid examination barring.</p>
              </div>
            </Card>

            <Card>
              <CardHeader icon={Banknote} title="Payment History" subtitle={`${paymentHistory.length} transactions`} />
              <ul className="divide-y divide-slate-100">
                {paymentHistory.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 px-5 py-3.5 sm:px-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-900">{p.description}</span>
                      <span className="block text-xs text-slate-400">{formatDate(p.date)} · {p.method} · {p.receipt}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-navy-900">RM {p.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card-pad">
              <h2 className="card-title">Fee Breakdown</h2>
              <ul className="mt-3 space-y-2">
                {feeBreakdown.map((f) => (
                  <li key={f.item} className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-slate-600">{f.item}</span>
                    <span className="shrink-0 font-medium text-navy-900">RM {f.amount.toLocaleString()}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2 text-xs font-semibold">
                  <span className="text-navy-900">Total</span>
                  <span className="text-navy-900">RM {feeSummary.totalDue.toLocaleString()}</span>
                </li>
              </ul>
            </Card>

            <Card className="card-pad">
              <h2 className="card-title">Make a Payment</h2>
              <p className="mt-1 text-xs text-slate-500">Simulated — no payment is processed.</p>
              {paid ? (
                <div className="mt-3">
                  <Notice tone="emerald">
                    Payment recorded for this session. Receipt added to your payment history and application tracking.
                  </Notice>
                  <button type="button" onClick={() => setPaid(false)} className="btn-ghost mt-3 w-full">
                    Make another payment
                  </button>
                </div>
              ) : (
                <form onSubmit={submitPayment} className="mt-3 space-y-3">
                  <label className="block text-xs">
                    <span className="mb-1 block font-medium text-slate-500">Amount (RM)</span>
                    <input
                      type="number"
                      min="1"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder={String(feeSummary.outstanding)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                    />
                  </label>
                  <label className="block text-xs">
                    <span className="mb-1 block font-medium text-slate-500">Payment method</span>
                    <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100">
                      <option>FPX — Maybank2u</option>
                      <option>FPX — CIMB Clicks</option>
                      <option>Card</option>
                    </select>
                  </label>
                  <button type="submit" className="btn-primary w-full" disabled={!payAmount || Number(payAmount) <= 0}>
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                    Pay now
                  </button>
                </form>
              )}
            </Card>
          </div>
        </div>
      ) : null}

      {tab === 'registration' ? (
        <div role="tabpanel" id="svc-panel-registration" aria-labelledby="svc-tab-registration" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader icon={BookOpen} title="Registered Courses" subtitle={`${enrolled.length} courses · ${totalCredits} credit hours`} />
            <ul className="divide-y divide-slate-100">
              {selectedCourses.map((c) => {
                const on = enrolled.includes(c.code)
                return (
                  <li key={c.code} className="flex items-center gap-4 px-5 py-3.5 sm:px-6">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-navy-900">{c.name}</span>
                      <span className="block text-xs text-slate-400">{c.code} · {c.credits} credits</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEnrol(c.code)}
                      className={on ? 'btn-ghost' : 'btn-primary'}
                    >
                      {on ? 'Drop' : 'Add'}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
              <button
                type="button"
                disabled={enrolled.length === 0}
                onClick={() =>
                  setRegMsg(
                    `Registration confirmed: ${enrolled.length} courses, ${totalCredits} credit hours for Semester 1, 2025/2026.`,
                  )
                }
                className="btn-primary"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                Confirm registration
              </button>
              {enrolled.length === 0 ? (
                <p className="mt-2 text-xs text-slate-400">Select at least one course before confirming.</p>
              ) : null}
              {regMsg ? <div className="mt-3"><Notice>{regMsg}</Notice></div> : null}
            </div>
          </Card>

          <Card>
            <CardHeader icon={Plus} title="Available Offerings" subtitle="Add/drop window open" />
            <ul className="divide-y divide-slate-100">
              {courseOffering.map((c) => (
                <li key={c.code} className="px-5 py-3.5 sm:px-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy-900">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.code} · {c.credits} credits</p>
                    </div>
                    <Badge tone={c.available ? 'emerald' : 'slate'}>{c.slots}</Badge>
                  </div>
                  {c.available ? (
                    <button
                      type="button"
                      onClick={() => setRegMsg(`${c.code} ${c.name} added to your registration.`)}
                      className="btn-ghost mt-2.5 w-full"
                    >
                      Enrol
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRegMsg(`${c.code} ${c.name} is full — you have joined the waitlist (prototype).`)}
                      className="btn-ghost mt-2.5 w-full"
                    >
                      Join waitlist
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}

      {tab === 'aid' ? (
        <div role="tabpanel" id="svc-panel-aid" aria-labelledby="svc-tab-aid" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader icon={Award} title="Scholarship & Financial Assistance Schemes" subtitle="Eligibility and deadlines" />
            <ul className="divide-y divide-slate-100">
              {scholarshipSchemes.map((s) => (
                <li key={s.id} className="px-5 py-4 sm:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900">{s.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{s.amount}</p>
                      <p className="mt-0.5 text-xs text-slate-400">Criteria: {s.criteria} · Closes {formatDate(s.deadline)}</p>
                    </div>
                    <Badge tone={s.open ? 'emerald' : 'slate'}>{s.open ? 'Open' : 'Closed'}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="card-pad">
            <h2 className="card-title">Apply for Assistance</h2>
            <p className="mt-1 text-xs text-slate-500">Simulated application — nothing is submitted externally.</p>
            {aidSubmitted ? (
              <div className="mt-3">
                <Notice tone="gold">
                  Application for <span className="font-semibold">{scheme.name}</span> submitted. Track it under Application Status.
                </Notice>
                <button type="button" onClick={() => setAidSubmitted(false)} className="btn-ghost mt-3 w-full">
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={submitAid} className="mt-3 space-y-3">
                <label className="block text-xs">
                  <span className="mb-1 block font-medium text-slate-500">Scheme</span>
                  <select
                    value={aidScheme}
                    onChange={(e) => setAidScheme(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                  >
                    {scholarshipSchemes.filter((s) => s.open).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="mb-1 block font-medium text-slate-500">Monthly household income (RM)</span>
                  <input
                    type="number"
                    min="0"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="4500"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1 block font-medium text-slate-500">Supporting statement</span>
                  <textarea
                    rows={3}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Briefly explain your circumstances…"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                  />
                </label>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={!income || Number(income) <= 0 || !statement.trim()}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Submit application
                </button>
              </form>
            )}
          </Card>
        </div>
      ) : null}

      {tab === 'results' ? (
        <Card role="tabpanel" id="svc-panel-results" aria-labelledby="svc-tab-results">
          <CardHeader
            icon={GraduationCap}
            title="Academic Results"
            subtitle="Cumulative Grade Point Average"
            action={
              <div className="text-right">
                <p className="text-xs text-slate-400">CGPA</p>
                <p className="text-lg font-semibold text-navy-900">3.78</p>
              </div>
            }
          />
          <div className="space-y-5 p-5 sm:p-6">
            {academicResults.map((sem) => (
              <div key={sem.semester} className="rounded-xl border border-slate-200">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">{sem.semester}</p>
                  <span className="text-xs text-slate-500">GPA <span className="font-semibold text-navy-900">{sem.gpa.toFixed(2)}</span> · {sem.credits} credits</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {sem.courses.map((c) => (
                    <li key={c.code} className="flex items-center gap-3 px-4 py-2.5">
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium text-navy-900">{c.name}</span>
                        <span className="block text-[11px] text-slate-400">{c.code}</span>
                      </span>
                      <span className="text-[11px] text-slate-400">{c.points.toFixed(2)}</span>
                      <Badge tone={c.grade.startsWith('A') ? 'emerald' : 'navy'}>{c.grade}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-xs text-slate-400">
              Results are indicative mock data for the prototype. Official transcripts are issued by the Examinations Unit.
            </p>
          </div>
        </Card>
      ) : null}

      {tab === 'documents' ? (
        <div role="tabpanel" id="svc-panel-documents" aria-labelledby="svc-tab-documents" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader icon={FileText} title="Available Documents" subtitle="Fees and processing times" />
            <ul className="divide-y divide-slate-100">
              {documentTypes.map((d) => (
                <li key={d.id} className="flex items-center gap-4 px-5 py-3.5 sm:px-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-navy-900">{d.label}</span>
                    <span className="block text-xs text-slate-400">Processing: {d.days}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-navy-900">{d.fee ? `RM ${d.fee}` : 'Free'}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="card-pad">
            <h2 className="card-title">Request a Document</h2>
            <p className="mt-1 text-xs text-slate-500">Simulated request — a collection slip is generated in the prototype.</p>
            {docSubmitted ? (
              <div className="mt-3">
                <Notice tone="emerald">
                  {doc.label} requested. Estimated ready in {doc.days}. Track it under Application Status.
                </Notice>
                <button type="button" onClick={() => setDocSubmitted(false)} className="btn-ghost mt-3 w-full">
                  Request another document
                </button>
              </div>
            ) : (
              <form onSubmit={submitDoc} className="mt-3 space-y-3">
                <label className="block text-xs">
                  <span className="mb-1 block font-medium text-slate-500">Document type</span>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                  >
                    {documentTypes.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="mb-1 block font-medium text-slate-500">Number of copies</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={docCopies}
                    onChange={(e) => setDocCopies(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                  />
                </label>
                <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                  Total fee: <span className="font-semibold text-navy-900">RM {(doc.fee * copies).toLocaleString()}</span>
                  <span className="ml-1 text-slate-400">({copies} {copies === 1 ? 'copy' : 'copies'})</span>
                </div>
                <button type="submit" className="btn-primary w-full">
                  <ScrollText className="h-4 w-4" aria-hidden="true" />
                  Submit request
                </button>
              </form>
            )}
          </Card>
        </div>
      ) : null}

      {tab === 'status' ? (
        <Card role="tabpanel" id="svc-panel-status" aria-labelledby="svc-tab-status">
          <CardHeader icon={BadgeCheck} title="Application Status Tracking" subtitle={`${applications.length} applications`} />
          <ul className="divide-y divide-slate-100">
            {applications.map((a) => (
              <li key={a.id} className="px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900">{a.detail}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {a.ref} · {a.type} · submitted {formatDate(a.submitted)}
                    </p>
                  </div>
                  <Badge tone={a.status === 'Approved' || a.status === 'Ready for collection' ? 'emerald' : a.status === 'Under review' ? 'amber' : 'navy'}>
                    {a.status}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  {applicationStages.map((stage, i) => {
                    const reached = i + 1 <= a.stage
                    return (
                      <div key={stage} className="flex flex-1 items-center gap-1">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ${
                            reached ? 'bg-navy-800 text-white' : 'bg-slate-200 text-slate-400'
                          }`}>
                            {reached ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
                          </span>
                          <span className={`hidden text-[9px] sm:block ${reached ? 'text-navy-700' : 'text-slate-400'}`}>{stage}</span>
                        </div>
                        {i < applicationStages.length - 1 ? (
                          <span className={`h-0.5 flex-1 rounded ${i + 1 < a.stage ? 'bg-navy-700' : 'bg-slate-200'}`} />
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5 border-t border-slate-100 px-5 py-3 text-xs text-slate-400 sm:px-6">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            Statuses update automatically when you submit forms in this prototype.
          </div>
        </Card>
      ) : null}
    </div>
  )
}