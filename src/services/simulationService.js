import { invoiceService } from './invoiceService.js'
import { parseSimulationMarkdown, pendingSimulation } from '../utils/simulation.js'
let importing = false
export async function readSimulationFile(file) {
  if (!file.name.toLowerCase().endsWith('.md') || file.size > 2 * 1024 * 1024) throw new Error('Selecciona un archivo .md de máximo 2 MB.')
  return parseSimulationMarkdown(await file.text())
}
export async function importSimulation(invoices, onProgress = () => {}) {
  if (importing) throw new Error('Ya hay una importación en curso. Espera a que termine antes de iniciar otra.')
  importing = true
  let saved = 0
  try {
    const existing = await invoiceService.getAll()
    const pending = pendingSimulation(invoices, existing)
    for (const invoice of pending) {
      await invoiceService.create(invoice)
      saved++
      onProgress(saved, pending.length)
    }
    return { saved, skipped: invoices.length - pending.length }
  } catch (error) {
    throw new Error(`${error.message} Se guardaron ${saved} facturas en este intento. Puedes reintentar: se omitirán las ya registradas.`, { cause: error })
  } finally { importing = false }
}
