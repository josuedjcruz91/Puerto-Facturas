import { useEffect, useState } from 'react'
import { lookupTaxpayerWithMetadata } from '../services/haciendaService'
import { normalizeIdentification } from '../utils/validators'
// El estado visible siempre pertenece a la cédula y al tipo actuales.
export function useHaciendaLookup(identification, type) {
  const [state, setState] = useState(null)
  const [attempt, setAttempt] = useState(0)
  let normalized = ''
  let formatError = ''
  if (identification.trim()) {
    try { normalized = normalizeIdentification(identification, type) } catch (error) { formatError = error.message }
  }
  const key = JSON.stringify([identification, type, attempt])
  useEffect(() => {
    if (!normalized) return
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setState({ key, status: 'loading', data: null, error: '' })
      try {
        const { data, checkedAt } = await lookupTaxpayerWithMetadata(normalized, type, controller.signal)
        if (!controller.signal.aborted) setState({ key, status: 'verified', data, error: '', checkedAt })
      } catch (error) {
        if (!controller.signal.aborted) setState({ key, status: error.code || 'unavailable', data: null, error: error.message })
      }
    }, 700)
    return () => { clearTimeout(timer); controller.abort() }
  }, [key, normalized, type])
  const current = state?.key === key ? state : { status: normalized ? 'waiting' : formatError ? 'invalid' : 'idle', data: null, error: formatError }
  return { ...current, normalized, verified: current.status === 'verified', loading: ['waiting', 'loading'].includes(current.status), retry: () => setAttempt(value => value + 1) }
}
