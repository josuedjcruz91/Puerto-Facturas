import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { importSimulation, readSimulationFile } from '../src/services/simulationService.js'
import { parseSimulationMarkdown } from '../src/utils/simulation.js'
const text = readFileSync(new URL('../public/simulacion-facturas-2025.md', import.meta.url), 'utf8')
const rows = parseSimulationMarkdown(text).invoices.slice(0, 3)
test('el servicio importa por HTTP y reintenta sin repetir registros tras una interrupción', async t => {
  const database = []
  let fail = true
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method !== 'POST') return new Response(JSON.stringify(database))
    if (database.length === 1 && fail) return new Response('', { status: 503 })
    const row = { ...JSON.parse(options.body), id: String(database.length + 1) }
    database.push(row)
    return new Response(JSON.stringify(row), { status: 201 })
  })
  await assert.rejects(importSimulation(rows), /Se guardaron 1 facturas/)
  assert.equal(database.length, 1)
  fail = false
  assert.deepEqual(await importSimulation(rows), { saved: 2, skipped: 1 })
  assert.deepEqual(await importSimulation(rows), { saved: 0, skipped: 3 })
  assert.equal(database.length, 3)
})
test('bloquea importaciones simultáneas incluso desde otra instancia de página', async t => {
  let release
  const pending = new Promise(resolve => { release = resolve })
  t.mock.method(globalThis, 'fetch', async () => { await pending; return new Response('[]') })
  const first = importSimulation([])
  await assert.rejects(importSimulation([]), /Ya hay una importación/)
  release()
  await first
})
test('lectura de archivo válida y límites previos a leer contenido', async () => {
  const file = { name: 'demo.md', size: text.length, text: async () => text }
  assert.equal((await readSimulationFile(file)).invoices.length, 119)
  await assert.rejects(readSimulationFile({ ...file, name: 'demo.exe' }), /archivo .md/)
  await assert.rejects(readSimulationFile({ ...file, size: 3 * 1024 * 1024 }), /máximo 2 MB/)
})
