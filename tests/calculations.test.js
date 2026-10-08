import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateTotals, itemTotal } from '../src/utils/calculations.js'
import { normalizeIdentification, validateInvoice } from '../src/utils/validators.js'
import { readFileSync } from 'node:fs'
const invoice = JSON.parse(readFileSync(new URL('../db.json', import.meta.url))).invoices[0]
test('factura precargada: subtotal 266, impuesto 34.58, total 300.58', () => {
  assert.deepEqual(calculateTotals(invoice.items, invoice.taxRate), { subtotal: 266, tax: 34.58, total: 300.58 })
  assert.equal(validateInvoice(invoice), null)
})
test('redondea partidas y evita residuos de punto flotante', () => {
  assert.equal(itemTotal({ quantity: 1, unitPrice: 1.005 }), 1.01)
  assert.deepEqual(calculateTotals([{ quantity: 3, unitPrice: 0.1 }], 0.13), { subtotal: 0.3, tax: 0.04, total: 0.34 })
  assert.deepEqual(calculateTotals([], 0), { subtotal: 0, tax: 0, total: 0 })
})
test('normaliza identificación por tipo sin truncar DIMEX', () => {
  assert.equal(normalizeIdentification('01-0123-0456', 'fisica'), '101230456')
  assert.equal(normalizeIdentification('3-101-123456-78', 'juridica'), '3101123456')
  assert.equal(normalizeIdentification('3101123456', 'nite'), '3101123456')
  assert.equal(normalizeIdentification('123456789012', 'dimex'), '123456789012')
  for (const invalid of ['abc101230456', '123', '000000000', '']) assert.throws(() => normalizeIdentification(invalid))
})
test('rechaza partidas vacías, importes inválidos y correos incorrectos', () => {
  assert.ok(validateInvoice({ ...invoice, items: [] }))
  for (const unitPrice of [0, -1, Infinity, 'abc']) assert.ok(validateInvoice({ ...invoice, items: [{ description: 'Producto', quantity: 1, unitPrice }] }))
  assert.ok(validateInvoice({ ...invoice, customer: { ...invoice.customer, email: 'invalido' } }))
})
