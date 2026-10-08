import { dueDate } from '../../utils/invoiceStatus'
import { Link } from 'react-router-dom'
import { calculateTotals } from '../../utils/calculations'
import { formatDate, formatMoney } from '../../utils/formatters'
export default function InvoiceCard({ invoice }) {
  const status = invoice.status
  return <tr className={invoice.atypical ? 'atypical-row' : undefined}><td><Link className="invoice-link" to={`/facturas/${invoice.id}`}>{invoice.number}</Link></td><td><div className="customer-cell"><span className="avatar">{invoice.customer.name.slice(0, 1)}</span><div><strong>{invoice.customer.name}</strong><small>{invoice.customer.identification}</small></div></div></td><td>{formatDate(invoice.date)}<small className="simulation-label">Vence: {formatDate(dueDate(invoice))}</small></td><td><span className={`badge status-${status.toLowerCase()}`}>{status}</span>{invoice.source === 'simulation' && <small className="simulation-label">Simulación</small>}</td><td>{invoice.atypical ? <span className="badge status-atypical" title="El total se aleja más de 1,5 desviaciones estándar del promedio de su moneda.">Atípica</span> : <span className="analysis-normal">Dentro del rango</span>}</td><td className="amount">{formatMoney(calculateTotals(invoice.items, invoice.taxRate).total, invoice.currency)}</td><td><Link className="detail-link" to={`/facturas/${invoice.id}`} aria-label={`Ver factura ${invoice.number}`}>Ver detalle ↗</Link></td></tr>
}
