import { useEffect, useState } from 'react'
import { Ticket, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'
import { Spinner } from '@/components/ui/Spinner'
import { TicketTable } from '@/components/tickets/TicketTable'
import { fetchTicketStats, fetchTickets } from '@/services/tickets'
import type { Ticket as TicketType } from '@/types/database'

/** Dashboard with stat cards and recent tickets table */
export function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 })
  const [recentTickets, setRecentTickets] = useState<TicketType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [statsData, tickets] = await Promise.all([fetchTicketStats(), fetchTickets()])
        setStats(statsData)
        setRecentTickets(tickets.slice(0, 8))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Tickets', value: stats.total, icon: Ticket, iconBg: 'bg-blue-100 text-blue-600' },
    { label: 'Open Tickets', value: stats.open, icon: AlertCircle, iconBg: 'bg-blue-100 text-blue-600' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, iconBg: 'bg-purple-100 text-purple-600' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, iconBg: 'bg-green-100 text-green-600' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">IT service desk overview</p>
      </div>

      {loading && <Spinner message="Loading dashboard..." />}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map(({ label, value, icon: Icon, iconBg }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className={`rounded-lg p-3 ${iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Tickets</h2>
            {recentTickets.length > 0 ? (
              <TicketTable tickets={recentTickets} />
            ) : (
              <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                No tickets yet. Run the sample SQL in supabase/schema.sql or create a ticket.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
