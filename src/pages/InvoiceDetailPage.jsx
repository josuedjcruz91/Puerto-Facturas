import { invoiceStatus, dueDate } from '../utils/invoiceStatus'
import { useToday } from '../hooks/useToday'
import { formatDate } from '../utils/formatters'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Invoice from '../components/invoice/Invoice'
import TaxpayerStatus from '../components/invoice/TaxpayerStatus'
import { invoiceService } from '../services/invoiceService'
import { createInvoicePdf } from '../services/pdfService'
import { invoiceToXml } from '../utils/xml'
export default function InvoiceDetailPage() {
  const { id } = useParams()
  const today = useToday()
  const [paying, setPaying] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const paymentLock = useRef(false)
  async function markPaid() {
    if (paymentLock.current) return
    paymentLock.current = true; setPaying(true); setPaymentError('')
    try { const invoice = await invoiceService.markPaid(id); setState({ id, invoice, error: '' }) } catch (error) { setPaymentError(error.message) } finally { paymentLock.current = false; setPaying(false) }
  }
  const node = useRef(null)
  const exportLock = useRef(false)
  const generation = useRef({ cancelled: false })
  const urls = useRef([])
  const [state, setState] = useState({ id: null, invoice: null, error: '' })
  const [exportError, setExportError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [files, setFiles] = useState({})
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    const session = { cancelled: false }
    generation.current = session
    invoiceService.getById(id, controller.signal).then(invoice => setState({ id, invoice, error: '' })).catch(error => { if (!controller.signal.aborted) setState({ id, invoice: null, error: error.message }) })
    return () => { controller.abort(); session.cancelled = true; urls.current.forEach(url => URL.revokeObjectURL(url)); urls.current = [] }
  }, [id, attempt])
  async function prepareFile(type) {
    if (exportLock.current || state.id !== id || files[type]?.invoice === state.invoice) return
    exportLock.current = true
    const token = generation.current
    setExporting(true); setExportError('')
    try {
      const blob = type === 'pdf' ? await createInvoicePdf(node.current) : new Blob([invoiceToXml(state.invoice)], { type: 'application/xml;charset=utf-8' })
      if (token.cancelled) return
      const url = URL.createObjectURL(blob)
      urls.current.push(url)
      const number = state.invoice.number.replace(/[^a-zA-Z0-9_-]/g, '-')
      setFiles(current => ({ ...current, [type]: { id, invoice: state.invoice, url, name: `factura-${number}.${type}` } }))
    } catch (error) { if (!token.cancelled) setExportError(`No se pudo preparar el archivo: ${error.message}`) } finally { exportLock.current = false; setExporting(false) }
  }
  return <><div className="no-print"><Link className="back-link" to="/facturas">← Volver a facturas</Link><div className="page-heading"><div><div className="eyebrow">DOCUMENTO</div><h1>Detalle de factura</h1><p>Revisa tu documento y elige cómo compartirlo.</p></div>{state.id === id && state.invoice && <div className="actions"><button className="button secondary" disabled={exporting} onClick={() => window.print()}>Imprimir</button><button className="button secondary" disabled={exporting || files.xml?.invoice === state.invoice} onClick={() => prepareFile('xml')}>{files.xml?.invoice === state.invoice ? 'XML listo' : 'Preparar XML'}</button><button className="button" disabled={exporting || files.pdf?.invoice === state.invoice} onClick={() => prepareFile('pdf')}>{exporting ? 'Preparando archivo…' : files.pdf?.invoice === state.invoice ? 'PDF listo' : 'Preparar PDF'}</button></div>}</div>
    {state.id === id && state.invoice && <div className="document-status"><strong>{state.invoice.source === 'simulation' ? 'SIMULACIÓN · ' : ''}Registro de factura</strong><p>Guarda una copia en PDF y otra en XML. Ambos archivos se generan en tu navegador para el archivo del proyecto; no se envían a Hacienda ni tienen validez fiscal.</p></div>}
    {state.id === id && state.invoice && <TaxpayerStatus data={state.invoice.customer.fiscalData} checkedAt={state.invoice.customer.verification?.checkedAt} historical />}
    {state.id === id && state.invoice && <div className="payment-bar"><span className={`badge status-${invoiceStatus(state.invoice, today).toLowerCase()}`}>{invoiceStatus(state.invoice, today)}</span><span>Vencimiento: {formatDate(dueDate(state.invoice))}</span>{invoiceStatus(state.invoice, today) !== 'Pagada' && <button className="button secondary" disabled={paying || exporting} onClick={markPaid}>{paying ? 'Registrando pago…' : 'Marcar como pagada'}</button>}</div>}
    {paymentError && <p role="alert" className="message error">{paymentError}</p>}{exportError && <p className="message error" role="alert">{exportError}</p>}{Object.values(files).some(file => file.id === id && file.invoice === state.invoice) && <div className="download-ready" role="status"><p>Documentos listos. Pulsa cada enlace para guardar su copia.</p>{Object.values(files).filter(file => file.id === id && file.invoice === state.invoice).map(file => <a key={file.name} className="button" href={file.url} download={file.name}>↓ Descargar {file.name}</a>)}</div>}</div>
    {state.id !== id ? <p role="status">Cargando factura…</p> : state.error ? <div role="alert" className="message error">{state.error} <button className="button secondary" onClick={() => { setState({ id: null, invoice: null, error: '' }); setAttempt(value => value + 1) }}>Reintentar</button></div> : <div className="invoice-document"><Invoice ref={node} invoice={state.invoice} /></div>}</>
}
