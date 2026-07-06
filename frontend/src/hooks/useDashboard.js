import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'
const POLL_INTERVAL_MS = 2000

/**
 * Fetches /api/latest and /api/history every 2 seconds.
 * Returns { latest, history, connected } — all components read from here.
 */
export function useDashboard() {
  const [latest, setLatest] = useState(null)
  const [history, setHistory] = useState([])
  const [connected, setConnected] = useState(true)
  const intervalRef = useRef(null)

  const fetchData = async () => {
    try {
      const [latestRes, historyRes] = await Promise.all([
        axios.get(`${API_BASE}/latest`),
        axios.get(`${API_BASE}/history`),
      ])
      setLatest(latestRes.data)
      setHistory(historyRes.data)
      setConnected(true)
    } catch (err) {
      // Backend unavailable or /api/latest returned 404 (no data yet)
      if (err.response && err.response.status === 404) {
        // Backend is up but no data yet — stay connected, clear latest
        setLatest(null)
        setConnected(true)
      } else {
        setConnected(false)
      }
    }
  }

  useEffect(() => {
    fetchData() // fetch immediately on mount
    intervalRef.current = setInterval(fetchData, POLL_INTERVAL_MS)
    return () => clearInterval(intervalRef.current)
  }, [])

  return { latest, history, connected }
}
