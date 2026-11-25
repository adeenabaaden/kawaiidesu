import { useCallback, useMemo } from 'react'
import { announcements, attendanceOpenWindows } from '../data/mockData.js'
import { useLocalStorage } from './useLocalStorage.js'

function seedAlerts() {
  return attendanceOpenWindows
    .filter((w) => w.opened)
    .map((w) => ({
      id: `alert-attendance-${w.code}`,
      type: 'attendance',
      title: `Attendance registration open — ${w.code}`,
      body: `Attendance for the ${w.sessionDate} session is open. Closes in ${w.closesIn}.`,
      source: 'Attendance System',
      date: w.sessionDate,
      route: 'attendance',
      unread: true,
    }))
}

export function useNotifications() {
  const [read, setRead] = useLocalStorage('um-one:notif-read', [])
  const [seedDismissed, setSeedDismissed] = useLocalStorage('um-one:notif-seeded', false)

  const stored = useMemo(() => {
    if (seedDismissed) return []
    return seedAlerts()
  }, [seedDismissed])

  const items = useMemo(() => {
    const combined = [
      ...stored,
      ...announcements.map((a) => ({
        id: a.id,
        type: a.tag?.toLowerCase() ?? 'announcement',
        title: a.title,
        body: a.body,
        source: a.source,
        date: a.date,
        route: 'dashboard',
        unread: true,
      })),
    ]
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [stored])

  const unreadCount = useMemo(() => items.filter((n) => !read.includes(n.id)).length, [items, read])

  const isRead = useCallback((id) => read.includes(id), [read])

  const markRead = useCallback(
    (id) => {
      setRead((prev) => (prev.includes(id) ? prev : [...prev, id]))
    },
    [setRead],
  )

  const markAllRead = useCallback(() => {
    setRead((prev) => {
      const ids = items.map((n) => n.id)
      return Array.from(new Set([...prev, ...ids]))
    })
  }, [items, setRead])

  const clearSeedAlerts = useCallback(() => setSeedDismissed(true), [setSeedDismissed])

  return { items, unreadCount, isRead, markRead, markAllRead, clearSeedAlerts }
}