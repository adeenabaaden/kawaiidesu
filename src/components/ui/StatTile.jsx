import { ProgressBar } from './ProgressBar.jsx'

export function StatTile({ icon: Icon, label, value, unit, hint, progress, tone = 'navy' }) {
  return (
    <div className="card card-pad">
      <div className="flex items-center justify-between">
        <span className="section-label">{label}</span>
        {Icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight text-navy-900">{value}</span>
        {unit ? <span className="text-sm font-medium text-slate-400">{unit}</span> : null}
      </div>
      {typeof progress === 'number' ? <ProgressBar value={progress} tone={tone} className="mt-3" /> : null}
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}