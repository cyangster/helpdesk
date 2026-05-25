import { Headphones } from 'lucide-react'

/**
 * Shown when VITE_SUPABASE_* env vars were not set at build time (common Vercel misconfiguration).
 */
export function ConfigRequired() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="max-w-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">HelpDesk Pro</h1>
        </div>
        <p className="text-sm text-slate-600">
          Supabase environment variables are missing. Vite bakes these in at{' '}
          <strong>build time</strong>, so they must be set in Vercel before deploying.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>
            Vercel → your project → <strong>Settings → Environment Variables</strong>
          </li>
          <li>
            Add <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-slate-100 px-1">VITE_SUPABASE_ANON_KEY</code>
          </li>
          <li>Enable for Production, Preview, and Development</li>
          <li>
            <strong>Redeploy</strong> (Deployments → ⋯ → Redeploy) — a new build is required
          </li>
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          Values are in Supabase Dashboard → Project Settings → API. Use the anon public key only.
        </p>
      </div>
    </div>
  )
}
