-- HelpDesk Pro — Run in Supabase Dashboard → SQL Editor

-- ---------------------------------------------------------------------------
-- tickets table
-- ---------------------------------------------------------------------------
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null check (category in (
    'Hardware', 'Software', 'Network', 'Account Access', 'Other'
  )),
  priority text not null default 'medium' check (priority in (
    'low', 'medium', 'high', 'critical'
  )),
  status text not null default 'open' check (status in (
    'open', 'in-progress', 'resolved', 'closed'
  )),
  assigned_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- ticket_notes table
-- ---------------------------------------------------------------------------
create table public.ticket_notes (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets (id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on ticket changes
create or replace function public.set_ticket_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tickets_updated_at
  before update on public.tickets
  for each row execute function public.set_ticket_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — public access for portfolio demo
-- ---------------------------------------------------------------------------
alter table public.tickets enable row level security;
alter table public.ticket_notes enable row level security;

create policy "Public read tickets"
  on public.tickets for select
  using (true);

create policy "Public insert tickets"
  on public.tickets for insert
  with check (true);

create policy "Public update tickets"
  on public.tickets for update
  using (true);

create policy "Public delete tickets"
  on public.tickets for delete
  using (true);

create policy "Public read ticket_notes"
  on public.ticket_notes for select
  using (true);

create policy "Public insert ticket_notes"
  on public.ticket_notes for insert
  with check (true);

create policy "Public update ticket_notes"
  on public.ticket_notes for update
  using (true);

create policy "Public delete ticket_notes"
  on public.ticket_notes for delete
  using (true);

-- ---------------------------------------------------------------------------
-- Sample data — 10 realistic tickets
-- ---------------------------------------------------------------------------
insert into public.tickets (title, description, category, priority, status, assigned_to) values
  (
    'Laptop will not connect to office Wi-Fi',
    'Dell Latitude 5540 drops connection every 10–15 minutes on CORP-WIFI. Already rebooted and forgot/rejoined network.',
    'Network',
    'high',
    'open',
    'Alex Rivera'
  ),
  (
    'Request Adobe Creative Cloud license',
    'Marketing team member needs Acrobat Pro and Photoshop for Q2 campaign assets.',
    'Software',
    'medium',
    'in-progress',
    'Jamie Chen'
  ),
  (
    'Replace broken monitor — Desk 4B',
    '24" display has vertical lines and flickers. User cannot work effectively.',
    'Hardware',
    'high',
    'in-progress',
    'Alex Rivera'
  ),
  (
    'VPN disconnects when switching networks',
    'Remote employee loses VPN when moving from home Wi-Fi to hotspot. GlobalProtect v6.2.',
    'Network',
    'critical',
    'open',
    'Sam Patel'
  ),
  (
    'New hire account setup — starts Monday',
    'Create AD account, M365 license, Slack, and building badge for Jordan Lee (Engineering).',
    'Account Access',
    'high',
    'open',
    'Jamie Chen'
  ),
  (
    'Outlook not syncing shared mailbox',
    'Finance shared mailbox stops updating; send/receive shows error 0x8004010F.',
    'Software',
    'medium',
    'resolved',
    'Alex Rivera'
  ),
  (
    'Keyboard keys sticking after spill',
    'Small coffee spill on mechanical keyboard. Several keys register twice.',
    'Hardware',
    'low',
    'resolved',
    'Sam Patel'
  ),
  (
    'Printer offline in Building C',
    'HP LaserJet on floor 3 shows offline for all users since yesterday 2pm.',
    'Hardware',
    'medium',
    'closed',
    'Alex Rivera'
  ),
  (
    'Password reset — locked out of SAP',
    'User exceeded login attempts. Needs SAP password reset and MFA re-enrollment.',
    'Account Access',
    'critical',
    'in-progress',
    'Jamie Chen'
  ),
  (
    'Install Python 3.12 for data team',
    'Standard image missing Python 3.12 and pip packages listed in attached request form.',
    'Software',
    'low',
    'open',
    null
  );

-- Sample notes for a few tickets (uses first ticket id dynamically)
insert into public.ticket_notes (ticket_id, note)
select id, 'Escalated to network team — checking AP logs for floor 2.'
from public.tickets
where title = 'Laptop will not connect to office Wi-Fi'
limit 1;

insert into public.ticket_notes (ticket_id, note)
select id, 'License request submitted to procurement; awaiting approval.'
from public.tickets
where title = 'Request Adobe Creative Cloud license'
limit 1;
