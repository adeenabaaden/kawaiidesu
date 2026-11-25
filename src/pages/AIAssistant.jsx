import { useEffect, useRef, useState } from 'react'
import { Bot, CornerDownLeft, ExternalLink, Info, RotateCcw, Sparkles, User } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader.jsx'
import { Card } from '../components/ui/Card.jsx'
import { buildAssistantReply, makeMessage, starterConversation, suggestedQuestions } from '../data/assistantData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-label="Assistant is typing">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: `${d}ms`, animationDuration: '900ms' }}
        />
      ))}
    </div>
  )
}

function Sources({ sources, navigate }) {
  if (!sources?.length) return null
  return (
    <div className="mt-3 border-t border-slate-100 pt-2.5">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sources</p>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => navigate?.(s.route)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-navy-700 transition-colors hover:border-navy-300 hover:bg-white"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AIAssistant({ navigate }) {
  const [messages, setMessages] = useLocalStorage('um-one:assistant-history', starterConversation)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const send = (raw) => {
    const text = raw.trim()
    if (!text || typing) return
    const userMsg = makeMessage('user', text)
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    timerRef.current = setTimeout(() => {
      const reply = buildAssistantReply(text)
      setMessages((prev) => [...prev, makeMessage('assistant', reply.text, reply.sources)])
      setTyping(false)
    }, 650 + Math.random() * 500)
  }

  const resetChat = () => {
    clearTimeout(timerRef.current)
    setTyping(false)
    setMessages(starterConversation)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Sparkles}
        title="AI Assistant"
        description="Ask about lecture materials, deadlines, examinations, topic summaries, procedures or revision priorities."
        action={
          <button type="button" onClick={resetChat} className="btn-ghost">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New chat
          </button>
        }
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-xs text-gold-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-semibold">Prototype AI assistant.</span> Responses are simulated locally using keyword
          retrieval over your mock academic records — no external AI service is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <div
            ref={scrollRef}
            className="scrollbar-thin h-[28rem] space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
            role="log"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-navy-800 text-gold-300'
                  }`}
                >
                  {m.role === 'user' ? <User className="h-4 w-4" aria-hidden="true" /> : <Bot className="h-4 w-4" aria-hidden="true" />}
                </span>
                <div className={`max-w-[85%] sm:max-w-[75%] ${m.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block whitespace-pre-line rounded-xl px-4 py-3 text-left text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-navy-800 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.role === 'assistant' ? <Sources sources={m.sources} navigate={navigate} /> : null}
                </div>
              </div>
            ))}

            {typing ? (
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-gold-300">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <TypingIndicator />
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-end gap-2 border-t border-slate-100 px-4 py-4 sm:px-6"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              rows={1}
              placeholder="Ask about materials, deadlines, examinations…"
              aria-label="Message the assistant"
              className="max-h-32 min-h-[42px] flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100"
            />
            <button type="submit" disabled={!input.trim() || typing} className="btn-primary h-[42px]">
              <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
              Send
            </button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="card-pad">
            <h2 className="card-title">Suggested questions</h2>
            <p className="mt-1 text-xs text-slate-500">Tap to ask instantly.</p>
            <ul className="mt-3 space-y-2">
              {suggestedQuestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => send(s)}
                    disabled={typing}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs text-slate-600 transition-colors hover:border-navy-300 hover:bg-navy-50/50 disabled:opacity-50"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="card-pad">
            <h2 className="card-title">Capabilities</h2>
            <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
              {[
                'Find lecture materials by course, chapter or topic',
                'Identify upcoming assignment deadlines',
                'Retrieve examination schedules',
                'Summarise sample lecture content',
                'Explain university administrative procedures',
                'Recommend revision topics',
              ].map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="card-pad">
            <p className="text-xs leading-relaxed text-slate-500">
              Chat history is saved on this device. Use <span className="font-medium text-navy-700">New chat</span> to
              restore the introduction message.
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              {messages.length > 1
                ? `${messages.filter((m) => m.role === 'user').length} question${messages.filter((m) => m.role === 'user').length === 1 ? '' : 's'} in this session`
                : 'No questions asked yet'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}