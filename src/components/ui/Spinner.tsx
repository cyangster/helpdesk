/** Centered loading spinner */
export function Spinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  )
}
