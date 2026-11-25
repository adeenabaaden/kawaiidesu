export function Card({ className = '', children, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`card ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function CardHeader({ title, subtitle, icon: Icon, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6 ${className}`}>
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
        <div>
          <h2 className="card-title">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      {action}
    </div>
  )
}