import { Database } from 'lucide-react'

export default function HistoryTable({ records }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      className="rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Database size={15} style={{ color: 'var(--color-green)' }} />
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Recent History
        </p>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full"
          style={{ background: 'var(--color-green-glow)', color: 'var(--color-green)' }}
        >
          {records.length} records
        </span>
      </div>

      <div className="overflow-auto" style={{ maxHeight: '260px' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              {['#', 'Gas (ppm)', 'Status', 'Time'].map((h) => (
                <th
                  key={h}
                  className="pb-2 text-left text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, i) => {
              const isSafe = row.status === 'SAFE'
              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'background 0.15s',
                  }}
                  className="hover:bg-white/5"
                >
                  <td className="py-2.5 pr-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {i + 1}
                  </td>
                  <td className="py-2.5 pr-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {row.gas_value}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: isSafe ? 'var(--color-green-glow)' : 'var(--color-red-glow)',
                        color: isSafe ? 'var(--color-green)' : 'var(--color-red)',
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(row.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
