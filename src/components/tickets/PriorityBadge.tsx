import { PRIORITY_STYLES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import type { TicketPriority } from '@/types/database'

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const style = PRIORITY_STYLES[priority]
  return <Badge label={style.label} color={style.color} bg={style.bg} />
}
