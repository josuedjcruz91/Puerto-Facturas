import { TAX_OPTIONS } from '../constants/tax.js'
// Mantiene el cálculo histórico si la factura no tiene tasas explícitas por línea.
export const roundMoney = value => Math.round((value + Number.EPSILON) * 100) / 100
export const itemTotal = item => roundMoney(Number(item.quantity) * Number(item.unitPrice))
export const itemTax = (item, fallbackRate) => Math.round(Math.round(itemTotal(item) * 100) * (item.taxRate ?? fallbackRate)) / 100
export function calculateTotals(items, taxRate) {
  const cents = items.reduce((sum, item) => sum + Math.round(itemTotal(item) * 100), 0)
  const perLine = items.some(item => item.taxRate !== undefined)
  const taxCents = perLine ? items.reduce((sum, item) => sum + Math.round(itemTax(item, taxRate) * 100), 0) : Math.round(cents * taxRate)
  return { subtotal: cents / 100, tax: taxCents / 100, total: (cents + taxCents) / 100 }
}
export function taxBreakdown(invoice) {
  const { items, taxRate } = invoice
  const label = rate => `IVA ${new Intl.NumberFormat('es', { maximumFractionDigits: 2 }).format(rate * 100)}%`
  if (!items.some(item => item.taxRate !== undefined)) {
    const totals = calculateTotals(items, taxRate)
    return [{ code: invoice.taxCode || '', rate: taxRate, label: invoice.taxLabel || label(taxRate), base: totals.subtotal, tax: totals.tax }]
  }
  const groups = new Map()
  for (const item of items) {
    const rate = item.taxRate ?? taxRate
    const code = item.taxCode ?? invoice.taxCode ?? ''
    const key = `${code}:${rate}`
    if (!groups.has(key)) groups.set(key, { code, rate, label: item.taxLabel || TAX_OPTIONS.find(option => option.code === code && option.rate === rate)?.label || label(rate), base: 0, tax: 0 })
    const group = groups.get(key)
    group.base = roundMoney(group.base + itemTotal(item))
    group.tax = roundMoney(group.tax + itemTax(item, taxRate))
  }
  return [...groups.values()]
}
