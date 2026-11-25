import {
  Award,
  Briefcase,
  Building2,
  Circle,
  CreditCard,
  FileCheck2,
  HeartPulse,
  HelpCircle,
  LayoutGrid,
  Library,
} from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { services } from '../../data/mockData.js'

const SERVICE_ICONS = {
  CreditCard,
  Building2,
  Library,
  FileCheck2,
  HeartPulse,
  Award,
  Briefcase,
  HelpCircle,
}

const TONE_DOT = {
  ok: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-navy-500',
}

export function QuickServices({ navigate }) {
  const quick = services.slice(0, 6)

  return (
    <Card>
      <CardHeader
        icon={LayoutGrid}
        title="Quick Access"
        subtitle="Student services"
        action={
          <button type="button" onClick={() => navigate('services')} className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline">
            All services
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 sm:p-4">
        {quick.map((s) => {
          const Icon = SERVICE_ICONS[s.icon] ?? Circle
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate('services')}
              className="group flex flex-col gap-2 rounded-lg border border-slate-200 p-3 text-left transition-colors hover:border-navy-300 hover:bg-navy-50/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover:bg-white">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-navy-900">{s.name}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[s.tone] ?? TONE_DOT.info}`} aria-hidden="true" />
                  {s.status}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}