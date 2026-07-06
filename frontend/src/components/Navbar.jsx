import { Activity, Wifi } from 'lucide-react'

export default function Navbar() {
  return (
    <header
      style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
      }}
      className="h-16 flex items-center justify-between px-6 flex-shrink-0"
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div
          style={{ background: 'var(--color-green-glow)', border: '1px solid var(--color-green)' }}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
        >
          <Activity size={18} style={{ color: 'var(--color-green)' }} />
        </div>
        <div>
          <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            GasGuard
          </span>
          <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>
            IoT Monitor
          </span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: 'var(--color-green)' }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: 'var(--color-green)' }}
          />
        </span>
        <Wifi size={14} style={{ color: 'var(--color-text-muted)' }} />
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          broker.emqx.io
        </span>
      </div>
    </header>
  )
}
