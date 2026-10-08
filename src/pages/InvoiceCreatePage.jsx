import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InvoiceForm from '../components/invoice/InvoiceForm'
import { invoiceService } from '../services/invoiceService'
import { hasVerifiedCustomer } from '../utils/validators'
export default function InvoiceCreatePage() {
  const navigate = useNavigate()
  const pending = useRef(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  async function save(invoice) {
    if (pending.current) return
    if (!hasVerifiedCustomer(invoice.customer)) { setError('No se puede guardar: el cliente debe estar verificado en Hacienda con la cédula actual.'); return }
    pending.current = true
    setSaving(true); setError('')
    try {
      const existing = await invoiceService.getAll()
      if (existing.some(record => record.number.trim().toLowerCase() === invoice.number.trim().toLowerCase())) throw new Error('Ya existe una factura con ese número. Elige otro.')
      const created = await invoiceService.create(invoice)
      navigate(`/facturas/${created.id}`)
    } catch (error) { setError(error.message) } finally { pending.current = false; setSaving(false) }
  }
  return <><Link className="back-link" to="/facturas">← Volver a facturas</Link><div className="page-heading"><div><div className="eyebrow">NUEVO DOCUMENTO</div><h1>Crear factura</h1><p>Completa los datos y registra una nueva venta.</p></div><span className="badge">Borrador</span></div><InvoiceForm onSave={save} saving={saving} saveError={error} /></>
}
