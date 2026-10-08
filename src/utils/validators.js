import { validDate } from './invoiceStatus.js'
import { calculateTotals } from './calculations.js'
import { TAX_OPTIONS } from '../constants/tax.js'
export function normalizeIdentification(value, type = 'fisica') {
  if (!/^[\d\s-]+$/.test(value)) throw new Error('La identificación solo admite números, espacios y guiones.')
  let digits = value.replace(/[\s-]/g, '')
  if (type === 'fisica') {
    if (digits.length === 10 && digits.startsWith('0')) digits = digits.slice(1)
    if (!/^[1-9]\d{8}$/.test(digits)) throw new Error('La cédula física debe tener 9 dígitos, sin el cero inicial.')
  } else if (type === 'dimex') {
    if (!/^[1-9]\d{10,11}$/.test(digits)) throw new Error('El DIMEX debe tener 11 o 12 dígitos, sin cero inicial.')
  } else {
    if (digits.length === 12) digits = digits.slice(0, 10)
    if (!/^[1-9]\d{9}$/.test(digits)) throw new Error('La cédula jurídica o NITE debe tener 10 dígitos, o 12 incluyendo los verificadores.')
  }
  return digits
}
export function validateInvoice(invoice) {
  if (!validDate(invoice.date)) return 'La fecha de emisión no es válida.'
  if (invoice.dueDate !== undefined && (!validDate(invoice.dueDate) || invoice.dueDate < invoice.date)) return 'El vencimiento debe ser una fecha válida igual o posterior a la emisión.'
  if (!['USD', 'CRC'].includes(invoice.currency)) return 'Selecciona una moneda válida.'
  if (invoice.exchangeRate && (!Number.isFinite(invoice.exchangeRate.rate) || invoice.exchangeRate.rate <= 0)) return 'El tipo de cambio guardado no es válido.'
  if (![invoice.issuer.name, invoice.issuer.identification, invoice.customer.name, invoice.customer.identification, invoice.number, invoice.date].every(value => value.trim())) return 'Completa los datos del emisor, cliente, número y fecha.'
  try { normalizeIdentification(invoice.customer.identification, invoice.customer.identificationType) } catch (error) { return error.message }
  if (invoice.customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoice.customer.email)) return 'Escribe un correo electrónico válido.'
  if (typeof invoice.taxRate !== 'number' || !Number.isFinite(invoice.taxRate) || invoice.taxRate < 0 || invoice.taxRate > 1) return 'La tasa de impuesto debe estar entre 0 y 100%.'
  const selections = [invoice, ...invoice.items]
  if (selections.some(row => row.taxRate !== undefined && (typeof row.taxRate !== 'number' || !Number.isFinite(row.taxRate) || row.taxRate < 0 || row.taxRate > 1))) return 'Hay una tarifa de impuesto inválida.'
  if (selections.some(row => row.taxCode !== undefined && !TAX_OPTIONS.some(option => option.code === row.taxCode && option.rate === row.taxRate))) return 'El código de IVA no coincide con la tarifa seleccionada.'
  if (!invoice.items.length || invoice.items.some(item => !item.description.trim() || !Number.isFinite(Number(item.quantity)) || !Number.isFinite(Number(item.unitPrice)) || Number(item.quantity) <= 0 || Number(item.unitPrice) <= 0)) return 'Cada ítem necesita descripción, cantidad y precio positivos.'
  if (invoice.items.some(item => !Number.isSafeInteger(Math.round(Number(item.quantity) * Number(item.unitPrice) * 100)))) return 'El importe de una partida es demasiado grande.'
  if (!Number.isSafeInteger(Math.round(calculateTotals(invoice.items, invoice.taxRate).total * 100))) return 'El total de la factura es demasiado grande.'
  return null
}

// Regla del flujo de creación; no se aplica al importador de datos ficticios.
export function hasVerifiedCustomer(customer) {
  try {
    const verification = customer.verification
    return verification?.source === 'hacienda' &&
      verification.identification === normalizeIdentification(customer.identification, customer.identificationType) &&
      verification.identificationType === customer.identificationType &&
      typeof customer.fiscalData?.nombre === 'string' && Boolean(customer.fiscalData.nombre.trim()) &&
      customer.name === customer.fiscalData.nombre
  } catch { return false }
}
