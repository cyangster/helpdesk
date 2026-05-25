import { NavLink, Link } from 'react-router-dom'
import { Headphones } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tickets', label: 'Tickets' },
]

/** Top navigation bar with app branding and main links */
export function TopNav() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">HelpDesk Pro</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
