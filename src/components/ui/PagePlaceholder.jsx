import { Construction, ArrowLeft } from 'lucide-react'
import { PageHeader } from './PageHeader.jsx'

export function PagePlaceholder({ title, description, icon, features = [], navigate }) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} icon={icon} />

      <div className="card card-pad">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
            <Construction className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-4 text-base font-semibold text-navy-900">This module is under development</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            The layout, navigation and dashboard are complete. This section will be implemented in the next
            iteration of the UM One prototype.
          </p>

          {features.length ? (
            <div className="mt-6 w-full max-w-2xl text-left">
              <p className="section-label mb-3">Planned capabilities</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <button type="button" onClick={() => navigate('dashboard')} className="btn-ghost mt-6">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}