import type { ChecklistItem, FilterValue } from '../data/checklist'

interface ChecklistTableProps {
  items: ChecklistItem[]
  activeFilter: FilterValue
  onResetFilter: () => void
  onUpdateItem: (item: ChecklistItem) => void
}

const statusClasses: Record<ChecklistItem['status'], string> = {
  'To do': 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  Waiting: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
  Done: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
}

function formatFilterLabel(activeFilter: FilterValue, count: number) {
  if (activeFilter === 'All') {
    return `${count} item${count === 1 ? '' : 's'} available`
  }

  return `${count} ${activeFilter.toLowerCase()} item${count === 1 ? '' : 's'} visible`
}

export function ChecklistTable({ items, activeFilter, onResetFilter, onUpdateItem }: ChecklistTableProps) {
  const emptyMessage = activeFilter === 'All' ? 'There are no checklist items yet.' : `No ${activeFilter.toLowerCase()} items match this filter.`

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Checklist Table</p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Tasks and status</h2>
        </div>
        <button
          type="button"
          onClick={onResetFilter}
          className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
            activeFilter === 'All'
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
          }`}
        >
          All
        </button>
      </div>

      <div className="border-b border-slate-100 px-4 py-3 text-sm text-slate-600 sm:px-5">Current filter: {formatFilterLabel(activeFilter, items.length)}</div>

      {items.length === 0 ? (
        <div className="px-4 py-16 text-center sm:px-5">
          <p className="text-lg font-semibold text-slate-900">No rows to show</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{emptyMessage}</p>
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Show all rows
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full border-collapse text-left">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-4 py-3 sm:px-5">Section</th>
                <th className="px-4 py-3 sm:px-5">Item</th>
                <th className="px-4 py-3 sm:px-5">What you need to do</th>
                <th className="px-4 py-3 sm:px-5">Due</th>
                <th className="px-4 py-3 sm:px-5">Status</th>
                <th className="px-4 py-3 text-right sm:px-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {items.map((item) => (
                <tr key={item.id} className="align-top transition-colors hover:bg-slate-50/70">
                  <td className="px-4 py-4 text-sm font-medium text-slate-600 sm:px-5">{item.section}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5">{item.item}</td>
                  <td className="px-4 py-4 text-sm leading-6 text-slate-600 sm:px-5">{item.instruction}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap sm:px-5">{item.due}</td>
                  <td className="px-4 py-4 sm:px-5">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-4 text-right sm:px-5">
                    <button
                      type="button"
                      onClick={() => onUpdateItem(item)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
