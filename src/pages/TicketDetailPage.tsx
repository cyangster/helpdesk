import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Spinner } from '@/components/ui/Spinner'
import { PriorityBadge } from '@/components/tickets/PriorityBadge'
import { StatusBadge } from '@/components/tickets/StatusBadge'
import { PRIORITIES, STATUSES, PRIORITY_STYLES, STATUS_STYLES } from '@/lib/constants'
import { formatDateTime, formatTicketId } from '@/lib/format'
import {
  fetchTicketById,
  fetchTicketNotes,
  updateTicket,
  createTicketNote,
} from '@/services/tickets'
import type { Ticket, TicketNote, TicketPriority, TicketStatus } from '@/types/database'

/** Ticket detail with inline status/priority updates and notes */
export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [notes, setNotes] = useState<TicketNote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [noteError, setNoteError] = useState('')

  useEffect(() => {
    if (!id) return
    async function load() {
      try {
        const [ticketData, notesData] = await Promise.all([
          fetchTicketById(id!),
          fetchTicketNotes(id!),
        ])
        setTicket(ticketData)
        setNotes(notesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ticket not found')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleStatusChange(status: TicketStatus) {
    if (!ticket) return
    setUpdating(true)
    try {
      const updated = await updateTicket(ticket.id, { status })
      setTicket(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  async function handlePriorityChange(priority: TicketPriority) {
    if (!ticket) return
    setUpdating(true)
    try {
      const updated = await updateTicket(ticket.id, { priority })
      setTicket(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  async function handleSaveNote() {
    if (!ticket || !noteText.trim()) return
    setSavingNote(true)
    setNoteError('')
    try {
      const note = await createTicketNote(ticket.id, noteText.trim())
      setNotes((prev) => [...prev, note])
      setNoteText('')
    } catch (err) {
      setNoteError(err instanceof Error ? err.message : 'Failed to save note')
    } finally {
      setSavingNote(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Spinner message="Loading ticket..." />
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Ticket not found'}</p>
        <Link to="/tickets" className="mt-4 inline-block">
          <Button variant="secondary">Back to Tickets</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/tickets"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-semibold text-blue-600">
            {formatTicketId(ticket.id)}
          </span>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">{ticket.title}</h1>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {ticket.description || 'No description provided.'}
        </p>

        <dl className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <DetailItem label="Category" value={ticket.category} />
          <DetailItem label="Assigned To" value={ticket.assigned_to || 'Unassigned'} />
          <DetailItem label="Created" value={formatDateTime(ticket.created_at)} />
          <DetailItem label="Updated" value={formatDateTime(ticket.updated_at)} />
        </dl>

        {/* Inline status & priority updates */}
        <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <Select
            label="Status"
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
            disabled={updating}
            options={STATUSES.map((s) => ({
              value: s,
              label: STATUS_STYLES[s].label,
            }))}
          />
          <Select
            label="Priority"
            value={ticket.priority}
            onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
            disabled={updating}
            options={PRIORITIES.map((p) => ({
              value: p,
              label: PRIORITY_STYLES[p].label,
            }))}
          />
        </div>
      </div>

      {/* Notes section */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Notes</h2>

        <div className="mt-4 space-y-4">
          {notes.length === 0 ? (
            <p className="text-sm text-slate-500">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              >
                <p className="whitespace-pre-wrap text-sm text-slate-700">{note.note}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDateTime(note.created_at)}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <Textarea
            label="Add a note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write an update or comment..."
            rows={3}
          />
          {noteError && (
            <p className="mt-2 text-sm text-red-600">{noteError}</p>
          )}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleSaveNote}
              loading={savingNote}
              disabled={!noteText.trim()}
            >
              Save Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value}</dd>
    </div>
  )
}
