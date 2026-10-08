import { addDays } from '../../utils/invoiceStatus'
import { useState } from 'react'
import Field from '../ui/Field'
import InvoiceItemsTable from './InvoiceItemsTable'
import TaxpayerStatus from './TaxpayerStatus'
import CurrencySettings from './CurrencySettings'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { convertInvoiceCurrency, exchangeSnapshot, equivalentPreview } from '../../utils/currency'
import { TAX_OPTIONS, taxSnapshot } from '../../constants/tax'
import { calculateTotals, taxBreakdown } from '../../utils/calculations'
import { formatMoney, today } from '../../utils/formatters'
import { normalizeIdentification, validateInvoice } from '../../utils/validators'
import { useHaciendaLookup } from '../../hooks/useHaciendaLookup'
const newInvoice = () => ({ number: `FAC-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`, date: today(), dueDate: addDays(today(), 30), paidAt: null, currency: 'USD', ...taxSnapshot(), issuer: { name: 'TechStore S.A.', identification: '3101123456' }, customer: { name: '', identification: '', identificationType: 'fisica', email: '', address: '' }, items: [{ id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: '', ...taxSnapshot() }], terms: 'Gracias por su preferencia. Pago dentro del plazo indicado.' })
export default function InvoiceForm({ onSave, saving, saveError }) {
  const [draft, setInvoice] = useState(newInvoice)
  const [error, setError] = useState('')
  const [currencyError, setCurrencyError] = useState('')
  const [rateKind, setRateKind] = useState('venta')
  const exchange = useExchangeRate()
  const snapshot = draft.exchangeRate || exchangeSnapshot(exchange.data, rateKind)
  function changeCurrency(currency) {
    try { const converted = convertInvoiceCurrency(draft, currency, snapshot); setInvoice(converted); setCurrencyError('') } catch (error) { setCurrencyError(error.message) }
  }
  const lookup = useHaciendaLookup(draft.customer.identification, draft.customer.identificationType)
  const invoice = { ...draft, exchangeRate: snapshot, customer: { ...draft.customer, name: lookup.data?.nombre || '', fiscalData: lookup.data || undefined } }
  function changeIdentification(key, value) {
    setError('')
    setInvoice(current => ({ ...current, customer: { ...current.customer, [key]: value, name: '', email: '', address: '' } }))
  }
  const change = (key, value) => setInvoice(current => ({ ...current, [key]: value }))
  const person = (group, key, value) => setInvoice(current => ({ ...current, [group]: { ...current[group], [key]: value } }))
  function changeDefaultTax(code) {
    const tax = taxSnapshot(code)
    setInvoice(current => ({ ...current, ...tax, items: current.items.map(item => ({ ...item, ...tax })) }))
  }
  const taxes = taxBreakdown(invoice)
  const totals = calculateTotals(invoice.items, invoice.taxRate)
  const equivalent = equivalentPreview(totals.total, invoice.currency, snapshot)
  function submit(event) {
    event.preventDefault()
    if (!lookup.verified) { setError('Verifica una cédula registrada en Hacienda antes de guardar la factura.'); return }
    const validation = validateInvoice(invoice)
    setError(validation || '')
    if (!validation) onSave({ ...invoice, customer: { ...invoice.customer, identification: normalizeIdentification(invoice.customer.identification, invoice.customer.identificationType), verification: { source: 'hacienda', identification: lookup.normalized, identificationType: invoice.customer.identificationType, checkedAt: lookup.checkedAt } }, items: invoice.items.map(item => ({ ...item, quantity: Number(item.quantity), unitPrice: Number(item.unitPrice) })) })
  }
  return <form onSubmit={submit} className="invoice-form"><nav className="form-steps" aria-label="Secciones de la factura"><a href="#emisor"><span>01</span> Emisor</a><a href="#cliente"><span>02</span> Cliente {lookup.verified && '✓'}</a><a href="#productos"><span>03</span> Productos e IVA</a></nav><fieldset disabled={saving}>
    <section id="emisor" className="panel"><div className="section-title"><span className="step">01</span><div><h2>Información de la factura</h2><p>Datos del documento y de tu empresa.</p></div></div><div className="form-grid">
      <Field label="Número de factura" required value={invoice.number} onChange={e => change('number', e.target.value)} /><Field label="Fecha de emisión" required type="date" value={invoice.date} onChange={e => change('date', e.target.value)} />
      <Field label="Fecha de vencimiento" required type="date" min={invoice.date} value={invoice.dueDate} onChange={e => change('dueDate', e.target.value)} /><Field label="Nombre del emisor" required value={invoice.issuer.name} onChange={e => person('issuer', 'name', e.target.value)} /><Field label="Cédula / RUC del emisor" required value={invoice.issuer.identification} onChange={e => person('issuer', 'identification', e.target.value)} />
    </div></section>
    <section id="cliente" className="panel"><div className="section-title"><span className="step">02</span><div><h2>Datos del cliente</h2><p>Ingresa la cédula: verificamos y completamos los datos automáticamente.</p></div></div><div className="form-grid">
      <Field label="Tipo de identificación"><select aria-label="Tipo de identificación" value={invoice.customer.identificationType} onChange={e => changeIdentification('identificationType', e.target.value)}><option value="fisica">Cédula física</option><option value="juridica">Cédula jurídica</option><option value="nite">NITE</option><option value="dimex">DIMEX</option></select></Field>
      <div className="identification-group"><div className="lookup-field"><Field label="Identificación del cliente" required inputMode="numeric" autoComplete="off" aria-invalid={['not_found', 'invalid'].includes(lookup.status)} aria-describedby="identification-status" value={invoice.customer.identification} onChange={e => changeIdentification('identification', e.target.value)} /><button type="button" className="button secondary" disabled={lookup.loading || !lookup.normalized || lookup.verified} onClick={lookup.retry}>{lookup.loading ? 'Verificando…' : 'Reintentar'}</button></div>
        <p id="identification-status" role={lookup.error ? 'alert' : 'status'} className={`identification-status ${lookup.error ? 'invalid' : lookup.verified ? 'verified' : ''}`}>
          {lookup.status === 'not_found' ? <><strong>USUARIO NO REGISTRADO</strong><span>Revisa la cédula y el tipo de identificación. No puedes terminar la factura con este número.</span></> : lookup.error || (lookup.verified ? '✓ Cliente verificado en Hacienda' : lookup.loading ? 'Consultando los datos del cliente…' : 'Escribe una cédula física o jurídica para comenzar.')}
        </p>
      </div>
      <Field label="Nombre / razón social" required readOnly placeholder="Se completa al verificar la cédula" value={invoice.customer.name} /><Field label="Correo electrónico (opcional)" type="email" value={invoice.customer.email} onChange={e => person('customer', 'email', e.target.value)} /><Field label="Dirección (opcional)" value={invoice.customer.address} onChange={e => person('customer', 'address', e.target.value)} />
    </div><p className="contact-note">Hacienda no proporciona correo ni dirección en esta consulta; completa esos datos manualmente.</p>{lookup.data && <TaxpayerStatus data={lookup.data} checkedAt={lookup.checkedAt} />}</section>
    <section id="productos" className="panel"><CurrencySettings currency={invoice.currency} kind={snapshot?.kind || rateKind} onKindChange={setRateKind} onCurrencyChange={changeCurrency} exchange={exchange} snapshot={snapshot} locked={Boolean(draft.exchangeRate)} error={currencyError} /><div className="section-title"><span className="step">03</span><div><h2>Productos y servicios</h2><p>Precios e importes en {invoice.currency === 'USD' ? 'dólares (USD)' : 'colones (CRC)'}. Cada precio convertido se redondea a dos decimales.</p></div></div><div className="tax-settings"><label className="field">IVA para todas las líneas<select value={invoice.taxCode} onChange={e => changeDefaultTax(e.target.value)}>{TAX_OPTIONS.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}</select></label><p>Aplica esta tarifa a todas las líneas y ajusta cada producto si lo necesitas. La tarifa depende del bien o servicio y su tratamiento fiscal, no solo del cliente.</p></div><InvoiceItemsTable defaultTaxCode={invoice.taxCode} currency={invoice.currency} items={invoice.items} onChange={value => change('items', value)} /><div className="form-bottom"><Field label="Condiciones / observaciones" value={invoice.terms} onChange={e => change('terms', e.target.value)} /><dl className="totals"><div><dt>Subtotal</dt><dd>{formatMoney(totals.subtotal, invoice.currency)}</dd></div>{taxes.map(tax => <div key={`${tax.code}:${tax.rate}`}><dt>{tax.label}</dt><dd>{formatMoney(tax.tax, invoice.currency)}</dd></div>)}<div className="grand-total"><dt>Total</dt><dd>{formatMoney(totals.total, invoice.currency)}</dd></div>{snapshot && <div><dt>Equivalente {invoice.currency === 'USD' ? 'CRC' : 'USD'}</dt><dd>{equivalent === null ? 'Revisa los importes' : formatMoney(equivalent, invoice.currency === 'USD' ? 'CRC' : 'USD')}</dd></div>}</dl></div></section>
    {(error || saveError) && <p role="alert" className="message error">{error || saveError}</p>}<div className="form-actions"><div className="save-total"><small>Total de la factura</small><strong>{formatMoney(totals.total, invoice.currency)}</strong></div><span>{lookup.verified ? 'Al guardar podrás descargar PDF y XML desde el detalle.' : 'Verifica al cliente en Hacienda para habilitar el guardado.'}</span><button className="button" disabled={saving || !lookup.verified} type="submit">{saving ? 'Guardando…' : 'Guardar factura →'}</button></div>
  </fieldset></form>
}
