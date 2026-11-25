import { useMemo, useState } from 'react'
import { CalendarClock, GraduationCap, ListChecks, MapPin, Timer } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import { Checkbox } from '../components/ui/Checkbox.jsx'
import { SegmentedControl } from '../components/ui/SegmentedControl.jsx'
import {
  courses,
  daysUntil,
  examRevisionChecklist,
  exams,
  formatDate,
  courseColors,
} from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function countdownParts(iso) {
  const diff = new Date(iso) - new Date()
  const abs = Math.abs(diff)
  return {
    days: Math.floor(abs / 86400000),
    hours: Math.floor((abs % 86400000) / 3600000),
    past: diff < 0,
  }
}

export function Examinations() {
  const sorted = useMemo(() => [...exams].sort((a, b) => new Date(a.date) - new Date(b.date)), [])
  const next = sorted[0]
  const nextParts = next ? countdownParts(next.date) : null

  const [checked, setChecked] = useLocalStorage('um-one:revision-done', {})
  const [scope, setScope] = useState('all')

  const checklist = useMemo(
    () => (scope === 'all' ? examRevisionChecklist : examRevisionChecklist.filter((r) => r.code === scope)),
    [scope],
  )

  const doneCount = examRevisionChecklist.filter((r) => checked[r.id]).length
  const overallPct = Math.round((doneCount / examRevisionChecklist.length) * 100)

  const courseOptions = useMemo(
    () => ['all', ...Array.from(new Set(examRevisionChecklist.map((r) => r.code)))],
    [],
  )

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-6">
      <PageHeader
        icon={GraduationCap}
        title="Examinations"
        description="Final examination timetable for Semester 1, 2025/2026, with venues, seating and a revision checklist."
        action={<Badge tone="navy">{sorted.length} papers</Badge>}
      />

      {next && nextParts ? (
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-5 bg-navy-800 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-4">
              {['days', 'hours'].map((unit) => (
                <div key={unit} className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-navy-900/60 text-white">
                  <span className="text-2xl font-semibold leading-none">{nextParts[unit]}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider text-navy-300">{unit}</span>
                </div>
              ))}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Next examination</p>
              <p className="mt-1 truncate text-base font-semibold text-white">{next.course}</p>
              <p className="mt-0.5 text-xs text-navy-200">
                {next.code} · {formatDate(next.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="mt-0.5 text-xs text-navy-300">
                {next.start}–{next.end} · {next.venue} · Seat {next.seat} · {next.format}
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <section aria-label="Examination timetable" className="space-y-3">
        {sorted.map((e) => {
          const parts = countdownParts(e.date)
          const isNext = e.id === next?.id
          const soon = !parts.past && parts.days <= 7
          return (
            <Card key={e.id} className={`p-4 sm:p-5 ${isNext ? 'ring-1 ring-navy-200' : ''}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${soon ? 'bg-gold-400 text-navy-950' : 'bg-navy-50 text-navy-800'}`}>
                  <span className="text-lg font-semibold leading-none">{parts.past ? '—' : parts.days}</span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-wider opacity-80">days</span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${courseColors[e.code] ?? 'bg-slate-400'}`} aria-hidden="true" />
                    <p className="text-sm font-semibold text-navy-900">{e.course}</p>
                    <Badge tone="slate">{e.code}</Badge>
                    <Badge tone={e.format === 'Open Book' ? 'emerald' : 'navy'}>{e.format}</Badge>
                    {isNext ? <Badge tone="gold">Next up</Badge> : null}
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(e.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                      {e.start}–{e.end} ({e.duration})
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {e.venue}
                    </span>
                  </p>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="section-label">Seat</p>
                  <p className="text-sm font-semibold text-navy-900">{e.seat}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      <Card>
        <CardHeader
          icon={ListChecks}
          title="Revision Checklist"
          subtitle={`${doneCount} of ${examRevisionChecklist.length} topics revised`}
          action={
            <SegmentedControl
              ariaLabel="Revision scope"
              value={scope}
              onChange={setScope}
              options={courseOptions.map((c) => ({ value: c, label: c === 'all' ? 'All' : c }))}
            />
          }
        />
        <div className="px-5 pt-4 sm:px-6">
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
            <span>Revision progress</span>
            <span className="font-medium text-slate-500">{overallPct}%</span>
          </div>
          <ProgressBar value={overallPct} tone={overallPct >= 70 ? 'emerald' : 'gold'} />
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {(scope === 'all'
            ? Array.from(new Set(checklist.map((r) => r.code))).map((code) => ({
                code,
                items: checklist.filter((r) => r.code === code),
              }))
            : [{ code: scope, items: checklist }]
          ).map(({ code, items }) => {
            const course = courses.find((c) => c.code === code)
            return (
              <div key={code} className="px-5 py-3 sm:px-6">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-navy-800">
                  <span className={`h-2 w-2 rounded-full ${course?.color ?? 'bg-slate-400'}`} aria-hidden="true" />
                  {code} · {course?.name ?? 'Elective'}
                </p>
                <ul className="space-y-1.5">
                  {items.map((r) => {
                    const isDone = Boolean(checked[r.id])
                    return (
                      <li key={r.id} className="flex items-center gap-3">
                        <Checkbox checked={isDone} onChange={() => toggle(r.id)} label={`Mark ${r.topic} as revised`} size="sm" />
                        <span className={`text-sm ${isDone ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{r.topic}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}