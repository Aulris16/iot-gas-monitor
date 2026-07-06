import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TrendingUp } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

export default function GasChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#0a0f1a',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        borderColor: '#1f2d40',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => `  ${ctx.parsed.y} ppm`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#475569',
          font: { size: 10, family: 'Inter' },
          maxTicksLimit: 8,
          maxRotation: 0,
        },
        grid: { color: '#1f2d40' },
      },
      y: {
        ticks: {
          color: '#475569',
          font: { size: 10, family: 'Inter' },
          callback: (v) => `${v}`,
        },
        grid: { color: '#1f2d40' },
        min: 0,
      },
    },
    animation: { duration: 500 },
  }

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      className="rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp size={15} style={{ color: 'var(--color-green)' }} />
        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Gas Level — Last 20 Readings
        </p>
      </div>
      <div style={{ height: '200px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
