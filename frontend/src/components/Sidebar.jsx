import { LayoutDashboard, History, Settings, Bell } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: History, label: 'History', active: false },
  { icon: Bell, label: 'Alerts', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export default function Sidebar() {
  return (
    <aside
      style={{
        background: 'var(--color-bg-secondary)',
        borderRight: '1px solid var(--color-border)',
        width: '220px',
      }}
      className="flex flex-col py-6 flex-shrink-0"
    >
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            style={{
              background: active ? 'var(--color-green-glow)' : 'transparent',
              color: active ? 'var(--color-green)' : 'var(--color-text-muted)',
              border: active ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full text-left cursor-pointer hover:bg-white/5"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Device info at bottom */}
      <div className="mt-auto mx-3 px-4 py-3 rounded-lg" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>Device</p>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>ESP8266 · MQ-2</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>gas/telemetry</p>
      </div>
    </aside>
  )
}
