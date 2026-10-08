import { Link } from 'react-router-dom'
import InvoiceCard from './InvoiceCard'
export default function InvoiceList({ invoices, filtered = false }) {
  if (!invoices.length) return <div className="empty"><span className="empty-icon">▤</span><h2>{filtered ? 'No se encontraron resultados' : 'No hay facturas registradas'}</h2><p>{filtered ? 'Prueba con otro número, cliente o filtro.' : 'Crea tu primera factura para comenzar.'}</p>{!filtered && <Link className="button" to="/facturas/nueva">Crear factura</Link>}</div>
  return <div className="table-scroll"><table className="invoice-list"><thead><tr><th>Número</th><th>Cliente</th><th>Fecha de emisión</th><th>Estado</th><th>Análisis del importe</th><th className="amount">Total</th><th /></tr></thead><tbody>{invoices.map(invoice => <InvoiceCard key={invoice.id} invoice={invoice} />)}</tbody></table></div>
}
