import { useNavigate } from 'react-router-dom'
import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'
import { formatDate, formatTicketId } from '@/lib/format'
import type { Ticket } from '@/types/database'

type SortKey = keyof Pick<Ticket, 'title' | 'category' | 'priority' | 'status' | 'created_at'>
type SortDir = 'asc' | 'desc'

interface TicketTableProps {
  tickets: Ticket[]
  sortKey?: SortKey
  sortDir?: SortDir
  onSort?: (key: SortKey) => void
}

const columns: { key: SortKey; label: string }[] = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Date Created' },
]

/** Reusable ticket data table with optional sortable headers */
export function TicketTable({ tickets, sortKey, sortDir, onSort }: TicketTableProps) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ticket ID
            </th>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {onSort ? (
                  <button
                    type="button"
                    onClick={() => onSort(key)}
                    className="flex items-center gap-1 hover:text-slate-800"
                  >
                    {label}
                    {sortKey === key && (
                      <span className="text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => navigate(`/tickets/${ticket.id}`)}
              className="cursor-pointer transition-colors hover:bg-blue-50/50"
            >
              <td className="whitespace-nowrap px-4 py-3 font-mono text-sm font-medium text-blue-600">
                {formatTicketId(ticket.id)}
              </td>
              <td className="max-w-xs truncate px-4 py-3 text-sm font-medium text-slate-900">
                {ticket.title}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                {ticket.category}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                {formatDate(ticket.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
