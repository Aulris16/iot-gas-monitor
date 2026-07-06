import { useDashboard } from '../hooks/useDashboard'
import StatusCard from '../components/StatusCard'
import GasValueCard from '../components/GasValueCard'
import GasChart from '../components/GasChart'
import HistoryTable from '../components/HistoryTable'
import ActionPanel from '../components/ActionPanel'
import { WifiOff } from 'lucide-react'

// Build chart data from the history array (oldest → newest for left-to-right)
function toChartData(history) {
  const ordered = [...history].reverse()
  return {
    labels: ordered.map((r) =>
      new Date(r.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    ),
    values: ordered.map((r) => r.gas_value),
  }
}

export default function Dashboard() {
  const { latest, history, connected } = useDashboard()

  const chartData = toChartData(history)

  return (
    <main className="flex-1 overflow-auto p-6" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Page title + connection banner */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Dashboard
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Real-time gas leak monitoring — ESP8266 · MQ-2
            </p>
          </div>

          {/* Disconnected badge */}
          {!connected && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{
                background: 'var(--color-red-glow)',
                border: '1px solid var(--color-red)',
                color: 'var(--color-red)',
              }}
            >
              <WifiOff size={14} />
              Disconnected
            </div>
          )}
        </div>
      </div>

      {/* Top row: Status + Gas Value + Action Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatusCard status={connected && latest ? latest.status : 'SAFE'} disconnected={!connected || !latest} />
        <GasValueCard
          gasValue={latest ? latest.gas_value : '—'}
          createdAt={latest ? latest.created_at : null}
        />
        <ActionPanel />
      </div>

      {/* Middle row: Chart */}
      <div className="mb-4">
        <GasChart labels={chartData.labels} values={chartData.values} />
      </div>

      {/* Bottom row: History table */}
      <HistoryTable records={history} />
    </main>
  )
}
