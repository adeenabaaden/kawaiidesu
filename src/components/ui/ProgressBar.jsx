export function ProgressBar({ value, tone = 'navy', size = 'md', className = '' }) {
  const tones = {
    navy: 'bg-navy-700',
    gold: 'bg-gold-400',
    emerald: 'bg-emerald-600',
    rose: 'bg-rose-500',
  }
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-2.5' }
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-200 ${heights[size]} ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${tones[tone] ?? tones.navy}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}