import { roundMoney } from './calculations.js'
export const EXCHANGE_SOURCE = 'https://apis.gometa.org/tdc/tdc.json'
export function parseExchangeRates(data, fetchedAt = new Date().toISOString()) {
  for (const key of ['compra', 'venta']) {
    const value = data?.[key]
    const date = data?.[`${key}_date`]
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) throw new Error('El servicio devolvió una tasa de cambio inválida.')
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T12:00:00Z`)) || new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date) throw new Error('La fecha del tipo de cambio es inválida.')
  }
  return { compra: data.compra, venta: data.venta, compraDate: data.compra_date, ventaDate: data.venta_date, source: EXCHANGE_SOURCE, fetchedAt }
}
export function exchangeSnapshot(rates, kind = 'venta') {
  if (!rates) return null
  if (!['compra', 'venta'].includes(kind)) throw new Error('Tipo de tasa inválido.')
  return { rate: rates[kind], date: rates[`${kind}Date`], kind, source: rates.source, fetchedAt: rates.fetchedAt }
}
export function convertAmount(amount, from, to, exchange) {
  if (![from, to].every(code => ['USD', 'CRC'].includes(code))) throw new Error('Moneda no admitida.')
  if (!Number.isFinite(Number(amount))) throw new Error('El importe debe ser numérico.')
  if (from === to) return roundMoney(Number(amount))
  if (!exchange || !Number.isFinite(exchange.rate) || exchange.rate <= 0) throw new Error('No hay un tipo de cambio válido para convertir los precios. Reintenta la consulta.')
  const result = roundMoney(from === 'USD' ? Number(amount) * exchange.rate : Number(amount) / exchange.rate)
  if (!Number.isSafeInteger(Math.round(result * 100))) throw new Error('El importe convertido es demasiado grande.')
  return result
}
export function convertInvoiceCurrency(invoice, currency, exchange) {
  if (!['USD', 'CRC'].includes(currency)) throw new Error('Moneda no admitida.')
  if (invoice.currency === currency) return invoice
  const items = invoice.items.map(item => {
    if (item.unitPrice === '') return { ...item }
    const unitPrice = convertAmount(item.unitPrice, invoice.currency, currency, exchange)
    if (unitPrice <= 0) throw new Error('Un precio quedaría en cero o negativo después de redondear. Revisa el importe antes de convertir.')
    return { ...item, unitPrice }
  })
  return { ...invoice, currency, items, exchangeRate: exchange || null }
}

export function equivalentPreview(total, currency, exchange) {
  if (!exchange) return null
  try { return convertAmount(total, currency, currency === 'USD' ? 'CRC' : 'USD', exchange) } catch { return null }
}
