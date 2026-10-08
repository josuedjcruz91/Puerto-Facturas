import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { groupInvoices, summarize, weekStart } from '../src/utils/analytics.js'
import { parseSimulationMarkdown, pendingSimulation } from '../src/utils/simulation.js'
import { invoiceToXml } from '../src/utils/xml.js'
const markdown = readFileSync(new URL('../public/simulacion-facturas-2025.md', import.meta.url), 'utf8')
const demo = parseSimulationMarkdown(markdown)
const invoice = demo.invoices[0]
const wrap = invoices => '```json\n' + JSON.stringify({ schema: 'factura-demo-v1', simulation: true, year: 2025, invoices }) + '\n```'
test('plantilla anual completa, marcada como simulación y sin datos de autoridad externa', () => {
  assert.equal(demo.invoices.length, 119)
  assert.equal(new Set(demo.invoices.map(i => i.date.slice(5, 7))).size, 12)
  assert.ok(demo.invoices.every(i => i.source === 'simulation' && !i.id))
  assert.equal(demo.summary.count, 119)
})
test('semanas lunes-domingo y bordes de año no pierden facturas', () => {
  assert.equal(weekStart('2025-01-01'), '2024-12-30')
  assert.equal(weekStart('2025-01-05'), '2024-12-30')
  assert.equal(weekStart('2025-01-06'), '2025-01-06')
  const rows = [{ ...invoice, date: '2025-01-01' }, { ...invoice, date: '2025-12-31' }, { ...invoice, date: '2024-12-31' }]
  assert.equal(groupInvoices(rows, 'week', '2025').reduce((n, g) => n + g.count, 0), 2)
})
test('totales semanales, mensuales y anuales coinciden con el detalle', () => {
  for (const period of ['week', 'month', 'year']) {
    const groups = groupInvoices(demo.invoices, period, '2025')
    assert.equal(groups.reduce((n, g) => n + g.count, 0), demo.summary.count)
    assert.equal(groups.reduce((n, g) => n + Math.round(g.total * 100), 0), Math.round(demo.summary.total * 100))
  }
  assert.equal(groupInvoices([], 'month', '2025').length, 12)
  assert.equal(summarize([]).total, 0)
})
test('importación rechaza JSON malformado, fecha inexistente, duplicados y valores inválidos', () => {
  assert.throws(() => parseSimulationMarkdown('```json\n{\n```'))
  assert.throws(() => parseSimulationMarkdown(wrap([{ ...invoice, date: '2025-02-30' }])))
  assert.throws(() => parseSimulationMarkdown(wrap([invoice, invoice])))
  assert.throws(() => parseSimulationMarkdown(wrap([{ ...invoice, taxRate: -1 }])))
  assert.throws(() => parseSimulationMarkdown(wrap([{ ...invoice, currency: 'CRC' }])))
  assert.throws(() => parseSimulationMarkdown(wrap([{ ...invoice, items: null }])))
  const safe = parseSimulationMarkdown(wrap([{ ...invoice, id: '1', authorized: true, source: 'real' }]))
  assert.equal(safe.invoices[0].source, 'simulation')
  assert.equal(safe.invoices[0].authorized, undefined)
})
test('reintento omite números existentes incluso si cambia la capitalización', () => {
  assert.equal(pendingSimulation([invoice], [{ number: invoice.number.toLowerCase() }]).length, 0)
  assert.equal(pendingSimulation(demo.invoices, [invoice]).length, demo.invoices.length - 1)
})
test('XML escapa contenido y no declara aceptación de Hacienda', () => {
  const xml = invoiceToXml({ ...invoice, number: 'A<&"', customer: { ...invoice.customer, name: 'Ana & <Demo>' } })
  assert.ok(xml.includes('Ana &amp; &lt;Demo&gt;'))
  assert.ok(xml.includes('validezFiscal="ninguna"'))
  assert.ok(xml.includes(`<Total>${summarize([invoice]).total.toFixed(2)}</Total>`))
})
