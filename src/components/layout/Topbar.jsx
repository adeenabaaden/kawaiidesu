import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Search,
  Settings as SettingsIcon,
  User,
  X,
} from 'lucide-react'
import { announcements, courses, student } from '../../data/mockData.js'

export function Topbar({ navigate, onOpenSidebar, notifications, onSignOut }) {
  const notifList = notifications?.items ?? []
  const unread = notifications?.unreadCount ?? 0
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const courseHits = courses
      .filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({ id: `course-${c.code}`, type: 'Course', label: c.name, meta: c.code, route: 'courses' }))
    const notifHits = announcements
      .filter((a) => a.title.toLowerCase().includes(q))
      .slice(0, 3)
      .map((a) => ({ id: `news-${a.id}`, type: 'Announcement', label: a.title, meta: a.source, route: 'dashboard' }))
    return [...courseHits, ...notifHits]
  }, [query])

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setNotifOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleResult = (route) => {
    navigate(route)
    setQuery('')
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="icon-btn lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <label htmlFor="um-search" className="sr-only">
            Search courses and announcements
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="um-search"
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search courses, assignments, announcements…"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-16 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-100"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:flex">
            <Command className="h-3 w-3" />K
          </span>

          {searchOpen && query.trim() ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-raised">
              {results.length ? (
                <ul className="max-h-80 overflow-y-auto py-1">
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => handleResult(r.route)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-slate-50"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-navy-900">{r.label}</span>
                          <span className="block text-xs text-slate-400">{r.type}</span>
                        </span>
                        <span className="shrink-0 text-xs text-slate-400">{r.meta}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-6 text-center text-sm text-slate-400">
                  No results for “{query}”
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((v) => !v)
                setProfileOpen(false)
              }}
              className="icon-btn"
              aria-label="Notifications"
              aria-expanded={notifOpen}
            >
              <Bell className="h-5 w-5" />
              {unread > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-400 px-1 text-[10px] font-semibold text-navy-950 ring-2 ring-white">
                  {unread > 9 ? '9+' : unread}
                </span>
              ) : null}
            </button>
            {notifOpen ? (
              <div className="absolute right-0 top-[calc(100%+8px)] w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-raised">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">
                    Notifications
                    {unread > 0 ? <span className="ml-1.5 text-xs font-normal text-slate-400">{unread} new</span> : null}
                  </p>
                  <div className="flex items-center gap-2">
                    {unread > 0 ? (
                      <button
                        type="button"
                        onClick={() => notifications?.markAllRead?.()}
                        className="text-xs font-medium text-navy-700 hover:text-navy-900 hover:underline"
                      >
                        Mark all read
                      </button>
                    ) : null}
                    <button type="button" onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600" aria-label="Close notifications">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <ul className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifList.slice(0, 6).map((a) => {
                    const isUnread = !notifications?.isRead?.(a.id)
                    return (
                      <li key={a.id}>
                        <button
                          type="button"
                          onClick={() => {
                            notifications?.markRead?.(a.id)
                            navigate(a.route ?? 'dashboard')
                            setNotifOpen(false)
                          }}
                          className="flex w-full items-start gap-2.5 px-4 py-3 text-left hover:bg-slate-50"
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isUnread ? 'bg-gold-400' : 'bg-transparent'}`} aria-hidden="true" />
                          <span className="min-w-0">
                            <span className={`block text-sm ${isUnread ? 'font-semibold text-navy-900' : 'font-medium text-slate-600'}`}>{a.title}</span>
                            <span className="mt-0.5 block text-xs text-slate-400">{a.source} · {a.date}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((v) => !v)
                setNotifOpen(false)
              }}
              className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100"
              aria-label="Student profile"
              aria-expanded={profileOpen}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-[11px] font-semibold text-gold-300">
                {student.initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-semibold leading-tight text-navy-900">{student.preferredName}</span>
                <span className="block text-[11px] leading-tight text-slate-400">{student.matric}</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-raised">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-navy-900">{student.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{student.programme}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{student.email}</p>
                </div>
                <div className="py-1">
                  <button type="button" onClick={() => { navigate('settings'); setProfileOpen(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-navy-800 hover:bg-slate-50">
                    <User className="h-4 w-4 text-slate-400" /> My profile
                  </button>
                  <button type="button" onClick={() => { navigate('settings'); setProfileOpen(false) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-navy-800 hover:bg-slate-50">
                    <SettingsIcon className="h-4 w-4 text-slate-400" /> Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      onSignOut?.()
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}