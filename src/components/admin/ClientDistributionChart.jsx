import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { formatMoney } from '../../utils/formatters'
const colors = ['#397fb8', '#42a791', '#e3ac53', '#927bb8', '#d47770', '#728598']
export default function ClientDistributionChart({ clients, currency }) {
 const data = clients.slice(0, 5)
 if (clients.length > 5) data.push({ key: 'others', name: 'Otros clientes', total: clients.slice(5).reduce((sum, row) => sum + row.total, 0) })
 return <section className="panel"><h2>Distribución por cliente</h2><p>Participación en el total facturado · {currency}</p>{!data.length ? <p className="empty">No hay facturas para esta selección.</p> : <><div className="rechart-frame"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="total" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={3} isAnimationActive={false}>{data.map((row, i) => <Cell key={row.key} fill={colors[i]} stroke="var(--surface)" />)}</Pie><Tooltip formatter={value => formatMoney(value, currency)} contentStyle={{ background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--ink)', borderRadius: 12 }} /></PieChart></ResponsiveContainer></div><ul className="chart-legend">{data.map((row, i) => <li key={row.key}><i style={{ background: colors[i] }} /><span>{row.name}</span><strong>{formatMoney(row.total, currency)}</strong></li>)}</ul></>}</section>
}
