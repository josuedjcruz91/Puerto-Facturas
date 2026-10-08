import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzeInvoices } from '../src/utils/adminAnalytics.js'
import { createAdminDemo } from '../src/data/adminDemo.js'
import { invoiceStatus, addDays, validDate } from '../src/utils/invoiceStatus.js'
import { calculateTotals, taxBreakdown } from '../src/utils/calculations.js'
const today = '2026-09-07'
const data = createAdminDemo(today).map((row, i) => ({ ...row, id: String(i) }))
test('reto: total, ticket, ranking, desviación, atípica y tres estados', () => {
 const result = analyzeInvoices(data, today)
 assert.equal(result.total, 3825)
 assert.equal(result.average, 478.125)
 assert.equal(result.count, 8)
 assert.deepEqual(result.states, { Pagada: 5, Pendiente: 1, Vencida: 2 })
 assert.equal(result.atypicalCount, 1)
 assert.equal(result.rows.find(row => row.atypical).total, 2450)
 assert.equal(result.ranking[0].total, 2640)
 assert.equal(result.projection, 1275)
 assert.equal(result.deviation, Math.sqrt(data.reduce((sum, row) => sum + (row.items[0].unitPrice - 478.125) ** 2, 0) / 8))
})
test('vacío y totales iguales no producen atípicas ni NaN', () => {
 assert.equal(analyzeInvoices([], today).projection, null)
 assert.equal(analyzeInvoices([], today).average, 0)
 assert.equal(analyzeInvoices([data[0], data[0]], today).atypicalCount, 0)
})
test('proyección excluye mes parcial y futuro e incluye meses completos en cero', () => {
 const rows = [ { ...data[0], date: '2026-06-01' }, { ...data[3], date: '2026-09-01' }, { ...data[3], date: '2026-10-01' } ]
 assert.equal(analyzeInvoices(rows, today).projection, 60)
 assert.deepEqual(analyzeInvoices(rows, today).projectionMonths, ['2026-06', '2026-07', '2026-08'])
})
test('vencimiento hoy sigue pendiente; pago prevalece; legado tiene 30 días', () => {
 assert.equal(invoiceStatus({ date: '2026-08-08' }, today), 'Pendiente')
 assert.equal(invoiceStatus({ date: '2026-08-07' }, today), 'Vencida')
 assert.equal(invoiceStatus({ ...data[0], paidAt: '2026-08-01T12:00:00Z' }, today), 'Pagada')
 assert.equal(addDays('2024-02-28', 2), '2024-03-01')
 assert.equal(validDate('2026-02-30'), false)
})
test('IVA mixto por línea y tratamientos de cero separados', () => {
 const items = [{ quantity: 2, unitPrice: 100, taxRate: .13, taxCode: '08' }, { quantity: 1, unitPrice: 100, taxRate: .04, taxCode: '04' }, { quantity: 1, unitPrice: 100, taxRate: 0, taxCode: '10' }, { quantity: 1, unitPrice: 100, taxRate: 0, taxCode: '01' }]
 assert.deepEqual(calculateTotals(items, .13), { subtotal: 500, tax: 30, total: 530 })
 assert.equal(taxBreakdown({ items, taxRate: .13 }).length, 4)
 assert.deepEqual(calculateTotals([{ quantity: 1, unitPrice: .04 }, { quantity: 1, unitPrice: .04 }], .13), { subtotal: .08, tax: .01, total: .09 })
})
