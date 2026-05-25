import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { Footer } from './Footer'

/** App shell: top nav, page content, footer */
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
