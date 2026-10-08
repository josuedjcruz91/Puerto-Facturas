export function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value
}
export function addDays(value, days) {
  if (!validDate(value)) return ''
  const date = new Date(`${value}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}
export const dueDate = invoice => invoice.dueDate || addDays(invoice.date, 30)
export function businessToday() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Costa_Rica', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type).value).join('-')
}
export function invoiceStatus(invoice, today = businessToday()) {
  if (invoice.paidAt && Number.isFinite(Date.parse(invoice.paidAt))) return 'Pagada'
  return dueDate(invoice) < today ? 'Vencida' : 'Pendiente'
}
