create table if not exists public.checklist_items (
  id bigint primary key,
  section text not null,
  item text not null,
  instruction text not null,
  due text not null,
  status text not null check (status in ('To do', 'Waiting', 'Done')),
  notes text not null default '',
  sort_order integer not null
);

alter table public.checklist_items enable row level security;

create policy "anon can read checklist items"
  on public.checklist_items
  for select
  to anon, authenticated
  using (true);

create policy "anon can insert checklist items"
  on public.checklist_items
  for insert
  to anon, authenticated
  with check (true);

create policy "anon can update checklist items"
  on public.checklist_items
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "anon can delete checklist items"
  on public.checklist_items
  for delete
  to anon, authenticated
  using (true);

create index if not exists checklist_items_sort_order_idx
  on public.checklist_items (sort_order, id);
