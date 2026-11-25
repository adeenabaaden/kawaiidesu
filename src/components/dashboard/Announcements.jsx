import { Megaphone } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card.jsx'
import { Badge } from '../ui/Badge.jsx'
import { announcements, formatDate } from '../../data/mockData.js'

const PRIORITY_TONE = { high: 'rose', medium: 'amber', low: 'slate' }

export function Announcements({ limit = 4 }) {
  const list = announcements.slice(0, limit)

  return (
    <Card>
      <CardHeader
        icon={Megaphone}
        title="Recent Announcements"
        subtitle="From UM divisions and faculties"
      />
      <ul className="divide-y divide-slate-100">
        {list.map((a) => (
          <li key={a.id} className="px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-navy-900">{a.title}</p>
              <Badge tone={PRIORITY_TONE[a.priority] ?? 'slate'} className="shrink-0">
                {a.tag}
              </Badge>
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{a.body}</p>
            <p className="mt-2 text-[11px] text-slate-400">
              {a.source} · {formatDate(a.date)}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
}