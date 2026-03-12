import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { MessageSquare, Eye, ThumbsUp, Tag } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const openRates = [
  { segment: 'Farmers', rate: 74 }, { segment: 'Youth', rate: 82 },
  { segment: 'Seniors', rate: 68 }, { segment: 'Women', rate: 79 },
]

const feedback = [
  { msg: 'PM-KISAN registration was smooth', rating: 5, date: 'Mar 11' },
  { msg: 'Need more info on Skill India', rating: 3, date: 'Mar 10' },
]

const issues = [
  { tag: 'Road repair', count: 12, booth: 'B001' },
  { tag: 'Water supply', count: 8, booth: 'B003' },
]

export default function CitizenEngagementPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Citizen Engagement Panel</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Message open rates, feedback, and local issue tagging
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Eye className="w-10 h-10 text-primary-600" />
            <div>
              <p className="text-sm text-slate-500">Avg Open Rate</p>
              <p className="text-2xl font-bold">76%</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <ThumbsUp className="w-10 h-10 text-secondary-600" />
            <div>
              <p className="text-sm text-slate-500">Feedback Received</p>
              <p className="text-2xl font-bold">128</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Tag className="w-10 h-10 text-accent-500" />
            <div>
              <p className="text-sm text-slate-500">Local Issues</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader title="Open Rates by Segment" />
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={openRates}>
                  <XAxis dataKey="segment" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Recent Feedback" />
          <CardContent>
            <div className="space-y-3">
              {feedback.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{f.msg}</p>
                  <p className="text-xs text-slate-500 mt-1">★ {f.rating}/5 · {f.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Local Issue Tags" subtitle="Citizen-reported issues by booth" />
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {issues.map((i) => (
              <span
                key={i.tag}
                className="px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200 text-sm"
              >
                {i.tag} ({i.count}) — {i.booth}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
