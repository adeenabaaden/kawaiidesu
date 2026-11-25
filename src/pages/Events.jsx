import { useMemo, useState } from 'react'
import { Bookmark, BookmarkCheck, CalendarHeart, CalendarDays, Check, Clock, MapPin, Trophy, Users } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { SearchField } from '../components/ui/SearchField.jsx'
import { SegmentedControl } from '../components/ui/SegmentedControl.jsx'
import { opportunityCategories, opportunities } from '../data/campusData.js'
import { formatDate, daysUntil } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const CAT_TONE = {
  Competition: 'rose',
  Internship: 'navy',
  Volunteering: 'emerald',
  Scholarship: 'gold',
  'Club Activity': 'violet',
  Career: 'sky',
}

export function Events() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('all')
  const [bookmarks, setBookmarks] = useLocalStorage('um-one:events-bookmarks', [])
  const [registered, setRegistered] = useLocalStorage('um-one:events-registered', [])
  const [toast, setToast] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return opportunities
      .filter((o) => {
        const matchesCat = category === 'All' || o.category === category
        const matchesQuery = !q || o.title.toLowerCase().includes(q) || o.organiser.toLowerCase().includes(q) || o.venue.toLowerCase().includes(q)
        const matchesView = view === 'all' || bookmarks.includes(o.id)
        return matchesCat && matchesQuery && matchesView
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [category, query, view, bookmarks])

  const toggleBookmark = (id) => {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]))
  }

  const register = (item) => {
    setRegistered((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]))
    setToast(`${item.title} — registration confirmed (prototype).`)
    setTimeout(() => setToast(null), 3200)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={CalendarHeart}
        title="Events & Opportunities"
        description="University events, competitions, internships, volunteering, scholarships and club activities."
        action={
          <SegmentedControl
            ariaLabel="Event view"
            value={view}
            onChange={setView}
            options={[
              { value: 'all', label: 'All events', count: opportunities.length },
              { value: 'saved', label: 'Bookmarked', count: bookmarks.length },
            ]}
          />
        }
      />

      {toast ? (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          {toast}
        </div>
      ) : null}

      <Card className="card-pad">
        <div className="flex flex-col gap-3">
          <SearchField value={query} onChange={setQuery} placeholder="Search events, organisers or venues…" id="events-search" />
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            {opportunityCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                  category === c ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="card-pad">
          <p className="py-10 text-center text-sm text-slate-400">
            {view === 'saved' ? 'No bookmarked opportunities yet.' : 'No opportunities match your filters.'}
          </p>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((o) => {
            const saved = bookmarks.includes(o.id)
            const isRegistered = registered.includes(o.id)
            const days = daysUntil(o.date)
            return (
              <li key={o.id} className="card flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge tone={CAT_TONE[o.category] ?? 'slate'}>{o.category}</Badge>
                    <h3 className="mt-2 text-sm font-semibold text-navy-900">{o.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{o.organiser}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(o.id)}
                    aria-pressed={saved}
                    aria-label={saved ? `Remove bookmark for ${o.title}` : `Bookmark ${o.title}`}
                    className={`icon-btn shrink-0 ${saved ? 'text-gold-600' : ''}`}
                  >
                    {saved ? <BookmarkCheck className="h-[18px] w-[18px]" /> : <Bookmark className="h-[18px] w-[18px]" />}
                  </button>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{o.description}</p>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{formatDate(o.date, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{o.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Closes {formatDate(o.deadline, { day: 'numeric', month: 'short' })}</span>
                  </div>
                  {o.prize ? (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Trophy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{o.prize}</span>
                    </div>
                  ) : o.duration ? (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{o.duration}</span>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <span className="text-[11px] text-slate-400">
                    {o.registrationOpen ? (days > 0 ? `Starts in ${days} day${days === 1 ? '' : 's'}` : 'Happening now') : 'Registration closed'}
                  </span>
                  <button
                    type="button"
                    onClick={() => register(o)}
                    disabled={!o.registrationOpen || isRegistered}
                    className={isRegistered ? 'btn-ghost' : 'btn-primary'}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> Registered
                      </>
                    ) : o.registrationOpen ? (
                      'Register'
                    ) : (
                      'Closed'
                    )}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}