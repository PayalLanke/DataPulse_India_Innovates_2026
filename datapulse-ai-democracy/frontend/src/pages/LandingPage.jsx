import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-primary-900 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">AI Booth Management</h1>
        <div className="hidden md:flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-slate-300">
          <span>Officer Dashboard</span>
          <span className="h-px w-8 bg-slate-600" />
          <span>Citizen Portal</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-16">
        <header className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
            Datapulse • AI for Democracy
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Welcome to AI Booth Management</h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl">
            Orchestrate polling booths, officers, and local issues in one simple control panel. Officers get a focused
            dashboard; citizens get a clean portal to explore schemes and updates.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Officer card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-200">
                Officer Login
              </p>
              <h3 className="text-xl font-semibold">Admin Dashboard</h3>
              <p className="text-sm text-slate-300">
                See booth-level performance, incidents, and turnout in one place. Designed for officers and
                administrators.
              </p>
              <ul className="mt-2 text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Booth &amp; officer overview</li>
                <li>Real-time ground updates</li>
              </ul>
            </div>
            <div className="mt-5">
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary-500 hover:bg-primary-600 text-sm font-semibold py-3 transition"
              >
                Login as Officer
              </Link>
            </div>
          </div>

          {/* Voter card */}
          <div className="rounded-2xl bg-white/3 border border-white/10 p-6 md:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-200">
                Voter Login
              </p>
              <h3 className="text-xl font-semibold">Citizen Portal</h3>
              <p className="text-sm text-slate-300">
                Citizens can explore schemes, benefits, and booth information in a simple, mobile-first interface.
              </p>
              <ul className="mt-2 text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>View schemes &amp; updates</li>
                <li>Check booth and contact info</li>
              </ul>
            </div>
            <div className="mt-5">
              <Link
                to="/citizen"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold py-3 border border-white/30 transition"
              >
                Go to Citizen Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-slate-500 text-xs">
        Built for India Innovates 2026 — Officer Dashboard &amp; Citizen Portal powered by AI Booth Management
      </footer>
    </div>
  )
}
