export function SegmentedControl({ options, value, onChange, ariaLabel, className = '' }) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-navy-800'
            }`}
          >
            {opt.icon ? <opt.icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            {opt.label}
            {typeof opt.count === 'number' ? (
              <span className={`rounded-full px-1.5 text-[10px] font-semibold ${active ? 'bg-navy-100 text-navy-800' : 'bg-slate-200 text-slate-500'}`}>
                {opt.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}