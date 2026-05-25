interface BadgeProps {
  label: string
  color: string
  bg: string
  className?: string
}

/** Small pill badge for status and priority labels */
export function Badge({ label, color, bg, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${color} ${bg} ${className}`}
    >
      {label}
    </span>
  )
}
