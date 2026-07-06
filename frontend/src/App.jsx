import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div
      className="flex flex-col"
      style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}
    >
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  )
}
