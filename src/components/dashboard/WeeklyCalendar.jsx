import { useState } from 'react'
import { CalendarRange } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { dayNamesShort, weeklyClasses } from '../../data/mockData.js'

const TYPE_STYLE = {
  Lecture: 'border-navy-300 bg-navy-50 text-navy-900',
  Laboratory: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  Tutorial: 'border-sky-300 bg-sky-50 text-sky-900',
  Consultation: 'border-violet-300 bg-violet-50 text-violet-900',
  'Co-Curriculum': 'border-gold-300 bg-gold-50 text-gold-900',
}

const WEEK = [1, 2, 3, 4, 5]

export function WeeklyCalendar({ navigate }) {
  const [selected, setSelected] = useState(new Date().getDay())
  const activeDay = WEEK.includes(selected) ? selected : 1
  const dayClasses = weeklyClasses.filter((c) => c.day === activeDay).sort((a, b) => a.start.localeCompare(b.start))

  return (
    <Card>
      <CardHeader
        icon={CalendarRange}
        title="Weekly Academic Calendar"
        subtitle="Semester 1 teaching weeks"
        action={
          <button type="button" onClick={() => navigate('timetable')} className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline">
            Full timetable
          </button>
        }
      />
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Days of the week">
          {WEEK.map((d) => {
            const count = weeklyClasses.filter((c) => c.day === d).length
            const active = activeDay === d
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(d)}
                className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors ${
                  active
                    ? 'border-navy-700 bg-navy-800 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-navy-300 hover:text-navy-800'
                }`}
              >
                <span className="text-xs font-semibold">{dayNamesShort[d]}</span>
                <span className={`text-[10px] ${active ? 'text-navy-200' : 'text-slate-400'}`}>{count} cls</span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 space-y-2">
          {dayClasses.length ? (
            dayClasses.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${TYPE_STYLE[c.type] ?? 'border-slate-200 bg-slate-50 text-slate-700'}`}
              >
                <span className="w-24 shrink-0 text-[11px] font-semibold tabular-nums">
                  {c.start}–{c.end}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-medium">{c.course}</span>
                <span className="hidden shrink-0 text-[11px] opacity-70 sm:block">{c.type}</span>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-xs text-slate-400">
              No classes scheduled.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}