import { Bell, BellOff, Volume2, VolumeX, Zap, Loader2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

const actions = [
  { id: 'enable_alarm',  label: 'Enable Alarm',  icon: Bell,    command: 'ENABLE_ALARM',  variant: 'green' },
  { id: 'disable_alarm', label: 'Disable Alarm', icon: BellOff, command: 'DISABLE_ALARM', variant: 'gray'  },
  { id: 'test_buzzer',   label: 'Test Buzzer',   icon: Volume2, command: null,             variant: 'amber' },
  { id: 'mute_buzzer',   label: 'Mute Buzzer',   icon: VolumeX, command: null,             variant: 'gray'  },
]

const variantStyles = {
  green: {
    background: 'var(--color-green-glow)',
    border: '1px solid rgba(34,197,94,0.3)',
    color: 'var(--color-green)',
  },
  amber: {
    background: 'rgba(245,158,11,0.1)',
    border: '1px solid rgba(245,158,11,0.3)',
    color: '#f59e0b',
  },
  gray: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-secondary)',
  },
}

export default function ActionPanel() {
  const [loadingId, setLoadingId] = useState(null)    // id of the button currently loading
  const [notification, setNotification] = useState(null) // { type: 'success'|'error', message }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAction = async (id, label, command) => {
    // Buttons without a command (Test Buzzer, Mute Buzzer) are not yet wired
    if (!command) {
      console.log(`[Action] ${id} — not implemented yet`)
      return
    }

    setLoadingId(id)

    try {
      await axios.post(`${API_BASE}/command`, { command })
      showNotification('success', `${label} sent`)
    } catch (err) {
      const msg = err.response?.data?.error || 'Backend unreachable'
      showNotification('error', msg)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      className="rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap size={15} style={{ color: 'var(--color-green)' }} />
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Device Actions
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {actions.map(({ id, label, icon: Icon, command, variant }) => {
          const isLoading = loadingId === id
          const isDisabled = loadingId !== null // disable all buttons while any is loading

          return (
            <button
              key={id}
              id={id}
              onClick={() => handleAction(id, label, command)}
              disabled={isDisabled}
              style={{
                ...variantStyles[variant],
                transition: 'all 0.2s ease',
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium hover:brightness-125 active:scale-95"
            >
              {isLoading
                ? <Loader2 size={14} className="animate-spin" />
                : <Icon size={14} />
              }
              {isLoading ? 'Sending...' : label}
            </button>
          )
        })}
      </div>

      {/* Notification */}
      {notification && (
        <p
          className="text-xs mt-3"
          style={{
            color: notification.type === 'success'
              ? 'var(--color-green)'
              : 'var(--color-red)',
          }}
        >
          {notification.type === 'success' ? '✓' : '✗'} {notification.message}
        </p>
      )}
    </div>
  )
}
