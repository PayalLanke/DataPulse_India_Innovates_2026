import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { FileText, Send, CheckCircle2 } from 'lucide-react'

const updates = [
  { title: 'PM-KISAN Scheme', body: 'You may be eligible for ₹6000/year. Check eligibility.', time: '2 hrs ago' },
  { title: 'Skill India - Free Courses', body: 'Youth 18-25: Register for skill development.', time: '1 day ago' },
]

const alerts = [
  { text: 'Ladli Behna: You are eligible', scheme: 'Ladli Behna Yojana' },
]

export default function CitizenMobilePage() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return
    setFeedback('')
    setFeedbackSent(true)
    setTimeout(() => setFeedbackSent(false), 2500)
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Citizen Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Overview of your booth, eligible schemes, and latest governance updates.
            </p>
          </div>
          <div className="shrink-0">
            <Button
              variant="outline"
              onClick={() => navigate('/login', { replace: true })}
              className="whitespace-nowrap"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-[0.18em]">Your Booth</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Booth B001 • Ward 12</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Local officer: Ananya Singh</p>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      <p>Turnout status</p>
                      <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.18em] mb-3">Quick actions</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => scrollToId('governance-updates')}
                      className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
                    >
                      View updates
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToId('feedback')}
                      className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                      Send feedback
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">
              <p className="text-[11px] text-slate-500">Eligible schemes</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">3</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">
              <p className="text-[11px] text-slate-500">New updates</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{updates.length}</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">
              <p className="text-[11px] text-slate-500">Feedback sent</p>
              <p className="mt-1 text-sm font-semibold text-emerald-600">{feedbackSent ? 'Yes' : '—'}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {alerts.length > 0 && (
              <Card className="border-accent-200 bg-accent-50 dark:bg-accent-900/20">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-accent-800 dark:text-accent-200">Scheme Eligibility</p>
                  {alerts.map((a, i) => (
                    <p key={i} className="text-slate-700 dark:text-slate-300 mt-1">
                      {a.text}
                    </p>
                  ))}
                </CardContent>
              </Card>
            )}

            <div id="governance-updates">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-2">Governance Updates</h2>
              <div className="space-y-3">
                {updates.map((u, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-8 h-8 text-primary-600 shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{u.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{u.body}</p>
                          <p className="text-xs text-slate-500 mt-2">{u.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card id="feedback">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Feedback</h3>
                <textarea
                  placeholder="Share your feedback..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-sm min-h-[80px]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <Button className="mt-3 w-full" onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
                  {feedbackSent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
                {feedbackSent && (
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Thank you. Your feedback has been recorded.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-slate-500 uppercase tracking-[0.18em] mb-2">Local Announcements</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Booth B001: Voter list verification on <span className="font-semibold">Mar 15</span>. Carry valid ID
                  and booth slip.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
