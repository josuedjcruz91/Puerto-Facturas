import { dueDate } from './invoiceStatus.js'
import { convertAmount } from './currency.js'
import { taxpayerSummary } from './taxpayer.js'
import { calculateTotals, itemTotal, itemTax, taxBreakdown } from './calculations.js'
export const escapeXml = value => String(value ?? '').replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char])
// Formato interno explícito; no imita un comprobante firmado ni una aceptación fiscal.
export function invoiceToXml(invoice) {
  const e = escapeXml
  const totals = calculateTotals(invoice.items, invoice.taxRate)
  const taxes = taxBreakdown(invoice)
  const fiscal = taxpayerSummary(invoice.customer.fiscalData)
  const person = (tag, value) => `<${tag}><Nombre>${e(value.name)}</Nombre><Identificacion>${e(value.identification)}</Identificacion>${value.identificationType ? `<TipoIdentificacion>${e(value.identificationType)}</TipoIdentificacion>` : ''}${value.email ? `<Correo>${e(value.email)}</Correo>` : ''}${value.address ? `<Direccion>${e(value.address)}</Direccion>` : ''}</${tag}>`
  return `<?xml version="1.0" encoding="UTF-8"?>
<FacturaInterna version="1" validezFiscal="ninguna" simulacion="${invoice.source === 'simulation'}">
  <Numero>${e(invoice.number)}</Numero><Fecha>${e(invoice.date)}</Fecha><FechaVencimiento>${e(dueDate(invoice))}</FechaVencimiento><FechaPago>${e(invoice.paidAt)}</FechaPago><Moneda>${e(invoice.currency)}</Moneda>
  ${person('Emisor', invoice.issuer)}
  ${person('Cliente', invoice.customer)}
  ${invoice.customer.fiscalData ? `<ConsultaHacienda><FechaConsulta>${e(invoice.customer.verification?.checkedAt)}</FechaConsulta><EstadoInscripcion>${e(fiscal.status)}</EstadoInscripcion><Moroso>${e(fiscal.moroso.label)}</Moroso><Omiso>${e(fiscal.omiso.label)}</Omiso><AdministracionTributaria>${e(fiscal.administration)}</AdministracionTributaria><RespuestaOriginal formato="json">${e(JSON.stringify(invoice.customer.fiscalData))}</RespuestaOriginal></ConsultaHacienda>` : ''}
  <Detalle>${invoice.items.map((item, i) => `<Linea numero="${i + 1}"><Descripcion>${e(item.description)}</Descripcion><Cantidad>${item.quantity}</Cantidad><PrecioUnitario>${item.unitPrice}</PrecioUnitario><Importe>${itemTotal(item).toFixed(2)}</Importe>${item.taxRate !== undefined ? `<IVA><Codigo>${e(item.taxCode)}</Codigo><Descripcion>${e(item.taxLabel)}</Descripcion><Tasa>${item.taxRate}</Tasa><Importe>${itemTax(item, invoice.taxRate).toFixed(2)}</Importe></IVA>` : ''}</Linea>`).join('')}</Detalle>
  <Resumen><Subtotal>${totals.subtotal.toFixed(2)}</Subtotal><TasaPredeterminada>${invoice.taxRate}</TasaPredeterminada><DesgloseImpuestos>${taxes.map(tax => `<IVA><Codigo>${e(tax.code)}</Codigo><Descripcion>${e(tax.label)}</Descripcion><Tasa>${tax.rate}</Tasa><Base>${tax.base.toFixed(2)}</Base><Importe>${tax.tax.toFixed(2)}</Importe></IVA>`).join('')}</DesgloseImpuestos><Impuesto>${totals.tax.toFixed(2)}</Impuesto><Total>${totals.total.toFixed(2)}</Total></Resumen>
  ${invoice.exchangeRate ? `<TipoCambio><MonedaBase>USD</MonedaBase><MonedaCotizada>CRC</MonedaCotizada><Tasa>${invoice.exchangeRate.rate}</Tasa><Tipo>${e(invoice.exchangeRate.kind)}</Tipo><Fecha>${e(invoice.exchangeRate.date)}</Fecha><Fuente>${e(invoice.exchangeRate.source)}</Fuente><FechaConsulta>${e(invoice.exchangeRate.fetchedAt)}</FechaConsulta><TotalEquivalente moneda="${invoice.currency === 'USD' ? 'CRC' : 'USD'}">${convertAmount(totals.total, invoice.currency, invoice.currency === 'USD' ? 'CRC' : 'USD', invoice.exchangeRate).toFixed(2)}</TotalEquivalente></TipoCambio>` : ''}
  <Condiciones>${e(invoice.terms)}</Condiciones>
  <Nota>Documento interno no firmado. No enviado ni autorizado por Hacienda.</Nota>
</FacturaInterna>`
}
