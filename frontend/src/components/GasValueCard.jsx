import { Wind, Clock } from 'lucide-react'

export default function GasValueCard({ gasValue, createdAt }) {
  const formatted = createdAt
    ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—'

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      className="rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Wind size={15} style={{ color: 'var(--color-green)' }} />
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Gas Concentration
        </p>
      </div>

      <div className="flex items-end gap-2">
        <span
          className="text-5xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {gasValue}
        </span>
        <span className="text-lg mb-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>
          ppm
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
        <div
          style={{
            width: `${Math.min((gasValue / 1000) * 100, 100)}%`,
            background: gasValue > 450
              ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
              : 'linear-gradient(90deg, #22c55e, #16a34a)',
            transition: 'width 0.6s ease',
          }}
          className="h-full rounded-full"
        />
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <Clock size={11} style={{ color: 'var(--color-text-muted)' }} />
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Last update: {formatted}
        </span>
      </div>
    </div>
  )
}
