import { useState } from 'react'
import { CalendarClock, CheckCircle2, Clock, MapPin, User } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { Badge } from '../ui/Badge.jsx'
import { EmptyState } from '../ui/EmptyState.jsx'
import { classesOnDay, dayNames } from '../../data/mockData.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

const TYPE_TONE = {
  Lecture: 'navy',
  Laboratory: 'emerald',
  Tutorial: 'sky',
  Consultation: 'violet',
  'Co-Curriculum': 'gold',
}

export function TodaySchedule({ today = new Date().getDay() }) {
  const classes = classesOnDay(today)
  const [done, setDone] = useLocalStorage('um-one:schedule-done', {})

  const toggle = (id) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Card>
      <CardHeader
        icon={CalendarClock}
        title="Today's Schedule"
        subtitle={`${dayNames[today]} · ${classes.length} ${classes.length === 1 ? 'class' : 'classes'}`}
        action={<Badge tone="navy">{new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })}</Badge>}
      />
      {classes.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No classes today"
          description="Enjoy the break — check the Timetable for the rest of your week."
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {classes.map((c) => {
            const isDone = Boolean(done[c.id])
            return (
              <li key={c.id} className={`flex gap-4 px-5 py-4 sm:px-6 ${isDone ? 'opacity-55' : ''}`}>
                <div className="flex w-16 shrink-0 flex-col items-center text-center">
                  <span className="text-sm font-semibold text-navy-900">{c.start}</span>
                  <span className="my-1 h-6 w-px bg-slate-200" aria-hidden="true" />
                  <span className="text-xs text-slate-400">{c.end}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`text-sm font-semibold text-navy-900 ${isDone ? 'line-through' : ''}`}>{c.course}</p>
                    <Badge tone={TYPE_TONE[c.type] ?? 'slate'}>{c.type}</Badge>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />{c.venue}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3.5 w-3.5" aria-hidden="true" />{c.lecturer}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  aria-pressed={isDone}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                      : 'border-slate-200 text-slate-400 hover:border-navy-300 hover:text-navy-700'
                  }`}
                  aria-label={isDone ? `Mark ${c.course} as not attended` : `Mark ${c.course} as attended`}
                  title={isDone ? 'Attended' : 'Mark as attended'}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}