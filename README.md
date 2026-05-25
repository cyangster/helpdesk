# HelpDesk Pro

A full-stack IT service desk application built for portfolio demonstration. Submit, track, and resolve support tickets through an enterprise-style interface inspired by tools like Zendesk and TeamDynamix.

**[Live Demo](https://helpdesk.vercel.app)** · **[Source Code](https://github.com/cyangster/helpdesk)**

> Replace the Live Demo URL above with your Vercel production domain if it differs (Vercel Dashboard → Project → Domains).

---

## Overview

HelpDesk Pro is a modern ticketing system that connects a React frontend to a Supabase PostgreSQL backend. It demonstrates real-world patterns: RESTful data access, client-side filtering, optimistic UI updates, and a responsive layout suitable for IT operations teams.

### Highlights

- **Dashboard** — Real-time ticket metrics and a recent-activity table
- **Ticket management** — Search, filter by status/priority, and sortable list views
- **Ticket lifecycle** — Create requests, update status/priority inline, and attach notes
- **Enterprise UI** — Neutral blue/gray palette, status badges, and accessible forms
- **Cloud-ready** — Environment-based config, Vercel deployment, and SPA routing

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Backend | Supabase (PostgreSQL, REST API) |
| Client SDK | `@supabase/supabase-js` |
| Icons | Lucide React |
| Hosting | Vercel |

---

## Features

| Feature | Description |
|---------|-------------|
| Dashboard analytics | Total, open, in-progress, and resolved ticket counts |
| Ticket list | Full-text search by title, status/priority filters, column sorting |
| Create ticket | Validated form with category, priority, and optional assignee |
| Ticket detail | View all fields; update status and priority; threaded notes |
| Sample data | 10 pre-seeded tickets for immediate demo use |
| Error handling | Loading states and user-facing error messages on all data views |

---

## Screenshots

_Add screenshots of your dashboard, ticket list, and detail page here after deploy._

```text
public/screenshots/dashboard.png
public/screenshots/tickets.png
public/screenshots/detail.png
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Supabase](https://supabase.com/) project (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/cyangster/helpdesk.git
cd helpdesk
npm install
```

### 2. Configure environment variables

```bash
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
```

Edit `.env` with your Supabase credentials (**Project Settings → API**):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Use the **anon public** key only. Never commit `.env` or expose the `service_role` key in frontend code.

### 3. Set up the database

1. Open your Supabase project → **SQL Editor** → **New query**
2. Paste and run the full contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. Confirm **Table Editor** shows `tickets` (~10 rows) and `ticket_notes`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---

## Application Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard with stat cards and recent tickets |
| `/tickets` | Searchable, filterable ticket list |
| `/tickets/new` | Create a new support ticket |
| `/tickets/:id` | Ticket detail, updates, and notes |

---

## Project Structure

```text
helpdesk/
├── public/                 # Static assets (favicon, screenshots)
├── src/
│   ├── components/         # UI, layout, ticket components
│   ├── lib/
│   │   └── supabase.js     # Supabase client initialization
│   ├── pages/              # Route-level views
│   ├── services/           # Supabase data access layer
│   └── types/              # TypeScript interfaces
├── supabase/
│   └── schema.sql          # Tables, RLS, triggers, seed data
├── .env.example            # Environment variable template
└── vercel.json             # SPA rewrite rules for Vercel
```

---

## Deployment (Vercel)

This project is configured for [Vercel](https://vercel.com/) with the Vite preset.

1. Import the [GitHub repository](https://github.com/cyangster/helpdesk) on Vercel
2. **Settings → Environment Variables** — add:

   | Variable | Value |
   |----------|--------|
   | `VITE_SUPABASE_URL` | Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | Supabase anon public key |

3. Apply variables to **Production**, **Preview**, and **Development**
4. Deploy (build: `npm run build`, output: `dist`)

`vercel.json` ensures client-side routes resolve correctly.

After deploy, add your production URL to this README and your GitHub repo **About → Website**.

---

## Database Schema

**`tickets`** — Core support requests (title, description, category, priority, status, assignee, timestamps)

**`ticket_notes`** — Comments linked to tickets via foreign key

Row Level Security is enabled with permissive policies suitable for a portfolio demo. Tighten policies before any production deployment with authentication.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Author

**Chris** — [github.com/cyangster](https://github.com/cyangster) · [helpdesk](https://github.com/cyangster/helpdesk)

---

## License

This project is open source under the [MIT License](./LICENSE).
