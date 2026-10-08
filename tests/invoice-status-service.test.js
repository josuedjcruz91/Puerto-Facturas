import test from 'node:test'
import assert from 'node:assert/strict'
import { invoiceService } from '../src/services/invoiceService.js'
import { invoiceToXml } from '../src/utils/xml.js'
import { createAdminDemo } from '../src/data/adminDemo.js'
import { validateInvoice } from '../src/utils/validators.js'
test('servicio normaliza legado y persiste pago mediante PATCH', async () => {
 const original = globalThis.fetch
 const invoice = createAdminDemo('2026-09-07')[0]
 try {
  globalThis.fetch = async (url, options) => {
   assert.equal(options.method, 'PATCH')
   assert.ok(url.endsWith('/invoices/test-id'))
   const body = JSON.parse(options.body)
   assert.deepEqual(Object.keys(body), ['paidAt'])
   assert.ok(Number.isFinite(Date.parse(body.paidAt)))
   return new Response(JSON.stringify({ ...invoice, ...body }), { status: 200 })
  }
  assert.ok((await invoiceService.markPaid('test-id')).paidAt)
  globalThis.fetch = async () => new Response(JSON.stringify([{ ...invoice, dueDate: undefined, paidAt: undefined }]))
  const [legacy] = await invoiceService.getAll()
  assert.equal(legacy.dueDate, '2026-07-05')
  assert.equal(legacy.paidAt, null)
 } finally { globalThis.fetch = original }
})
test('vencimiento inválido se rechaza; XML conserva vencimiento y pago', () => {
 const invoice = createAdminDemo('2026-09-07')[3]
 assert.equal(validateInvoice(invoice), null)
 assert.match(validateInvoice({ ...invoice, dueDate: '2026-01-01' }), /vencimiento/)
 const xml = invoiceToXml(invoice)
 assert.ok(xml.includes(`<FechaVencimiento>${invoice.dueDate}</FechaVencimiento>`))
 assert.ok(xml.includes(`<FechaPago>${invoice.paidAt}</FechaPago>`))
})
