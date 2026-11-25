export function PageHeader({ title, description, icon: Icon, action }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">{title}</h1>
          {description ? <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p> : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}