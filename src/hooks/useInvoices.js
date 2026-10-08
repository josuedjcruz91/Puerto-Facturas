import { useEffect, useState } from 'react'
import { invoiceService } from '../services/invoiceService'
export function useInvoices() {
  const [state, setState] = useState({ invoices: [], loading: true, error: '' })
  const [version, setVersion] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    invoiceService.getAll(controller.signal).then(invoices => setState({ invoices: [...invoices].reverse(), loading: false, error: '' })).catch(error => { if (!controller.signal.aborted) setState({ invoices: [], loading: false, error: error.message }) })
    return () => controller.abort()
  }, [version])
  useEffect(() => {
    const refresh = () => setVersion(value => value + 1)
    window.addEventListener('invoices-changed', refresh); window.addEventListener('focus', refresh)
    const timer = setInterval(refresh, 30000)
    return () => { window.removeEventListener('invoices-changed', refresh); window.removeEventListener('focus', refresh); clearInterval(timer) }
  }, [])
  return { ...state, retry: () => { setState(current => ({ ...current, loading: true, error: '' })); setVersion(value => value + 1) } }
}
