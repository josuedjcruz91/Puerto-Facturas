import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fiscalFlag, taxpayerSummary, consultationDate } from '../src/utils/taxpayer.js'
import { lookupTaxpayerWithMetadata } from '../src/services/haciendaService.js'
import { hasVerifiedCustomer } from '../src/utils/validators.js'
import { invoiceToXml } from '../src/utils/xml.js'
const data = { nombre: 'Cliente prueba', tipoIdentificacion: '01', regimen: { codigo: 0, descripcion: 'No tiene' }, situacion: { estado: 'Inscrito', moroso: 'SI', omiso: 'NO', administracionTributaria: 'San José' }, actividades: [{ codigo: '123456', descripcion: 'Actividad de prueba', estado: 'A', tipo: 'P' }], adicional: { dato: 'Valor & <original>' } }
test('morosidad y omisión reconocen sí/no sin convertir datos ausentes en No', () => {
  for (const value of ['SI', ' sí ', true]) assert.deepEqual(fiscalFlag(value), { label: 'Sí', state: 'warning' })
  for (const value of ['NO', ' no ', false]) assert.deepEqual(fiscalFlag(value), { label: 'No', state: 'clear' })
  for (const value of [null, undefined, '']) assert.deepEqual(fiscalFlag(value), { label: 'No informado', state: 'unknown' })
  assert.deepEqual(fiscalFlag('PENDIENTE'), { label: 'PENDIENTE', state: 'unknown' })
})
test('conserva estado, régimen cero y códigos de actividad sin reinterpretarlos', () => {
  const summary = taxpayerSummary(data)
  assert.equal(summary.found, true)
  assert.equal(summary.status, 'Inscrito')
  assert.equal(summary.moroso.state, 'warning')
  assert.equal(summary.omiso.state, 'clear')
  assert.equal(summary.regimeCode, '0')
  assert.equal(summary.administration, 'San José')
  assert.deepEqual(summary.activities[0], { code: '123456', description: 'Actividad de prueba', state: 'A', type: 'P' })
  assert.equal(taxpayerSummary({ ...data, situacion: { estado: 'Desinscrito' } }).status, 'Desinscrito')
})
test('datos faltantes o formatos no previstos no rompen la vista', () => {
  assert.equal(taxpayerSummary(null).found, false)
  assert.equal(taxpayerSummary({ nombre: 'Cliente' }).status, 'No informado')
  assert.equal(taxpayerSummary({ nombre: 'Cliente' }).moroso.state, 'unknown')
  assert.deepEqual(taxpayerSummary({ actividades: null }).activities, [])
  assert.equal(consultationDate('incorrecta'), 'Fecha no disponible')
})
test('el uso de caché mantiene la fecha original de consulta', async t => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => { calls++; return Response.json(data) })
  const first = await lookupTaxpayerWithMetadata('101110090', 'fisica')
  const again = await lookupTaxpayerWithMetadata('101110090', 'fisica')
  assert.equal(calls, 1)
  assert.ok(first.checkedAt)
  assert.equal(first.checkedAt, again.checkedAt)
  assert.deepEqual(first.data, data)
})
test('morosidad es una advertencia y no invalida la identidad verificada', () => {
  const customer = { name: data.nombre, identification: '101110090', identificationType: 'fisica', fiscalData: data, verification: { source: 'hacienda', identification: '101110090', identificationType: 'fisica' } }
  assert.equal(hasVerifiedCustomer(customer), true)
})
test('XML archiva estados y toda la respuesta, incluyendo campos adicionales escapados', () => {
  const xml = invoiceToXml({ number: 'TEST-1', date: '2026-09-07', currency: 'USD', issuer: { name: 'Empresa', identification: '3101123456' }, customer: { name: data.nombre, identification: '101110090', fiscalData: data, verification: { checkedAt: '2026-09-07T15:00:00Z' } }, items: [{ description: 'Servicio', quantity: 1, unitPrice: 10 }], taxRate: 0.13 })
  assert.ok(xml.includes('<Moroso>Sí</Moroso>'))
  assert.ok(xml.includes('<Omiso>No</Omiso>'))
  assert.ok(xml.includes('<FechaConsulta>2026-09-07T15:00:00Z</FechaConsulta>'))
  assert.ok(xml.includes('Valor &amp; &lt;original&gt;'))
  assert.ok(xml.includes('RespuestaOriginal formato="json"'))
})
