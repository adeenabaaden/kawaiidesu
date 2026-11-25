import { useEffect, useState } from 'react'
import { Layout } from './components/layout/Layout.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { MyCourses } from './pages/MyCourses.jsx'
import { Timetable } from './pages/Timetable.jsx'
import { Assignments } from './pages/Assignments.jsx'
import { Examinations } from './pages/Examinations.jsx'
import { Attendance } from './pages/Attendance.jsx'
import { AIAssistant } from './pages/AIAssistant.jsx'
import { RevisionGames } from './pages/RevisionGames.jsx'
import { CampusBus } from './pages/CampusBus.jsx'
import { CampusMap } from './pages/CampusMap.jsx'
import { Events } from './pages/Events.jsx'
import { StudentServices } from './pages/StudentServices.jsx'
import { StudentSupport } from './pages/StudentSupport.jsx'
import { Settings } from './pages/Placeholders.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useNotifications } from './hooks/useNotifications.js'

const ROUTES = {
  dashboard: Dashboard,
  courses: MyCourses,
  timetable: Timetable,
  assignments: Assignments,
  examinations: Examinations,
  attendance: Attendance,
  assistant: AIAssistant,
  games: RevisionGames,
  bus: CampusBus,
  map: CampusMap,
  events: Events,
  services: StudentServices,
  support: StudentSupport,
  settings: Settings,
}

export default function App() {
  const [route, setRoute] = useLocalStorage('um-one:route', 'dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  const navigate = (next) => {
    setRoute(next)
    setSidebarOpen(false)
  }

  const notifications = useNotifications()
  const Page = ROUTES[route] ?? Dashboard

  return (
    <Layout
      route={route}
      navigate={navigate}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      notifications={notifications}
    >
      <Page navigate={navigate} />
    </Layout>
  )
}