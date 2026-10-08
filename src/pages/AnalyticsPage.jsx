import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInvoices } from '../hooks/useInvoices'
import { groupInvoices, periodLabel, summarize } from '../utils/analytics'
import { formatMoney } from '../utils/formatters'
import HarborArt from '../components/ui/HarborArt'
import SalesChart from '../components/analytics/SalesChart'
export default function AnalyticsPage() {
  const { invoices, loading, error, retry } = useInvoices()
  const [currency, setCurrency] = useState('USD')
  const money = value => formatMoney(value, currency)
  const [year, setYear] = useState('')
  const [period, setPeriod] = useState('month')
  const [source, setSource] = useState('all')
  const [metric, setMetric] = useState('subtotal')
  const [sort, setSort] = useState('date')
  const years = [...new Set(invoices.map(i => i.date.slice(0, 4)))].sort().reverse()
  const selectedYear = year || years[0] || String(new Date().getFullYear())
  const scope = invoices.filter(i => i.currency === currency && (source === 'all' || (source === 'simulation' ? i.source === 'simulation' : i.source !== 'simulation')))
  const selected = scope.filter(i => period === 'year' || i.date.startsWith(selectedYear))
  const summary = summarize(selected)
  const groups = groupInvoices(scope, period, selectedYear)
  const ordered = [...groups].sort((a, b) => sort === 'sales' ? b.subtotal - a.subtotal : sort === 'count' ? b.count - a.count : a.key.localeCompare(b.key))
  return <><div className="page-heading"><div><div className="eyebrow">TU NEGOCIO EN CIFRAS</div><h1>Resumen de ventas</h1><p>Convierte tus facturas en una visión clara de tu negocio.</p></div><Link className="button" to="/simulacion">↥ Importar año de prueba</Link></div>
    <section className="analytics-hero"><div><span className="eyebrow">FACTURACIÓN · {currency}</span><h2>Tus resultados,<br />con rumbo claro.</h2><p>Explora tus resultados por semana, mes o año.</p></div><HarborArt /></section>
    <div className="filter-bar"><label>Moneda<select value={currency} onChange={e => setCurrency(e.target.value)}><option value="USD">USD · Dólares</option><option value="CRC">CRC · Colones</option></select></label><label>Período<select value={period} onChange={e => setPeriod(e.target.value)}><option value="week">Semanal</option><option value="month">Mensual</option><option value="year">Anual · todos los años</option></select></label><label>Año<select disabled={period === 'year'} value={selectedYear} onChange={e => setYear(e.target.value)}>{(years.length ? years : [selectedYear]).map(y => <option key={y}>{y}</option>)}</select></label><label>Origen de datos<select value={source} onChange={e => setSource(e.target.value)}><option value="all">Todas las facturas</option><option value="manual">Ingresadas manualmente</option><option value="simulation">Solo simulación</option></select></label></div>
    {loading ? <p role="status">Cargando resultados…</p> : error ? <div role="alert" className="message error">{error} <button className="button" onClick={retry}>Reintentar</button></div> : <>
    <div className="analytics-stats"><div className="stat"><span>Ventas sin impuestos</span><strong>{money(summary.subtotal)}</strong><small>Importe de productos y servicios</small></div><div className="stat"><span>Total facturado</span><strong>{money(summary.total)}</strong><small>Incluye {money(summary.tax)} de impuestos</small></div><div className="stat"><span>Facturas del período</span><strong>{summary.count}</strong><small>{selected.filter(i => i.source === 'simulation').length} de simulación</small></div><div className="stat"><span>Venta promedio</span><strong>{money(summary.count ? summary.subtotal / summary.count : 0)}</strong><small>Sin impuestos por factura</small></div></div>
    <section className="panel"><div className="list-toolbar"><div><h2>Evolución de tus ventas</h2><p>{period === 'year' ? 'Comparación anual' : `Resultados de ${selectedYear}`} · {currency} · Semanas de lunes a domingo</p></div><label>Métrica<select value={metric} onChange={e => setMetric(e.target.value)}><option value="subtotal">Ventas sin impuestos</option><option value="total">Total facturado</option><option value="count">Cantidad de facturas</option></select></label></div><SalesChart currency={currency} groups={groups} period={period} metric={metric} />{!summary.count && <p className="empty">No hay facturas para estos filtros. Puedes importar el año de demostración.</p>}</section>
    <section className="panel"><div className="list-toolbar"><div><h2>Desglose por período</h2><p>Las ventas facturadas no implican pagos cobrados ni utilidad.</p></div><label>Ordenar<select value={sort} onChange={e => setSort(e.target.value)}><option value="date">Cronológico</option><option value="sales">Mayor venta</option><option value="count">Más facturas</option></select></label></div><div className="table-scroll"><table><thead><tr><th>Período</th><th>Facturas</th><th>Ventas sin impuestos</th><th>Impuestos</th><th>Total facturado</th></tr></thead><tbody>{ordered.map(row => <tr key={row.key}><td>{periodLabel(row.key, period)} {period === 'week' ? `(${row.key})` : ''}</td><td>{row.count}</td><td>{money(row.subtotal)}</td><td>{money(row.tax)}</td><td>{money(row.total)}</td></tr>)}</tbody><tfoot><tr><th>Total</th><th>{summary.count}</th><th>{money(summary.subtotal)}</th><th>{money(summary.tax)}</th><th>{money(summary.total)}</th></tr></tfoot></table></div></section></>}
  </>
}
