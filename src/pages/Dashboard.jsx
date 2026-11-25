import { Award, BookOpen, CalendarCheck, GraduationCap, TrendingUp } from 'lucide-react'
import { StatTile } from '../components/ui/StatTile.jsx'
import { TodaySchedule } from '../components/dashboard/TodaySchedule.jsx'
import { UpcomingAssignments } from '../components/dashboard/UpcomingAssignments.jsx'
import { ExamCountdown } from '../components/dashboard/ExamCountdown.jsx'
import { AttendanceOverview } from '../components/dashboard/AttendanceOverview.jsx'
import { Announcements } from '../components/dashboard/Announcements.jsx'
import { QuickServices } from '../components/dashboard/QuickServices.jsx'
import { WeeklyCalendar } from '../components/dashboard/WeeklyCalendar.jsx'
import { AiQuickAccess } from '../components/dashboard/AiQuickAccess.jsx'
import { assignments, attendanceStats, courses, student } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard({ navigate }) {
  const [completedAssignments] = useLocalStorage('um-one:assignments-done', {})
  const [attendanceMin] = useLocalStorage('um-one:attendance-min', 80)
  const overallAttendance = Math.round(
    courses.reduce((s, c) => s + attendanceStats(c.code).pct, 0) / courses.length,
  )
  const pending = assignments.filter((a) => a.status !== 'submitted' && !completedAssignments[a.id]).length

  return (
    <div className="space-y-6">
      <section className="card overflow-hidden">
        <div className="bg-navy-800 px-5 py-6 sm:px-6 sm:py-7">
          <p className="text-xs font-medium uppercase tracking-wider text-gold-300">
            {student.semester}
          </p>
          <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {greeting()}, {student.preferredName}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-navy-200">
            {student.programme} · {student.year} · {student.faculty}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-300">
            <span>Matric No. <span className="font-medium text-navy-100">{student.matric}</span></span>
            <span>Academic Advisor <span className="font-medium text-navy-100">{student.advisor}</span></span>
            <span>Residency <span className="font-medium text-navy-100">{student.residency}</span></span>
          </div>
        </div>
      </section>

      <section aria-label="Academic summary" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon={TrendingUp} label="CGPA" value={student.cgpa.toFixed(2)} unit="/ 4.00" hint="Semester 1 · 2025/2026" progress={(student.cgpa / 4) * 100} tone="gold" />
        <StatTile icon={BookOpen} label="Registered Courses" value={courses.length} unit="courses" hint={`${courses.reduce((s, c) => s + c.credits, 0)} credit hours`} />
        <StatTile icon={CalendarCheck} label="Pending Tasks" value={pending} unit={pending === 1 ? 'item' : 'items'} hint="Assignments and reports" progress={Math.round(((assignments.length - pending) / assignments.length) * 100)} tone="emerald" />
        <StatTile icon={Award} label="Attendance" value={`${overallAttendance}%`} hint={`Minimum requirement: ${attendanceMin}%`} progress={overallAttendance} tone={overallAttendance >= attendanceMin ? 'emerald' : 'rose'} />
      </section>

      <AiQuickAccess navigate={navigate} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TodaySchedule />
          <UpcomingAssignments navigate={navigate} />
          <Announcements />
        </div>

        <div className="space-y-6">
          <ExamCountdown navigate={navigate} />
          <AttendanceOverview navigate={navigate} />
          <WeeklyCalendar navigate={navigate} />
        </div>
      </div>

      <QuickServices navigate={navigate} />

      <section className="card card-pad" aria-label="Degree progress">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">Degree Completion</p>
              <p className="text-xs text-slate-500">Based on credit hours completed against programme requirements</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-navy-900">82 / 130 credits</p>
        </div>
      </section>
    </div>
  )
}