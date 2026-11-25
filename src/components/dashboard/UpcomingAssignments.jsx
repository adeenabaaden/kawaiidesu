import { ClipboardList } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { Badge } from '../ui/Badge.jsx'
import { EmptyState } from '../ui/EmptyState.jsx'
import { assignments, formatDate, relativeDue } from '../../data/mockData.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

export function UpcomingAssignments({ navigate, limit = 4 }) {
  const [completed] = useLocalStorage('um-one:assignments-done', {})
  const list = [...assignments]
    .filter((a) => a.status !== 'submitted' && !completed[a.id])
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, limit)

  return (
    <Card>
      <CardHeader
        icon={ClipboardList}
        title="Upcoming Deadlines"
        subtitle="Sorted by due date"
        action={
          <button type="button" onClick={() => navigate('assignments')} className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline">
            View all
          </button>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No pending assignments" description="You are all caught up." />
      ) : (
        <ul className="divide-y divide-slate-100">
          {list.map((a) => {
            const due = relativeDue(a.due)
            const urgent = due.overdue || /^\d+ h left$| min left$/.test(due.label)
            return (
              <li key={a.id} className="px-5 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy-900">{a.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {a.code} · {a.course} · {a.weight} · {a.type}
                    </p>
                  </div>
                  <Badge tone={urgent ? 'rose' : due.label.startsWith('in') ? 'navy' : 'amber'} className="shrink-0 whitespace-nowrap">
                    {due.label}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-slate-400">Due {formatDate(a.due, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}