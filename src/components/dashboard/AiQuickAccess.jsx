import { Sparkles, ArrowRight } from 'lucide-react'

export function AiQuickAccess({ navigate }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-900">UM One AI Assistant</p>
            <p className="mt-0.5 max-w-md text-xs leading-relaxed text-slate-500">
              Ask about your timetable, deadlines, examination rules or revision tips. Answers are generated from
              your academic records.
            </p>
          </div>
        </div>
        <button type="button" onClick={() => navigate('assistant')} className="btn-primary shrink-0 self-start sm:self-auto">
          Ask the assistant
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}