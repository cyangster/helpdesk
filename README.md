# HelpDesk Pro

Full-stack IT helpdesk ticketing system for a personal portfolio. Enterprise-style UI with React, Tailwind CSS, and Supabase.

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router
- Supabase (PostgreSQL) via `@supabase/supabase-js`
- Deploy frontend on Vercel

## Getting Started

### Terminal commands

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and add your Supabase credentials
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux

# 3. Start dev server
npm run dev
```

### Environment variables

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Find these in **Supabase Dashboard → Project Settings → API**.

> Vite only exposes variables prefixed with `VITE_`. They are bundled at build time for the browser — use the **anon** key only (never the service role key).

### Database setup

1. Open **Supabase Dashboard → SQL Editor**
2. Run the full contents of `supabase/schema.sql`
3. This creates `tickets` and `ticket_notes` tables, RLS policies, and **10 sample tickets**

If you previously ran an older schema, drop old tables first or use a fresh Supabase project.

## Routes

| Route | Page |
|-------|------|
| `/` | Dashboard — stat cards + recent tickets |
| `/tickets` | Tickets list — search, filters, sorting |
| `/tickets/new` | Create ticket form |
| `/tickets/:id` | Ticket detail — update status/priority, notes |

## Project Structure

```
src/
  lib/
    supabase.js      # Supabase client (use this for all DB calls)
    constants.ts     # Badge colors, categories, statuses
    format.ts        # Date and ID formatters
  pages/             # Route pages
  components/        # UI, layout, tickets
  services/          # Supabase data functions
supabase/
  schema.sql         # Tables, RLS, sample data
```

## Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "HelpDesk Pro portfolio app"
git push origin main
```

### Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repository
4. Framework preset: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`

### Step 3 — Add environment variables

In the Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key |

Apply to **Production**, **Preview**, and **Development**. Redeploy after saving.

### Step 4 — Deploy

Click **Deploy**. Vercel will build and host your app. `vercel.json` handles SPA routing.

### Security note

The anon key is designed for client-side use. RLS policies in `schema.sql` currently allow public access for portfolio demo purposes. Tighten policies before any production use.

## Customize

- **Footer:** Edit `src/components/layout/Footer.tsx` — update your name and GitHub URL
- **Sample data:** Edit inserts in `supabase/schema.sql`

## License

MIT
