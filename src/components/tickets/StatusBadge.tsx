import { STATUS_STYLES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import type { TicketStatus } from '@/types/database'

export function StatusBadge({ status }: { status: TicketStatus }) {
  const style = STATUS_STYLES[status]
  return <Badge label={style.label} color={style.color} bg={style.bg} />
}
