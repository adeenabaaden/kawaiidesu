import {
  Bus,
  CalendarDays,
  CalendarHeart,
  ChevronLeft,
  Circle,
  ClipboardList,
  Gamepad2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  UserCheck,
  BookOpen,
} from 'lucide-react'
import { navItems, student } from '../../data/mockData.js'

const NAV_ICONS = {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  UserCheck,
  Sparkles,
  Gamepad2,
  Bus,
  Map,
  CalendarHeart,
  LifeBuoy,
  Headphones,
  Settings,
}

function NavIcon({ name, className }) {
  const Icon = NAV_ICONS[name] ?? Circle
  return <Icon className={className} aria-hidden="true" />
}

export function Sidebar({ route, navigate, collapsed, onToggleCollapse, mobileOpen, onCloseMobile, onSignOut }) {
  const handleNavigate = (id) => {
    navigate(id)
    onCloseMobile?.()
  }

  return (
    <>
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-30 bg-navy-950/50 backdrop-blur-[1px] lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-navy-800/60 bg-navy-900 text-navy-100 transition-[transform,width] duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          collapsed ? 'w-[76px]' : 'w-[260px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Primary navigation"
      >
        <div className="flex h-16 items-center gap-3 border-b border-navy-800/60 px-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400 text-navy-950">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-white">UM One</p>
              <p className="truncate text-[11px] text-navy-300">Universiti Malaya</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-auto rounded-lg p-1.5 text-navy-300 hover:bg-navy-800 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = route === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    aria-current={active ? 'page' : undefined}
                    title={collapsed ? item.label : undefined}
                    className={[
                      'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      collapsed ? 'justify-center px-0' : '',
                      active
                        ? 'bg-navy-800 text-white shadow-inner ring-1 ring-inset ring-navy-700'
                        : 'text-navy-200 hover:bg-navy-800/60 hover:text-white',
                    ].join(' ')}
                  >
                    <NavIcon
                      name={item.icon}
                      className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-gold-300' : 'text-navy-300 group-hover:text-navy-100'}`}
                    />
                    {!collapsed ? (
                      <>
                        <span className="truncate text-left">{item.label}</span>
                        {item.badge ? (
                          <span className="ml-auto rounded-full bg-gold-400 px-1.5 py-0.5 text-[10px] font-semibold text-navy-950">
                            {item.badge}
                          </span>
                        ) : null}
                      </>
                    ) : item.badge ? (
                      <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-gold-400" />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-navy-800/60 p-3">
          <div className={`flex items-center gap-3 rounded-lg bg-navy-800/50 p-2.5 ${collapsed ? 'justify-center' : ''}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-xs font-semibold text-navy-950">
              {student.initials}
            </span>
            {!collapsed ? (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{student.preferredName}</p>
                <p className="truncate text-[11px] text-navy-300">{student.matric}</p>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="mt-2 hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 transition-colors hover:bg-navy-800/60 hover:text-white lg:flex"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
            {!collapsed ? <span>Collapse sidebar</span> : null}
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-navy-300 transition-colors hover:bg-navy-800/60 hover:text-white ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed ? <span>Sign out</span> : null}
          </button>
        </div>
      </aside>
    </>
  )
}