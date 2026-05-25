import type { TicketPriority, TicketStatus } from '@/types/database'

/** Badge styles for priority levels */
export const PRIORITY_STYLES: Record<
  TicketPriority,
  { label: string; color: string; bg: string }
> = {
  critical: { label: 'Critical', color: 'text-red-800', bg: 'bg-red-100 ring-red-600/20' },
  high: { label: 'High', color: 'text-orange-800', bg: 'bg-orange-100 ring-orange-600/20' },
  medium: { label: 'Medium', color: 'text-yellow-800', bg: 'bg-yellow-100 ring-yellow-600/20' },
  low: { label: 'Low', color: 'text-green-800', bg: 'bg-green-100 ring-green-600/20' },
}

/** Badge styles for ticket statuses */
export const STATUS_STYLES: Record<
  TicketStatus,
  { label: string; color: string; bg: string }
> = {
  open: { label: 'Open', color: 'text-blue-800', bg: 'bg-blue-100 ring-blue-600/20' },
  'in-progress': {
    label: 'In Progress',
    color: 'text-purple-800',
    bg: 'bg-purple-100 ring-purple-600/20',
  },
  resolved: { label: 'Resolved', color: 'text-green-800', bg: 'bg-green-100 ring-green-600/20' },
  closed: { label: 'Closed', color: 'text-gray-700', bg: 'bg-gray-100 ring-gray-500/20' },
}

export const CATEGORIES = [
  'Hardware',
  'Software',
  'Network',
  'Account Access',
  'Other',
] as const

export const PRIORITIES = ['low', 'medium', 'high', 'critical'] as const
export const STATUSES = ['open', 'in-progress', 'resolved', 'closed'] as const
