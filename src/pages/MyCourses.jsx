import { useMemo, useState } from 'react'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Library,
  NotebookPen,
  RotateCcw,
  ScrollText,
  Users,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import { SearchField } from '../components/ui/SearchField.jsx'
import { Checkbox } from '../components/ui/Checkbox.jsx'
import { PagePlaceholder } from '../components/ui/PagePlaceholder.jsx'
import { courses, materialTypes, materials } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const TYPE_META = {
  'Lecture Slides': { icon: FileText, tone: 'navy' },
  Tutorial: { icon: NotebookPen, tone: 'sky' },
  Assignment: { icon: ScrollText, tone: 'gold' },
  Revision: { icon: RotateCcw, tone: 'emerald' },
}

export function MyCourses() {
  const [selected, setSelected] = useState(courses[0].code)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showCompleted, setShowCompleted] = useState(true)
  const [completed, setCompleted] = useLocalStorage('um-one:materials-done', {})
  const [downloaded, setDownloaded] = useLocalStorage('um-one:materials-downloaded', {})
  const [expandedWeeks, setExpandedWeeks] = useState(() => ({ 1: true }))

  const markDownloaded = (id) => setDownloaded((prev) => ({ ...prev, [id]: true }))

  const course = courses.find((c) => c.code === selected) ?? courses[0]

  const courseMaterials = useMemo(
    () => materials.filter((m) => m.code === course.code),
    [course.code],
  )

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = courseMaterials.filter((m) => {
      const matchesQuery = !q || m.title.toLowerCase().includes(q)
      const matchesType = typeFilter === 'All' || m.type === typeFilter
      const isDone = Boolean(completed[m.id])
      const matchesStatus = showCompleted || !isDone
      return matchesQuery && matchesType && matchesStatus
    })
    const byWeek = new Map()
    for (const m of filtered) {
      if (!byWeek.has(m.week)) byWeek.set(m.week, [])
      byWeek.get(m.week).push(m)
    }
    return Array.from(byWeek.entries()).sort((a, b) => a[0] - b[0])
  }, [courseMaterials, query, typeFilter, showCompleted, completed])

  const doneCount = courseMaterials.filter((m) => completed[m.id]).length
  const progress = courseMaterials.length ? Math.round((doneCount / courseMaterials.length) * 100) : 0

  const toggle = (id) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  const toggleWeek = (week) => setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }))

  if (!courses.length) {
    return <PagePlaceholder navigate={() => {}} title="My Courses" icon={BookOpen} description="No courses registered." />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BookOpen}
        title="My Courses"
        description="Enrolled courses for Semester 1, 2025/2026, with learning materials organised by OCC group and teaching week."
        action={<Badge tone="navy">{courses.length} courses registered</Badge>}
      />

      <section aria-label="Enrolled courses" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => {
          const active = c.code === course.code
          const count = materials.filter((m) => m.code === c.code)
          const done = count.filter((m) => completed[m.id]).length
          const pct = count.length ? Math.round((done / count.length) * 100) : 0
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelected(c.code)}
              aria-pressed={active}
              className={`card card-pad text-left transition-shadow hover:shadow-raised ${
                active ? 'ring-2 ring-navy-700' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${c.color}`} aria-hidden="true" />
                    <span className="text-xs font-semibold text-slate-500">{c.code}</span>
                  </span>
                  <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-navy-900">{c.name}</p>
                </div>
                <Badge tone="gold" className="shrink-0">Grade {c.grade}</Badge>
              </div>
              <p className="mt-2 truncate text-xs text-slate-500">{c.lecturer}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1"><Library className="h-3 w-3" />{c.credits} credits</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{c.enrolled}</span>
                <span>{c.occ}</span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Materials completed</span>
                  <span className="font-medium text-slate-500">{done}/{count.length}</span>
                </div>
                <ProgressBar value={pct} tone={pct >= 60 ? 'emerald' : 'navy'} size="sm" />
              </div>
            </button>
          )
        })}
      </section>

      <Card>
        <CardHeader
          icon={BookOpen}
          title={course.name}
          subtitle={`${course.code} · ${course.occGroup} · ${course.teachingWeeks} · ${course.lecturer}`}
          action={
            <div className="hidden text-right sm:block">
              <p className="text-xs text-slate-400">Course progress</p>
              <p className="text-sm font-semibold text-navy-900">{progress}% complete</p>
            </div>
          }
        />

        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Search materials by title…"
            className="sm:max-w-xs"
          />
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by material type">
            <span className="mr-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Filter className="h-3.5 w-3.5" aria-hidden="true" />Type
            </span>
            {['All', ...materialTypes].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                aria-pressed={typeFilter === t}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  typeFilter === t
                    ? 'border-navy-700 bg-navy-800 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-navy-300 hover:text-navy-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500 sm:ml-auto">
            <Checkbox checked={showCompleted} onChange={() => setShowCompleted((v) => !v)} label="Show completed materials" size="sm" />
            Show completed
          </label>
        </div>

        {grouped.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-400">No materials match your filters.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {grouped.map(([week, items]) => {
              const open = expandedWeeks[week] ?? false
              const weekDone = items.filter((m) => completed[m.id]).length
              return (
                <div key={week}>
                  <button
                    type="button"
                    onClick={() => toggleWeek(week)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 sm:px-6"
                  >
                    <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? '' : '-rotate-90'}`} aria-hidden="true" />
                    <span className="text-sm font-semibold text-navy-900">Teaching Week {week}</span>
                    <span className="text-xs text-slate-400">{items.length} item{items.length === 1 ? '' : 's'}</span>
                    <span className="ml-auto text-xs text-slate-400">{weekDone}/{items.length} completed</span>
                  </button>

                  {open ? (
                    <ul className="pb-2">
                      {items.map((m) => {
                        const meta = TYPE_META[m.type] ?? TYPE_META['Lecture Slides']
                        const Icon = meta.icon
                        const isDone = Boolean(completed[m.id])
                        return (
                          <li key={m.id} className="flex items-center gap-3 px-5 py-2.5 sm:px-6">
                            <Checkbox checked={isDone} onChange={() => toggle(m.id)} label={`Mark ${m.title} as completed`} />
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-navy-50 text-navy-700'
                            }`}>
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className={`block truncate text-sm ${isDone ? 'text-slate-400 line-through' : 'font-medium text-navy-900'}`}>
                                {m.title}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-slate-400">
                                {m.type} · {m.occ} · {m.size} · updated {m.updated}
                              </span>
                            </span>
                            <Badge tone={meta.tone} className="hidden sm:inline-flex">{m.type}</Badge>
                            <button
                              type="button"
                              onClick={() => markDownloaded(m.id)}
                              className="icon-btn h-8 w-8"
                              aria-label={`Download ${m.title}`}
                              title={downloaded[m.id] ? 'Downloaded (prototype)' : 'Download'}
                            >
                              {downloaded[m.id] ? (
                                <Check className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}

        <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400 sm:px-6">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
          {doneCount} of {courseMaterials.length} materials completed — progress is saved on this device.
        </div>
      </Card>
    </div>
  )
}