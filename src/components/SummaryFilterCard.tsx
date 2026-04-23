interface SummaryFilterCardProps {
  label: string
  count: number
  description: string
  active: boolean
  onClick: () => void
}

export function SummaryFilterCard({ label, count, description, active, onClick }: SummaryFilterCardProps) {
  const cardClassName = active
    ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200/80'
    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:shadow-md'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-4 text-left shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${cardClassName}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-3xl font-semibold tracking-tight">{count}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
            active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          Filter
        </span>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-lg font-semibold tracking-tight">{label}</p>
        <p className={`text-sm leading-6 ${active ? 'text-slate-200' : 'text-slate-500'}`}>{description}</p>
      </div>
    </button>
  )
}
