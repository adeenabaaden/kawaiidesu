import { useMemo, useState } from 'react'
import {
  Award,
  CalendarCheck,
  Check,
  ChevronLeft,
  Flag,
  Flame,
  Gamepad2,
  Layers,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card, CardHeader } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { ProgressBar } from '../components/ui/ProgressBar.jsx'
import { achievements, levelForXp, questionsFor, quizCourses } from '../data/quizData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ACH_ICONS = { Flag, Award, Flame, CalendarCheck, Layers, Trophy }

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayKey() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function RevisionGames() {
  const [progress, setProgress] = useLocalStorage('um-one:revision-progress', {
    xp: 0,
    quizzes: [],
    correct: 0,
    answered: 0,
    streak: 0,
    lastPlayed: null,
    achievements: [],
    coursesAttempted: [],
  })

  const [courseSel, setCourseSel] = useState(null)
  const [topicSel, setTopicSel] = useState('all')
  const [session, setSession] = useState(null)
  const [result, setResult] = useState(null)

  const level = levelForXp(progress.xp)
  const course = quizCourses.find((c) => c.code === courseSel)
  const availableQuestions = useMemo(
    () => (courseSel ? questionsFor(courseSel, topicSel === 'all' ? null : topicSel) : []),
    [courseSel, topicSel],
  )

  const startQuiz = () => {
    if (!availableQuestions.length) return
    setSession({ questions: availableQuestions, index: 0, answers: [], picked: null, revealed: false })
    setResult(null)
  }

  const pick = (idx) => {
    if (!session || session.revealed) return
    setSession((s) => ({ ...s, picked: idx, revealed: true }))
  }

  const next = () => {
    if (!session || !session.revealed) return
    const current = session.questions[session.index]
    const answers = [
      ...session.answers,
      { qid: current.id, picked: session.picked, correct: session.picked === current.answer },
    ]
    const isLast = session.index + 1 >= session.questions.length
    if (isLast) {
      finish(answers)
      return
    }
    setSession({ ...session, index: session.index + 1, answers, picked: null, revealed: false })
  }

  const finish = (answers) => {
    const correctCount = answers.filter((a) => a.correct).length
    const total = answers.length
    const perfect = total > 0 && correctCount === total
    const baseXp = correctCount * 10
    const bonus = perfect ? 25 : 0
    const gained = baseXp + bonus

    setProgress((prev) => {
      const today = todayKey()
      let streak = prev.streak
      if (prev.lastPlayed !== today) {
        streak = prev.lastPlayed === yesterdayKey() ? prev.streak + 1 : 1
      }
      const quizzes = [...prev.quizzes, { code: courseSel, topic: topicSel, score: correctCount, total, date: today, xp: gained }]
      const answered = prev.answered + total
      const correct = prev.correct + correctCount

      const earned = new Set(prev.achievements)
      if (quizzes.length >= 1) earned.add('first-quiz')
      if (perfect) earned.add('perfect')
      if (correct >= 10) earned.add('ten-correct')
      if (streak >= 3) earned.add('streak-3')
      if (quizzes.length >= 5) earned.add('five-quizzes')
      const attempted = new Set([...prev.coursesAttempted, courseSel])
      if (attempted.size >= quizCourses.length) earned.add('all-courses')

      return {
        xp: prev.xp + gained,
        quizzes,
        correct,
        answered,
        streak,
        lastPlayed: today,
        achievements: Array.from(earned),
        coursesAttempted: Array.from(attempted),
      }
    })

    setResult({ correctCount, total, perfect, gained, bonus })
    setSession(null)
  }

  const closeQuiz = () => {
    setSession(null)
    setResult(null)
  }

  const accuracy = progress.answered ? Math.round((progress.correct / progress.answered) * 100) : 0
  const newAchievements = achievements.filter((a) => !progress.achievements.includes(a.id))

  if (result) {
    const pct = result.total ? Math.round((result.correctCount / result.total) * 100) : 0
    return (
      <div className="space-y-6">
        <PageHeader icon={Gamepad2} title="Revision Games" description="Quiz complete." />
        <Card className="card-pad">
          <div className="flex flex-col items-center py-6 text-center">
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${result.perfect ? 'bg-gold-400 text-navy-950' : 'bg-navy-50 text-navy-700'}`}>
              {result.perfect ? <Trophy className="h-8 w-8" aria-hidden="true" /> : <Flag className="h-8 w-8" aria-hidden="true" />}
            </span>
            <p className="mt-4 text-lg font-semibold text-navy-900">
              {result.perfect ? 'Perfect score!' : 'Quiz complete'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {course?.name} · {topicSel === 'all' ? 'All topics' : course?.topics.find((t) => t.id === topicSel)?.name}
            </p>

            <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-2xl font-semibold text-navy-900">{result.correctCount}/{result.total}</p>
                <p className="text-xs text-slate-400">Correct</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-2xl font-semibold text-navy-900">{pct}%</p>
                <p className="text-xs text-slate-400">Score</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-2xl font-semibold text-gold-600">+{result.gained}</p>
                <p className="text-xs text-slate-400">XP earned</p>
              </div>
            </div>

            {result.bonus ? (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-800">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Includes +{result.bonus} XP perfect-score bonus
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={startQuiz} className="btn-primary">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Retry quiz
              </button>
              <button type="button" onClick={closeQuiz} className="btn-ghost">
                Back to topics
              </button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (session) {
    const q = session.questions[session.index]
    const isCorrect = session.picked === q.answer
    return (
      <div className="space-y-6">
        <PageHeader
          icon={Gamepad2}
          title={`${course?.code} Quiz`}
          description={`Question ${session.index + 1} of ${session.questions.length}`}
          action={
            <button type="button" onClick={closeQuiz} className="btn-ghost">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Exit
            </button>
          }
        />

        <Card className="card-pad">
          <ProgressBar value={((session.index + (session.revealed ? 1 : 0)) / session.questions.length) * 100} />
          <p className="mt-5 text-base font-semibold text-navy-900">{q.prompt}</p>

          <ul className="mt-4 space-y-2.5">
            {q.options.map((opt, idx) => {
              const chosen = session.picked === idx
              let style = 'border-slate-200 hover:border-navy-300 hover:bg-navy-50/40'
              if (session.revealed) {
                if (idx === q.answer) style = 'border-emerald-300 bg-emerald-50'
                else if (chosen) style = 'border-rose-300 bg-rose-50'
                else style = 'border-slate-200 opacity-70'
              } else if (chosen) {
                style = 'border-navy-700 bg-navy-50'
              }
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => pick(idx)}
                    disabled={session.revealed}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${style}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                      session.revealed && idx === q.answer ? 'bg-emerald-600 text-white'
                      : session.revealed && chosen ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                    }`}>
                      {session.revealed && idx === q.answer ? <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        : session.revealed && chosen ? <X className="h-3.5 w-3.5" aria-hidden="true" />
                        : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-navy-900">{opt}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {session.revealed ? (
            <div className={`mt-5 rounded-lg border px-4 py-3 text-sm ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
              <p className="font-semibold">{isCorrect ? 'Correct' : 'Not quite'}</p>
              <p className="mt-1 text-xs leading-relaxed">{q.explanation}</p>
            </div>
          ) : null}

          <div className="mt-5 flex justify-end">
            <button type="button" onClick={next} disabled={!session.revealed} className="btn-primary">
              {session.index + 1 >= session.questions.length ? 'See results' : 'Next question'}
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Gamepad2}
        title="Revision Games"
        description="Practice quizzes generated from your course content, with instant feedback, XP and achievements."
        action={
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Zap className="h-4 w-4 text-gold-500" aria-hidden="true" />
            <span className="text-sm font-semibold text-navy-900">{progress.xp} XP</span>
            <span className="text-xs text-slate-400">· Level {level.level} {level.title}</span>
          </div>
        }
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="card card-pad">
          <p className="section-label">Level</p>
          <p className="mt-2 text-2xl font-semibold text-navy-900">{level.level}</p>
          <p className="mt-0.5 text-xs text-slate-400">{level.title}</p>
          <ProgressBar value={level.progress} tone="gold" size="sm" className="mt-3" />
          <p className="mt-1.5 text-[11px] text-slate-400">{level.next ? `${level.xpToNext} XP to next level` : 'Max level reached'}</p>
        </div>
        <div className="card card-pad">
          <p className="section-label">Revision Streak</p>
          <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-navy-900">
            <Flame className="h-5 w-5 text-gold-500" aria-hidden="true" />
            {progress.streak}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{progress.streak === 1 ? 'day' : 'days'} in a row</p>
        </div>
        <div className="card card-pad">
          <p className="section-label">Quizzes</p>
          <p className="mt-2 text-2xl font-semibold text-navy-900">{progress.quizzes.length}</p>
          <p className="mt-0.5 text-xs text-slate-400">completed</p>
        </div>
        <div className="card card-pad">
          <p className="section-label">Accuracy</p>
          <p className="mt-2 text-2xl font-semibold text-navy-900">{accuracy}%</p>
          <ProgressBar value={accuracy} tone="emerald" size="sm" className="mt-3" />
        </div>
      </section>

      <Card>
        <CardHeader icon={Gamepad2} title="Choose a Course & Topic" subtitle="Select what you want to revise" />
        <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-4">
          {quizCourses.map((c) => {
            const active = courseSel === c.code
            const attempts = progress.quizzes.filter((q) => q.code === c.code).length
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCourseSel(c.code)
                  setTopicSel('all')
                }}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                  active ? 'border-navy-700 bg-navy-50/60 ring-1 ring-navy-700' : 'border-slate-200 hover:border-navy-300'
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white ${c.color}`}>
                  {c.code.slice(0, 2)}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-navy-900">{c.code}</span>
                  <span className="block truncate text-xs text-slate-500">{c.name}</span>
                  <span className="mt-1 block text-[11px] text-slate-400">
                    {c.topics.length} topics · {attempts} attempt{attempts === 1 ? '' : 's'}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {course ? (
          <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
            <p className="mb-2 text-xs font-semibold text-navy-800">Topics in {course.code}</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setTopicSel('all')}
                aria-pressed={topicSel === 'all'}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                  topicSel === 'all' ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-300'
                }`}
              >
                All topics ({questionsFor(course.code, null).length} questions)
              </button>
              {course.topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTopicSel(t.id)}
                  aria-pressed={topicSel === t.id}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                    topicSel === t.id ? 'border-navy-700 bg-navy-800 text-white' : 'border-slate-200 text-slate-500 hover:border-navy-300'
                  }`}
                >
                  {t.name} ({t.questions.length})
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={startQuiz}
              disabled={!availableQuestions.length}
              className="btn-primary mt-4"
            >
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              Start quiz · {availableQuestions.length} question{availableQuestions.length === 1 ? '' : 's'}
            </button>
          </div>
        ) : (
          <p className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-400">
            Select a course above to begin.
          </p>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader icon={Trophy} title="Achievements" subtitle={`${progress.achievements.length} of ${achievements.length} unlocked`} />
          <ul className="divide-y divide-slate-100">
            {achievements.map((a) => {
              const unlocked = progress.achievements.includes(a.id)
              const Icon = ACH_ICONS[a.icon] ?? Award
              return (
                <li key={a.id} className={`flex items-center gap-3 px-5 py-3 sm:px-6 ${unlocked ? '' : 'opacity-55'}`}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    unlocked ? 'bg-gold-100 text-gold-700' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-navy-900">{a.label}</span>
                    <span className="block text-xs text-slate-500">{a.description}</span>
                  </span>
                  {unlocked ? <Badge tone="gold">+{a.xp} XP</Badge> : <Badge tone="slate">Locked</Badge>}
                </li>
              )
            })}
          </ul>
        </Card>

        <Card>
          <CardHeader icon={Layers} title="Learning Progress" subtitle="Recent quiz results" />
          {progress.quizzes.length ? (
            <ul className="divide-y divide-slate-100">
              {[...progress.quizzes].reverse().slice(0, 6).map((q, i) => (
                <li key={`${q.date}-${i}`} className="flex items-center gap-3 px-5 py-3 sm:px-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-xs font-semibold text-navy-700">
                    {Math.round((q.score / q.total) * 100)}%
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-navy-900">{q.code}</span>
                    <span className="block text-xs text-slate-400">
                      {q.score}/{q.total} · {q.date} · +{q.xp} XP
                    </span>
                  </span>
                  <Badge tone={q.score === q.total ? 'gold' : 'navy'}>
                    {q.score === q.total ? 'Perfect' : 'Completed'}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-10 text-center text-sm text-slate-400">
              No quiz attempts yet — start one above to build your progress.
            </p>
          )}
          {newAchievements.length ? (
            <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400 sm:px-6">
              Next achievement: <span className="font-medium text-navy-700">{newAchievements[0].label}</span> — {newAchievements[0].description}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}