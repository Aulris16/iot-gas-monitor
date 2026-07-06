import { ShieldCheck, ShieldAlert } from 'lucide-react'

export default function StatusCard({ status }) {
  const isSafe = status === 'SAFE'

  const color = isSafe ? 'var(--color-green)' : 'var(--color-red)'
  const glow = isSafe ? 'var(--color-green-glow)' : 'var(--color-red-glow)'
  const Icon = isSafe ? ShieldCheck : ShieldAlert

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: `1px solid ${color}`,
        boxShadow: `0 0 20px ${glow}`,
        transition: 'all 0.4s ease',
      }}
      className="rounded-xl p-5 flex items-center gap-4"
    >
      <div
        style={{ background: glow, border: `1px solid ${color}` }}
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
          Current Status
        </p>
        <p className="text-2xl font-bold tracking-tight" style={{ color }}>
          {status}
        </p>
      </div>
    </div>
  )
}
