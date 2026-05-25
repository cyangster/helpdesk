import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { CATEGORIES, PRIORITIES, PRIORITY_STYLES } from '@/lib/constants'
import { createTicket } from '@/services/tickets'
import { isSupabaseConfigured } from '@/lib/supabase.js'
import type { TicketCategory, TicketPriority } from '@/types/database'

/** Create ticket form with validation */
export function NewTicketPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<TicketCategory>('Hardware')
  const [priority, setPriority] = useState<TicketPriority>('medium')
  const [assignedTo, setAssignedTo] = useState('')
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors: { title?: string; description?: string } = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')
    try {
      await createTicket({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        assigned_to: assignedTo.trim() || undefined,
      })
      navigate('/tickets', { state: { message: 'Ticket created successfully!' } })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create ticket')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Create Ticket</h1>
        <p className="mt-1 text-sm text-slate-500">Submit a new IT support request</p>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of the issue"
          error={errors.title}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the problem..."
          rows={5}
          error={errors.description}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TicketCategory)}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            options={PRIORITIES.map((p) => ({
              value: p,
              label: PRIORITY_STYLES[p].label,
            }))}
          />
        </div>
        <Input
          label="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Optional — agent name"
        />

        {submitError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Link to="/tickets">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit" loading={submitting} disabled={!isSupabaseConfigured}>
            Submit Ticket
          </Button>
        </div>
      </form>
    </div>
  )
}
