import { getSupabase } from '@/lib/supabase.js'
import type { CreateTicketInput, Ticket, TicketNote } from '@/types/database'

/** Ensure Supabase is configured before any API call */
function requireSupabase() {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.'
    )
  }
  return supabase
}

/** Fetch all tickets, newest first */
export async function fetchTickets(): Promise<Ticket[]> {
  const { data, error } = await requireSupabase()
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Ticket[]
}

/** Fetch a single ticket by UUID */
export async function fetchTicketById(id: string): Promise<Ticket> {
  const { data, error } = await requireSupabase()
    .from('tickets')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data as Ticket
}

/** Insert a new ticket (status defaults to open in DB) */
export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  const { data, error } = await requireSupabase()
    .from('tickets')
    .insert({
      title: input.title,
      description: input.description,
      category: input.category,
      priority: input.priority,
      assigned_to: input.assigned_to || null,
      status: 'open',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Ticket
}

/** Update ticket status or priority (updated_at handled by DB trigger) */
export async function updateTicket(
  id: string,
  updates: Partial<Pick<Ticket, 'status' | 'priority'>>
): Promise<Ticket> {
  const { data, error } = await requireSupabase()
    .from('tickets')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Ticket
}

/** Dashboard stat counts */
export async function fetchTicketStats() {
  const tickets = await fetchTickets()
  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in-progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
  }
}

/** Fetch notes for a ticket, oldest first */
export async function fetchTicketNotes(ticketId: string): Promise<TicketNote[]> {
  const { data, error } = await requireSupabase()
    .from('ticket_notes')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []) as TicketNote[]
}

/** Add a note to a ticket */
export async function createTicketNote(ticketId: string, note: string): Promise<TicketNote> {
  const { data, error } = await requireSupabase()
    .from('ticket_notes')
    .insert({ ticket_id: ticketId, note })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as TicketNote
}
