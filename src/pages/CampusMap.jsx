import { useMemo, useState } from 'react'
import { Compass, Footprints, Info, MapPin, Navigation, Search } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { SearchField } from '../components/ui/SearchField.jsx'
import { mapCategories, mapLocations, walkingDirections } from '../data/campusData.js'

const CAT_COLOR = {
  Faculty: '#22346b',
  'Lecture Hall': '#3a58a1',
  Library: '#b45309',
  Cafeteria: '#047857',
  Administration: '#6d28d9',
  Facility: '#0f766e',
  Residence: '#be123c',
  Health: '#dc2626',
  Worship: '#475569',
}

export function CampusMap() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [from, setFrom] = useState(mapLocations.find((l) => l.id === 'fcs')?.id ?? mapLocations[0].id)
  const [to, setTo] = useState(mapLocations.find((l) => l.id === 'library')?.id ?? mapLocations[1].id)
  const [showRoute, setShowRoute] = useState(false)

  const fromLoc = mapLocations.find((l) => l.id === from)
  const toLoc = mapLocations.find((l) => l.id === to)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return mapLocations.filter((l) => {
      const matchesQuery = !q || l.name.toLowerCase().includes(q) || l.category.toLowerCase().includes(q) || l.zone.toLowerCase().includes(q)
      const matchesCat = category === 'All' || l.category === category
      return matchesQuery && matchesCat
    })
  }, [query, category])

  const directions = useMemo(() => walkingDirections(fromLoc, toLoc), [fromLoc, toLoc])
  const routeLine = showRoute && fromLoc && toLoc ? `${fromLoc.x},${fromLoc.y} ${toLoc.x},${toLoc.y}` : null

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Navigation}
        title="Campus Map"
        description="Interactive schematic map of faculties, lecture halls, libraries, cafeterias and facilities with simulated directions."
        action={<Badge tone="navy">{mapLocations.length} locations</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            icon={Compass}
            title="Campus Schematic"
            subtitle="Markers are colour-coded by category"
            action={
              <button
                type="button"
                onClick={() => setShowRoute((v) => !v)}
                className={showRoute ? 'btn-primary' : 'btn-ghost'}
              >
                <Footprints className="h-4 w-4" aria-hidden="true" />
                {showRoute ? 'Hide route' : 'Show route'}
              </button>
            }
          />
          <div className="p-4 sm:p-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-[#eef2f7]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <pattern id="mapgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d7dee8" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#mapgrid)" />
                <path d="M 5 88 L 95 88 M 5 12 L 95 12 M 12 5 L 12 95 M 88 5 L 88 95" stroke="#c8d2de" strokeWidth="1" fill="none" />
                {routeLine ? (
                  <polyline points={routeLine} fill="none" stroke="#d99a1c" strokeWidth="1.6" strokeDasharray="3 2" strokeLinecap="round" />
                ) : null}
              </svg>

              {filtered.map((l) => {
                const color = CAT_COLOR[l.category] ?? '#334155'
                const isFrom = l.id === from
                const isTo = l.id === to
                return (
                  <div key={l.id} style={{ left: `${l.x}%`, top: `${l.y}%` }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="group relative flex flex-col items-center">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: color }}
                      >
                        {isFrom || isTo ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                      </span>
                      <span className="mt-0.5 max-w-[90px] truncate rounded bg-white/85 px-1 text-[9px] font-medium text-slate-600 shadow-sm">
                        {l.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 hidden w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-navy-900 px-2.5 py-1.5 text-left text-[10px] text-white shadow-lg group-hover:block">
                        <span className="block font-semibold">{l.name}</span>
                        <span className="block text-navy-300">{l.category} · {l.zone} · {l.open}</span>
                      </span>
                      {isFrom || isTo ? (
                        <span className="absolute -top-4 text-[9px] font-semibold uppercase tracking-wide" style={{ color }}>
                          {isFrom ? 'From' : 'To'}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              Schematic layout for the prototype — not to geographic scale. Hover a marker for details.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="card-pad">
            <h2 className="card-title">Search & Filter</h2>
            <SearchField value={query} onChange={setQuery} placeholder="Search destination…" className="mt-3" id="map-search" />
            <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
              {mapCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    category === c ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <ul className="scrollbar-thin mt-4 max-h-56 space-y-1.5 overflow-y-auto pr-1">
              {filtered.map((l) => (
                <li key={l.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: CAT_COLOR[l.category] ?? '#334155' }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-navy-900">{l.name}</span>
                    <span className="block text-[10px] text-slate-400">{l.category} · {l.zone}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setTo(l.id)}
                    className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-navy-700 hover:bg-navy-50"
                  >
                    Set as destination
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="py-6 text-center text-xs text-slate-400">No locations match.</li>
              ) : null}
            </ul>
          </Card>

          <Card>
            <CardHeader icon={Footprints} title="Directions" subtitle="Simulated walking route" />
            <div className="space-y-3 px-5 py-4 sm:px-6">
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-slate-500">From</span>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                >
                  {mapLocations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-medium text-slate-500">To</span>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
                >
                  {mapLocations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => setShowRoute(true)} className="btn-primary w-full">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Get directions
              </button>

              {showRoute && directions.length ? (
                <ol className="mt-2 space-y-2 border-t border-slate-100 pt-3">
                  {directions.map((d, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-[10px] font-semibold text-navy-700">
                        {i + 1}
                      </span>
                      {d}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Search className="h-3 w-3" aria-hidden="true" />
                  Choose a start and destination, then request directions.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}