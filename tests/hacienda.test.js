import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lookupTaxpayer } from '../src/services/haciendaService.js'
import { hasVerifiedCustomer } from '../src/utils/validators.js'
import { invoiceToXml } from '../src/utils/xml.js'
const success = { nombre: 'Cliente verificado', tipoIdentificacion: '01', regimen: { descripcion: 'Tradicional' }, situacion: { estado: 'Inscrito' }, actividades: [] }
test('normaliza la identificación y reutiliza la consulta positiva', async t => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async url => { calls++; assert.ok(url.endsWith('identificacion=101110001')); return Response.json(success) })
  assert.equal((await lookupTaxpayer('1-0111-0001', 'fisica')).nombre, success.nombre)
  await lookupTaxpayer('101110001', 'fisica')
  assert.equal(calls, 1)
})
test('404 muestra USUARIO NO REGISTRADO y cachea la ausencia temporalmente', async t => {
  let calls = 0
  t.mock.method(globalThis, 'fetch', async () => { calls++; return new Response('', { status: 404 }) })
  for (let i = 0; i < 2; i++) await assert.rejects(lookupTaxpayer('101110002', 'fisica'), { code: 'not_found', message: 'USUARIO NO REGISTRADO' })
  assert.equal(calls, 1)
})
test('registro vacío se considera no encontrado', async t => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ nombre: null }))
  await assert.rejects(lookupTaxpayer('101110003', 'fisica'), { code: 'not_found' })
})
test('400, 429, 500 y fallo de red no se confunden con una persona inexistente', async t => {
  for (const [index, status] of [400, 429, 500].entries()) {
    const mock = t.mock.method(globalThis, 'fetch', async () => new Response('', { status }))
    await assert.rejects(lookupTaxpayer(`10111001${index}`, 'fisica'), { code: status === 400 ? 'invalid' : 'unavailable' })
    mock.mock.restore()
  }
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline') })
  await assert.rejects(lookupTaxpayer('101110020', 'fisica'), { code: 'unavailable' })
})
test('respuesta malformada y abortos no se interpretan como registro ausente', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>Error</html>'))
  await assert.rejects(lookupTaxpayer('101110030', 'fisica'), { code: 'unavailable' })
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(lookupTaxpayer('101110030', 'fisica', controller.signal), { name: 'AbortError' })
})
test('no consulta formatos incompletos', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json(success))
  await assert.rejects(lookupTaxpayer('123', 'fisica'))
  assert.equal(mock.mock.callCount(), 0)
})
test('el guardado exige verificación de la cédula actual; rechaza cambios de número, tipo o nombre', () => {
  const customer = { name: success.nombre, identification: '101110001', identificationType: 'fisica', fiscalData: success, verification: { source: 'hacienda', identification: '101110001', identificationType: 'fisica' } }
  assert.equal(hasVerifiedCustomer(customer), true)
  assert.equal(hasVerifiedCustomer({ ...customer, identification: '101110002' }), false)
  assert.equal(hasVerifiedCustomer({ ...customer, identificationType: 'juridica' }), false)
  assert.equal(hasVerifiedCustomer({ ...customer, name: 'Otro nombre' }), false)
  assert.equal(hasVerifiedCustomer({ ...customer, verification: undefined }), false)
})
test('XML de archivo conserva correo y dirección con escape de caracteres', () => {
  const xml = invoiceToXml({ number: '1', date: '2026-09-07', currency: 'USD', issuer: { name: 'Empresa', identification: '3101123456' }, customer: { name: 'Cliente', identification: '101110001', identificationType: 'fisica', email: 'a@example.com', address: 'A & B' }, items: [{ description: 'Servicio', quantity: 1, unitPrice: 10 }], taxRate: 0.13 })
  assert.ok(xml.includes('<Correo>a@example.com</Correo>'))
  assert.ok(xml.includes('<Direccion>A &amp; B</Direccion>'))
})
