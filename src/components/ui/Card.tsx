import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

/** White content card with subtle border and shadow */
export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${padding ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
