import { useEffect, useState } from 'react'

import type { ChecklistItem, ChecklistStatus } from '../data/checklist'

interface UpdateItemModalProps {
  open: boolean
  item: ChecklistItem | null
  onClose: () => void
  onSave: (item: ChecklistItem) => void
}

const statusOptions: ChecklistStatus[] = ['To do', 'Waiting', 'Done']

export function UpdateItemModal({ open, item, onClose, onSave }: UpdateItemModalProps) {
  const [draftStatus, setDraftStatus] = useState<ChecklistStatus>('To do')
  const [draftNotes, setDraftNotes] = useState('')

  useEffect(() => {
    if (item) {
      setDraftStatus(item.status)
      setDraftNotes(item.notes)
    }
  }, [item])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open || !item) {
    return null
  }

  const handleSave = () => {
    onSave({
      ...item,
      status: draftStatus,
      notes: draftNotes,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center sm:p-6" onClick={onClose} role="presentation">
      <div
        className="w-full max-w-2xl rounded-t-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-item-title"
      >
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Update item</p>
          <h3 id="update-item-title" className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {item.item}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.section} · Due {item.due} · Current status {item.status}
          </p>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                id="status"
                value={draftStatus}
                onChange={(event) => setDraftStatus(event.target.value as ChecklistStatus)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Due date</p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                {item.due}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              id="notes"
              rows={5}
              value={draftNotes}
              onChange={(event) => setDraftNotes(event.target.value)}
              placeholder="Add a quick note about what is happening next."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Upload</p>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-100"
            >
              Upload file
            </button>
            <p className="text-xs leading-5 text-slate-500">Placeholder only for now. The upload action will connect later.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
