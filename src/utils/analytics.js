import { calculateTotals } from './calculations.js'
export function weekStart(value) {
  const date = new Date(`${value}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7)
  return date.toISOString().slice(0, 10)
}
export function summarize(invoices) {
  return invoices.reduce((sum, invoice) => {
    const values = calculateTotals(invoice.items, invoice.taxRate)
    for (const key of ['subtotal', 'tax', 'total']) sum[key] = Math.round((sum[key] + values[key]) * 100) / 100
    sum.count++
    return sum
  }, { subtotal: 0, tax: 0, total: 0, count: 0 })
}
export function groupInvoices(invoices, period, year) {
  const groups = new Map()
  const add = key => { if (!groups.has(key)) groups.set(key, []) }
  if (period === 'month') for (let month = 1; month <= 12; month++) add(`${year}-${String(month).padStart(2, '0')}`)
  if (period === 'week') {
    let day = new Date(`${weekStart(`${year}-01-01`)}T12:00:00Z`)
    while (day.toISOString().slice(0, 10) <= `${year}-12-31`) {
      add(day.toISOString().slice(0, 10)); day.setUTCDate(day.getUTCDate() + 7)
    }
  }
  for (const invoice of invoices) {
    if (period !== 'year' && !invoice.date.startsWith(String(year))) continue
    const key = period === 'year' ? invoice.date.slice(0, 4) : period === 'month' ? invoice.date.slice(0, 7) : weekStart(invoice.date)
    add(key); groups.get(key).push(invoice)
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([key, rows]) => ({ key, ...summarize(rows) }))
}
export function periodLabel(key, period) {
  if (period === 'year') return key
  if (period === 'month') return new Intl.DateTimeFormat('es', { month: 'short', timeZone: 'UTC' }).format(new Date(`${key}-01T12:00:00Z`))
  return `Semana ${key.slice(8, 10)}/${key.slice(5, 7)}`
}
