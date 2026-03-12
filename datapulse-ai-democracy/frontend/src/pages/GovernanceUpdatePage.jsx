import { useState } from 'react'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Send, MessageSquare, BarChart3, CheckCircle } from 'lucide-react'

const campaigns = [
  { name: 'PM-KISAN Awareness', sent: 1200, opened: 890, replied: 45, date: 'Mar 10, 2025' },
  { name: 'Skill India (Youth)', sent: 420, opened: 312, replied: 28, date: 'Mar 8, 2025' },
]

export default function GovernanceUpdatePage() {
  const [message, setMessage] = useState('')
  const [segment, setSegment] = useState('farmers')

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Governance Update System</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Send targeted scheme notifications via WhatsApp / SMS
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader title="Compose Campaign" subtitle="Targeted scheme notifications" />
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Segment</label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
              >
                <option value="farmers">Farmers (PM-KISAN)</option>
                <option value="youth">Youth 18-25 (Skill India)</option>
                <option value="seniors">Senior Citizens (Ayushman)</option>
                <option value="women">Women (Ladli Behna)</option>
              </select>
            </div>
            <Input
              label="Message"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-3">
              <Button className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="secondary" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                SMS
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Personalized Preview" subtitle="How voters will see it" />
          <CardContent>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
              <p className="text-sm text-slate-500 mb-2">Sample recipient: Rajesh Kumar (Farmer, B001)</p>
              <p className="text-slate-700 dark:text-slate-300">
                {message || 'Your message will appear here. PM-KISAN scheme: ₹6000/year income support for farmers. Register at...'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Campaign Performance" subtitle="Recent sends" />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 font-medium">Campaign</th>
                  <th className="text-left py-3 font-medium">Sent</th>
                  <th className="text-left py-3 font-medium">Opened</th>
                  <th className="text-left py-3 font-medium">Replied</th>
                  <th className="text-left py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="py-3">{c.name}</td>
                    <td className="py-3">{c.sent}</td>
                    <td className="py-3">{c.opened}</td>
                    <td className="py-3">{c.replied}</td>
                    <td className="py-3 text-slate-500">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
