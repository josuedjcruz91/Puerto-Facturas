import { addDays } from './invoiceStatus.js'
import { taxSnapshot } from '../constants/tax.js'
import { validateInvoice } from './validators.js'
import { summarize } from './analytics.js'
export function parseSimulationMarkdown(text) {
  const blocks = [...text.matchAll(/```json\s*([\s\S]*?)```/g)]
  if (blocks.length !== 1) throw new Error('El archivo debe contener un único bloque ```json con el formato de la plantilla.')
  let payload
  try { payload = JSON.parse(blocks[0][1]) } catch { throw new Error('El bloque JSON no es válido. Descarga la plantilla de ejemplo.') }
  if (payload.schema !== 'factura-demo-v1' || payload.simulation !== true || !Number.isInteger(payload.year) || payload.year < 2000 || payload.year > 2100) throw new Error('Se requiere una simulación factura-demo-v1 con un año entre 2000 y 2100.')
  if (!Array.isArray(payload.invoices) || !payload.invoices.length || payload.invoices.length > 2000) throw new Error('El archivo debe contener entre 1 y 2000 facturas.')
  const numbers = new Set()
  const string = (value, max = 300) => { if (typeof value !== 'string' || value.length > max) throw new Error('Hay un campo de texto inválido o demasiado largo.'); return value.trim() }
  const invoices = payload.invoices.map((raw, index) => {
    try {
      const person = data => ({ name: string(data.name), identification: string(data.identification, 30) })
      const invoice = {
        dueDate: raw.dueDate || addDays(raw.date, 30), paidAt: raw.paidAt || null, number: string(raw.number, 80), date: string(raw.date, 10), currency: 'USD', taxRate: raw.taxRate, ...(raw.taxCode !== undefined ? taxSnapshot(raw.taxCode) : {}),
        issuer: person(raw.issuer), customer: { ...person(raw.customer), identificationType: string(raw.customer.identificationType, 20), email: string(raw.customer.email || ''), address: string(raw.customer.address || '') },
        items: raw.items.map((item, i) => ({ id: `item-${i + 1}`, description: string(item.description), quantity: item.quantity, unitPrice: item.unitPrice, ...(item.taxCode !== undefined ? taxSnapshot(item.taxCode) : item.taxRate !== undefined ? { taxRate: item.taxRate } : {}) })),
        terms: 'SIMULACIÓN · Datos ficticios para demostración. Sin validez fiscal.', source: 'simulation', simulationYear: payload.year,
      }
      if ((raw.taxCode !== undefined && taxSnapshot(raw.taxCode).taxRate !== raw.taxRate) || raw.items.some(item => item.taxCode !== undefined && item.taxRate !== undefined && taxSnapshot(item.taxCode).taxRate !== item.taxRate)) throw new Error('Código y tarifa de IVA incompatibles.')
      if (raw.currency !== 'USD' || typeof invoice.taxRate !== 'number' || !Number.isFinite(invoice.taxRate) || invoice.taxRate < 0 || invoice.taxRate > 1) throw new Error('Moneda USD y tasa entre 0 y 1 requeridas.')
      if (!['fisica', 'juridica', 'nite', 'dimex'].includes(invoice.customer.identificationType)) throw new Error('Tipo de identificación no válido.')
      if (!/^\d{4}-\d{2}-\d{2}$/.test(invoice.date) || !invoice.date.startsWith(`${payload.year}-`) || new Date(`${invoice.date}T12:00:00Z`).toISOString().slice(0, 10) !== invoice.date) throw new Error('Fecha inválida o fuera del año declarado.')
      if (invoice.items.length > 100 || invoice.items.some(item => typeof item.quantity !== 'number' || typeof item.unitPrice !== 'number')) throw new Error('Ítems inválidos; máximo 100 por factura y valores numéricos.')
      if (invoice.paidAt && (!Number.isFinite(Date.parse(invoice.paidAt)) || invoice.paidAt.slice(0, 10) < invoice.date)) throw new Error('Fecha de pago inválida.')
      const error = validateInvoice(invoice)
      if (error) throw new Error(error)
      const key = invoice.number.toLowerCase()
      if (numbers.has(key)) throw new Error('Número duplicado dentro del archivo.')
      numbers.add(key)
      const summary = summarize([invoice])
      if (!Number.isSafeInteger(Math.round(summary.total * 100))) throw new Error('Total fuera del rango permitido.')
      return invoice
    } catch (error) { throw new Error(`Factura ${index + 1}: ${error.message}`, { cause: error }) }
  })
  return { year: payload.year, invoices, summary: summarize(invoices) }
}
export function pendingSimulation(invoices, existing) {
  const numbers = new Set(existing.map(row => row.number.trim().toLowerCase()))
  return invoices.filter(row => !numbers.has(row.number.toLowerCase()))
}
