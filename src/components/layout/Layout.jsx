import { useState } from 'react'
import { Sidebar } from './Sidebar.jsx'
import { Topbar } from './Topbar.jsx'
import { ConfirmDialog } from '../ui/ConfirmDialog.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

export function Layout({ route, navigate, sidebarOpen, setSidebarOpen, notifications, children }) {
  const [collapsed, setCollapsed] = useLocalStorage('um-one:sidebar-collapsed', false)
  const [signOutOpen, setSignOutOpen] = useState(false)

  const confirmSignOut = () => {
    try {
      const keys = Object.keys(window.localStorage).filter((k) => k.startsWith('um-one:'))
      keys.forEach((k) => window.localStorage.removeItem(k))
    } catch {
      /* storage unavailable */
    }
    setSignOutOpen(false)
    navigate('dashboard')
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        route={route}
        navigate={navigate}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onSignOut={() => setSignOutOpen(true)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          navigate={navigate}
          onOpenSidebar={() => setSidebarOpen(true)}
          notifications={notifications}
          onSignOut={() => setSignOutOpen(true)}
        />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">{children}</main>
        <footer className="border-t border-slate-200 px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>UM One — Integrated Student Information System · Universiti Malaya</p>
            <p>Prototype · Semester 1, 2025/2026</p>
          </div>
        </footer>
      </div>

      <ConfirmDialog
        open={signOutOpen}
        title="Sign out of UM One?"
        message="This is a prototype, so signing out clears the preferences and progress saved on this device and returns you to the dashboard."
        confirmLabel="Sign out"
        onConfirm={confirmSignOut}
        onCancel={() => setSignOutOpen(false)}
      />
    </div>
  )
}