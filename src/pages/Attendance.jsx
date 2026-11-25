import { useMemo, useState } from 'react'
import { AlertTriangle, BellRing, CalendarCheck, ChevronDown, Check, Clock3, Minus, UserCheck, X } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import {
  attendanceOpenWindows,
  attendanceStats,
  courses,
  courseByCode,
  formatDate,
  sessionsByCourse,
} from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const STATUS_META = {
  present: { label: 'Present', tone: 'emerald', icon: Check },
  late: { label: 'Late', tone: 'amber', icon: Clock3 },
  absent: { label: 'Absent', tone: 'rose', icon: X },
}

export function Attendance() {
  const [min, setMin] = useLocalStorage('um-one:attendance-min', 80)
  const [openCourse, setOpenCourse] = useState(null)
  const [acknowledged, setAcknowledged] = useLocalStorage('um-one:attendance-alerts-ack', [])

  const overall = useMemo(
    () => Math.round(courses.reduce((s, c) => s + attendanceStats(c.code).pct, 0) / courses.length),
    [],
  )

  const overallStats = useMemo(() => {
    const all = courses.flatMap((c) => sessionsByCourse(c.code))
    const present = all.filter((s) => s.status === 'present').length
    const late = all.filter((s) => s.status === 'late').length
    const absent = all.filter((s) => s.status === 'absent').length
    return { present, late, absent, total: all.length }
  }, [])

  const atRisk = courses.filter((c) => attendanceStats(c.code).pct < min)
  const openAlerts = attendanceOpenWindows.filter((w) => !acknowledged.includes(w.code))

  const ack = (code) => setAcknowledged((prev) => (prev.includes(code) ? prev : [...prev, code]))

  return (
    <div className="space-y-6">
      <PageHeader
        icon={UserCheck}
        title="Attendance"
        description="Attendance records by course, with alerts when you approach the minimum requirement."
        action={<Badge tone={atRisk.length ? 'rose' : 'emerald'}>{atRisk.length} below {min}%</Badge>}
      />

      {openAlerts.length ? (
        <ul className="space-y-2.5">
          {openAlerts.map((w) => {
            const c = courseByCode(w.code)
            return (
              <li key={w.code} className="flex flex-col gap-3 rounded-xl border border-gold-200 bg-gold-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400 text-navy-950">
                    <BellRing className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">
                      Attendance registration is now open — {w.code}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {c?.name} · session on {formatDate(w.sessionDate)} · closes in {w.closesIn}.
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => ack(w.code)} className="btn-ghost shrink-0 self-start sm:self-auto">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Acknowledge
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card card-pad">
          <p className="section-label">Overall</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-navy-900">{overall}%</p>
          <ProgressBar value={overall} tone={overall >= min ? 'emerald' : 'rose'} size="sm" className="mt-3" />
        </div>
        {[
          { label: 'Present', value: overallStats.present, tone: 'emerald' },
          { label: 'Late', value: overallStats.late, tone: 'amber' },
          { label: 'Absent', value: overallStats.absent, tone: 'rose' },
        ].map((s) => (
          <div key={s.label} className="card card-pad">
            <p className="section-label">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-navy-900">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">of {overallStats.total} sessions</p>
          </div>
        ))}
      </section>

      <Card className="card-pad">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">Minimum attendance requirement</p>
              <p className="text-xs text-slate-500">Alert when a course falls below this threshold</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:w-72">
            <input
              type="range"
              min="60"
              max="95"
              step="5"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              aria-label="Minimum attendance requirement percentage"
              className="h-1.5 w-full cursor-pointer accent-navy-800"
            />
            <span className="w-12 shrink-0 text-right text-sm font-semibold text-navy-900">{min}%</span>
          </div>
        </div>
        {atRisk.length ? (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
            <span className="font-semibold">{atRisk.length} course{atRisk.length === 1 ? '' : 's'}</span> below the{' '}
            {min}% threshold: {atRisk.map((c) => c.code).join(', ')}. Attendance is compulsory to sit for the final examination.
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            All courses are at or above the {min}% requirement.
          </div>
        )}
      </Card>

      <Card>
        <CardHeader icon={UserCheck} title="Attendance by Course" subtitle={`${courses.length} registered courses`} />
        <ul className="divide-y divide-slate-100">
          {courses.map((c) => {
            const stats = attendanceStats(c.code)
            const below = stats.pct < min
            const close = !below && stats.pct < min + 5
            const expanded = openCourse === c.code
            const sessions = sessionsByCourse(c.code)
            return (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => setOpenCourse(expanded ? null : c.code)}
                  aria-expanded={expanded}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 sm:px-6"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                    below ? 'bg-rose-50 text-rose-600' : close ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {stats.pct}%
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${c.color}`} aria-hidden="true" />
                      <span className="text-sm font-semibold text-navy-900">{c.name}</span>
                      <span className="text-xs text-slate-400">{c.code} · {c.occGroup}</span>
                      {below ? <Badge tone="rose">Below requirement</Badge> : close ? <Badge tone="amber">At risk</Badge> : null}
                    </span>
                    <span className="mt-2 block max-w-md">
                      <ProgressBar value={stats.pct} tone={below ? 'rose' : close ? 'gold' : 'emerald'} size="sm" />
                    </span>
                    <span className="mt-1.5 block text-[11px] text-slate-400">
                      {stats.present} present · {stats.late} late · {stats.absent} absent · {stats.total} sessions
                    </span>
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${expanded ? '' : '-rotate-90'}`} aria-hidden="true" />
                </button>

                {expanded ? (
                  <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-navy-800">
                      <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" /> Attendance history
                    </p>
                    <ul className="space-y-1">
                      {sessions.map((s) => {
                        const meta = STATUS_META[s.status]
                        const Icon = meta.icon
                        return (
                          <li key={s.id} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-xs">
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                              s.status === 'present' ? 'bg-emerald-100 text-emerald-700'
                              : s.status === 'late' ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                            }`}>
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <span className="w-24 shrink-0 text-slate-500">{formatDate(s.date, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className="shrink-0 text-slate-400">{s.start}</span>
                            <span className="min-w-0 flex-1 truncate text-slate-600">{s.type} · {s.venue}</span>
                            <Badge tone={meta.tone} className="shrink-0">{meta.label}</Badge>
                          </li>
                        )
                      })}
                      {sessions.length === 0 ? (
                        <li className="rounded-lg bg-white px-3 py-4 text-center text-xs text-slate-400">
                          <Minus className="mx-auto mb-1 h-4 w-4" aria-hidden="true" />
                          No attendance records yet.
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}