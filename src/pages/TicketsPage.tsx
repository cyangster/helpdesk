import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { Toast } from '@/components/ui/Toast'
import { TicketTable } from '@/components/tickets/TicketTable'
import { PRIORITIES, STATUSES, STATUS_STYLES, PRIORITY_STYLES } from '@/lib/constants'
import { fetchTickets } from '@/services/tickets'
import type { Ticket, TicketPriority, TicketStatus } from '@/types/database'

type SortKey = 'title' | 'category' | 'priority' | 'status' | 'created_at'
type SortDir = 'asc' | 'desc'

/** Tickets list with search, filters, and sorting */
export function TicketsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [toast, setToast] = useState(
    (location.state as { message?: string } | null)?.message ?? ''
  )

  // Clear location state after showing toast
  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchTickets()
        setTickets(data)
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tickets')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredTickets = useMemo(() => {
    let result = [...tickets]

    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(term))
    }
    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter)
    }
    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter)
    }

    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [tickets, search, statusFilter, priorityFilter, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>
          <p className="mt-1 text-sm text-slate-500">All support requests</p>
        </div>
        <Link to="/tickets/new">
          <Button>New Ticket</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_STYLES[s].label}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Filter by priority"
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_STYLES[p].label}
            </option>
          ))}
        </select>
      </div>

      {loading && <Spinner message="Loading tickets..." />}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredTickets.length > 0 ? (
            <TicketTable
              tickets={filteredTickets}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
            />
          ) : (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No tickets match your filters.
            </p>
          )}
        </>
      )}
    </div>
  )
}
