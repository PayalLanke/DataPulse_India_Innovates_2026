import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { FileText, Send } from 'lucide-react'

const updates = [
  { title: 'PM-KISAN Scheme', body: 'You may be eligible for ₹6000/year. Check eligibility.', time: '2 hrs ago' },
  { title: 'Skill India - Free Courses', body: 'Youth 18-25: Register for skill development.', time: '1 day ago' },
]

const alerts = [
  { text: 'Ladli Behna: You are eligible', scheme: 'Ladli Behna Yojana' },
]

export default function CitizenMobilePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Governance Updates</h1>
        <p className="text-sm text-slate-500">Personalized for you</p>
      </div>

      <div className="p-4 space-y-4">
        {alerts.length > 0 && (
          <Card className="border-accent-200 bg-accent-50 dark:bg-accent-900/20">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-accent-800 dark:text-accent-200">Scheme Eligibility</p>
              {alerts.map((a, i) => (
                <p key={i} className="text-slate-700 dark:text-slate-300 mt-1">{a.text}</p>
              ))}
            </CardContent>
          </Card>
        )}

        <h2 className="font-semibold text-slate-900 dark:text-white">Updates</h2>
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

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Feedback</h3>
            <textarea
              placeholder="Share your feedback..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-sm min-h-[80px]"
            />
            <Button className="mt-3 w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 text-center">Local Announcements</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 text-center mt-1">Booth B001: Voter list verification on Mar 15</p>
      </div>
    </div>
  )
}
