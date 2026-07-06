// Mock data — replace with API calls in the next module

export const mockLatest = {
  gas_value: 320,
  status: 'SAFE',
  created_at: new Date().toISOString(),
}

export const mockHistory = Array.from({ length: 20 }, (_, i) => {
  const date = new Date(Date.now() - i * 30000) // every 30 seconds back
  const gas_value = Math.floor(Math.random() * 200) + 200
  return {
    gas_value,
    status: gas_value > 450 ? 'DANGER' : 'SAFE',
    created_at: date.toISOString(),
  }
})

export const mockChartData = {
  labels: mockHistory
    .slice()
    .reverse()
    .map((r) =>
      new Date(r.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    ),
  values: mockHistory
    .slice()
    .reverse()
    .map((r) => r.gas_value),
}
