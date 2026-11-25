import { useMemo, useState } from 'react'
import { CalendarDays, LayoutGrid, MapPin, Rows3, User } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { SegmentedControl } from '../components/ui/SegmentedControl.jsx'
import { SearchField } from '../components/ui/SearchField.jsx'
import { courses, dayNames, dayNamesShort, weeklyClasses, courseColors } from '../data/mockData.js'

const DAYS = [1, 2, 3, 4, 5]
const START_HOUR = 8
const END_HOUR = 18

const TYPE_TONE = {
  Lecture: 'navy',
  Laboratory: 'emerald',
  Tutorial: 'sky',
  Consultation: 'violet',
  'Co-Curriculum': 'gold',
}

function toMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function todayDay() {
  const d = new Date().getDay()
  return DAYS.includes(d) ? d : 1
}

export function Timetable() {
  const [view, setView] = useState('weekly')
  const [query, setQuery] = useState('')
  const [occFilter, setOccFilter] = useState('All')
  const [day, setDay] = useState(todayDay())

  const occOptions = useMemo(
    () => ['All', ...Array.from(new Set(weeklyClasses.map((c) => c.occGroup))).sort()],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return weeklyClasses.filter((c) => {
      const matchesQuery =
        !q || c.course.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.lecturer.toLowerCase().includes(q)
      const matchesOcc = occFilter === 'All' || c.occGroup === occFilter
      return matchesQuery && matchesOcc
    })
  }, [query, occFilter])

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
  const totalHours = (END_HOUR - START_HOUR) * 60

  const dayClasses = filtered.filter((c) => c.day === day).sort((a, b) => a.start.localeCompare(b.start))

  return (
    <div className="space-y-6">
      <PageHeader
        icon={CalendarDays}
        title="Timetable"
        description="Integrated UM MAYA timetable showing course sessions, lecturers, OCC groups and venues."
        action={
          <SegmentedControl
            ariaLabel="Timetable view"
            value={view}
            onChange={setView}
            options={[
              { value: 'weekly', label: 'Weekly', icon: LayoutGrid },
              { value: 'daily', label: 'Daily', icon: Rows3 },
            ]}
          />
        }
      />

      <Card className="card-pad">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchField value={query} onChange={setQuery} placeholder="Search course, code or lecturer…" className="lg:max-w-xs" />
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by OCC group">
            <span className="mr-1 text-[11px] font-medium text-slate-400">OCC group</span>
            {occOptions.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOccFilter(o)}
                aria-pressed={occFilter === o}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  occFilter === o
                    ? 'border-navy-700 bg-navy-800 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-navy-300 hover:text-navy-800'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {view === 'daily' ? (
        <Card>
          <CardHeader
            icon={CalendarDays}
            title="Daily View"
            subtitle={`${dayClasses.length} session${dayClasses.length === 1 ? '' : 's'} scheduled`}
          />
          <div className="flex gap-1.5 overflow-x-auto px-5 pt-4 sm:px-6" role="tablist" aria-label="Select day">
            {DAYS.map((d) => {
              const active = day === d
              const count = filtered.filter((c) => c.day === d).length
              return (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDay(d)}
                  className={`flex shrink-0 flex-col items-center gap-0.5 rounded-lg border px-4 py-2 transition-colors ${
                    active ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-300 hover:text-navy-800'
                  }`}
                >
                  <span className="text-xs font-semibold">{dayNamesShort[d]}</span>
                  <span className={`text-[10px] ${active ? 'text-navy-200' : 'text-slate-400'}`}>{count} cls</span>
                </button>
              )
            })}
          </div>

          {dayClasses.length ? (
            <ul className="divide-y divide-slate-100 px-1 py-2">
              {dayClasses.map((c) => (
                <li key={c.id} className="flex gap-4 px-5 py-4 sm:px-6">
                  <div className="flex w-16 shrink-0 flex-col items-center text-center">
                    <span className="text-sm font-semibold text-navy-900">{c.start}</span>
                    <span className="my-1 h-5 w-px bg-slate-200" aria-hidden="true" />
                    <span className="text-xs text-slate-400">{c.end}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${courseColors[c.code] ?? 'bg-slate-400'}`} aria-hidden="true" />
                      <p className="text-sm font-semibold text-navy-900">{c.course}</p>
                      <Badge tone={TYPE_TONE[c.type] ?? 'slate'}>{c.type}</Badge>
                      <Badge tone="slate">{c.code}</Badge>
                    </div>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.venue}</span>
                      <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{c.lecturer}</span>
                      <span className="font-medium text-navy-700">{c.occGroup}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-12 text-center text-sm text-slate-400">
              No sessions on {dayNames[day]} match your filters.
            </p>
          )}
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader icon={LayoutGrid} title="Weekly View" subtitle="Monday to Friday · 8:00 a.m. – 6:00 p.m." />
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[64px_repeat(5,1fr)] border-b border-slate-200 bg-slate-50">
                <div className="px-2 py-2.5 text-[11px] font-medium text-slate-400" />
                {DAYS.map((d) => (
                  <div key={d} className="border-l border-slate-200 px-2 py-2.5 text-center">
                    <p className="text-xs font-semibold text-navy-900">{dayNamesShort[d]}</p>
                    <p className="text-[10px] text-slate-400">{filtered.filter((c) => c.day === d).length} classes</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[64px_repeat(5,1fr)]">
                <div>
                  {hours.map((h) => (
                    <div key={h} className="h-20 border-b border-slate-100 pr-2 pt-1 text-right text-[10px] text-slate-400">
                      {String(h).padStart(2, '0')}:00
                    </div>
                  ))}
                </div>

                {DAYS.map((d) => {
                  const items = filtered.filter((c) => c.day === d)
                  return (
                    <div key={d} className="relative border-l border-slate-100">
                      {hours.map((h) => (
                        <div key={h} className="h-20 border-b border-slate-100" />
                      ))}
                      {items.map((c) => {
                        const top = ((toMinutes(c.start) - START_HOUR * 60) / totalHours) * 100
                        const height = ((toMinutes(c.end) - toMinutes(c.start)) / totalHours) * 100
                        const color = courseColors[c.code] ?? 'bg-slate-500'
                        return (
                          <div
                            key={c.id}
                            className="absolute inset-x-1 overflow-hidden rounded-md border border-white/60 bg-white p-2 shadow-card"
                            style={{ top: `${top}%`, height: `${height}%` }}
                            title={`${c.course} · ${c.start}–${c.end} · ${c.venue}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} aria-hidden="true" />
                              <span className="truncate text-[11px] font-semibold text-navy-900">{c.code}</span>
                            </div>
                            <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-slate-600">{c.course}</p>
                            <p className="mt-0.5 truncate text-[10px] text-slate-400">{c.start}–{c.end}</p>
                            <p className="truncate text-[10px] text-slate-400">{c.venue}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 px-5 py-3 sm:px-6">
            <span className="text-[11px] font-medium text-slate-400">Courses</span>
            {courses.map((c) => (
              <span key={c.code} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className={`h-2 w-2 rounded-full ${c.color}`} aria-hidden="true" />
                {c.code} · {c.name.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}