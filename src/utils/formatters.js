export const formatMoney = (value, currency = 'USD') => new Intl.NumberFormat('es-CR', { style: 'currency', currency }).format(value)
export const formatDate = (value) => new Intl.DateTimeFormat('es-CR', { dateStyle: 'long' }).format(new Date(`${value}T12:00:00`))
export function today() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
