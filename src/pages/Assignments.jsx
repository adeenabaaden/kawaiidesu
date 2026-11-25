import { useMemo, useState } from 'react'
import { CheckCircle2, ClipboardList, Clock, Flame, Users } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import { SegmentedControl } from '../components/ui/SegmentedControl.jsx'
import { Checkbox } from '../components/ui/Checkbox.jsx'
import { assignments, formatDate, relativeDue, courseColors } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function priorityOf(a, overdue) {
  if (overdue) return 'high'
  const days = (new Date(a.due) - new Date()) / 86400000
  if (days <= 2) return 'high'
  if (days <= 6) return 'medium'
  return 'low'
}

const PRIORITY = {
  high: { label: 'High', tone: 'rose', icon: Flame },
  medium: { label: 'Medium', tone: 'amber', icon: Clock },
  low: { label: 'Low', tone: 'slate', icon: Clock },
}

export function Assignments() {
  const [tab, setTab] = useState('upcoming')
  const [completed, setCompleted] = useLocalStorage('um-one:assignments-done', {})

  const enriched = useMemo(
    () =>
      assignments.map((a) => {
        const due = relativeDue(a.due)
        const isDone = Boolean(completed[a.id])
        const isSubmitted = a.status === 'submitted' || isDone
        const overdue = due.overdue && !isSubmitted
        const priority = priorityOf(a, overdue)
        return { ...a, dueLabel: due, isDone, isSubmitted, overdue, priority, days: Math.ceil((new Date(a.due) - new Date()) / 86400000) }
      }),
    [completed],
  )

  const buckets = useMemo(() => {
    const upcoming = enriched
      .filter((a) => !a.isSubmitted && !a.overdue)
      .sort((a, b) => new Date(a.due) - new Date(b.due))
    const overdue = enriched.filter((a) => a.overdue).sort((a, b) => new Date(a.due) - new Date(b.due))
    const done = enriched.filter((a) => a.isSubmitted).sort((a, b) => new Date(a.due) - new Date(b.due))
    return { upcoming, overdue, done }
  }, [enriched])

  const list = buckets[tab] ?? buckets.upcoming
  const total = enriched.length
  const completionPct = Math.round((buckets.done.length / total) * 100)

  const toggleDone = (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ClipboardList}
        title="Assignments"
        description="Track coursework across all registered courses, with deadlines, priority levels and live countdowns."
        action={<Badge tone={buckets.overdue.length ? 'rose' : 'emerald'}>{buckets.overdue.length} overdue</Badge>}
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Upcoming', value: buckets.upcoming.length, tone: 'navy' },
          { label: 'Overdue', value: buckets.overdue.length, tone: 'rose' },
          { label: 'Completed', value: buckets.done.length, tone: 'emerald' },
          { label: 'Total', value: total, tone: 'gold' },
        ].map((s) => (
          <div key={s.label} className="card card-pad">
            <p className="section-label">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-navy-900">{s.value}</p>
          </div>
        ))}
      </section>

      <Card className="card-pad">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SegmentedControl
            ariaLabel="Assignment status"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'upcoming', label: 'Upcoming', count: buckets.upcoming.length },
              { value: 'overdue', label: 'Overdue', count: buckets.overdue.length },
              { value: 'done', label: 'Completed', count: buckets.done.length },
            ]}
          />
          <div className="sm:w-56">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Overall completion</span>
              <span className="font-medium text-slate-500">{completionPct}%</span>
            </div>
            <ProgressBar value={completionPct} tone="emerald" size="sm" />
          </div>
        </div>
      </Card>

      {list.length === 0 ? (
        <Card className="card-pad">
          <p className="py-8 text-center text-sm text-slate-400">
            Nothing here — you have no {tab === 'done' ? 'completed' : tab} assignments.
          </p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {list.map((a) => {
            const pri = PRIORITY[a.priority]
            const PriIcon = pri.icon
            const urgent = a.priority === 'high' && !a.isSubmitted && !a.overdue
            return (
              <li
                key={a.id}
                className={`card p-4 sm:p-5 ${a.overdue ? 'border-rose-200 bg-rose-50/40' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={a.isSubmitted}
                    onChange={() => toggleDone(a.id)}
                    label={`Mark ${a.title} as completed`}
                    className="mt-0.5"
                  />
                  <span className={`mt-0.5 h-9 w-1 shrink-0 rounded-full ${courseColors[a.code] ?? 'bg-slate-300'}`} aria-hidden="true" />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${courseColors[a.code] ?? 'bg-slate-400'}`} aria-hidden="true" />
                      <p className={`text-sm font-semibold text-navy-900 ${a.isSubmitted ? 'text-slate-400 line-through' : ''}`}>
                        {a.title}
                      </p>
                      <Badge tone={pri.tone}>
                        <PriIcon className="h-3 w-3" aria-hidden="true" />
                        {pri.label}
                      </Badge>
                      {a.overdue ? <Badge tone="rose">Overdue</Badge> : null}
                    </div>

                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span><span className="font-medium text-navy-700">{a.code}</span> · {a.course}</span>
                      <span>Weight {a.weight}</span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" aria-hidden="true" />{a.type}
                      </span>
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <span className="text-xs text-slate-400">
                        Due {formatDate(a.due, { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span
                        className={`chip ${
                          a.isSubmitted
                            ? 'bg-emerald-100 text-emerald-800'
                            : a.overdue
                              ? 'bg-rose-100 text-rose-700'
                              : urgent
                                ? 'bg-rose-100 text-rose-700'
                                : a.priority === 'medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-navy-100 text-navy-800'
                        }`}
                      >
                        {a.isSubmitted ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Completed
                          </>
                        ) : (
                          a.dueLabel.label
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}