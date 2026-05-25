import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigRequired } from '@/components/ConfigRequired'
import { AppLayout } from '@/components/layout/AppLayout'
import { isSupabaseConfigured } from '@/lib/supabase.js'
import { DashboardPage } from '@/pages/DashboardPage'
import { TicketsPage } from '@/pages/TicketsPage'
import { NewTicketPage } from '@/pages/NewTicketPage'
import { TicketDetailPage } from '@/pages/TicketDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * Application routes:
 * /              Dashboard
 * /tickets       Tickets list
 * /tickets/new   Create ticket
 * /tickets/:id   Ticket detail
 */
export default function App() {
  if (!isSupabaseConfigured) {
    return <ConfigRequired />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
