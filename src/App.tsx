import { useEffect, useMemo, useState } from 'react'

import { ChecklistTable } from './components/ChecklistTable'
import { SummaryFilterCard } from './components/SummaryFilterCard'
import { UpdateItemModal } from './components/UpdateItemModal'
import { checklistItems, type ChecklistItem, type ChecklistStatus, type FilterValue } from './data/checklist'
import { isSupabaseConfigured } from './lib/supabaseClient'
import { loadChecklistItems, saveChecklistItem } from './services/checklistService'

const filterDescriptions: Record<ChecklistStatus, string> = {
  'To do': 'Tasks you can work on now.',
  Waiting: 'Items waiting on someone or something else.',
  Done: 'Completed items already signed off.',
}

function App() {
  const [items, setItems] = useState(checklistItems)
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All')
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [syncMessage, setSyncMessage] = useState(
    isSupabaseConfigured ? 'Connecting to Supabase...' : 'Using local mock data.',
  )

  useEffect(() => {
    let isMounted = true

    void (async () => {
      const result = await loadChecklistItems()

      if (!isMounted) {
        return
      }

      setItems(result.items)
      setSyncMessage(result.message)
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const counts = useMemo(
    () =>
      items.reduce(
        (accumulator, item) => {
          accumulator[item.status] += 1
          return accumulator
        },
        { 'To do': 0, Waiting: 0, Done: 0 } satisfies Record<ChecklistStatus, number>,
      ),
    [items],
  )

  const visibleItems = useMemo(
    () => (activeFilter === 'All' ? items : items.filter((item) => item.status === activeFilter)),
    [activeFilter, items],
  )

  const selectedItem = items.find((item) => item.id === selectedItemId) ?? null

  const handleSaveItem = async (updatedItem: ChecklistItem) => {
    setItems((currentItems) => currentItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    const result = await saveChecklistItem(updatedItem)
    setSyncMessage(result.message)
    setSelectedItemId(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="space-y-3 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <img
              src="/priority-support-solutions-logo.svg"
              alt="Priority Support Solutions"
              className="h-24 w-24 shrink-0 self-start rounded-2xl border border-slate-100 bg-white object-contain p-2 shadow-sm sm:h-28 sm:w-28"
            />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">CQC registration tracker</p>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">CQC Registration Tracker</h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  A grouped overview of the consultant checklist for CQC domiciliary care registration.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {syncMessage}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          <SummaryFilterCard
            label="To do"
            count={counts['To do']}
            description={filterDescriptions['To do']}
            active={activeFilter === 'To do'}
            onClick={() => setActiveFilter('To do')}
          />
          <SummaryFilterCard
            label="Waiting"
            count={counts.Waiting}
            description={filterDescriptions.Waiting}
            active={activeFilter === 'Waiting'}
            onClick={() => setActiveFilter('Waiting')}
          />
          <SummaryFilterCard
            label="Done"
            count={counts.Done}
            description={filterDescriptions.Done}
            active={activeFilter === 'Done'}
            onClick={() => setActiveFilter('Done')}
          />
        </section>

        <ChecklistTable
          items={visibleItems}
          activeFilter={activeFilter}
          onResetFilter={() => setActiveFilter('All')}
          onUpdateItem={(item) => setSelectedItemId(item.id)}
        />
      </main>

      <UpdateItemModal
        open={selectedItem !== null}
        item={selectedItem}
        onClose={() => setSelectedItemId(null)}
        onSave={handleSaveItem}
      />
    </div>
  )
}

export default App
