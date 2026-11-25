import { Check } from 'lucide-react'

export function Checkbox({ checked, onChange, label, className = '', size = 'md' }) {
  const dims = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`flex shrink-0 items-center justify-center rounded border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-1 ${dims} ${
        checked
          ? 'border-navy-800 bg-navy-800 text-white'
          : 'border-slate-300 bg-white text-transparent hover:border-navy-400'
      } ${className}`}
    >
      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
    </button>
  )
}