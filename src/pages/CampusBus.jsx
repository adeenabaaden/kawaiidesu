import { useEffect, useState } from 'react'
import { Bus, Clock, Info, MapPin, Radio, TriangleAlert, Users } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { busLive } from '../data/campusData.js'

const OCC_TONE = { Light: 'emerald', Moderate: 'amber', Full: 'rose' }

function pointOnPath(stops, percent) {
  if (stops.length < 2) return stops[0] ?? { x: 50, y: 50 }
  const segs = stops.length - 1
  const scaled = percent * segs
  const idx = Math.min(Math.floor(scaled), segs - 1)
  const local = scaled - idx
  const a = stops[idx]
  const b = stops[idx + 1]
  return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local }
}

export function CampusBusLive() {
  const [selectedRoute, setSelectedRoute] = useState(busLive[0].id)
  const [selectedStop, setSelectedStop] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])

  const route = busLive.find((r) => r.id === selectedRoute) ?? busLive[0]

  const buses = route.buses.map((b) => {
    const percent = (b.percent + tick * 0.03 * b.speed) % 1
    const pos = pointOnPath(route.stops, percent)
    const eta = Math.max(1, Math.round(b.eta - ((tick * 0.03 * b.speed * 10) % b.eta)))
    return { ...b, pos, eta }
  })

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Bus}
        title="Campus Bus"
        description="Live campus shuttle routes with simulated GPS tracking, arrival estimates and operating status."
        action={<Badge tone="navy">{busLive.length} routes</Badge>}
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-xs text-gold-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Simulated tracking.</span> Vehicle positions, movement and arrival estimates are
          generated for this prototype and do not reflect real UM shuttle telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader icon={Radio} title="Live Route Map" subtitle={`${route.name} · updating every 1.5 s`} />
          <div className="p-4 sm:p-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-[#eef2f7]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d7dee8" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                <polyline
                  points={route.stops.map((s) => `${s.x},${s.y}`).join(' ')}
                  fill="none"
                  stroke={route.color}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.55"
                  strokeDasharray="3 2"
                />
              </svg>

              {route.stops.map((s) => {
                const active = selectedStop === s.name
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedStop(active ? null : s.name)}
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    aria-label={`Bus stop ${s.name}`}
                    title={s.name}
                  >
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow ${active ? 'bg-gold-400' : 'bg-navy-700'}`}>
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </span>
                    {active ? (
                      <span className="absolute left-1/2 top-5 w-max -translate-x-1/2 rounded-md bg-navy-900 px-2 py-1 text-[10px] font-medium text-white shadow-lg">
                        {s.name}
                      </span>
                    ) : null}
                  </button>
                )
              })}

              {buses.map((b) => (
                <div
                  key={b.id}
                  style={{ left: `${b.pos.x}%`, top: `${b.pos.y}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-[1500ms] ease-linear"
                >
                  <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-raised ring-2" style={{ '--tw-ring-color': route.color }}>
                    <Bus className="h-3.5 w-3.5" style={{ color: route.color }} aria-hidden="true" />
                    <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ backgroundColor: route.color }} />
                  </span>
                </div>
              ))}

              <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-[10px] text-slate-500 shadow-card backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
                  Live simulation active
                </span>
              </div>
            </div>

            {selectedStop ? (
              <p className="mt-3 text-xs text-slate-500">
                Selected stop: <span className="font-medium text-navy-800">{selectedStop}</span>
              </p>
            ) : (
              <p className="mt-3 text-xs text-slate-400">Tap a stop marker to view its name.</p>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="card-pad">
            <h2 className="card-title">Select Route</h2>
            <ul className="mt-3 space-y-2">
              {busLive.map((r) => {
                const active = r.id === selectedRoute
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRoute(r.id)
                        setSelectedStop(null)
                      }}
                      aria-pressed={active}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${
                        active ? 'border-navy-700 bg-navy-50/60' : 'border-slate-200 hover:border-navy-300'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} aria-hidden="true" />
                          <span className="text-xs font-semibold text-navy-900">{r.name}</span>
                        </span>
                        <Badge tone={r.status === 'Diversion' ? 'amber' : 'emerald'}>{r.status}</Badge>
                      </span>
                      <span className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />every {r.interval}</span>
                        <span>{r.hours}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card>
            <CardHeader icon={Bus} title="Live Vehicles" subtitle={`${route.id} · ${buses.length} in service`} />
            <ul className="divide-y divide-slate-100">
              {buses.map((b) => (
                <li key={b.id} className="px-5 py-3 sm:px-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-navy-900">{b.id}</span>
                    <Badge tone={OCC_TONE[b.occupancy] ?? 'slate'}>
                      <Users className="h-3 w-3" aria-hidden="true" />
                      {b.occupancy}
                    </Badge>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />Next: {b.nextStop}</span>
                    <span className="font-medium text-navy-700">ETA {b.eta} min</span>
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {route.note ? (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{route.note}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { CampusBusLive as CampusBus }