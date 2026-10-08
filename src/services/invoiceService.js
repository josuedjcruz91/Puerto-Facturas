import { dueDate } from '../utils/invoiceStatus.js'
// Único punto de acceso a la persistencia de facturas.
const baseUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3001'
async function request(path = '', options = {}) {
  let response
  try {
    response = await fetch(`${baseUrl}/invoices${path}`, { ...options, headers: { 'Content-Type': 'application/json' }, signal: options.signal || AbortSignal.timeout(15000) })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('No se pudo conectar con las facturas. Verifica que json-server esté activo en el puerto 3001.', { cause: error })
  }
  if (!response.ok) throw new Error(response.status === 404 ? 'La factura no existe.' : 'No se pudo completar la operación. Intenta nuevamente.')
  if (response.status === 204) return null
  const data = await response.json()
  const normalize = invoice => ({ ...invoice, dueDate: dueDate(invoice), paidAt: invoice.paidAt || null })
  if (options.method && typeof window !== 'undefined') window.dispatchEvent(new Event('invoices-changed'))
  return Array.isArray(data) ? data.map(normalize) : normalize(data)
}
export const invoiceService = {
  getAll: (signal) => request('', { signal }),
  getById: (id, signal) => request(`/${encodeURIComponent(id)}`, { signal }),
  create: (invoice) => request('', { method: 'POST', body: JSON.stringify({ ...invoice, dueDate: dueDate(invoice), paidAt: invoice.paidAt || null }) }),
  markPaid: (id) => request(`/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ paidAt: new Date().toISOString() }) }),
  remove: (id) => request(`/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
