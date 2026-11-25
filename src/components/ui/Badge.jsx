const TONES = {
  navy: 'bg-navy-100 text-navy-800',
  gold: 'bg-gold-100 text-gold-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  rose: 'bg-rose-100 text-rose-700',
  sky: 'bg-sky-100 text-sky-800',
  violet: 'bg-violet-100 text-violet-800',
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-800',
}

export function Badge({ tone = 'slate', children, className = '' }) {
  return <span className={`chip ${TONES[tone] ?? TONES.slate} ${className}`}>{children}</span>
}