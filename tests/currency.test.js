import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseExchangeRates, exchangeSnapshot, convertAmount, convertInvoiceCurrency, equivalentPreview } from '../src/utils/currency.js'
import { invoiceToXml } from '../src/utils/xml.js'
import { validateInvoice } from '../src/utils/validators.js'
import { getExchangeRates } from '../src/services/exchangeRateService.js'
const response = { compra: 448.27, venta: 453.69, compra_date: '2026-09-07', venta_date: '2026-09-07' }
const rates = parseExchangeRates(response, '2026-09-07T17:30:00Z')
const sale = exchangeSnapshot(rates, 'venta')
const invoice = { number: 'TEST-FX', date: '2026-09-07', currency: 'USD', taxRate: 0.13, issuer: { name: 'Empresa', identification: '3101123456' }, customer: { name: 'Prueba', identification: '101110090', identificationType: 'fisica' }, items: [{ id: '1', description: 'Teclado', quantity: 2, unitPrice: 25 }] }
test('interpreta compra y venta con sus fechas separadas y conserva la tasa elegida', () => {
  assert.equal(sale.rate, 453.69)
  assert.equal(exchangeSnapshot(rates, 'compra').rate, 448.27)
  assert.equal(sale.date, '2026-09-07')
  assert.equal(sale.fetchedAt, '2026-09-07T17:30:00Z')
  assert.equal(sale.source, 'https://apis.gometa.org/tdc/tdc.json')
  assert.throws(() => exchangeSnapshot(rates, 'otro'))
})
test('rechaza tasas no numéricas, negativas y fechas inexistentes', () => {
  for (const venta of [0, -1, Infinity, '453.69', null]) assert.throws(() => parseExchangeRates({ ...response, venta }))
  assert.throws(() => parseExchangeRates({ ...response, compra_date: '2026-02-30' }))
  assert.throws(() => parseExchangeRates(null))
})
test('convierte USD a CRC y CRC a USD con redondeo a centavos', () => {
  assert.equal(convertAmount(25, 'USD', 'CRC', sale), 11342.25)
  assert.equal(convertAmount(11342.25, 'CRC', 'USD', sale), 25)
  assert.equal(convertAmount(1, 'USD', 'CRC', exchangeSnapshot(rates, 'compra')), 448.27)
  assert.throws(() => convertAmount(25, 'USD', 'CRC', null))
  assert.throws(() => convertAmount(25, 'EUR', 'CRC', sale))
  assert.equal(equivalentPreview(Infinity, 'USD', sale), null)
})
test('convierte ítems sin mutar el original y fija la tasa en el registro', () => {
  const converted = convertInvoiceCurrency(invoice, 'CRC', sale)
  assert.equal(converted.items[0].unitPrice, 11342.25)
  assert.equal(invoice.items[0].unitPrice, 25)
  assert.equal(converted.currency, 'CRC')
  assert.equal(converted.exchangeRate.rate, 453.69)
  assert.equal(validateInvoice(converted), null)
  assert.equal(convertInvoiceCurrency(converted, 'USD', converted.exchangeRate).items[0].unitPrice, 25)
})
test('sin tasa permite elegir moneda antes de introducir precios; no convierte importes existentes', () => {
  assert.equal(convertInvoiceCurrency({ ...invoice, items: [{ ...invoice.items[0], unitPrice: '' }] }, 'CRC', null).currency, 'CRC')
  assert.throws(() => convertInvoiceCurrency(invoice, 'CRC', null))
  assert.throws(() => convertInvoiceCurrency({ ...invoice, currency: 'CRC', items: [{ ...invoice.items[0], unitPrice: 0.01 }] }, 'USD', sale))
})
test('XML conserva moneda, tipo de tasa, valor, fecha y equivalente histórico', () => {
  const xml = invoiceToXml(convertInvoiceCurrency(invoice, 'CRC', sale))
  assert.ok(xml.includes('<Moneda>CRC</Moneda>'))
  assert.ok(xml.includes('<Tasa>453.69</Tasa>'))
  assert.ok(xml.includes('<Tipo>venta</Tipo>'))
  assert.ok(xml.includes('<Fecha>2026-09-07</Fecha>'))
  assert.ok(xml.includes('<TotalEquivalente moneda="USD">56.50</TotalEquivalente>'))
})
test('errores HTTP y red se notifican; una respuesta exitosa se reutiliza desde caché', async t => {
  let behavior = 'offline'
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => {
    calls++
    if (behavior === 'offline') throw new TypeError('offline')
    if (behavior === 'http') return new Response('', { status: 503 })
    if (behavior === 'invalid') return Response.json({ venta: -1 })
    return Response.json(response)
  })
  await assert.rejects(getExchangeRates(), /No se pudo consultar/)
  behavior = 'http'; await assert.rejects(getExchangeRates(), /no está disponible/)
  behavior = 'invalid'; await assert.rejects(getExchangeRates(), /inválida/)
  behavior = 'ok'; const first = await getExchangeRates(); const second = await getExchangeRates()
  assert.equal(first.venta, 453.69)
  assert.equal(first.fetchedAt, second.fetchedAt)
  assert.equal(calls, 4)
})
