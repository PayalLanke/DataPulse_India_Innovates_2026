import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Shield, User } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('login') // login | otp
  const [role, setRole] = useState('admin') // admin | booth
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setStep('otp')
  }

  const handleVerify = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 p-12 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Booth Management</h1>
          <p className="text-primary-200 mt-2">Knowledge Graph Platform</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Secure Access</h3>
              <p className="text-primary-200 text-sm mt-1">Role-based authentication with OTP verification</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-primary-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Booth Intelligence</h3>
              <p className="text-primary-200 text-sm mt-1">Dynamic voter segmentation and governance updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-primary-600">AI Booth Management</h1>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {step === 'login' ? 'Welcome back' : 'Verify OTP'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {step === 'login'
              ? 'Sign in to access the platform'
              : `Enter the 6-digit code sent to ${phone}`}
          </p>

          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Login as</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition ${
                      role === 'admin'
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('booth')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition ${
                      role === 'booth'
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    Booth Officer
                  </button>
                </div>
              </div>
              <Input
                label="Mobile Number"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" size="lg">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    value={otp[i - 1] || ''}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '')
                      setOtp((prev) => (prev.slice(0, i - 1) + v + prev.slice(i)).slice(0, 6))
                    }}
                  />
                ))}
              </div>
              <Button type="submit" className="w-full" size="lg">
                Verify & Sign In
              </Button>
              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full text-sm text-slate-500 hover:text-primary-600"
              >
                Change number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
