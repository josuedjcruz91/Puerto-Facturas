import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInvoices } from '../hooks/useInvoices'
import InvoiceList from '../components/invoice/InvoiceList'
import { analyzeInvoices } from '../utils/adminAnalytics'
import { useToday } from '../hooks/useToday'
import { formatMoney } from '../utils/formatters'
export default function InvoiceListPage() {
  const { invoices, loading, error, retry } = useInvoices()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [atypicalOnly, setAtypicalOnly] = useState(false)
  const today = useToday()
  const analysis = useMemo(() => Object.fromEntries(['USD', 'CRC'].map(currency => [currency, analyzeInvoices(invoices.filter(invoice => invoice.currency === currency), today)])), [invoices, today])
  const annotated = useMemo(() => {
    const byId = new Map(Object.values(analysis).flatMap(group => group.rows).map(row => [row.id, row]))
    return invoices.map(invoice => byId.get(invoice.id))
  }, [invoices, analysis])
  const filtered = annotated.filter(invoice => `${invoice.number} ${invoice.customer.name} ${invoice.customer.identification}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()) && (statusFilter === 'all' || invoice.status === statusFilter) && (!atypicalOnly || invoice.atypical))
  const total = currency => analysis[currency].total
  const atypicalCount = Object.values(analysis).reduce((sum, group) => sum + group.atypicalCount, 0)
  return <><div className="page-heading"><div><div className="eyebrow">ADMINISTRACIÓN / FACTURACIÓN</div><h1>Facturas</h1><p>Organiza tus ventas, en un solo lugar.</p></div><Link className="button" to="/facturas/nueva">+ Nueva factura</Link></div>
    <div className="stats"><div className="stat"><span>Facturado en dólares</span><strong>{loading || error ? '—' : formatMoney(total('USD'), 'USD')}</strong><small>Total de facturas registradas · USD</small></div><div className="stat"><span>Facturas registradas</span><strong>{loading || error ? '—' : String(invoices.length).padStart(2, '0')}</strong><small>Tu historial de documentos</small></div><div className="stat"><span>Facturado en colones</span><strong>{loading || error ? '—' : formatMoney(total('CRC'), 'CRC')}</strong><small>Total de facturas registradas · CRC</small></div></div>
    <section className="panel list-panel"><div className="list-toolbar"><div><h2>Todas las facturas <span className="count">{invoices.length}</span></h2><p>Consulta y administra tus documentos.</p></div><input className="search" aria-label="Buscar facturas" placeholder="Buscar por número o cliente…" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="invoice-list-filters"><label>Estado de pago<select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="all">Todos los estados</option><option value="Pagada">Pagadas</option><option value="Pendiente">Pendientes</option><option value="Vencida">Vencidas</option></select></label><label className="atypical-filter"><input type="checkbox" checked={atypicalOnly} onChange={e => setAtypicalOnly(e.target.checked)} />Solo atípicas {loading || error ? '' : `(${atypicalCount})`}</label><p>Atípica: total a más de 1,5 desviaciones estándar del promedio de su moneda. Se analiza todo el historial, incluidas las simulaciones; buscar o filtrar no cambia la clasificación.</p></div>{loading ? <p className="empty" role="status">Cargando facturas…</p> : error ? <div className="empty"><p role="alert" className="message error">{error}</p><button className="button secondary" onClick={retry}>Reintentar</button></div> : <InvoiceList invoices={filtered} filtered={Boolean(query) || statusFilter !== 'all' || atypicalOnly} />}<div className="list-footer">{filtered.length} documento{filtered.length !== 1 ? 's' : ''}<span>Totales separados por moneda · USD / CRC</span></div></section><p className="workspace-note">▣ &nbsp; Espacio de trabajo interno · Tus datos se guardan localmente.</p></>
}
