import { TAX_OPTIONS, taxSnapshot } from '../../constants/tax'
import { itemTotal } from '../../utils/calculations'
import { formatMoney } from '../../utils/formatters'
export default function InvoiceItemsTable({ items, onChange, currency = 'USD', defaultTaxCode = '08' }) {
  const update = (id, key, value) => onChange(items.map(item => item.id === id ? { ...item, [key]: value } : item))
  return <><div className="table-scroll"><table className="items-editor"><thead><tr><th>Descripción</th><th>Cantidad</th><th>Precio unitario</th><th>Tarifa IVA</th><th>Base</th><th /></tr></thead><tbody>{items.map((item, index) => <tr key={item.id}>
    <td><input aria-label={`Descripción ${index + 1}`} required value={item.description} onChange={e => update(item.id, 'description', e.target.value)} placeholder="Producto o servicio" /></td>
    <td><input aria-label={`Cantidad ${index + 1}`} required type="number" min="0.001" step="0.001" value={item.quantity} onChange={e => update(item.id, 'quantity', e.target.value)} /></td>
    <td><input aria-label={`Precio ${index + 1}`} required type="number" min="0.01" step="0.01" value={item.unitPrice} onChange={e => update(item.id, 'unitPrice', e.target.value)} /></td>
    <td><select aria-label={`IVA del ítem ${index + 1}`} value={item.taxCode || defaultTaxCode} onChange={e => onChange(items.map(row => row.id === item.id ? { ...row, ...taxSnapshot(e.target.value) } : row))}>{TAX_OPTIONS.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}</select></td>
    <td>{formatMoney(itemTotal(item), currency)}</td><td><button type="button" className="icon-button" aria-label={`Eliminar ítem ${index + 1}`} disabled={items.length === 1} onClick={() => onChange(items.filter(row => row.id !== item.id))}>×</button></td>
  </tr>)}</tbody></table></div><button className="button secondary" type="button" onClick={() => onChange([...items, { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: '', ...taxSnapshot(defaultTaxCode) }])}>+ Agregar ítem</button></>
}
