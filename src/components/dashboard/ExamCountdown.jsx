import { GraduationCap } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { Badge } from '../ui/Badge.jsx'
import { exams, formatDate, daysUntil } from '../../data/mockData.js'

export function ExamCountdown({ navigate }) {
  const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date))
  const next = sorted[0]
  const days = next ? daysUntil(next.date) : null

  return (
    <Card className="overflow-hidden">
      <CardHeader
        icon={GraduationCap}
        title="Examination Countdown"
        subtitle="Semester 1 · 2025/2026"
        action={
          <button type="button" onClick={() => navigate('examinations')} className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline">
            Full timetable
          </button>
        }
      />
      {next ? (
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-800 text-white">
              <span className="text-2xl font-semibold leading-none">{days}</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wider text-navy-300">days</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">Next paper</p>
              <p className="mt-0.5 truncate text-sm font-semibold text-navy-900">{next.course}</p>
              <p className="mt-0.5 text-xs text-slate-500">{next.code} · {formatDate(next.date)} · {next.start}</p>
              <p className="mt-0.5 text-xs text-slate-400">{next.venue} · Seat {next.seat}</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
            {sorted.slice(1, 4).map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-slate-600">
                  <span className="font-medium text-navy-800">{e.code}</span> · {e.course}
                </span>
                <Badge tone="slate" className="shrink-0">
                  {formatDate(e.date, { day: 'numeric', month: 'short' })} · {e.start}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  )
}