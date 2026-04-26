-- Run in Supabase SQL editor or via supabase db push
-- conversations: chat history for the widget
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'open' check (status in ('open', 'closed')),
  messages jsonb not null default '[]'::jsonb
);

-- leads: contact info after a chat
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  conversation_id uuid references public.conversations (id) on delete set null,
  name text not null,
  email text not null,
  company text,
  inquiry_summary text not null default ''
);

create index if not exists idx_conversations_created_at on public.conversations (created_at desc);
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_conversation_id on public.leads (conversation_id);

-- one lead per conversation (second submit is rejected at DB)
create unique index if not exists idx_leads_one_per_conversation
  on public.leads (conversation_id)
  where conversation_id is not null;

comment on table public.conversations is 'Widget chat history (JSON array of {role, content, at})';
comment on table public.leads is 'Leads collected when a conversation ends';
