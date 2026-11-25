import { useMemo, useState } from 'react'
import {
  Check,
  Headphones,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Send,
  Ticket,
  TicketCheck,
  Users,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { SearchField } from '../components/ui/SearchField.jsx'
import { departmentDirectory, supportTopics, wellbeingResources } from '../data/campusData.js'
import { formatDate } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ICONS = { HeartPulse, PhoneCall: Phone, HandHeart: HeartPulse, Users }

const TABS = [
  { id: 'directory', label: 'Department Directory', icon: MapPin },
  { id: 'enquiry', label: 'Support Enquiry', icon: Send },
  { id: 'tickets', label: 'My Tickets', icon: Ticket },
  { id: 'welfare', label: 'Welfare & Counselling', icon: HeartPulse },
]

function ticketId() {
  return `UM-TKT-${Math.floor(10000 + Math.random() * 89999)}`
}

export function StudentSupport() {
  const [tab, setTab] = useState('directory')
  const [query, setQuery] = useState('')
  const [tickets, setTickets] = useLocalStorage('um-one:support-tickets', [])

  const [topic, setTopic] = useState(supportTopics[0])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const departments = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return departmentDirectory
    return departmentDirectory.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)) ||
        d.location.toLowerCase().includes(q),
    )
  }, [query])

  const submitEnquiry = (e) => {
    e.preventDefault()
    const t = {
      id: ticketId(),
      topic,
      subject,
      message,
      created: new Date().toISOString().slice(0, 10),
      status: 'Open',
      updates: [{ date: new Date().toISOString().slice(0, 10), text: 'Ticket received. An officer will respond within 2 working days.' }],
    }
    setTickets((prev) => [t, ...prev])
    setSubject('')
    setMessage('')
    setTab('tickets')
  }

  const closeTicket = (id) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Resolved', updates: [...t.updates, { date: new Date().toISOString().slice(0, 10), text: 'Marked as resolved by student.' }] } : t)))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Headphones}
        title="Student Support"
        description="Department directory, support enquiries, ticket tracking and welfare resources."
        action={<Badge tone="navy">Prototype help desk</Badge>}
      />

      <div className="scrollbar-thin flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Support sections">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`sup-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`sup-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                active ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-navy-300 hover:text-navy-800'
              }`}
            >
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
              {t.id === 'tickets' && tickets.length ? (
                <span className="rounded-full bg-gold-400 px-1.5 text-[10px] font-semibold text-navy-950">{tickets.length}</span>
              ) : null}
            </button>
          )
        })}
      </div>

      {tab === 'directory' ? (
        <div role="tabpanel" id="sup-panel-directory" aria-labelledby="sup-tab-directory" className="space-y-4">
          <Card className="card-pad">
            <SearchField value={query} onChange={setQuery} placeholder="Search department, service or location…" id="dept-search" />
          </Card>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {departments.map((d) => (
              <li key={d.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-navy-900">{d.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{d.location}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{d.hours}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {d.tags.map((t) => (
                        <Badge key={t} tone="slate">{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <a href={`mailto:${d.email}`} className="inline-flex items-center gap-1.5 text-navy-700 hover:underline">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />{d.email}
                      </a>
                      <span className="inline-flex items-center gap-1.5 text-slate-500">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />{d.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {departments.length === 0 ? (
              <li className="card card-pad lg:col-span-2">
                <p className="py-8 text-center text-sm text-slate-400">No departments match your search.</p>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {tab === 'enquiry' ? (
        <div role="tabpanel" id="sup-panel-enquiry" aria-labelledby="sup-tab-enquiry" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="card-pad lg:col-span-2">
            <h2 className="card-title">Submit a Support Enquiry</h2>
            <p className="mt-1 text-xs text-slate-500">
              Simulated form — a mock ticket reference is generated and nothing is sent externally.
            </p>
            <form onSubmit={submitEnquiry} className="mt-4 space-y-4">
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-slate-500">Topic</span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                >
                  {supportTopics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-slate-500">Subject</span>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Short summary of your enquiry"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-slate-500">Details</span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue in detail…"
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                />
              </label>
              <button type="submit" className="btn-primary" disabled={!subject.trim() || !message.trim()}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit enquiry
              </button>
            </form>
          </Card>

          <Card className="card-pad">
            <h2 className="card-title">Response times</h2>
            <ul className="mt-3 space-y-3 text-xs">
              {[
                ['Course registration', '1 working day'],
                ['Examination matters', '2 working days'],
                ['Fees & payment', '2 working days'],
                ['Technical / portal issue', '4 hours'],
                ['Welfare & counselling', 'Same day'],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between gap-3">
                  <span className="text-slate-600">{k}</span>
                  <span className="shrink-0 font-medium text-navy-900">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 text-[11px] text-navy-800">
              For urgent wellbeing matters, use the 24-hour crisis line under Welfare & Counselling.
            </div>
          </Card>
        </div>
      ) : null}

      {tab === 'tickets' ? (
        <Card role="tabpanel" id="sup-panel-tickets" aria-labelledby="sup-tab-tickets">
          <CardHeader icon={TicketCheck} title="My Support Tickets" subtitle={`${tickets.length} ticket${tickets.length === 1 ? '' : 's'}`} />
          {tickets.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-400">
              You have no support tickets. Submit an enquiry to create one.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tickets.map((t) => (
                <li key={t.id} className="px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900">{t.subject}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{t.id} · {t.topic} · {formatDate(t.created)}</p>
                    </div>
                    <Badge tone={t.status === 'Resolved' ? 'emerald' : 'amber'}>{t.status}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{t.message}</p>
                  <ul className="mt-3 space-y-1.5 border-l-2 border-slate-200 pl-3">
                    {t.updates.map((u, i) => (
                      <li key={i} className="text-[11px] text-slate-500">
                        <span className="font-medium text-navy-700">{formatDate(u.date)}</span> — {u.text}
                      </li>
                    ))}
                  </ul>
                  {t.status !== 'Resolved' ? (
                    <button type="button" onClick={() => closeTicket(t.id)} className="btn-ghost mt-3">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Mark as resolved
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Card>
      ) : null}

      {tab === 'welfare' ? (
        <div role="tabpanel" id="sup-panel-welfare" aria-labelledby="sup-tab-welfare" className="space-y-4">
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {wellbeingResources.map((w) => {
              const Icon = ICONS[w.icon] ?? HeartPulse
              return (
                <li key={w.id} className="card p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-navy-900">{w.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{w.description}</p>
                      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1.5 text-navy-700">
                          <Phone className="h-3.5 w-3.5" aria-hidden="true" />{w.contact}
                        </span>
                        <span className="text-slate-400">{w.availability}</span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
            <HeartPulse className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Your wellbeing matters. All counselling services are confidential and free for enrolled UM students. In an
              emergency, contact the 24-hour crisis line immediately.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}