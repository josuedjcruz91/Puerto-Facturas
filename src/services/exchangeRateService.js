import { EXCHANGE_SOURCE, parseExchangeRates } from '../utils/currency.js'
const endpoint = import.meta.env?.VITE_EXCHANGE_URL || (import.meta.env?.DEV ? '/tipo-cambio/tdc/tdc.json' : EXCHANGE_SOURCE)
let cached = null
export async function getExchangeRates(signal) {
  signal?.throwIfAborted()
  if (cached && cached.expires > Date.now()) return cached.data
  let response
  try {
    response = await fetch(endpoint, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(12000)]) : AbortSignal.timeout(12000) })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('No se pudo consultar el tipo de cambio. Revisa tu conexión e intenta nuevamente.', { cause: error })
  }
  if (!response.ok) throw new Error('El servicio de tipo de cambio no está disponible. Intenta nuevamente.')
  let body
  try { body = await response.json() } catch (error) { throw new Error('El servicio de tipo de cambio devolvió una respuesta inválida.', { cause: error }) }
  signal?.throwIfAborted()
  const data = parseExchangeRates(body)
  cached = { data, expires: Date.now() + 5 * 60000 }
  return data
}
