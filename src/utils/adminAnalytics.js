import { calculateTotals } from './calculations.js'
import { invoiceStatus } from './invoiceStatus.js'
export function monthOffset(month, delta) {
  const [year, number] = month.split('-').map(Number)
  return new Date(Date.UTC(year, number - 1 + delta, 1)).toISOString().slice(0, 7)
}
export function analyzeInvoices(invoices, today) {
  const rows = invoices.map(invoice => ({ ...invoice, total: calculateTotals(invoice.items, invoice.taxRate).total, status: invoiceStatus(invoice, today) }))
  const total = rows.reduce((sum, row) => sum + row.total, 0)
  const average = rows.length ? total / rows.length : 0
  const deviation = rows.length ? Math.sqrt(rows.reduce((sum, row) => sum + (row.total - average) ** 2, 0) / rows.length) : 0
  const clients = new Map(), months = new Map()
  const states = { Pagada: 0, Pendiente: 0, Vencida: 0 }
  for (const row of rows) {
    row.atypical = deviation > 0 && Math.abs(row.total - average) > 1.5 * deviation
    states[row.status]++
    const key = `${row.customer.identificationType || ''}:${row.customer.identification?.replace(/[\s-]/g, '') || row.customer.name.trim().toLowerCase()}`
    const client = clients.get(key) || { key, name: row.customer.name, total: 0, count: 0 }
    client.total += row.total; client.count++; clients.set(key, client)
    const month = row.date.slice(0, 7)
    months.set(month, (months.get(month) || 0) + row.total)
  }
  const current = today.slice(0, 7)
  const history = [...months.keys()].filter(month => month < current).sort()
  const window = [3, 2, 1].map(n => monthOffset(current, -n)).filter(month => history.length && month >= history[0])
  const projection = window.length ? window.reduce((sum, month) => sum + (months.get(month) || 0), 0) / window.length : null
  const revenue = Array.from({ length: 12 }, (_, index) => monthOffset(current, index - 11)).map(month => ({ month, total: months.get(month) || 0 }))
  return { rows, total, average, deviation, count: rows.length, states, atypicalCount: rows.filter(row => row.atypical).length, ranking: [...clients.values()].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name)), revenue, projection, projectionMonths: window, nextMonth: monthOffset(current, 1) }
}
