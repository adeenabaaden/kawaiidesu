import { AlertTriangle } from 'lucide-react'

export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-[1px]" onClick={onCancel} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-raised"
      >
        <div className="flex items-start gap-3 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3.5">
          <button type="button" onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="btn-primary">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}