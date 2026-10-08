import { normalizeIdentification } from '../utils/validators.js'
const cache = new Map()
const base = import.meta.env?.VITE_HACIENDA_URL || (import.meta.env?.DEV ? '/hacienda' : 'https://api.hacienda.go.cr')
export class HaciendaError extends Error {
  constructor(code, message, options) { super(message, options); this.name = 'HaciendaError'; this.code = code }
}
function responseError(status) {
  if (status === 404) return new HaciendaError('not_found', 'USUARIO NO REGISTRADO')
  if (status === 400) return new HaciendaError('invalid', 'Hacienda rechazó el formato de la identificación. Revisa el número y el tipo.')
  if (status === 429) return new HaciendaError('unavailable', 'Hacienda alcanzó el límite de consultas. Espera antes de reintentar.')
  return new HaciendaError('unavailable', 'No se pudo verificar la cédula. Hacienda no está disponible temporalmente.')
}
export async function lookupTaxpayer(identification, type, signal) {
  const normalized = normalizeIdentification(identification, type)
  const key = `${type}:${normalized}`
  signal?.throwIfAborted()
  const cached = cache.get(key)
  if (cached && cached.expires > Date.now()) {
    if (cached.error) throw new HaciendaError('not_found', 'USUARIO NO REGISTRADO')
    return cached.data
  }
  let response
  try {
    response = await fetch(`${base}/fe/ae?identificacion=${encodeURIComponent(normalized)}`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(12000)]) : AbortSignal.timeout(12000) })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new HaciendaError('unavailable', 'No se pudo verificar la cédula. Revisa la conexión o reintenta cuando Hacienda responda.', { cause: error })
  }
  signal?.throwIfAborted()
  if (!response.ok) {
    if (response.status === 404) cache.set(key, { error: true, expires: Date.now() + 60000 })
    throw responseError(response.status)
  }
  let data
  try { data = await response.json() } catch (error) { throw new HaciendaError('unavailable', 'Hacienda devolvió una respuesta inválida. Intenta nuevamente.', { cause: error }) }
  signal?.throwIfAborted()
  if (data?.code >= 400) throw responseError(Number(data.code))
  if (data === null || (data && typeof data === 'object' && !Array.isArray(data) && (!Object.keys(data).length || ('nombre' in data && (data.nombre === null || data.nombre === ''))))) {
    cache.set(key, { error: true, expires: Date.now() + 60000 })
    throw new HaciendaError('not_found', 'USUARIO NO REGISTRADO')
  }
  if (typeof data?.nombre !== 'string' || !data.nombre.trim()) throw new HaciendaError('unavailable', 'La respuesta de Hacienda no permite confirmar al cliente. Reintenta.')
  cache.set(key, { data, checkedAt: new Date().toISOString(), expires: Date.now() + 10 * 60000 })
  return data
}

export async function lookupTaxpayerWithMetadata(identification, type, signal) {
  const data = await lookupTaxpayer(identification, type, signal)
  const key = `${type}:${normalizeIdentification(identification, type)}`
  return { data, checkedAt: cache.get(key)?.checkedAt }
}
