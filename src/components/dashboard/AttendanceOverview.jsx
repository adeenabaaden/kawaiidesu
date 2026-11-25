import { UserCheck } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { ProgressBar } from '../ui/ProgressBar.jsx'
import { attendanceStats, courses } from '../../data/mockData.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

export function AttendanceOverview({ navigate }) {
  const [min] = useLocalStorage('um-one:attendance-min', 80)
  const rows = courses.map((c) => ({ ...c, pct: attendanceStats(c.code).pct }))
  const overall = Math.round(rows.reduce((sum, c) => sum + c.pct, 0) / rows.length)
  const atRisk = rows.filter((c) => c.pct < min)

  return (
    <Card>
      <CardHeader
        icon={UserCheck}
        title="Attendance Overview"
        subtitle={`Minimum requirement: ${min}%`}
        action={
          <button type="button" onClick={() => navigate('attendance')} className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline">
            Details
          </button>
        }
      />
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-semibold tracking-tight text-navy-900">{overall}%</span>
            <span className="ml-1 text-sm text-slate-400">overall</span>
          </div>
          <span className={`chip ${atRisk.length ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
            {atRisk.length ? `${atRisk.length} below target` : 'All on track'}
          </span>
        </div>

        <ul className="mt-5 space-y-3.5">
          {rows.map((c) => (
            <li key={c.code}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate font-medium text-navy-800">{c.name}</span>
                <span className={`shrink-0 font-semibold ${c.pct < min ? 'text-rose-600' : 'text-slate-500'}`}>
                  {c.pct}%
                </span>
              </div>
              <ProgressBar value={c.pct} tone={c.pct < min ? 'rose' : c.pct >= 92 ? 'emerald' : 'navy'} size="sm" />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}