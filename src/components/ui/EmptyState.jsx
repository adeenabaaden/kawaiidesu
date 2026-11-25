export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {Icon ? (
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      ) : null}
      <p className="text-sm font-semibold text-navy-900">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}