/** Ticket row from Supabase tickets table */
export interface Ticket {
  id: string
  title: string
  description: string | null
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export type TicketCategory =
  | 'Hardware'
  | 'Software'
  | 'Network'
  | 'Account Access'
  | 'Other'

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed'

/** Note row from Supabase ticket_notes table */
export interface TicketNote {
  id: string
  ticket_id: string
  note: string
  created_at: string
}

export interface CreateTicketInput {
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  assigned_to?: string
}
