/** First 8 characters of UUID for display as Ticket ID */
export function formatTicketId(id: string): string {
  return id.slice(0, 8).toUpperCase()
}

/** Short relative or absolute date */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Full date and time for detail views */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Capitalize first letter for dropdown labels */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
