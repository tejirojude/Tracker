import { useMemo } from 'react'

import type { ChecklistItem, ChecklistStatus, FilterValue } from '../data/checklist'

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

const statusDotClasses: Record<ChecklistStatus, string> = {
  'To do': 'bg-slate-500',
  Waiting: 'bg-amber-500',
  Done: 'bg-emerald-500',
}

const statusSummaryClasses: Record<ChecklistStatus, string> = {
  'To do': 'bg-slate-100 text-slate-700',
  Waiting: 'bg-amber-100 text-amber-800',
  Done: 'bg-emerald-100 text-emerald-700',
}

function formatFilterLabel(activeFilter: FilterValue, count: number) {
  if (activeFilter === 'All') {
    return `${count} item${count === 1 ? '' : 's'} available`
  }

  return `${count} ${activeFilter.toLowerCase()} item${count === 1 ? '' : 's'} visible`
}

export function ChecklistTable({ items, activeFilter, onResetFilter, onUpdateItem }: ChecklistTableProps) {
  const sectionGroups = useMemo(() => {
    const groupedSections = new Map<
      string,
      {
        section: string
        items: ChecklistItem[]
        counts: Record<ChecklistStatus, number>
      }
    >()

    for (const item of items) {
      const existingGroup = groupedSections.get(item.section)

      if (existingGroup) {
        existingGroup.items.push(item)
        existingGroup.counts[item.status] += 1
        continue
      }

      groupedSections.set(item.section, {
        section: item.section,
        items: [item],
        counts: {
          'To do': item.status === 'To do' ? 1 : 0,
          Waiting: item.status === 'Waiting' ? 1 : 0,
          Done: item.status === 'Done' ? 1 : 0,
        },
      })
    }

    return Array.from(groupedSections.values())
  }, [items])

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
        <div className="space-y-3 p-3 sm:p-4">
          {sectionGroups.map((group, index) => (
            <details
              key={group.section}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              open={index === 0}
            >
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer select-none p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{group.section}</h3>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {group.items.length} item{group.items.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-500">Expand this section to review the actions in a smaller, manageable block.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(['To do', 'Waiting', 'Done'] as ChecklistStatus[]).map((status) => (
                      <span key={status} className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusSummaryClasses[status]}`}>
                        <span className={`h-2 w-2 rounded-full ${statusDotClasses[status]}`} />
                        {group.counts[status]} {status}
                      </span>
                    ))}
                  </div>
                </div>
              </summary>

              <div className="border-t border-slate-100 px-4 pb-4 sm:px-5 sm:pb-5">
                <div className="space-y-3 sm:hidden">
                  {group.items.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{item.section}</p>
                          <h4 className="text-base font-semibold tracking-tight text-slate-900">{item.item}</h4>
                        </div>
                        <span className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}>{item.status}</span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.instruction}</p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-white px-3 py-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Due</p>
                          <p className="mt-1 font-semibold text-slate-800">{item.due}</p>
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Action</p>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(item)}
                            className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="hidden overflow-x-auto sm:block">
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
                      {group.items.map((item) => (
                        <tr key={item.id} className="align-top transition-colors hover:bg-slate-50/70">
                          <td className="px-4 py-4 text-sm font-medium text-slate-600 sm:px-5">{item.section}</td>
                          <td className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-5">{item.item}</td>
                          <td className="px-4 py-4 text-sm leading-6 text-slate-600 sm:px-5">{item.instruction}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 sm:px-5">{item.due}</td>
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
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
