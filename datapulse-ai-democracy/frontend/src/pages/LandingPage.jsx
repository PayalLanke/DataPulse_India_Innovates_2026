import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">AI Booth Management</h1>
        <div className="flex flex-wrap gap-3">
          <Link to="/login" className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition">
            Login
          </Link>
          <Link to="/citizen" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Citizen View
          </Link>
          <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-secondary-500 hover:bg-secondary-600 transition">
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          AI-Driven Booth Management using Knowledge Graph
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          Transform static voter lists into a dynamic Knowledge Graph. Enable booth-level intelligence,
          voter segmentation, and personalized governance updates.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-lg font-semibold transition"
          >
            Login as Admin / BLO
          </Link>
          <Link
            to="/citizen"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-lg font-semibold border border-white/30 transition"
          >
            Citizen Portal
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <h3 className="text-2xl font-bold mb-8 text-center">Platform Overview</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Booth Intelligence', desc: 'Demographic segmentation, AI insights, engagement heatmaps.', icon: '📊' },
            { title: 'Knowledge Graph', desc: 'Interactive graph of voters, booths, schemes. Explore connections.', icon: '🕸️' },
            { title: 'Governance Updates', desc: 'Targeted scheme notifications via WhatsApp / SMS.', icon: '📱' },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary-500/50 transition"
            >
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-slate-400 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm">
        AI Booth Management — Knowledge Graph Platform | Government-grade Analytics
      </footer>
    </div>
  )
}
